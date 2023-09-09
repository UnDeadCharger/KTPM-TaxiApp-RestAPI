/*
  Warnings:

  - Added the required column `twoFactorAuthenticationSecret` to the `KhachHang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoFactorAuthenticationSecret` to the `TaiXe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KhachHang" ADD COLUMN     "twoFactorAuthenticationSecret" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaiXe" ADD COLUMN     "twoFactorAuthenticationSecret" TEXT NOT NULL;
