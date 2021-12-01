import { response, Router } from 'express';

const router = Router();

//1) Rota que registra um novo usuario
router.post('register', (request, response, next) => {
    try {
        console.log(request.body)

        response.status(201).json(request.body);
    } catch (error) {
        next(error);
    }
});

//2) Rota de login
router.post('login', (request, response, next) => {
    try {
        console.log(request.body)

        response.status(200).json(request.body);
    } catch (error) {
        next(error);
    }
});
export default router;