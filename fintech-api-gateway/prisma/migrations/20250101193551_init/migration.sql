-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "AskForRecovery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "EmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "RecoveryCode" TEXT,
ADD COLUMN     "RecoveryExpiry" TIMESTAMP(3),
ADD COLUMN     "VerificationCode" TEXT,
ADD COLUMN     "VerificationExpiry" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Categories" (
    "Expense_id" INTEGER NOT NULL,
    "Category" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("Expense_id")
);

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_Expense_id_fkey" FOREIGN KEY ("Expense_id") REFERENCES "Expense"("Expense_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
