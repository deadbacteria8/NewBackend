import express from 'express';

import documents from "./docs.mjs";
const router = express.Router();

router.post("/", async (req, res) => {
    const result = await documents.addOne(req.body);

    return res.redirect(`/${result.lastID}`);
});

router.get('/:id', async (req, res) => {
    return res.render(
        "doc",
        { doc: await documents.getOne(req.params.id) }
    );
});

router.post('/update/:id', async (req, res) => {
    const result = await documents.updateOne(req.params.id, req.body.title, req.body.content);
    return res.redirect(`/${req.params.id}`);
});

router.get('/', async (req, res) => {
    return res.render("index", { docs: await documents.getAll() });
});


export default router;