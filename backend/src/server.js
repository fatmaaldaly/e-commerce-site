import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

import { aj } from "./lib/arcjet.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(morgan("dev"));


// Arcjet Protection Middleware
// app.use(async (req, res, next) => {
//   try {

//     const decision = await aj.protect(req, {
//       requested: 1,
//     });

//     if (decision.isDenied()) {

//       if (decision.reason.isRateLimit()) {
//         return res
//           .status(429)
//           .json({ error: "Too Many Requests" });
//       }

//       if (decision.reason.isBot()) {
//         return res
//           .status(403)
//           .json({ error: "Bot access denied" });
//       }

//       return res
//         .status(403)
//         .json({ error: "Forbidden" });
//     }

    // Detect spoofed bots
//     const isSpoofedBot = decision.results.some(
//       (result) =>
//         result.reason.isBot() &&
//         result.reason.isSpoofed()
//     );

//     if (isSpoofedBot) {
//       return res
//         .status(403)
//         .json({ error: "Spoofed bot detected" });
//     }

//     next();

//   } catch (error) {

//     console.error("Arcjet Error:", error);

//     next(error);
//   }
// });


// Static Uploads Folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/order", orderRoutes);

app.use("/api/payment", paymentRoutes);


// Handle Undefined Routes
app.all( /.*/, (req, res, next) => {

  const error = new Error(
    `Can't find this route: ${req.originalUrl}`
  );

  error.status = 404;

  next(error);
});


// Global Error Handler
app.use(errorHandler);


// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});