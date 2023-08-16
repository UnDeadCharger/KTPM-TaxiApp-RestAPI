/*
  Warnings:

  - You are about to drop the column `ToaDoGPS` on the `TaiXe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaiXe" DROP COLUMN "ToaDoGPS",
ADD COLUMN     "toaDoGPS" TEXT;
