// API integration tests (Node's built-in test runner, no extra dependencies).
//
// These tests DROP and recreate every table, so they refuse to run unless you
// explicitly point them at a local database whose name ends in "test":
//
//   DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=... DB_NAME=shop_test npm test
//
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { DB_HOST, DB_NAME } = process.env;
if (!["localhost", "127.0.0.1"].includes(DB_HOST) || !DB_NAME?.endsWith("test")) {
  console.error(
    "Refusing to run: set DB_HOST=localhost and a DB_NAME ending in 'test' " +
      "(the tests wipe the database).",
  );
  process.exit(1);
}
process.env.JWT_SECRET ??= "test-secret";
process.env.NODE_ENV = "test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { default: app } = await import("../src/app.js");
const { default: pool } = await import("../src/db.js");

let server;
let BASE;

// Tiny client that keeps the auth cookie between requests, like a browser.
const client = () => {
  let cookie = "";
  return async (method, url, body) => {
    const res = await fetch(BASE + url, {
      method,
      headers: { "Content-Type": "application/json", ...(cookie && { Cookie: cookie }) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) cookie = setCookie.split(";")[0];
    const json = await res.json().catch(() => null);
    return { status: res.status, body: json, setCookie };
  };
};

const order = { name: "Test User", phone: "01234567890", address: "1 Test St", payment: "cod" };

before(async () => {
  await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
  await pool.query(fs.readFileSync(path.join(__dirname, "../database/schema.sql"), "utf8"));
  await pool.query(`
    INSERT INTO categories (name) VALUES ('Makeup'), ('Skincare');
    INSERT INTO products (name, price, stock, category_id) VALUES
      ('Cheap A', 0.10, 100, 1),  -- 1
      ('Cheap B', 0.20, 100, 1),  -- 2
      ('Last two', 10, 2, 2),     -- 3
      ('Plenty', 5, 50, 2);       -- 4
  `);
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  BASE = `http://localhost:${server.address().port}/api`;
});

after(async () => {
  server?.close();
  await pool.end();
});

test("register sets an httpOnly cookie and returns the user", async () => {
  const alice = client();
  const res = await alice("POST", "/auth/register", {
    full_name: "Alice", email: "alice@test.io", password: "password1",
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.data.user.email, "alice@test.io");
  assert.match(res.setCookie, /HttpOnly/);
});

test("login does not reveal whether an email is registered", async () => {
  const anon = client();
  const unknown = await anon("POST", "/auth/login", { email: "nobody@test.io", password: "password1" });
  const wrongPw = await anon("POST", "/auth/login", { email: "alice@test.io", password: "wrongpass1" });
  assert.equal(unknown.status, 401);
  assert.equal(wrongPw.status, 401);
  assert.equal(unknown.body.message, wrongPw.body.message);
});

test("non-string login fields get 400, not 500", async () => {
  const res = await client()("POST", "/auth/login", { email: { a: 1 }, password: "x" });
  assert.equal(res.status, 400);
});

test("missing Google credential gets 400", async () => {
  const res = await client()("POST", "/auth/google", {});
  assert.equal(res.status, 400);
});

test("protected routes require login; admin routes require admin", async () => {
  assert.equal((await client()("GET", "/cart")).status, 401);
  assert.equal((await client()("GET", "/orders")).status, 401);

  const bob = client();
  await bob("POST", "/auth/register", { full_name: "Bob", email: "bob@test.io", password: "password1" });
  assert.equal((await bob("GET", "/admin/stats")).status, 403);
});

test("cart input is validated (400/404 instead of 500)", async () => {
  const carol = client();
  await carol("POST", "/auth/register", { full_name: "Carol", email: "carol@test.io", password: "password1" });

  assert.equal((await carol("POST", "/cart/add", { product_id: "abc", quantity: 1 })).status, 400);
  assert.equal((await carol("POST", "/cart/add", { product_id: 9999, quantity: 1 })).status, 404);
  assert.equal((await carol("PATCH", "/cart/update", { product_id: 4, quantity: 1.5 })).status, 400);
  assert.equal((await carol("PATCH", "/cart/update", { product_id: 4, quantity: 2 })).status, 404); // not in cart
  assert.equal((await carol("DELETE", "/cart/abc")).status, 400);

  // quantity is optional and defaults to 1
  const added = await carol("POST", "/cart/add", { product_id: 4 });
  assert.equal(added.status, 201);
  assert.equal(added.body.quantity, 1);
});

test("cart cannot exceed available stock", async () => {
  const dave = client();
  await dave("POST", "/auth/register", { full_name: "Dave", email: "dave@test.io", password: "password1" });

  const tooMany = await dave("POST", "/cart/add", { product_id: 3, quantity: 3 });
  assert.equal(tooMany.status, 400);
  assert.match(tooMany.body.message, /left in stock/);

  await dave("POST", "/cart/add", { product_id: 3, quantity: 1 });
  assert.equal((await dave("PATCH", "/cart/update", { product_id: 3, quantity: 5 })).status, 400);
  await dave("DELETE", "/cart/clear");
});

test("checkout uses database prices and exact cent totals", async () => {
  const erin = client();
  await erin("POST", "/auth/register", { full_name: "Erin", email: "erin@test.io", password: "password1" });
  await erin("POST", "/cart/add", { product_id: 1, quantity: 1 });
  await erin("POST", "/cart/add", { product_id: 2, quantity: 1 });

  // extra fields like a fake total must be ignored
  const res = await erin("POST", "/orders/checkout", { ...order, total: 0.01 });
  assert.equal(res.status, 201);
  assert.equal(res.body.total_price, 0.3);

  const cart = await erin("GET", "/cart");
  assert.deepEqual(cart.body.items, []);

  const orders = await erin("GET", "/orders");
  assert.equal(orders.status, 200);
  assert.equal(orders.body.data.length, 1);
  assert.equal(orders.body.data[0].items.length, 2);
});

test("users only see their own orders", async () => {
  const frank = client();
  await frank("POST", "/auth/register", { full_name: "Frank", email: "frank@test.io", password: "password1" });
  const orders = await frank("GET", "/orders");
  assert.deepEqual(orders.body.data, []);
});

test("checkout validation", async () => {
  const gina = client();
  await gina("POST", "/auth/register", { full_name: "Gina", email: "gina@test.io", password: "password1" });

  assert.equal((await gina("POST", "/orders/checkout", order)).status, 400); // empty cart
  await gina("POST", "/cart/add", { product_id: 4, quantity: 1 });
  assert.equal((await gina("POST", "/orders/checkout", { ...order, phone: "12" })).status, 400);
  assert.equal((await gina("POST", "/orders/checkout", { ...order, payment: "paymob" })).status, 400);
  assert.equal((await gina("POST", "/orders/checkout", { ...order, name: 123 })).status, 400);
});

test("double-submitted checkout creates exactly one order", async () => {
  const hank = client();
  await hank("POST", "/auth/register", { full_name: "Hank", email: "hank@test.io", password: "password1" });
  await hank("POST", "/cart/add", { product_id: 4, quantity: 2 });

  const results = await Promise.all([1, 2, 3].map(() => hank("POST", "/orders/checkout", order)));
  assert.equal(results.filter((r) => r.status === 201).length, 1);
  assert.equal((await hank("GET", "/orders")).body.data.length, 1);
});

test("two users cannot oversell the last units", async () => {
  const a = client();
  const b = client();
  await a("POST", "/auth/register", { full_name: "Ivy", email: "ivy@test.io", password: "password1" });
  await b("POST", "/auth/register", { full_name: "Jay", email: "jay@test.io", password: "password1" });
  await a("POST", "/cart/add", { product_id: 3, quantity: 2 });
  await b("POST", "/cart/add", { product_id: 3, quantity: 2 });

  const results = await Promise.all([a("POST", "/orders/checkout", order), b("POST", "/orders/checkout", order)]);
  assert.equal(results.filter((r) => r.status === 201).length, 1);

  const { rows } = await pool.query("SELECT stock FROM products WHERE product_id = 3");
  assert.equal(rows[0].stock, 0);
});

test("products can be filtered by category and limit is capped", async () => {
  const anon = client();
  const skincare = await anon("GET", "/products?category_id=2");
  assert.equal(skincare.status, 200);
  assert.ok(skincare.body.data.data.every((p) => p.category_id === 2));
  assert.equal(skincare.body.data.total, 2);

  assert.equal((await anon("GET", "/products?category_id=abc")).status, 400);
  assert.equal((await anon("GET", "/products?limit=100000")).body.data.limit, 50);
  assert.equal((await anon("GET", "/categories/1.5/products")).status, 400);
});
