/*
  Warnings:

  - The primary key for the `Xe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Xe` table. All the data in the column will be lost.
  - The required column `idXe` was added to the `Xe` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Xe" DROP CONSTRAINT "Xe_pkey",
DROP COLUMN "id",
ADD COLUMN     "idXe" TEXT NOT NULL,
ADD CONSTRAINT "Xe_pkey" PRIMARY KEY ("idXe");
