/*
  Warnings:

  - You are about to drop the `_BatchesToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BatchesToCourse" DROP CONSTRAINT "_BatchesToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_BatchesToCourse" DROP CONSTRAINT "_BatchesToCourse_B_fkey";

-- DropTable
DROP TABLE "_BatchesToCourse";

-- CreateTable
CREATE TABLE "BatchCourse" (
    "batch" TEXT NOT NULL,
    "Ccode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BatchCourse_batch_Ccode_key" ON "BatchCourse"("batch", "Ccode");

-- AddForeignKey
ALTER TABLE "BatchCourse" ADD CONSTRAINT "BatchCourse_batch_fkey" FOREIGN KEY ("batch") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCourse" ADD CONSTRAINT "BatchCourse_Ccode_fkey" FOREIGN KEY ("Ccode") REFERENCES "Course"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
