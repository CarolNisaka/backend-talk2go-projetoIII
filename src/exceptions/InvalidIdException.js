class InvalidIdException extends Error {
    constructor() {
        super();
        this.message = "Id inexistente";
        this.status = 400;
    }
}

export default InvalidIdException;