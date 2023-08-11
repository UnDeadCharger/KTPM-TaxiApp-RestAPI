/*
  Warnings:

  - Made the column `hoTen` on table `TaiXe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaiXe" ALTER COLUMN "hoTen" SET NOT NULL;

-- AlterTable
ALTER TABLE "Xe" ALTER COLUMN "hieuXe" DROP NOT NULL,
ALTER COLUMN "loaiXe" DROP NOT NULL;
