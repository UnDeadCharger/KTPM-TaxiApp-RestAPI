-- CreateTable
CREATE TABLE "ChuyenXe" (
    "idChuyenXe" TEXT NOT NULL,
    "hoTen" TEXT,
    "soDienThoai" TEXT NOT NULL,
    "diaChi" TEXT,
    "toaDoGPS" TEXT,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "isVIP" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChuyenXe_pkey" PRIMARY KEY ("idChuyenXe")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChuyenXe_soDienThoai_key" ON "ChuyenXe"("soDienThoai");
