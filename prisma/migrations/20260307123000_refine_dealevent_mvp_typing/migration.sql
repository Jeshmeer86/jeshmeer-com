-- Rename DealEvent org scope column in place to preserve existing tenant data.
ALTER TABLE "DealEvent" RENAME COLUMN "organizationId" TO "orgId";

-- Keep Prisma's default names aligned after the column rename.
ALTER INDEX "DealEvent_organizationId_createdAt_idx"
RENAME TO "DealEvent_orgId_createdAt_idx";

ALTER TABLE "DealEvent"
RENAME CONSTRAINT "DealEvent_organizationId_fkey" TO "DealEvent_orgId_fkey";

-- Canonicalize legacy aliases into the MVP event names used by the app.
ALTER TYPE "DealEventType" RENAME TO "DealEventType_old";

CREATE TYPE "DealEventType" AS ENUM (
    'DEAL_CREATED',
    'DOCUMENT_UPLOADED',
    'EXPORT_JSON',
    'EXPORT_HTML',
    'NOTE',
    'REVIEWED',
    'STATUS_CHANGE'
);

ALTER TABLE "DealEvent"
ALTER COLUMN "type" TYPE "DealEventType"
USING (
    CASE
        WHEN "type"::text = 'STATUS_CHANGED' THEN 'STATUS_CHANGE'
        WHEN "type"::text = 'NOTE_ADDED' THEN 'NOTE'
        ELSE "type"::text
    END
)::"DealEventType";

DROP TYPE "DealEventType_old";