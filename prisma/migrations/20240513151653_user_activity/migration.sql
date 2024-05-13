/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `activity` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "activity",
DROP COLUMN "evaluation";

-- DropTable
DROP TABLE "Teacher";

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "activityType" TEXT NOT NULL,
    "moduleId" INTEGER,
    "chapterId" INTEGER,
    "topicId" INTEGER,
    "quizId" INTEGER,
    "score" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("chapter_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizz"("quizz_id") ON DELETE SET NULL ON UPDATE CASCADE;
