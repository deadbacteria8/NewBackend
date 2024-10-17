import jwtToken from "./jwtToken.mjs";

const type = 'DocumentInviteToken';

export default {
    createDocumentInviteToken(user, document) {
        const signupPayload = {
            user: user._id,
            document: document._id,
            type: type
        };
        //168 hours is one week
        const expire = { expiresIn: '168h' };
        return jwtToken.create(signupPayload, expire);
    },
    verifyDocumentInviteToken(token) {
        const decoded = jwtToken.verify(token);
        if(decoded.type !== type) {
            throw new Error(`Invalid token type`);
        }
        return decoded;
    }
};