import { request, Router } from 'express';

import authController from './controllers/authController';
import atendimentoController from './controllers/atendimentoController';
import clienteController from './controllers/clienteController';
import oportunidadeController from './controllers/oportunidadeController';
import viagemController from './controllers/viagemController';


import protectedRouteMiddleware from './middlewares/protectedRoute';

const router = Router();

router.use('/auth', authController); //rota publica

// Antes das rotas privadas, criar um midleware de proteçao para a rota privada - pega o token, valida e deixa passar ou nao.
//ta comentada pq ta dando pau 
router.use(protectedRouteMiddleware);

//tirar depois a rora teste despois que eu resolver o erro no authcontroler linha 91
router.get('/test', (request, response) => {
    console.log('acessando a tora protegida', request.user)
    response.json({message: ' teste de acess rota protegida'})
});

router.use('/atendimentos', atendimentoController); //rota privada
router.use('/clientes', clienteController);//rota privada
router.use('/viagens', viagemController);//rota privada
router.use('/oportunidades', oportunidadeController);//rota privada

export default router;