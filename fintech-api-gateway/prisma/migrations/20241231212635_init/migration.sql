/*
  Warnings:

  - You are about to drop the column `Name` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User_Info` table. All the data in the column will be lost.
  - Added the required column `ExpenseName` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "Name",
ADD COLUMN     "ExpenseName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Info" DROP COLUMN "Name",
ADD COLUMN     "UserName" TEXT NOT NULL DEFAULT 'USER';
