-- AddForeignKey
ALTER TABLE "DealEvent" ADD CONSTRAINT "DealEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
