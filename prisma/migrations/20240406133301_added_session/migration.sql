/*
  Warnings:

  - Added the required column `endYear` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "endYear" TEXT NOT NULL,
ADD COLUMN     "startYear" TEXT NOT NULL,
ADD COLUMN     "term" TEXT NOT NULL;
