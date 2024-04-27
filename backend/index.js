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

// Configuração do CORS
app.use(cors({
  origin: 'https://food-order-app-front-six.vercel.app', // Permitindo todas as origens. Você pode restringir para um domínio específico se preferir.
  methods: ['GET', 'POST'], // Permitindo apenas os métodos GET e POST
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitindo os cabeçalhos Content-Type e Authorization
  exposedHeaders: ['Content-Disposition'], // Expondo cabeçalhos específicos
  credentials: true // Permitindo envio de cookies
}));

app.use(express.json());

// Conexão com o banco de dados
connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('Database connected!!!');
  })
  .catch((error) => {
    console.log(error);
  });

// Servindo arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, 'public')));

// Obtendo dados das refeições
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile(__dirname + '/data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Erro ao ler o arquivo de refeições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Enviando dados dos pedidos
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  console.log(orderData);

  if (!orderData) {
    return res.status(500).json({ error: 'No data sent' });
  }

  const newOrder = await orderModel1.create(orderData);

  if (!newOrder) {
    return res.status(500).json({ error: 'Could not create new data.' });
  }

  res.status(201).json({ message: 'Created successfully!', newOrder });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
