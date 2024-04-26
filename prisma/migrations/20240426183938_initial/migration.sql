/*
  Warnings:

  - Added the required column `activity` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeQuestionEnum" AS ENUM ('MCQ', 'TF');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "activity" INTEGER NOT NULL,
ADD COLUMN     "evaluation" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Quizz" (
    "quizz_id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("quizz_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "type" "TypeQuestionEnum" NOT NULL,
    "content" TEXT NOT NULL,
    "quizzId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answer_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id")
);

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("chapter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("quizz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
