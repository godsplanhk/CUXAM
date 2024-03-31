-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_batch_fkey" FOREIGN KEY ("batch") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
