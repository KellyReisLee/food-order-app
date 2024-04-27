import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import orderModel1 from './modules/orderModule.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true // Permitir envio de cookies
}));
app.use(express.json());


// Connection database.
connect(process.env.MONGO_KEY).then(() => {
  console.log('Database connected!!!');
}).catch((error) => {
  console.log(error);
})


app.use('/files', express.static(path.resolve(__dirname, 'public')));


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Getting Meals Data:
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile(__dirname + '/data/available-meals.json', 'utf8'); // Corrija o caminho do arquivo
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Erro ao ler o arquivo de refeições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// Sending Orders Data:
app.post('/orders', async (req, res) => {
  const orderData = req.body.order

  console.log(orderData);

  if (!orderData) {
    return res.status(500).json({ error: 'No data sent' })
  }

  const newOrder = await orderModel1.create(orderData)

  if (!newOrder) {
    return res.status(500).json({ error: 'Could not create new data.' })
  }
  res.status(201).json({ message: 'Created successfully!', newOrder })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
