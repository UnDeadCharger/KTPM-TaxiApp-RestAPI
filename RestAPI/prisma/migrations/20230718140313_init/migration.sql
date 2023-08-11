-- CreateTable
CREATE TABLE "KhachHang" (
    "idKhachHang" TEXT NOT NULL,
    "hoTen" TEXT,
    "soDienThoai" TEXT NOT NULL,
    "diaChi" TEXT,
    "toaDoGPS" TEXT,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "isVIP" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "KhachHang_pkey" PRIMARY KEY ("idKhachHang")
);

-- CreateIndex
CREATE UNIQUE INDEX "KhachHang_soDienThoai_key" ON "KhachHang"("soDienThoai");
