-- DropForeignKey
ALTER TABLE "Batches" DROP CONSTRAINT "Batches_branch_fkey";

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_branch_fkey" FOREIGN KEY ("branch") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
