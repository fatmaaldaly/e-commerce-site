# Maison de Beauté — Full-Stack E-Commerce

A beauty and cosmetics store built with **React** and **Node/Express** on **PostgreSQL**. Customers can browse products by category, manage a cart, check out with cash on delivery and see their order history.

## Features

- **Product catalog**: pagination and server-side category filtering
- **Authentication**: email/password (bcrypt) and Google sign-in, with the session in an **httpOnly JWT cookie**
- **Cart**: stored in the database, synced across devices, with stock checks on every change
- **Checkout**: the order total is computed on the server from database prices, and the client never sends a price. Order creation, stock update and cart clearing run in **one database transaction with row locks**, so stock can't be oversold and a double-click can't create a duplicate order.
- **Order history**: users only ever see their own orders
- **Hardening**: input validation, parameterized SQL, rate-limited login, Helmet security headers, CORS locked to the frontend origin, generic 500 errors

## Tech stack

| Layer    | Tools                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Frontend | React 19, Vite, React Router, Tailwind CSS 4, Axios, react-hot-toast                                 |
| Backend  | Node.js, Express 5, `pg`, JSON Web Tokens, bcryptjs, google-auth-library, Helmet, express-rate-limit |
| Database | PostgreSQL (hosted on Supabase; product images in Supabase Storage)                                  |
| Hosting  | Vercel (frontend and backend as separate projects)                                                   |

## Project structure

```
backend/
  database/     schema.sql, seed.sql
  src/
    routes/       URL → middleware → controller
    middlewares/  auth, input validation, error handler
    controllers/  HTTP request/response
    services/     business logic (checkout transaction, stock checks)
    models/       SQL queries
  tests/        API integration tests (node:test)
frontend/
  src/
    pages/        Home, Shop, Checkout, Orders, Auth
    components/   NavBar, Cart sidebar, ProductCard, ...
    context/      Auth, Cart, Category state
    services/     API calls
```

## Running locally

**Requirements:** Node 20+ and PostgreSQL.

1. **Clone the repository**

   ```bash
   git clone https://github.com/fatmaaldaly/e-commerce-site.git
   cd e-commerce-site
   ```

2. **Set up the database**

   ```bash
   createdb shop
   psql -d shop -f backend/database/schema.sql
   psql -d shop -f backend/database/seed.sql
   ```

3. **Start the backend**

   ```bash
   cd backend
   npm install
   npm run dev      # http://localhost:5000
   ```

4. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev      # http://localhost:5173
   ```

## Tests

The API tests **wipe the database they run against**, so they only run against a local database whose name ends in `test`:

```bash
createdb shop_test
cd backend
DB_HOST=localhost DB_USER=postgres DB_PASSWORD=... DB_NAME=shop_test npm test
```

They cover auth, access control, cart validation and stock limits, server-side pricing, duplicate-checkout protection and overselling under concurrent orders.

## Roadmap

- Online card payment (Paymob)
- Product details page
