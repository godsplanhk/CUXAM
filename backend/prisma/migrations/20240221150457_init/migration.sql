-- CreateTable
CREATE TABLE "Subjects" (
    "Scode" TEXT NOT NULL,
    "Sname" TEXT NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("Scode")
);

-- CreateTable
CREATE TABLE "Batch" (
    "batchId" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("batchId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "ECode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("ECode")
);

-- CreateTable
CREATE TABLE "Section" (
    "sectionId" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "Group" TEXT[],
    "ECode" JSONB NOT NULL,
    "StudentCount" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("sectionId")
);

-- CreateTable
CREATE TABLE "AvailableRooms" (
    "Roomid" TEXT NOT NULL,
    "RoomType" TEXT NOT NULL,
    "Capacity" INTEGER NOT NULL,

    CONSTRAINT "AvailableRooms_pkey" PRIMARY KEY ("Roomid")
);

-- CreateTable
CREATE TABLE "_SubjectsToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BatchToSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectsToTeacher_AB_unique" ON "_SubjectsToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectsToTeacher_B_index" ON "_SubjectsToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToSubjects_AB_unique" ON "_BatchToSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToSubjects_B_index" ON "_BatchToSubjects"("B");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("batchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectsToTeacher" ADD CONSTRAINT "_SubjectsToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Subjects"("Scode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectsToTeacher" ADD CONSTRAINT "_SubjectsToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("ECode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToSubjects" ADD CONSTRAINT "_BatchToSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("batchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToSubjects" ADD CONSTRAINT "_BatchToSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subjects"("Scode") ON DELETE CASCADE ON UPDATE CASCADE;
