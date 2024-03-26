/*
  Warnings:

  - A unique constraint covering the columns `[ECode,Tname]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Teacher_ECode_Tname_key" ON "Teacher"("ECode", "Tname");
