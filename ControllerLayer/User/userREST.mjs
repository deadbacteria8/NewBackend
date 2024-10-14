import express from 'express';
import userAuth from "../../ApplicationLayer/User/UserAuth.mjs";
import { httpOk, brewingCoffee, httpBadRequest, httpCreated } from "../httpCodes.mjs";
const router = express.Router();

router.post("/signup", async (req, res) => {
    await userAuth.signUp(req.body.email, req.body.password);
    res.status(httpCreated).json({ message: 'User Created' });
});

router.post("/signin", async (req, res) => {
    const token = await userAuth.signIn(req.body.email, req.body.password);
    res.status(httpOk).json({ token: token });
});



export default router;