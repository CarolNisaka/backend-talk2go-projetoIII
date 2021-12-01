class UserExiststExcpetion extends Error {
    constructor() {
        super();
        this.message = 'Ops, já existe um cadastro utilizando esse e-mail';
        this.status = 400;
    }
}

export default UserExiststExcpetion;