-- AlterTable
ALTER TABLE "DealEvent" ADD COLUMN     "actorId" TEXT;

-- CreateIndex
CREATE INDEX "DealEvent_actorId_idx" ON "DealEvent"("actorId");

-- AddForeignKey
ALTER TABLE "DealEvent" ADD CONSTRAINT "DealEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
