import express from 'express';

import { httpOk, brewingCoffee, httpBadRequest, httpCreated } from "../httpCodes.mjs";
import document from "../../ApplicationLayer/Document/document.mjs";
const router = express.Router();

router.post("/invite", async (req, res) => {
    await document.acceptInvite(req.headers['invite-token']);
    res.status(httpCreated).json({ message: 'Invite accepted' });
});




export default router;