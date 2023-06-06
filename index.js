const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = 'mongodb+srv://vadym4che:0i142857@cluster0.umin0i5.mongodb.net/mydatabase?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

async function connectToMongo() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('mydatabase');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

app.get('/', (req, res) => {
  res.send('Express JS on Vercel');
});

app.get('/ping', (req, res) => {
  res.send('pong 🏓');
});

app.get('/orders', async (req, res) => {
  const db = await connectToMongo();
  const orders = await db.collection('orders').find().toArray();
  res.json(orders);
});

app.get('/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const db = await connectToMongo();
  const order = await db.collection('orders').findOne({ id: orderId });

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.post('/orders', async (req, res) => {
  const newOrder = req.body;
  const db = await connectToMongo();

  // Generate a unique ID for the new order
  const maxId = await db.collection('orders').countDocuments() + 1;
  newOrder.id = maxId;

  await db.collection('orders').insertOne(newOrder);

  res.json(newOrder);
});

app.patch('/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const db = await connectToMongo();
  const order = await db.collection('orders').findOne({ id: orderId });

  if (order) {
    // Handle the patch request to edit the order
    // You can access the request body using req.body
    // Implement your logic here

    await db.collection('orders').updateOne({ id: orderId }, { $set: req.body });

    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const db = await connectToMongo();
  const result = await db.collection('orders').deleteOne({ id: orderId });

  if (result.deletedCount === 1) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/products', async (req, res) => {
  const db = await connectToMongo();
  const products = await db.collection('products').find().toArray();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const db = await connectToMongo();
  const product = await db.collection('products').findOne({ id: productId });

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', async (req, res) => {
  const newProduct = req.body;
  const db = await connectToMongo();

  // Generate a unique ID for the new product
  const maxId = await db.collection('products').countDocuments() + 1;
  newProduct.id = maxId;

  await db.collection('products').insertOne(newProduct);

  res.json(newProduct);
});

app.patch('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const db = await connectToMongo();
  const product = await db.collection('products').findOne({ id: productId });

  if (product) {
    // Handle the patch request to edit the product
    // You can access the request body using req.body
    // Implement your logic here

    await db.collection('products').updateOne({ id: productId }, { $set: req.body });

    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:index', async (req, res) => {
  const productIndex = parseInt(req.params.index);
  const db = await connectToMongo();
  const products = await db.collection('products').find().toArray();

  if (productIndex >= 0 && productIndex < products.length) {
    const deletedProduct = products.splice(productIndex, 1);
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(products);

    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
