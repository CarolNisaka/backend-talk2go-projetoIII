import jwt from 'jsonwebtoken';

export const generateLoginToken = (payload) => {
    return jwt.sign(
        payload, 
        process.env.LOGIN_TOKEN_SECRET,
        { expiresIn: process.env.LOGIN_TOKEN_EXPIRATION });
};

export const verifyLoginToken = (token) => {
    return jwt.verify(
        token, 
        process.env.LOGIN_TOKEN_SECRET
    )
};
    


