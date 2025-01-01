/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_pkey",
ADD COLUMN     "ID" SERIAL NOT NULL,
ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("ID");
