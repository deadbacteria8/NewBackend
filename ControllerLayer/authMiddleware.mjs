import userAuth from "../ApplicationLayer/User/UserAuth.mjs";


export default (req, res, next) => {
    const token = req.headers['authorization'];
    const decoded = userAuth.authenticateToken(token);
    req.user = {userId : decoded.id};
    next();
};