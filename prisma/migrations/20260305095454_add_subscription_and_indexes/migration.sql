/*
  Warnings:

  - A unique constraint covering the columns `[orgId,dealNumber]` on the table `Deal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dealId,storageKey]` on the table `EvidenceFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dealId,storageKey]` on the table `ExportBundle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkOrgId]` on the table `Org` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserOrg` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'ELITE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED', 'INCOMPLETE');

-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkUserId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserOrg" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OrgSubscription" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "provider" TEXT DEFAULT 'stripe',
    "providerCustomerId" TEXT,
    "providerSubscriptionId" TEXT,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgSubscription_orgId_key" ON "OrgSubscription"("orgId");

-- CreateIndex
CREATE INDEX "OrgSubscription_plan_idx" ON "OrgSubscription"("plan");

-- CreateIndex
CREATE INDEX "OrgSubscription_status_idx" ON "OrgSubscription"("status");

-- CreateIndex
CREATE INDEX "Deal_orgId_createdAt_idx" ON "Deal"("orgId", "createdAt");

-- CreateIndex
CREATE INDEX "Deal_orgId_status_idx" ON "Deal"("orgId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_orgId_dealNumber_key" ON "Deal"("orgId", "dealNumber");

-- CreateIndex
CREATE INDEX "DealEvent_dealId_createdAt_idx" ON "DealEvent"("dealId", "createdAt");

-- CreateIndex
CREATE INDEX "Deposit_dealId_createdAt_idx" ON "Deposit"("dealId", "createdAt");

-- CreateIndex
CREATE INDEX "EvidenceFile_dealId_createdAt_idx" ON "EvidenceFile"("dealId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceFile_dealId_storageKey_key" ON "EvidenceFile"("dealId", "storageKey");

-- CreateIndex
CREATE INDEX "ExportBundle_dealId_createdAt_idx" ON "ExportBundle"("dealId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ExportBundle_dealId_storageKey_key" ON "ExportBundle"("dealId", "storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "Org_clerkOrgId_key" ON "Org"("clerkOrgId");

-- CreateIndex
CREATE INDEX "Org_type_idx" ON "Org"("type");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE INDEX "UserOrg_orgId_idx" ON "UserOrg"("orgId");

-- CreateIndex
CREATE INDEX "UserOrg_userId_idx" ON "UserOrg"("userId");

-- AddForeignKey
ALTER TABLE "OrgSubscription" ADD CONSTRAINT "OrgSubscription_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;
