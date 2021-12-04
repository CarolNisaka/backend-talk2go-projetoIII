class InvalidIdException extends Error {
    constructor() {
        super();
        this.message = "Invalid Id Informed";
        this.status = 400;
    }
}

export default InvalidIdException;