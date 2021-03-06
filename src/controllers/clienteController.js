import { response, Router } from 'express';
import * as yup from 'yup';
import Cliente from '../models/Cliente';
import Atendimento from '../models/Atendimento';
// import Pdv from '../models/Pdv';
import ClientExiststExcpetion from '../exceptions/ClientExistsException';
import ClientNotFoundExcpetion from '../exceptions/ClientNotFound';


import validateId from '../validation/mongooseIdValidation';

const router = Router();

//rota para listar todos os clientes - nao travar por usuario e sim por pdv 
//deixei o {id pdv comentado so pra lembrar depois que preciso fazer isso} cliente eh visao do pdv
router.get('/', async (request, response, next) => {
    try {
        const { apelido = '' } = request.query;
        // const { id } = request.pdv;

        const apelidoRegex = new RegExp(apelido, 'i');

        
        const clientes = await Cliente.find({ apelido: { $regex: apelidoRegex} });

        
        response.json(clientes);
    } catch (error) {
        next(error);
    }
});

//procurar um cliente especifico
router.get('/:clienteId', async (request, response, next) => {
    try {
        const { clienteId } = request.params;
        //nao fazer pq nao to usando usuario, certo? ou esse request.user é propridade - nao lembrooooooo mais.
        // const { id } = request.user; 

        validateId(clienteId);

        const cliente = await Cliente.findOne({ _id: clienteId }).populate('atendimentos');

        response.json(cliente);

    } catch (error) {
        next(error);
    }
});

router.post('/', async (request, response, next) => {
    try {
        const schema = yup.object().shape({
            apelido: yup.string().required('Campo obrigatório').max(50, 'Máximo 50 caracteres'),
            nome: yup.string().max(100, 'Máximo 100 caracteres'),
            telefonePrincipal: yup.string(),
            telefoneSecundario: yup.string(),
            email: yup.string().email(),
            endereco: yup.string(),
            rg: yup.string(),
            cpf: yup.string(),
            nascimento: yup.date(),
            passaporte: yup.string(),
            validadePassaporte: yup.date(),
            vacina: yup.string(),
            foto: yup.string(),
        });
    
    const foundCliente = await Cliente.findOne({ apelido: request.body.apelido})
    if (foundCliente) {
        throw new ClientExiststExcpetion();
    }
    
    const usuario = request.user.id;

        
    const newCliente = {
        usuarios: [usuario],
        apelido: request.body.apelido,
        nome: request.body.nome,
        telefonePrincipal: request.body.telefonePrincipal,
        telefoneSecundario: request.body.telefoneSecundario,
        email: request.body.email,
        endereco: request.body.endereco,
        rg: request.body.rg,
        cpf: request.body.cpf,
        nascimento: request.body.nascimento,
        passaporte: request.body.passaporte,
        validadePassaporte: request.body.validadePassaporte,
        vacina: request.body.vacina,
        foto: request.body.foto,
    };

    const saveCliente = await Cliente.create(newCliente);
    
    const clienteResponse = {
        id: saveCliente._id,
        apelido: saveCliente.apelido,
        nome: saveCliente.nome,
        telefonePrincipal: saveCliente.telefonePrincipal,
        telefoneSecundario: saveCliente.telefoneSecundario,
        email: saveCliente.email,
        endereco: saveCliente.endereco,
        rg: saveCliente.rg,
        cpf: saveCliente.cpf,
        nascimento: saveCliente.nascimento,
        passaporte: saveCliente.passaporte,
        validadePassaporte: saveCliente.validadePassaporte,
        vacina: saveCliente.vacina,
        foto: saveCliente.foto,

    }
    response.status(201).json(clienteResponse);

} catch (error) {
    next(error);
}   
});

router.put('/:clienteId', async (request, response, next) => {
    try {

        const { body } = request;
        const { clienteId } = request.params;
        const { id } = request.user;

        
        const schema = yup.object().shape({
            apelido: yup.string().required('Campo obrigatório').max(50, 'Máximo 50 caracteres'),
            apelido: yup.string().max(100, 'Máximo 100 caracteres'),
            telefonePrincipal: yup.string(),
            telefoneSecundario: yup.string(),
            email: yup.string().email(),
            endereco: yup.string(),
            rg: yup.string(),
            cpf: yup.string(),
            nascimento: yup.date(),
            passaporte: yup.string(),
            validadePassaporte: yup.date(),
            vacina: yup.string(),
            foto: yup.string(),
        });

        //NAO TA PEGANDO O USUARIO QUE MODIFICOU
        // const usuario = request.user.id;

        validateId(clienteId);

        const cliente = await Cliente.findOne({ _id: clienteId, usuario: id });

        if(!cliente) {
            throw new ClientNotFoundExcpetion()
        }
         
        

    const editedCliente = await Cliente.findByIdAndUpdate(clienteId, body, { new: true});

    
    response.status(201).json(editedCliente);
    
    } catch (error) {
        next(error);
    }
});

export default router;