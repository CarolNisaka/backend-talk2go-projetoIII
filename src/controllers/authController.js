import { response, Router } from 'express';

import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import Usuario from '../models/Usuario';
import InvalidBodyRequestExcpetion from '../exceptions/InvalidBodyRequest';
import UserExiststExcpetion from '../exceptions/UserExistsExceptions';
import InvalidLoginException from '../exceptions/InvalidLoginExceptions';
import { generateLoginToken } from '../utils/jwt';

const router = Router();

//1) Rota que registra um novo usuario
router.post('/register', async (request, response, next) => {
    try {
        const schema = yup.object().shape({
            nome: yup.string().required('Campo obrigatório').min(6, 'Minímo 6 letras').max(100, 'Máximo 100 letras'),
            email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Precisa ser e-mail empresa"),
            senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
            cpf:yup.string().required('Campo obrigatório').min(14, 'CPF no formato 111.222.333-44'),
        });

        try {
            //o validate é uma promisse, por isso o async (na linha da rota) e o await. Coloca no try catch para pegar os errors detalhados
            await schema.validate(request.body, { abortEarly: false}); //valida o schema e se tiver problema apresenta err e o abortEarly false avisa de uma vez tudo que tem err
        } catch (error) {
            const errors = error.inner.map((err) => ({
                field: err.path,
                error: err.errors[0],
            }));
            //depois do try catch que capta o erro, faz o throw
            throw new InvalidBodyRequestExcpetion(errors);
        }
       
        //depois do try catch que valida se os dados foram preenchidos corretamente, vou verificar se o email ja existe na base
        const foundUser = await Usuario.findOne({ email: request.body.email});
        if (foundUser) {
            throw new UserExiststExcpetion();
        }

        //encriptar senha sendo o hashSync para aumentar a segurança da encpriptaçao
        const encryptedSenha = bcrypt.hashSync(request.body.senha, bcrypt.genSaltSync(10));
        
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
        const foundUser = await Usuario.findOne({ email: request.body.email});
        console.log(foundUser)
        if (!foundUser) {
            throw new InvalidLoginException();
        }

        const schema = yup.object().shape({
            email:yup.string().required('Campo obrigatório').email('Formato inválido').matches(/@agaxtur/, "Precisa ser e-mail empresa"),
            senha:yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(150, 'Máximo 10 caracteres'),
            });
        try {
            //o validate é uma promisse, por isso o async (na linha da rota) e o await. Coloca no try catch para pegar os errors detalhados
            await schema.validate(request.body, { abortEarly: false}); //valida os dados passados e se tiver problema apresenta err e o abortEarly false avisa de uma vez tudo que tem err
        } catch (error) {
            //depois do try catch que capta o erro fiz o throw mas ta errado pq sem ele tudo passa e com ele nada passa;
           throw new InvalidLoginException();
        }

        const userLogin = {
            email: request.body.email,
            senha: request.body.senha,
        };

        //TA DANDO PAU AQUI!!!!
        const token = generateLoginToken({
            id: foundUser._id,
            role: foundUser.role,
        });

        console.log(token);
        
        // const loginOK = {
        //     // email: request.body.email,
        //     // senha: request.body.senha,
        //     token: token,
        //     role: foundUser.role,

        // }
    response.status(200).json(token);

    } catch (error) {
        next(error);
    }
});
export default router;