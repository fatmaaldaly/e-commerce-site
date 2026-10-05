import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import adminRoutes from "./routes/adminRoute.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

// Vercel sits in front of the app as a proxy; trust it so req.ip (used by the
// auth rate limiter) is the real client IP instead of the proxy's.
app.set("trust proxy", 1);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files: cache images aggressively (7 days)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "7d",
    etag: true,
  }),
);

// All API responses must not be cached
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.all(/.*/, (req, res, next) => {
  const error = new Error(`Can't find this route: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception — shutting down:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection — shutting down:", reason);
  process.exit(1);
});

export default app;
