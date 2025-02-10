/*
  Warnings:

  - You are about to drop the column `CSV_Path` on the `OCR` table. All the data in the column will be lost.
  - Added the required column `Image` to the `OCR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OCR" DROP COLUMN "CSV_Path",
ADD COLUMN     "Image" BYTEA NOT NULL;
