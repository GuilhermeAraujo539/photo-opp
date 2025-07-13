const PictureService = require('../services/pictureService');

class PictureController {
  static async upload(req, res) {
    try {
      const { picture } = req.body;
      const saved = await PictureService.createPicture({ picture });
      return res.json({
        id: saved.id,
        message: 'Upload realizado com sucesso!',
        qrCode: saved.qrCode,
      });
    } catch (error) {
      console.error('Erro no upload:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  static async download(req, res) {
    try {
      const id = parseInt(req.params.id);
      const picture = await PictureService.getPictureById(id);
      if (!picture) return res.status(404).send('Imagem não encontrada');

      const matches = picture.image.match(/^data:(.+);base64,(.+)$/);
      if (!matches) return res.status(400).send('Formato da imagem inválido');

      const mimeType = matches[1];
      const base64Data = matches[2];
      const imgBuffer = Buffer.from(base64Data, 'base64');

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="image-${id}.png"`);

      res.send(imgBuffer);
    } catch (error) {
      console.error('Erro no download:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  static async list(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const pictures = await PictureService.listPictures({ startDate, endDate });
      return res.json(pictures);
    } catch (error) {
      console.error('Erro ao listar fotos:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

module.exports = PictureController;