import userAuth from "../ApplicationLayer/User/UserAuth.mjs";


export default (req, res, next) => {
    const token = req.headers['token'];
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGQwZmU2ZTk5NGJhYTZjNjBiNzJhNyIsImlhdCI6MTcyOTAwMjc5MywiZXhwIjoxNzI5MDg5MTkzfQ.YQzHwC1DUcYKQuy4GyAdV6t9C_CsnHkze4jMpRwdC9Y";
    const decoded = userAuth.authenticateToken(token);
    req.user = {userId : decoded.id};
    next();
};