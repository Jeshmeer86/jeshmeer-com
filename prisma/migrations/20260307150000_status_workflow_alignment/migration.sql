ALTER TYPE "DealStatus" RENAME TO "DealStatus_old";

CREATE TYPE "DealStatus" AS ENUM (
    'NEW',
    'RESERVED',
    'DEPOSIT_RECEIVED',
    'IN_FINANCE',
    'COMPLETED',
    'CANCELLED'
);

ALTER TABLE "Deal"
ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "Deal"
ALTER COLUMN "status" TYPE "DealStatus"
USING (
    CASE
        WHEN "status"::text = 'DRAFT' THEN 'NEW'
        WHEN "status"::text IN ('READY_FOR_TRANSFER', 'DELIVERED') THEN 'COMPLETED'
        ELSE "status"::text
    END
)::"DealStatus";

ALTER TABLE "Deal"
ALTER COLUMN "status" SET DEFAULT 'NEW';

DROP TYPE "DealStatus_old";

ALTER TYPE "DealEventType" RENAME TO "DealEventType_old";

CREATE TYPE "DealEventType" AS ENUM (
    'DEAL_CREATED',
    'DOCUMENT_UPLOADED',
    'EXPORT_JSON',
    'EXPORT_HTML',
    'NOTE',
    'REVIEWED',
    'STATUS_CHANGED'
);

ALTER TABLE "DealEvent"
ALTER COLUMN "type" TYPE "DealEventType"
USING (
    CASE
        WHEN "type"::text = 'STATUS_CHANGE' THEN 'STATUS_CHANGED'
        ELSE "type"::text
    END
)::"DealEventType";

DROP TYPE "DealEventType_old";