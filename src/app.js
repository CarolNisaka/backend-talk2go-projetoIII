import express, { response } from 'express';
import dotenv from 'dotenv';

import mapearRequest from './middlewares/mapearRequest';
import erro from './middlewares/erro';
import pagNaoEncontrada from './middlewares/pagNaoEncontrada';


dotenv.config();
const app = express();

//17) Middlewares - levei eles pra pasta correta
app.use(mapearRequest);
    

app.get('/', (request, response, next) => {
    try {
       
        response.json({ message: 'Teste 1'})
    } catch (error) {
      next(error);
    }
});

//18) Middlewares de erros -  Todas as rotas devem estar em cima desse midleware pra poder cair aqui.
app.use(erro);

//19) Middleware de rota nao encontrada
app.use(pagNaoEncontrada);

app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));