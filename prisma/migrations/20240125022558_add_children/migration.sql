-- AlterTable
ALTER TABLE "User" ADD COLUMN     "parent_nric" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_parent_nric_fkey" FOREIGN KEY ("parent_nric") REFERENCES "User"("nric") ON DELETE SET NULL ON UPDATE CASCADE;
