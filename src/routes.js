import { Router } from 'express';

import authController from './controllers/authController';
import atendimentoController from './controllers/atendimentoController';
import clienteController from './controllers/clienteController';
import oportunidadeController from './controllers/oportunidadeController';
import viagemController from './controllers/viagemController';

const router = Router();

router.use('auth', authController);
router.use('atendimento', atendimentoController);
router.use('cliente', clienteController);
router.use('viagem', viagemController);
router.use('oportunidade', oportunidadeController);

export default router;