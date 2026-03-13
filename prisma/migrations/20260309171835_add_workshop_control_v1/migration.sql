-- CreateEnum
CREATE TYPE "WorkshopJobStatus" AS ENUM ('NEW_ENQUIRY', 'BOOKED_IN', 'INSPECTION', 'ESTIMATE_SENT', 'APPROVED', 'IN_PROGRESS', 'READY_FOR_COLLECTION', 'DELIVERED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkshopJobPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "WorkshopLeadSource" AS ENUM ('WHATSAPP', 'CALL', 'WEBSITE', 'WALK_IN', 'GOOGLE', 'INSTAGRAM', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkshopPhotoType" AS ENUM ('INTAKE', 'DAMAGE', 'REPAIR', 'COMPLETION', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkshopEventType" AS ENUM ('JOB_CREATED', 'STATUS_CHANGED', 'NOTE_ADDED', 'PHOTO_ADDED', 'CUSTOMER_CONTACTED', 'OTHER');

-- AlterEnum
ALTER TYPE "DealEventType" ADD VALUE 'DEPOSIT_APPROVED';

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "plateNumber" TEXT,
    "vin" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopJob" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "complaint" TEXT,
    "status" "WorkshopJobStatus" NOT NULL DEFAULT 'NEW_ENQUIRY',
    "priority" "WorkshopJobPriority" NOT NULL DEFAULT 'NORMAL',
    "source" "WorkshopLeadSource" NOT NULL DEFAULT 'OTHER',
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkshopJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopJobNote" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkshopJobNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopJobPhoto" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "photoType" "WorkshopPhotoType" NOT NULL DEFAULT 'OTHER',
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkshopJobPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopJobEvent" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "eventType" "WorkshopEventType" NOT NULL DEFAULT 'OTHER',
    "message" TEXT,
    "actor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkshopJobEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Customer_orgId_idx" ON "Customer"("orgId");

-- CreateIndex
CREATE INDEX "Vehicle_orgId_idx" ON "Vehicle"("orgId");

-- CreateIndex
CREATE INDEX "Vehicle_customerId_idx" ON "Vehicle"("customerId");

-- CreateIndex
CREATE INDEX "WorkshopJob_orgId_status_idx" ON "WorkshopJob"("orgId", "status");

-- CreateIndex
CREATE INDEX "WorkshopJob_orgId_openedAt_idx" ON "WorkshopJob"("orgId", "openedAt");

-- CreateIndex
CREATE INDEX "WorkshopJob_customerId_idx" ON "WorkshopJob"("customerId");

-- CreateIndex
CREATE INDEX "WorkshopJob_vehicleId_idx" ON "WorkshopJob"("vehicleId");

-- CreateIndex
CREATE INDEX "WorkshopJobNote_orgId_idx" ON "WorkshopJobNote"("orgId");

-- CreateIndex
CREATE INDEX "WorkshopJobNote_jobId_idx" ON "WorkshopJobNote"("jobId");

-- CreateIndex
CREATE INDEX "WorkshopJobPhoto_orgId_idx" ON "WorkshopJobPhoto"("orgId");

-- CreateIndex
CREATE INDEX "WorkshopJobPhoto_jobId_idx" ON "WorkshopJobPhoto"("jobId");

-- CreateIndex
CREATE INDEX "WorkshopJobEvent_orgId_idx" ON "WorkshopJobEvent"("orgId");

-- CreateIndex
CREATE INDEX "WorkshopJobEvent_jobId_idx" ON "WorkshopJobEvent"("jobId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJob" ADD CONSTRAINT "WorkshopJob_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJob" ADD CONSTRAINT "WorkshopJob_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJob" ADD CONSTRAINT "WorkshopJob_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobNote" ADD CONSTRAINT "WorkshopJobNote_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobNote" ADD CONSTRAINT "WorkshopJobNote_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "WorkshopJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobPhoto" ADD CONSTRAINT "WorkshopJobPhoto_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobPhoto" ADD CONSTRAINT "WorkshopJobPhoto_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "WorkshopJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobEvent" ADD CONSTRAINT "WorkshopJobEvent_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopJobEvent" ADD CONSTRAINT "WorkshopJobEvent_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "WorkshopJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
