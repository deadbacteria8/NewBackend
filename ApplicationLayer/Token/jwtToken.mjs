
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;

export default {
    create: (payload, expire) => {
        return jwt.sign(payload, secretKey, expire);
    },
    verify: (token) => {
        return jwt.verify(token, secretKey);
    }
}

