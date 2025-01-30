import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import products from "./data.js";
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
// Connect to MongoDB
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1", (req, res) => {
  res.send("Hello from API v1!");
});

app.get("/api/v1/products", (req, res) => {
  res.send(products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.send(product);
});

// Listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
