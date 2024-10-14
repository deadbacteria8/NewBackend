import userAuth from "../ApplicationLayer/User/UserAuth.mjs";


export default (req, res, next) => {
    const token = req.headers['token'];
    //const token = hard koda token här om du vill(måste såklart komma från en signin request though)
    const decoded = userAuth.authenticateToken(token);
    req.user = {userId : decoded.id};
    next();
};