const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables
const PORT = process.env.PORT || 8080// Default to empty if not set
const HOST = process.env.HOST || 'localhost';


const { getStoredItems, storeItems } = require('./data/items');

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/items', async (req, res) => {
  const storedItems = await getStoredItems();
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  res.json({ items: storedItems });
});

app.get('/items/:id', async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post('/items', async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: 'Stored new item.', item: newItem });
});

// app.get(`${HOST}:${PORT}`); 


app.listen(PORT,HOST, () => {
  console.log(`Server running on port 8080
    http://${HOST}:${PORT}`);
});































































// const express = require('express');
// const bodyParser = require('body-parser');
// require('dotenv').config(); // Load environment variables
// const BASE_URL = process.env.BASE_URL || 8080// Default to empty if not set

// const { getStoredItems, storeItems } = require('./data/items');

// const app = express();

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Apply the BASE_URL as a prefix for all routes
// const apiRouter = express.Router();

// apiRouter.get('/items', async (req, res) => {
//   const storedItems = await getStoredItems();
//   await new Promise((resolve) => setTimeout(() => resolve(), 2000));
//   res.json({ items: storedItems });
// });

// apiRouter.get('/items/:id', async (req, res) => {
//   const storedItems = await getStoredItems();
//   const item = storedItems.find((item) => item.id === req.params.id);
//   res.json({ item });
// });

// apiRouter.post('/items', async (req, res) => {
//   const existingItems = await getStoredItems();
//   const itemData = req.body;
//   const newItem = {
//     ...itemData,
//     id: Math.random().toString(),
//   };
//   const updatedItems = [newItem, ...existingItems];
//   await storeItems(updatedItems);
//   res.status(201).json({ message: 'Stored new item.', item: newItem });
// });

// app.use(`${BASE_URL}/api/items`, apiRouter); // Prefix all routes with BASE_URL


// app.listen(8080, () => {
//   console.log(`Server running on port 8080`);
// });
