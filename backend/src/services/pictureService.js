const PictureRepository = require("../Repositorys/pictureRepository")

class PictureService {
  static async createPicture({ picture }) {
    if (!picture || picture.trim() === "") {
      throw new Error('Imagem não recebida');
    }

    const pictureId = await PictureRepository.savePicture({ picture });
    const qrCodeBase64 = await PictureRepository.createQrCode({ id: pictureId });

    return {
      id: pictureId,
      qrCode: qrCodeBase64,
    };
  }
}

module.exports = PictureService