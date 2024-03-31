-- AlterTable
ALTER TABLE "Batches" ADD COLUMN     "BEME" TEXT NOT NULL DEFAULT 'BE';

-- CreateTable
CREATE TABLE "Degree" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Degree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);
