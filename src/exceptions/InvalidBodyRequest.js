//1) Criação de uma CLASSE para erros
class InvalidBodyRequestExcpetion extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 400;
    }
}

export default InvalidBodyRequestExcpetion;