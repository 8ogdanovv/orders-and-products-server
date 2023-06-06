const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const dataDirectory = path.join(__dirname, 'data');

// Load data from JSON files
const readDataFile = (filename) => {
  const filePath = path.join(dataDirectory, filename);
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
};

// Save data to JSON files
const writeDataFile = (filename, data) => {
  const filePath = path.join(dataDirectory, filename);
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
};

app.get('/', (req, res) => {
  res.send('Express JS on Vercel');
});

app.get('/ping', (req, res) => {
  res.send('pong 🏓');
});

app.get('/orders', (req, res) => {
  const orders = readDataFile('orders.json');
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orders = readDataFile('orders.json');
  const order = orders.find((order) => order.id === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.post('/orders', (req, res) => {
  const newOrder = req.body;
  const orders = readDataFile('orders.json');

  // Generate a unique ID for the new order
  const maxId = Math.max(...orders.map((order) => order.id));
  newOrder.id = maxId + 1;

  orders.push(newOrder);
  writeDataFile('orders.json', orders);

  res.json(newOrder);
});

app.patch('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orders = readDataFile('orders.json');
  const order = orders.find((order) => order.id === orderId);

  if (order) {
    // Handle the patch request to edit the order
    // You can access the request body using req.body
    // Implement your logic here

    writeDataFile('orders.json', orders);

    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.delete('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orders = readDataFile('orders.json');
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    const deletedOrder = orders.splice(orderIndex, 1);
    writeDataFile('orders.json', orders);

    res.json(deletedOrder);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/products', (req, res) => {
  const products = readDataFile('products.json');
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = readDataFile('products.json');
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  const products = readDataFile('products.json');

  // Generate a unique ID for the new product
  const maxId = Math.max(...products.map((product) => product.id));
  newProduct.id = maxId + 1;

  products.push(newProduct);
  writeDataFile('products.json', products);

  res.json(newProduct);
});

app.patch('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = readDataFile('products.json');
  const product = products.find((product) => product.id === productId);

  if (product) {
    // Handle the patch request to edit the product
    // You can access the request body using req.body
    // Implement your logic here

    writeDataFile('products.json', products);

    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:index', (req, res) => {
  const productIndex = parseInt(req.params.index);
  const products = readDataFile('products.json');

  if (productIndex >= 0 && productIndex < products.length) {
    const deletedProduct = products.splice(productIndex, 1);
    writeDataFile('products.json', products);

    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
