import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoutes from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";


// Creates the Express app
const app = express();
// Enables CORS and JSON parsing so Express understands req.body
app.use(cors());
// is used to automatically parse JSON data only if the frontend tells it that the data is JSON 
// (frontend: "Content-Type": "application/json")
app.use(express.json()); 
// Required for ES Modules (to get __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("Serving static files from:", path.join(__dirname, "uploads"));


app.use("/api", authRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoutes);


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
