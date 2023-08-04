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

  const chuyenxe1 = await prisma.chuyenXe.create({
    data: {
      idTaiXe: '1',
      idKhachHang: '2',
      trangThai: 'Chưa Hoàn Thành',
      diemDon: 'A',
      diemTra: 'B',
      giaTien: 100,
      gioHen: new Date(),
    },
  });

  const taixe1 = await prisma.taiXe.create({
    data: {
      idTaiXe: '1',
      hoTen: 'Nguyễn Văn A',
      soDienThoai: '0964978361',
      idXe: '1',
      toaDoGPS: '50 50',
    },
  });

  const xe1 = await prisma.xe.create({
    data: {
      id: '1',
      bienSoXe: '12345',
      hieuXe: 'Honda',
      loaiXe: 'Xe Máy',
    },
  });
  const user2 = await prisma.khachHang.upsert({
    where: { soDienThoai: '09644444' },
    update: {},
    create: {
      soDienThoai: '09644444',
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
