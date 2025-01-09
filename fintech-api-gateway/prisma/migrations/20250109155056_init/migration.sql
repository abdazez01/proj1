/*
  Warnings:

  - You are about to drop the column `Created_AT` on the `Bonuses` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Bonuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bonuses" DROP COLUMN "Created_AT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
