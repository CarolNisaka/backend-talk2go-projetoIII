import express, { response } from 'express';
import dotenv from 'dotenv';

import iniciaMongoConection from './database/mongodbConfig';

import appRoutes from './routes';

import mapearRequest from './middlewares/mapearRequest';
import erro from './middlewares/erro';
import pagNaoEncontrada from './middlewares/pagNaoEncontrada';

import Usuario from "./modelos/Usuario"

dotenv.config();
const app = express();
iniciaMongoConection();

//17) Middlewares - levei eles pra pasta correta
app.use(mapearRequest);

//20) Middleware de configuracao de rotas
app.use('/api', appRoutes);


//18) Middlewares de erros -  Todas as rotas devem estar em cima desse midleware pra poder cair aqui.
app.use(erro);

//19) Middleware de rota nao encontrada
app.use(pagNaoEncontrada);

app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));