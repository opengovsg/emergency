/*
  Warnings:

  - Added the required column `trigger` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Trigger" AS ENUM ('DEATH', 'IMMEDIATE');

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "trigger" "Trigger" NOT NULL;
