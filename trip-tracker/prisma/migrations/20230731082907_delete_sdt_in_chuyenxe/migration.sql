/*
  Warnings:

  - You are about to drop the column `soDienThoai` on the `ChuyenXe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ChuyenXe_soDienThoai_key";

-- AlterTable
ALTER TABLE "ChuyenXe" DROP COLUMN "soDienThoai";
