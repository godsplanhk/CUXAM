/*
  Warnings:

  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `Cname` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tname` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" RENAME COLUMN "name" TO "Cname";

-- AlterTable
ALTER TABLE "Teacher" RENAME COLUMN "name" TO "Tname";