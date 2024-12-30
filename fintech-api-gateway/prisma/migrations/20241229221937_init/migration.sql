/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "OCR" (
    "Report_ID" SERIAL NOT NULL,
    "Account_ID" INTEGER NOT NULL,
    "CSV_Path" TEXT NOT NULL,

    CONSTRAINT "OCR_pkey" PRIMARY KEY ("Report_ID")
);

-- CreateTable
CREATE TABLE "Account" (
    "ID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "HashedPassword" TEXT NOT NULL,
    "Salt" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "Expense_ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Account_ID" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("Expense_ID")
);

-- CreateTable
CREATE TABLE "User_Info" (
    "ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Location" TEXT NOT NULL,
    "Salary" DOUBLE PRECISION NOT NULL,
    "Currency" TEXT NOT NULL,
    "Gender" BOOLEAN NOT NULL,

    CONSTRAINT "User_Info_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_Email_key" ON "Account"("Email");

-- AddForeignKey
ALTER TABLE "OCR" ADD CONSTRAINT "OCR_Account_ID_fkey" FOREIGN KEY ("Account_ID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Account_ID_fkey" FOREIGN KEY ("Account_ID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Info" ADD CONSTRAINT "User_Info_ID_fkey" FOREIGN KEY ("ID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
