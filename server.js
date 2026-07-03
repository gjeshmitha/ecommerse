const express = require("express");
const app = express();
const products = require("./products");
let orders = require("./index");

app.use(express.json()); 

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Create a new order
app.post("/orders", (req, res) => {
  const { customerId, items } = req.body;

  if (!customerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid request. customerId and items array required." });
  }

  // Validate that all items reference valid products
  for (const item of items) {
    if (!item.id || !item.qty || item.qty < 1) {
      return res.status(400).json({ error: "Each item must have valid id and qty" });
    }
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product ${item.id} not found` });
    }
  }

  const newOrder = {
    orderId: `order_${Date.now()}`,
    customerId,
    items,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get a specific order by ID
app.get("/orders/:orderId", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

// Update an order
app.put("/orders/:orderId", (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders[index] = { ...orders[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(orders[index]);
});

// Delete an order
app.delete("/orders/:orderId", (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders.splice(index, 1);
  res.json({ message: "Order deleted" });
});

// Get order status
app.get("/orders/:orderId/status", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ orderId: order.orderId, status: order.status });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
