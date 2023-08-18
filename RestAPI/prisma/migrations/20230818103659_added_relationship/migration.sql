/*
  Warnings:

  - A unique constraint covering the columns `[idXe]` on the table `TaiXe` will be added. If there are existing duplicate values, this will fail.
  - Made the column `idXe` on table `TaiXe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaiXe" ADD COLUMN     "trangThai" TEXT,
ALTER COLUMN "idXe" SET NOT NULL;

-- AlterTable
ALTER TABLE "Xe" ADD COLUMN     "taiXeIdTaiXe" TEXT;

-- CreateIndex
CREATE INDEX "KhachHang_soDienThoai_idx" ON "KhachHang"("soDienThoai");

-- CreateIndex
CREATE UNIQUE INDEX "TaiXe_idXe_key" ON "TaiXe"("idXe");

-- CreateIndex
CREATE INDEX "TaiXe_soDienThoai_idx" ON "TaiXe"("soDienThoai");

-- AddForeignKey
ALTER TABLE "ChuyenXe" ADD CONSTRAINT "ChuyenXe_idTaiXe_fkey" FOREIGN KEY ("idTaiXe") REFERENCES "TaiXe"("idTaiXe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChuyenXe" ADD CONSTRAINT "ChuyenXe_idKhachHang_fkey" FOREIGN KEY ("idKhachHang") REFERENCES "KhachHang"("idKhachHang") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaiXe" ADD CONSTRAINT "TaiXe_idXe_fkey" FOREIGN KEY ("idXe") REFERENCES "Xe"("idXe") ON DELETE RESTRICT ON UPDATE CASCADE;
