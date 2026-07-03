const express = require("express");
const app = express();
const products = require("./products");
let orders = require("./index");

app.use(express.json()); 


app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/orders", (req, res) => {
  const { customerId, items } = req.body;

  if (!customerId || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid request" });
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


app.get("/orders/:orderId", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});


app.put("/orders/:orderId", (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders[index] = { ...orders[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(orders[index]);
});


app.delete("/orders/:orderId", (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders.splice(index, 1);
  res.json({ message: "Order deleted" });
});


app.get("/orders/:orderId/status", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ orderId: order.orderId, status: order.status });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
