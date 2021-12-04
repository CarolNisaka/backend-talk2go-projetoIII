import NotAuthorizedExceptions from "../exceptions/NotAuthorizedExceptions";
import { verifyLoginToken } from "../utils/jwt";


const protectedRouteMiddleware = (request, response, next) => {
    try {
        const bearerToken = request.get('Authorization');

        //teste se existe token
        if (!bearerToken) { 
            throw new NotAuthorizedExceptions('Missing Token');
        }

        //teste de verificação do token se é valida ou se esta expirada. Coloca no try catch pra tratar o erro e nao dar 500 de cara
        try {
            const token = bearerToken.slice(7); //o bearertoken vem como Bearer espaço xxxx, entao precisa tirar o bearer e o espaço
            const tokenInfo = verifyLoginToken(token);

            console.log("info no toke", tokenInfo);

            //colocar no request as infos do usuario do dono do token pra validar id e role pra ele so acessar o que é dele
            //ATT CAROL: ver como fazer pq cliente e atendimento é publico - excluir isso no futuro e fazer em outro local

            request.user = {
                id: tokenInfo.id,
                role: tokenInfo.role,
            };

            next();
        } catch (error) {
            throw new NotAuthorizedExceptions('Invalid or exprired Token')
        }
        
     
        
    } catch (error) {
        next(error);
    }
}

export default protectedRouteMiddleware;
        