/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipient_nric` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_recipient_id_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "recipient_id",
ADD COLUMN     "recipient_nric" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobile" TEXT;

-- DropTable
DROP TABLE "VerificationToken";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_recipient_nric_fkey" FOREIGN KEY ("recipient_nric") REFERENCES "User"("nric") ON DELETE CASCADE ON UPDATE CASCADE;
