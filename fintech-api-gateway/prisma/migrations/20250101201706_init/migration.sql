/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Expense_id` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `Expense_ID` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_Expense_id_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_pkey",
DROP COLUMN "Expense_id",
ADD COLUMN     "Expense_ID" INTEGER NOT NULL,
ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("Expense_ID");

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_Expense_ID_fkey" FOREIGN KEY ("Expense_ID") REFERENCES "Expense"("Expense_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
