import jwt from 'jsonwebtoken';

const generateLoginToken = (payload) => {
    return jwt.sign(
        payload, 
        process.env.LOGIN_TOKEN_SECRET,
        { expiresIn: process.env.LOGIN_TOKEN_EXPIRATION });
};

export default generateLoginToken