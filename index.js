import express from 'express';
// Import the data module
import { orders, products } from './data.js';
const app = express();
const port = 3000;

// JSON body parsing middleware
app.use(express.json());

// Define the routes
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((order) => order.id === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.patch('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((order) => order.id === orderId);

  if (order) {
    // Handle the patch request to edit the order
    // You can access the request body using req.body
    // Implement your logic here

    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.delete('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    const deletedOrder = orders.splice(orderIndex, 1);
    res.json(deletedOrder);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.patch('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (product) {
    // Handle the patch request to edit the product
    // You can access the request body using req.body
    // Implement your logic here

    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:index', (req, res) => {
  const productIndex = parseInt(req.params.index);

  if (productIndex >= 0 && productIndex < products.length) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
