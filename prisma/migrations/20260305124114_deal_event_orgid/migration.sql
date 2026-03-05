/*
  Warnings:

  - You are about to drop the column `actorId` on the `DealEvent` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `DealEvent` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `DealEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `DealEvent` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `DealEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DealEvent" DROP COLUMN "actorId",
DROP COLUMN "ip",
DROP COLUMN "payload",
DROP COLUMN "userAgent",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "DealEvent_organizationId_createdAt_idx" ON "DealEvent"("organizationId", "createdAt");
