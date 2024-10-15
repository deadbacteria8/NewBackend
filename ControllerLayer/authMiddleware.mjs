import userAuth from "../ApplicationLayer/User/UserAuth.mjs";


export default (req, res, next) => {
    const token = req.headers['token'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGQwZmU2ZTk5NGJhYTZjNjBiNzJhNyIsImlhdCI6MTcyODkwOTI5MSwiZXhwIjoxNzI4OTk1NjkxfQ.J2RTKjxCm3hsKNUKt21n6s2TM6UGhMrWVdwYpH4HcGM";
    const decoded = userAuth.authenticateToken(token);
    req.user = {userId : decoded.id};
    next();
};