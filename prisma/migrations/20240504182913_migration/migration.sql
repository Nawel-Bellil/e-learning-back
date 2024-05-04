/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;
