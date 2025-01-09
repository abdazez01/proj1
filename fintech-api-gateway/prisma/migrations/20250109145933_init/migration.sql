-- CreateTable
CREATE TABLE "Bonuses" (
    "Bonus_ID" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Created_AT" TIMESTAMP(3) NOT NULL,
    "Account_ID" INTEGER NOT NULL,

    CONSTRAINT "Bonuses_pkey" PRIMARY KEY ("Bonus_ID")
);

-- AddForeignKey
ALTER TABLE "Bonuses" ADD CONSTRAINT "Bonuses_Account_ID_fkey" FOREIGN KEY ("Account_ID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
