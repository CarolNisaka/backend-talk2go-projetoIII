import express, { response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//17) Middlewares
app.use((request, response, next) => {
    console.log(`Recebendo o "${request.method}" da rota "${request.path}"`);
    next(); //joga pro console o request o tipo de request que esta recebendo e ao inves de response da o next pra deixar seguir.
});
    

app.get('/', (request, response) => response.json({ message: 'Teste 1'}));

//18) criar os middlewares de erros e de rota nao encontradas

app.listen(process.env.PORT, () => console.log(`App conectado na porta ${process.env.PORT}`));