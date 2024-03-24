-- CreateTable
CREATE TABLE "Schedule" (
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Ccode" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "labNo" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" INTEGER NOT NULL,
    "external" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_sectionId_Ccode_key" ON "Schedule"("sectionId", "Ccode");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_Ccode_fkey" FOREIGN KEY ("Ccode") REFERENCES "Course"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_sectionId_Ccode_fkey" FOREIGN KEY ("sectionId", "Ccode") REFERENCES "ITeacher"("section", "Ccode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_external_fkey" FOREIGN KEY ("external") REFERENCES "Teacher"("ECode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_labNo_block_fkey" FOREIGN KEY ("labNo", "block") REFERENCES "Rooms"("labNo", "block") ON DELETE RESTRICT ON UPDATE CASCADE;
