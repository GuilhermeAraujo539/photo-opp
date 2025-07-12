const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');

const prisma = new PrismaClient();

class PictureRepository {
  static async savePicture({ picture }) {
    try {
      const saved = await prisma.picture.create({
        data: { image: picture },
      });
      return saved.id;
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      throw error;
    }
  }

  static async createQrCode({ id }) {
    const url = `https://localhost:3000/download/${id}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);

      await prisma.picture.update({
        where: { id },
        data: { qrCode: qrCodeDataUrl },
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      throw error;
    }
  }
}

module.exports = PictureRepository;
