
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;

export default {
    create: (payload) => {
        return jwt.sign(payload, secretKey, { expiresIn: '24h' });
    },
    verify: (token) => {
        return jwt.verify(token, secretKey);
    }
}

