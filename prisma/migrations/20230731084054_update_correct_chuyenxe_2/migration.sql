-- CreateTable
CREATE TABLE "ChuyenXe" (
    "idChuyenXe" TEXT NOT NULL,
    "idTaiXe" TEXT NOT NULL,
    "idKhachHang" TEXT NOT NULL,
    "trangThai" TEXT NOT NULL,
    "diemDon" TEXT NOT NULL,
    "diemTra" TEXT NOT NULL,
    "giaTien" DOUBLE PRECISION NOT NULL,
    "gioHen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChuyenXe_pkey" PRIMARY KEY ("idChuyenXe")
);
