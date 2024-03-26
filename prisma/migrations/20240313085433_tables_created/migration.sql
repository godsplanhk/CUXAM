-- CreateTable
CREATE TABLE "Batches" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "Batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "ECode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("ECode")
);

-- CreateTable
CREATE TABLE "ITeacher" (
    "section" TEXT NOT NULL,
    "Ccode" TEXT NOT NULL,
    "Teacher" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "group" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BatchesToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ITeacher_section_Ccode_key" ON "ITeacher"("section", "Ccode");

-- CreateIndex
CREATE UNIQUE INDEX "_BatchesToCourse_AB_unique" ON "_BatchesToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchesToCourse_B_index" ON "_BatchesToCourse"("B");

-- AddForeignKey
ALTER TABLE "ITeacher" ADD CONSTRAINT "ITeacher_section_fkey" FOREIGN KEY ("section") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ITeacher" ADD CONSTRAINT "ITeacher_Ccode_fkey" FOREIGN KEY ("Ccode") REFERENCES "Course"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ITeacher" ADD CONSTRAINT "ITeacher_Teacher_fkey" FOREIGN KEY ("Teacher") REFERENCES "Teacher"("ECode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchesToCourse" ADD CONSTRAINT "_BatchesToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchesToCourse" ADD CONSTRAINT "_BatchesToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;
