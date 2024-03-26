-- DropIndex
DROP INDEX "Teacher_ECode_Tname_key";

-- CreateTable
CREATE TABLE "Rooms" (
    "labNo" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_labNo_block_key" ON "Rooms"("labNo", "block");
