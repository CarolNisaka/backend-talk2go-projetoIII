import { Router } from 'express';

import * as yup from 'yup';
import { generateHash } from '../utils/bcrypt';

import Usuario from '../models/Usuario';
import validateSchema from '../validation/schemaValidation';
import UserExiststExcpetion from '../exceptions/UserExistsExceptions';
import InvalidLoginException from '../exceptions/InvalidLoginExceptions';
import { generateLoginToken } from '../utils/jwt';
import { compareHash } from '../utils/bcrypt';

const router = Router();

//1) Rota que registra um novo usuario
router.post('/register', async (request, response, next) => {
    try {
        const schema = yup.object().shape({
            nome: yup.string().required('Campo obrigatório').min(6, 'Minímo 6 letras').max(100, 'Máximo 100 letras'),
            email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Precisa ser e-mail empresa"),
            senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
            cpf:yup.string().required('Campo obrigatório').min(14, 'CPF no formato 111.222.333-44'),
        }); //no model eu falei que o cpf era unico - como faz aqui?

        await validateSchema(schema, request.body);
       
        //depois do try catch que valida se os dados foram preenchidos corretamente, vou verificar se o email ja existe na base
        const foundUser = await Usuario.findOne({ email: request.body.email});

        if (foundUser) {
            throw new UserExiststExcpetion();
        }

        //encriptar senha sendo o hashSync para aumentar a segurança da encpriptaçao
        // const encryptedSenha = bcrypt.hashSync(request.body.senha, bcrypt.genSaltSync(10));
        const encryptedSenha = generateHash(request.body.senha, 10);

        const newUsuario = {...request.body, senha: encryptedSenha };
        
        const saveUsuario = await Usuario.create(newUsuario);

        const userResponse = {
            id: saveUsuario._id,
            nome: saveUsuario.nome,
            email: saveUsuario.email,
            cpf: saveUsuario.cpf,
        };

        

    response.status(201).json(userResponse);
    } catch (error) {
        next(error);
    }
});

//2) Rota de login
router.post('/login', async (request, response, next) => {
    try {
        
        const schema = yup.object().shape({
            email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Precisa ser e-mail empresa"),
            senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
        });

        await validateSchema(schema, request.body);

         //NAO TA MAIS CAINDO NA EXPECTION NO FRONT - NO INSOMINIA FUNCIONA  
        const foundUser = await Usuario.findOne({ email: request.body.email});
        console.log(foundUser)
        if (!foundUser) {
            throw new InvalidLoginException();
        }

        const isPasswordMatch = compareHash(request.body.senha, foundUser.senha);
        console.log(foundUser)
        if(!isPasswordMatch) {
           throw new InvalidLoginException();
       }

        const token = generateLoginToken({
            id: foundUser._id,
            role: foundUser.role,
        });

        console.log(token);
        
        const loginOK = {
            
            token: token,
            role: foundUser.role,

        };

    response.status(200).json(loginOK);

    } catch (error) {
        next(error);
    }
});
export default router;