-- CreateTable
CREATE TABLE "SoftSkillSchedule" (
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionId" TEXT NOT NULL,
    "Ccode" TEXT NOT NULL,
    "Cname" TEXT NOT NULL,
    "IEcode" TEXT NOT NULL,
    "ITname" TEXT NOT NULL,
    "labNo" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" INTEGER NOT NULL,
    "EEcode" TEXT NOT NULL,
    "ETname" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY['DCPD']::TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "SoftSkillSchedule_sectionId_Ccode_key" ON "SoftSkillSchedule"("sectionId", "Ccode");

-- AddForeignKey
ALTER TABLE "SoftSkillSchedule" ADD CONSTRAINT "SoftSkillSchedule_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
