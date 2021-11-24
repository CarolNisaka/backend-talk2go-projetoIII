import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();



app.get('/', (request, response) => response.json({ message: 'Teste 1'}));

app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));