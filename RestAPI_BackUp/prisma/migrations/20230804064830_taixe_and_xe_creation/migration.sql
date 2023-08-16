-- CreateTable
CREATE TABLE "TaiXe" (
    "idTaiXe" TEXT NOT NULL,
    "hoTen" TEXT,
    "soDienThoai" TEXT NOT NULL,
    "idXe" TEXT,
    "ToaDoGPS" TEXT,

    CONSTRAINT "TaiXe_pkey" PRIMARY KEY ("idTaiXe")
);

-- CreateTable
CREATE TABLE "Xe" (
    "id" TEXT NOT NULL,
    "bienSoXe" TEXT NOT NULL,
    "hieuXe" TEXT NOT NULL,
    "loaiXe" TEXT NOT NULL,

    CONSTRAINT "Xe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaiXe_soDienThoai_key" ON "TaiXe"("soDienThoai");

-- CreateIndex
CREATE UNIQUE INDEX "Xe_bienSoXe_key" ON "Xe"("bienSoXe");
