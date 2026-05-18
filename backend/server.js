import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoutes from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import {aj} from "./lib/arcjet.js";

dotenv.config();

const app = express(); // Creates the Express app
app.use(express.json()); // to parse JSON bodies from frontend requests
app.use(cors()); // to enable CORS
// for setting various HTTP headers for app security
app.use(helmet({crossOriginResourcePolicy: { policy: "cross-origin" },}));
app.use(morgan("dev")); // log requests to the console


// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);


// Handle undefined Routes
app.all(/.*/, (req, res, next) => {
    const err = new Error(`Can't find this route: ${req.originalUrl}`);
    next(err.message);
})

// Global Error Handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  // If error has a status, use it; otherwise default to 500
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ error: message });
  // res.status(404).json({err});
});


process.on("uncaughtException", (err) => {
  console.log("🔥 Uncaught error:", err);
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));