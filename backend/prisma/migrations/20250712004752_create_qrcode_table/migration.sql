/*
  Warnings:

  - You are about to drop the column `content` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `qrCode` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "content",
ADD COLUMN     "qrCode" TEXT NOT NULL;
