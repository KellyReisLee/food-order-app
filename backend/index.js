import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises'; // Importe 'fs' de forma correta
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://food-order-app-front-six.vercel.app/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  credentials: true // Permitir envio de cookies
}));
app.use(bodyParser.json());


app.use('/files', express.static(path.resolve(__dirname, 'public')));



app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://food-order-app-front-six.vercel.app/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile(__dirname + '/data/available-meals.json', 'utf8'); // Corrija o caminho do arquivo
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Erro ao ler o arquivo de refeições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;
  console.log(orderData);

  if (orderData === null || orderData.items === null || orderData.items.lenght === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});




app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Não encontrado' });
});


const PORT = process.env.PORT || 3000; // Use a porta fornecida pelo ambiente ou 3000 como padrão
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
