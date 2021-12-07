import { Router } from 'express';
import * as yup from 'yup';
import Cliente from '../models/Cliente';
import ClientExiststExcpetion from '../exceptions/ClientExistsException';
import Atendimento from '../models/Atendimento';

const router = Router();

//get de atendimento de cliente por ID
router.get('/:clienteId', async (request, response, next) => {
    try {

    }catch (error) {
        next
    }
});

//post de atendimento 
router.post('/', async (request, response, next) => {
    try {
        const schema = yup.object().shape({
            tipo: yup.string().required(),
            tipoFisico: yup.string(), //se eu colocar required vai ferrar pq o atendimento é fisico OU digital
            tipoDigital: yup.string(),
            apelido: yup.string(), //apelido é propriedade de um cliente que eu preciso buscar no banco se exisye
            campanha: yup.string(),
            pedido: yup.string().required(),
            status: yup.string(),
        });

        const usuario = request.user.id;

        const newAtendimento = {
            usuarios: [usuario],
            apelido: request.body.apelido, //apelido é uma propriedade de cliente  - to passando errado
            tipo: request.body.tipo, // tipo é fisico OU digital
            tipoFisico: request.body.tipoFisico,
            tipoDigital: request.body.tipoDigital,
            campanha: request.body.campanha,
            pedido: request.body.pedido,
            status: request.body.status,
        };

        //fiz esse throw mas o que quero mesmo é sugerir ao usuario clientes possiveis ja cadastrados na base
        const foundCliente = await Cliente.findOne({ apelido: request.body.apelido})
        if (foundCliente) {
            throw new ClientExiststExcpetion();
        }

        const saveAtendimento = await Atendimento.create(newAtendimento);

        const atendimentoResponse = {
            id: saveAtendimento._id,
            apelido: saveAtendimento.apelido, // é de cliente - preciso vincular sabe Deus como?
            tipo: saveAtendimento.tipo,
            tipoFisico: saveAtendimento.tipoFisico,
            tipoDigital: saveAtendimento.tipoDigital,
            campanha: saveAtendimento.campanha,
            pedido: saveAtendimento.pedido,
            status: saveAtendimento.status,

        }
        response.status(201).json(atendimentoResponse);
    }catch (error) {
        next(error);
    }
});

//edicao de atendimento
router.put('/:atendimentoId', async (request, response, next) => {
    try {

    }catch (error) {
        next
    }
});


export default router;