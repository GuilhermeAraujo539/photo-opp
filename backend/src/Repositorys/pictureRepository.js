const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');

const prisma = new PrismaClient();

const baseUrl = process.env.BASE_URL || 'http://localhost:4000';

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
    const url = `${baseUrl}/download/${id}`;
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

  static async getPictureById(id) {
    try {
      return await prisma.picture.findUnique({ where: { id } });
    } catch (error) {
      console.error('Erro ao buscar imagem por id:', error);
      throw error;
    }
  }

  static async listPictures({ startDate, endDate }) {
    try {
      const where = {};

      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
      }

      return await prisma.picture.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      throw error;
    }
  }
}

module.exports = PictureRepository;