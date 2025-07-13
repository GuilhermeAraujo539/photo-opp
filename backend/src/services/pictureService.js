const PictureRepository = require("../repositorys/pictureRepository");

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

  static async getPictureById(id) {
    return PictureRepository.getPictureById(id);
  }

  static async listPictures({ startDate, endDate }) {
    return PictureRepository.listPictures({ startDate, endDate });
  }
}

module.exports = PictureService;