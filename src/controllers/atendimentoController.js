import { Router } from 'express';
import * as yup from 'yup';
import Cliente from '../models/Cliente';
import ClientExiststExcpetion from '../exceptions/ClientExistsException';
import Atendimento from '../models/Atendimento';
import validateId from '../validation/mongooseIdValidation';
import Usuario from '../models/Usuario';
import ClientNotFoundExcpetion from '../exceptions/ClientNotFound';

const router = Router();

//get de atendimento de cliente por ID
router.get('/:atendimentoId', async (request, response, next) => {
    try {
        const { atendimentoId } = request.params;

        validateId(atendimentoId);

        const atendimento = await Atendimento.findOne({_id: atendimentoId});

        response.json(atendimento);
    }catch (error) {
        next
    }
});

//post de atendimento 
router.post('/', async (request, response, next) => {
    try {
        const schema = yup.object().shape({
            tipo: yup.string().required(),
            tipoFisico: yup.string(), 
            tipoDigital: yup.string(),
            apelido: yup.string(), //apelido é propriedade de um cliente que eu preciso buscar no banco se exisye
            campanha: yup.string(),
            pedido: yup.string().required(),
            status: yup.string(),
        });

        const usuario = request.user.id;

        const newAtendimento = {
            usuario: usuario,
            cliente: request.body.clienteId, 
            tipo: request.body.tipo,
            tipoFisico: request.body.tipoFisico,
            tipoDigital: request.body.tipoDigital,
            campanha: request.body.campanha,
            pedido: request.body.pedido,
            status: request.body.status,
        };

        //fiz esse throw mas o que quero mesmo é sugerir ao usuario clientes possiveis ja cadastrados na base
        const foundCliente = await Cliente.findOne({ _id: request.body.clienteId })
        if (!foundCliente) {
            throw new ClientNotFoundExcpetion();
        }

        const saveAtendimento = await Atendimento.create(newAtendimento);
       
        const atendimentoResponse = {
            id: saveAtendimento._id,
            cliente: saveAtendimento.cliente, 
            tipo: saveAtendimento.tipo,
            tipoFisico: saveAtendimento.tipoFisico,
            tipoDigital: saveAtendimento.tipoDigital,
            campanha: saveAtendimento.campanha,
            pedido: saveAtendimento.pedido,
            status: saveAtendimento.status,

        }
         await Cliente.findOneAndUpdate({_id: atendimentoResponse.cliente}, {$push:{atendimentos:atendimentoResponse.id}});
         await Usuario.findOneAndUpdate({_id: usuario}, {$push: {atendimentos: atendimentoResponse.id}});

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