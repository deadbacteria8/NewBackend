import jwtToken from "./jwtToken.mjs";

const type = 'signIn';

export default {
    createNewSignInToken(user) {
        const signupPayload = {
            id: user._id,
            type: type
        };
        const expire = { expiresIn: '24h' };
        return jwtToken.create(signupPayload, expire);
    },
    verifySignInToken(token) {
        const decoded = jwtToken.verify(token);
        if(decoded.type !== type) {
            throw new Error(`Invalid token type`);
        }
        return decoded;
    }
};

