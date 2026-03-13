-- CreateEnum
CREATE TYPE "RentalQuoteRequestStatus" AS ENUM ('NEW', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RentalBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "RentalDepositStatus" AS ENUM ('NOT_REQUIRED', 'HELD', 'RELEASED', 'FORFEITED');

-- CreateEnum
CREATE TYPE "RentalIssueType" AS ENUM ('DAMAGE', 'LATE_RETURN', 'PAYMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "RentalIssuePriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RentalIssueStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "RentalReminderType" AS ENUM ('PICKUP', 'RETURN', 'PAYMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "RentalReminderStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RentalEventType" AS ENUM ('BOOKING_CREATED', 'STATUS_CHANGED', 'PAYMENT_RECEIVED', 'DOCUMENT_UPLOADED', 'ISSUE_REPORTED', 'NOTE', 'OTHER');

-- CreateEnum
CREATE TYPE "RentalDocumentType" AS ENUM ('AGREEMENT', 'INVOICE', 'RECEIPT', 'ID_DOCUMENT', 'VEHICLE_DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "RentalMessageDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "RentalMessageChannel" AS ENUM ('WHATSAPP', 'SMS', 'EMAIL', 'CALL', 'OTHER');

-- DropIndex
DROP INDEX "Vehicle_customerId_idx";

-- DropIndex
DROP INDEX "Vehicle_orgId_idx";

-- CreateTable
CREATE TABLE "RentalQuoteRequest" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "customerId" TEXT,
    "fullName" TEXT NOT NULL,
    "whatsappPhone" TEXT NOT NULL,
    "requestedCategory" TEXT,
    "requestedVehicle" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "pickupLocation" TEXT,
    "dropoffLocation" TEXT,
    "source" TEXT,
    "status" "RentalQuoteRequestStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalQuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalBooking" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "quoteRequestId" TEXT,
    "reservationCode" TEXT NOT NULL,
    "agreementNumber" TEXT,
    "invoiceNumber" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "pickupLocation" TEXT,
    "dropoffLocation" TEXT,
    "totalAmount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'AED',
    "bookingStatus" "RentalBookingStatus" NOT NULL DEFAULT 'PENDING',
    "depositAmount" INTEGER,
    "depositStatus" "RentalDepositStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "salikNotes" TEXT,
    "fineNotes" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalDocument" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT,
    "customerId" TEXT,
    "documentType" "RentalDocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalDeposit" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AED',
    "status" "RentalDepositStatus" NOT NULL DEFAULT 'HELD',
    "heldAt" TIMESTAMP(3),
    "releasedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalIssue" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT,
    "customerId" TEXT,
    "issueType" "RentalIssueType" NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "RentalIssuePriority" NOT NULL DEFAULT 'NORMAL',
    "status" "RentalIssueStatus" NOT NULL DEFAULT 'OPEN',
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalMessageLog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT,
    "customerId" TEXT,
    "direction" "RentalMessageDirection" NOT NULL,
    "channel" "RentalMessageChannel" NOT NULL DEFAULT 'WHATSAPP',
    "templateName" TEXT,
    "messageText" TEXT NOT NULL,
    "deliveryStatus" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalMessageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalReminder" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "reminderType" "RentalReminderType" NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" "RentalReminderStatus" NOT NULL DEFAULT 'PENDING',
    "lastAttemptAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentalReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalEvent" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "bookingId" TEXT,
    "customerId" TEXT,
    "eventType" "RentalEventType" NOT NULL,
    "message" TEXT,
    "metadataJson" JSONB,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RentalQuoteRequest_orgId_createdAt_idx" ON "RentalQuoteRequest"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "RentalQuoteRequest_orgId_status_idx" ON "RentalQuoteRequest"("orgId", "status");

-- CreateIndex
CREATE INDEX "RentalQuoteRequest_customerId_idx" ON "RentalQuoteRequest"("customerId");

-- CreateIndex
CREATE INDEX "RentalBooking_orgId_bookingStatus_idx" ON "RentalBooking"("orgId", "bookingStatus");

-- CreateIndex
CREATE INDEX "RentalBooking_orgId_startDate_idx" ON "RentalBooking"("orgId", "startDate");

-- CreateIndex
CREATE INDEX "RentalBooking_orgId_endDate_idx" ON "RentalBooking"("orgId", "endDate");

-- CreateIndex
CREATE INDEX "RentalBooking_customerId_idx" ON "RentalBooking"("customerId");

-- CreateIndex
CREATE INDEX "RentalBooking_vehicleId_idx" ON "RentalBooking"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "RentalBooking_orgId_reservationCode_key" ON "RentalBooking"("orgId", "reservationCode");

-- CreateIndex
CREATE INDEX "RentalDocument_orgId_createdAt_idx" ON "RentalDocument"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "RentalDocument_bookingId_idx" ON "RentalDocument"("bookingId");

-- CreateIndex
CREATE INDEX "RentalDocument_customerId_idx" ON "RentalDocument"("customerId");

-- CreateIndex
CREATE INDEX "RentalDeposit_orgId_createdAt_idx" ON "RentalDeposit"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "RentalDeposit_bookingId_idx" ON "RentalDeposit"("bookingId");

-- CreateIndex
CREATE INDEX "RentalDeposit_orgId_status_idx" ON "RentalDeposit"("orgId", "status");

-- CreateIndex
CREATE INDEX "RentalIssue_orgId_reportedAt_idx" ON "RentalIssue"("orgId", "reportedAt");

-- CreateIndex
CREATE INDEX "RentalIssue_orgId_status_idx" ON "RentalIssue"("orgId", "status");

-- CreateIndex
CREATE INDEX "RentalIssue_bookingId_idx" ON "RentalIssue"("bookingId");

-- CreateIndex
CREATE INDEX "RentalIssue_customerId_idx" ON "RentalIssue"("customerId");

-- CreateIndex
CREATE INDEX "RentalMessageLog_orgId_createdAt_idx" ON "RentalMessageLog"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "RentalMessageLog_bookingId_idx" ON "RentalMessageLog"("bookingId");

-- CreateIndex
CREATE INDEX "RentalMessageLog_customerId_idx" ON "RentalMessageLog"("customerId");

-- CreateIndex
CREATE INDEX "RentalReminder_orgId_scheduledFor_idx" ON "RentalReminder"("orgId", "scheduledFor");

-- CreateIndex
CREATE INDEX "RentalReminder_bookingId_idx" ON "RentalReminder"("bookingId");

-- CreateIndex
CREATE INDEX "RentalReminder_orgId_status_idx" ON "RentalReminder"("orgId", "status");

-- CreateIndex
CREATE INDEX "RentalEvent_orgId_createdAt_idx" ON "RentalEvent"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "RentalEvent_bookingId_idx" ON "RentalEvent"("bookingId");

-- CreateIndex
CREATE INDEX "RentalEvent_customerId_idx" ON "RentalEvent"("customerId");

-- AddForeignKey
ALTER TABLE "RentalQuoteRequest" ADD CONSTRAINT "RentalQuoteRequest_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalQuoteRequest" ADD CONSTRAINT "RentalQuoteRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalBooking" ADD CONSTRAINT "RentalBooking_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "RentalQuoteRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalDocument" ADD CONSTRAINT "RentalDocument_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalDocument" ADD CONSTRAINT "RentalDocument_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalDocument" ADD CONSTRAINT "RentalDocument_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalDeposit" ADD CONSTRAINT "RentalDeposit_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalDeposit" ADD CONSTRAINT "RentalDeposit_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalIssue" ADD CONSTRAINT "RentalIssue_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalIssue" ADD CONSTRAINT "RentalIssue_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalIssue" ADD CONSTRAINT "RentalIssue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMessageLog" ADD CONSTRAINT "RentalMessageLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMessageLog" ADD CONSTRAINT "RentalMessageLog_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalMessageLog" ADD CONSTRAINT "RentalMessageLog_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalReminder" ADD CONSTRAINT "RentalReminder_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalReminder" ADD CONSTRAINT "RentalReminder_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalEvent" ADD CONSTRAINT "RentalEvent_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalEvent" ADD CONSTRAINT "RentalEvent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "RentalBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalEvent" ADD CONSTRAINT "RentalEvent_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
