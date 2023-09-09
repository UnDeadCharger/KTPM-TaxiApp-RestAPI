/*
  Warnings:

  - Added the required column `refreshToken` to the `KhachHang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `TaiXe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KhachHang" ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaiXe" ADD COLUMN     "refreshToken" TEXT NOT NULL;
