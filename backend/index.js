import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises'; // Importe 'fs' de forma correta

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  credentials: true,
  origin: "https://food-order-app-front-eww0sjzym-kellyreislees-projects.vercel.app",
  methods: ["POST", "GET"]
}));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

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

  if (!orderData || !orderData.items || orderData.items.length === 0 || !orderData.customer) {
    return res.status(400).json({ message: 'Dados inválidos.' });
  }

  const { email, name, street, 'postal-code': postalCode, city } = orderData.customer;
  if (!email || !email.includes('@') || !name || !name.trim() || !street || !street.trim() || !postalCode || !postalCode.trim() || !city || !city.trim()) {
    return res.status(400).json({ message: 'Dados ausentes: Email, nome, rua, código postal ou cidade está faltando.' });
  }

  try {
    const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
    const orders = await fs.readFile(__dirname + '/data/orders.json', 'utf8'); // Corrija o caminho do arquivo
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile(__dirname + '/data/orders.json', JSON.stringify(allOrders)); // Corrija o caminho do arquivo
    res.status(201).json({ message: 'Pedido criado!' });
  } catch (error) {
    console.error('Erro ao escrever no arquivo de pedidos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
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
