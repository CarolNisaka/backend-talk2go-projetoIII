class InvalidLoginException extends Error {
    constructor() {
        super();
        this.message = 'Ops, e-mail ou senha incorretos';
        this.status = 400;
    }
}

export default InvalidLoginException;