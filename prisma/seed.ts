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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
