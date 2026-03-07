// Usage: npx tsx prisma/scripts/seed-deal.ts
import "dotenv/config";
import { DealEventType, DealStatus, Prisma } from "@prisma/client";
import { prisma } from "../../src/lib/prisma";

type DemoDealSeed = {
  dealNumber: string;
  customerName: string;
  vehicleDetails: string;
  status: DealStatus;
  depositAmount?: number;
  receiptId?: string;
  note: string;
  reviewMessage?: string;
  statusChangeFrom?: DealStatus;
};

const DEMO_DEALS: DemoDealSeed[] = [
  {
    dealNumber: "DLX-2026-001",
    customerName: "Layla Rahman",
    vehicleDetails:
      "2023 Range Rover Sport First Edition, Santorini Black, 18,400 km, GCC spec, 1 owner, full service history",
    status: DealStatus.RESERVED,
    depositAmount: 25000,
    receiptId: "seed-rrs-001",
    note: "Customer requested Friday handover and window tint compliance certificate. All documents verified.",
    reviewMessage:
      "Reservation verified. Passport and signed reservation form received.",
    statusChangeFrom: DealStatus.NEW,
  },
  {
    dealNumber: "DLX-2026-002",
    customerName: "Sofia Haddad",
    vehicleDetails:
      "2022 Mercedes-AMG G63, Obsidian Black, designo red interior, 12,900 km, GCC, full dealer history",
    status: DealStatus.DEPOSIT_RECEIVED,
    depositAmount: 50000,
    receiptId: "seed-g63-002",
    note: "Arranging third-party inspection before finance approval. Deposit received and matched to bank transfer.",
    reviewMessage:
      "Deposit confirmed. Finance pre-check cleared.",
    statusChangeFrom: DealStatus.RESERVED,
  },
  {
    dealNumber: "DLX-2026-003",
    customerName: "Daniel Cooper",
    vehicleDetails:
      "2024 BMW X7 M60i, Tanzanite Blue, Ivory leather, 9,100 km, BMW Premium Selection, 2 years warranty",
    status: DealStatus.COMPLETED,
    depositAmount: 40000,
    receiptId: "seed-x7-003",
    note: "Registration pack ready. Client requested delivery to DIFC office after insurance activation. All compliance checks passed.",
    reviewMessage:
      "Final document pack reviewed. Compliance checklist completed for transfer.",
    statusChangeFrom: DealStatus.IN_FINANCE,
  },
];

async function resolveTargetOrg() {
  const requestedOrgId = process.env.DEAL_SEED_ORG_ID?.trim();
  const requestedClerkOrgId = process.env.DEAL_SEED_CLERK_ORG_ID?.trim();

  if (requestedOrgId) {
    const org = await prisma.org.findUnique({ where: { id: requestedOrgId } });
    if (!org) {
      throw new Error(`Org ${requestedOrgId} was not found.`);
    }
    return org;
  }

  if (requestedClerkOrgId) {
    const org = await prisma.org.findUnique({
      where: { clerkOrgId: requestedClerkOrgId },
    });
    if (!org) {
      throw new Error(
        `Org with clerkOrgId ${requestedClerkOrgId} was not found.`,
      );
    }
    return org;
  }

  const org = await prisma.org.findFirst({
    where: { type: "DEALER" },
    orderBy: { createdAt: "asc" },
  });

  if (!org) {
    throw new Error(
      "No dealer org found. Set DEAL_SEED_ORG_ID or create a dealer org first.",
    );
  }

  return org;
}

async function resolveActorId(orgId: string) {
  const membership = await prisma.userOrg.findFirst({
    where: { orgId },
    select: { userId: true },
    orderBy: { createdAt: "asc" },
  });

  return membership?.userId;
}

function buildEventData(params: {
  dealId: string;
  orgId: string;
  actorId?: string;
  customerName: string;
  vehicleDetails: string;
  note: string;
  reviewMessage?: string;
  status: DealStatus;
  statusChangeFrom?: DealStatus;
}) {
  const {
    dealId,
    orgId,
    actorId,
    customerName,
    vehicleDetails,
    note,
    reviewMessage,
    status,
    statusChangeFrom,
  } = params;

  const events: Prisma.DealEventCreateManyInput[] = [
    {
      dealId,
      orgId,
      actorId,
      type: DealEventType.DEAL_CREATED,
      message: `Seed: deal opened for ${customerName}`,
      payload: { customerName, vehicleDetails, seed: true },
    },
    {
      dealId,
      orgId,
      actorId,
      type: DealEventType.NOTE,
      message: `Seed note: ${note}`,
      payload: { note, seed: true },
    },
  ];

  if (reviewMessage) {
    events.push({
      dealId,
      orgId,
      actorId,
      type: DealEventType.REVIEWED,
      message: `Seed review: ${reviewMessage}`,
      payload: { reviewMessage, seed: true },
    });
  }

  if (statusChangeFrom && statusChangeFrom !== status) {
    events.push({
      dealId,
      orgId,
      actorId,
      type: DealEventType.STATUS_CHANGED,
      message: `Seed status change: ${statusChangeFrom} -> ${status}`,
      payload: {
        previousStatus: statusChangeFrom,
        newStatus: status,
        seed: true,
      },
    });
  }

  return events;
}

async function seedDemoDeal(
  orgId: string,
  actorId: string | undefined,
  demoDeal: DemoDealSeed,
) {
  const deal = await prisma.deal.upsert({
    where: {
      orgId_dealNumber: {
        orgId,
        dealNumber: demoDeal.dealNumber,
      },
    },
    update: {
      status: demoDeal.status,
      customerRef: demoDeal.customerName,
      vehicleRef: demoDeal.vehicleDetails,
    },
    create: {
      orgId,
      dealNumber: demoDeal.dealNumber,
      status: demoDeal.status,
      customerRef: demoDeal.customerName,
      vehicleRef: demoDeal.vehicleDetails,
    },
  });

  await prisma.dealEvent.deleteMany({
    where: {
      dealId: deal.id,
      orgId,
      message: {
        startsWith: "Seed",
      },
    },
  });

  const events = buildEventData({
    dealId: deal.id,
    orgId,
    actorId,
    customerName: demoDeal.customerName,
    vehicleDetails: demoDeal.vehicleDetails,
    note: demoDeal.note,
    reviewMessage: demoDeal.reviewMessage,
    status: demoDeal.status,
    statusChangeFrom: demoDeal.statusChangeFrom,
  });

  await prisma.dealEvent.createMany({ data: events });

  if (demoDeal.depositAmount && demoDeal.receiptId) {
    await prisma.deposit.upsert({
      where: { receiptId: demoDeal.receiptId },
      update: {
        dealId: deal.id,
        amount: demoDeal.depositAmount,
        currency: "AED",
        status: "RECEIVED",
      },
      create: {
        dealId: deal.id,
        amount: demoDeal.depositAmount,
        currency: "AED",
        receiptId: demoDeal.receiptId,
        status: "RECEIVED",
      },
    });
  }

  // Add a visible document to the third deal for screenshots
  if (demoDeal.dealNumber === "DLX-2026-003") {
    await prisma.dealDocument.upsert({
      where: { id: `seed-doc-x7-003` },
      update: {
        fileName: "Registration_Pack.pdf",
        originalName: "Registration_Pack.pdf",
        mimeType: "application/pdf",
        fileSize: 234567,
        documentType: "HANDOVER_DOCUMENT",
        storagePath: "/demo/Registration_Pack.pdf",
        uploadedBy: actorId || null,
      },
      create: {
        id: `seed-doc-x7-003`,
        orgId,
        dealId: deal.id,
        fileName: "Registration_Pack.pdf",
        originalName: "Registration_Pack.pdf",
        mimeType: "application/pdf",
        fileSize: 234567,
        documentType: "HANDOVER_DOCUMENT",
        storagePath: "/demo/Registration_Pack.pdf",
        uploadedBy: actorId || null,
      },
    });
  }

  return prisma.deal.findUniqueOrThrow({
    where: { id: deal.id },
    include: {
      deposits: true,
      events: {
        orderBy: { createdAt: "asc" },
      },
      documents: true,
    },
  });
}

async function main() {
  const org = await resolveTargetOrg();
  const actorId = await resolveActorId(org.id);

  const seededDeals = [];
  for (const demoDeal of DEMO_DEALS) {
    const seededDeal = await seedDemoDeal(org.id, actorId, demoDeal);
    seededDeals.push(seededDeal);
  }

  console.log(
    JSON.stringify(
      {
        org: {
          id: org.id,
          name: org.name,
          clerkOrgId: org.clerkOrgId,
        },
        deals: seededDeals.map((deal) => ({
          id: deal.id,
          dealNumber: deal.dealNumber,
          status: deal.status,
          customerName: deal.customerRef,
          vehicleDetails: deal.vehicleRef,
          deposits: deal.deposits.map((deposit) => ({
            amount: deposit.amount,
            currency: deposit.currency,
            status: deposit.status,
            receiptId: deposit.receiptId,
          })),
          timeline: deal.events.map((event) => ({
            type: event.type,
            message: event.message,
          })),
        })),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
