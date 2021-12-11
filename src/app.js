import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import iniciaMongoConection from './database/mongodbConfig';

import appRoutes from './routes';

import mapearRequest from './middlewares/mapearRequest';
import errorHandlingMiddleware from './middlewares/errorHandling';
import pagNaoEncontrada from './middlewares/pagNaoEncontrada';

dotenv.config();
const app = express();

iniciaMongoConection();

//21) colocar o json no body para as rotas com post
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_END_URI,
})); //importei o cors e liberei acesso pro localhost - mudar no deploy - fiz no .env

//17) Middlewares - levei eles pra pasta correta
app.use(mapearRequest);

//20) Middleware de configuracao de rotas
app.use('/api', appRoutes);


//18) Middlewares de erros -  Todas as rotas devem estar em cima desse midleware pra poder cair aqui.
app.use(errorHandlingMiddleware);

//19) Middleware de rota nao encontrada
app.use(pagNaoEncontrada);

app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));