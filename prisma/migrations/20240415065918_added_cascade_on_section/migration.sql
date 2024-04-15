-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_batch_fkey";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_batch_fkey" FOREIGN KEY ("batch") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
