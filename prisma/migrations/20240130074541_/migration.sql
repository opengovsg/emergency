-- CreateEnum
CREATE TYPE "Trigger" AS ENUM ('DEATH', 'IMMEDIATE');

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "content_html" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "recipient_nric" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "trigger" "Trigger" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nric" TEXT NOT NULL,
    "name" TEXT,
    "dob" DATE,
    "mobile" TEXT,
    "isDead" BOOLEAN NOT NULL DEFAULT false,
    "parent_nric" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Note_deleted_at_idx" ON "Note"("deleted_at");

-- CreateIndex
CREATE INDEX "Note_created_at_idx" ON "Note"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_nric_key" ON "User"("nric");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_recipient_nric_fkey" FOREIGN KEY ("recipient_nric") REFERENCES "User"("nric") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_parent_nric_fkey" FOREIGN KEY ("parent_nric") REFERENCES "User"("nric") ON DELETE SET NULL ON UPDATE CASCADE;
