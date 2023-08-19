import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.khachHang.upsert({
    where: { soDienThoai: '0964978361' },
    update: {},
    create: {
      soDienThoai: '0964978361',
      hoTen: 'Trương Gia Huy',
      diaChi: '536/43 Âu Cơ',
      toaDoGPS: '50 50',
      isRegistered: true,
      isVIP: true,
    },
  });

  const xe1 = await prisma.xe.create({
    data: {
      idXe: '1',
      bienSoXe: '12345',
      hieuXe: 'Honda',
      loaiXe: 'Xe Máy',
    },
  });

  const taixe1 = await prisma.taiXe.create({
    data: {
      hoTen: 'Nguyễn Văn A',
      soDienThoai: '0964978361',
      idXe: '1',
      toaDoGPS: '50 50',
    },
  });

  const chuyenxe1 = await prisma.chuyenXe.create({
    data: {
      idTaiXe: taixe1.idTaiXe,
      idKhachHang: user1.idKhachHang,
      trangThai: 'Chưa Hoàn Thành',
      diemDon: 'A',
      diemTra: 'B',
      giaTien: 100,
      gioHen: new Date(),
    },
  });

  const dummyXe = await prisma.xe.create({
    data: {
      idXe: 'dummy-400-vehicle',
      bienSoXe: 'NaN',
      hieuXe: 'dummy-hieuxe',
      loaiXe: 'dummy-loaixe',
    },
  });

  //Create a dummy driver
  const dummyTX = await prisma.taiXe.create({
    data: {
      idTaiXe: 'dummy-404860297',
      hoTen: 'dummy',
      soDienThoai: '404860297',
      idXe: 'dummy-400-vehicle',
      toaDoGPS: '50/50',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
