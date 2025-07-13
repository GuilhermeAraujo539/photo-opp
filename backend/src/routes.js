const express = require('express');
const validateBody = require('./middleware/pictureMiddleware');
const PictureController = require('./controllers/pictureController');
const router = express.Router();
const { z } = require('zod')

const schema = z.object({
  picture: z.string()
    .min(1, { message: "Imagem não pode ser vazia" })
    .refine(val => val.trim() !== "", { message: "Imagem não pode ser vazia" }),
});

router.post('/postImage', validateBody(schema), PictureController.upload);
router.get('/download/:id', PictureController.download);
router.get('/pictures', PictureController.list); // nova rota para listar fotos

module.exports = router;