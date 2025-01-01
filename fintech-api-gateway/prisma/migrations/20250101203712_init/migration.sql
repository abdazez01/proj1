/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_Expense_ID_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "Category" TEXT NOT NULL DEFAULT 'Other';

-- DropTable
DROP TABLE "Categories";
