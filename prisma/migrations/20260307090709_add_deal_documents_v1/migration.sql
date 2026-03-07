-- CreateEnum
CREATE TYPE "DealEventType" AS ENUM ('NOTE', 'REVIEWED', 'STATUS_CHANGE', 'DOCUMENT_UPLOADED');

-- CreateEnum
CREATE TYPE "DealDocumentType" AS ENUM ('ID_DOCUMENT', 'RESERVATION_FORM', 'DEPOSIT_RECEIPT', 'VEHICLE_DOCUMENT', 'FINANCE_DOCUMENT', 'HANDOVER_DOCUMENT', 'OTHER');

-- AlterTable
ALTER TABLE "DealEvent"
ALTER COLUMN "type" TYPE "DealEventType"
USING ("type"::"DealEventType");

-- CreateTable
CREATE TABLE "DealDocument" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "documentType" "DealDocumentType" NOT NULL,
    "storagePath" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DealDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DealDocument_orgId_createdAt_idx" ON "DealDocument"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "DealDocument_dealId_createdAt_idx" ON "DealDocument"("dealId", "createdAt");

-- CreateIndex
CREATE INDEX "DealDocument_orgId_dealId_idx" ON "DealDocument"("orgId", "dealId");

-- AddForeignKey
ALTER TABLE "DealDocument" ADD CONSTRAINT "DealDocument_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealDocument" ADD CONSTRAINT "DealDocument_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealDocument" ADD CONSTRAINT "DealDocument_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
