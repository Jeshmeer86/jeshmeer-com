import { DealStatus, Prisma } from "@prisma/client";
import { formatDealStatus } from "@/lib/deal-status";
import { prisma } from "@/lib/prisma";
import { DEAL_EVENT_TYPES } from "@/lib/deal-events";

type CreateDealInput = {
  orgId: string;
  dealNumber: string;
  actorId?: string;
};

type ChangeDealStatusInput = {
  dealId: string;
  orgId: string;
  nextStatus: DealStatus;
  actorId?: string;
  ip?: string | null;
  userAgent?: string | null;
};

export async function createDealWithEvent(input: CreateDealInput) {
  const dealNumber = input.dealNumber.trim();

  if (!input.orgId.trim()) {
    throw new Error("orgId required");
  }

  if (!dealNumber) {
    throw new Error("dealNumber required");
  }

  return prisma.$transaction(async (tx) => {
    const deal = await tx.deal.create({
      data: {
        orgId: input.orgId,
        dealNumber,
        status: DealStatus.NEW,
      },
    });

    await tx.dealEvent.create({
      data: {
        dealId: deal.id,
        orgId: input.orgId,
        type: DEAL_EVENT_TYPES.DEAL_CREATED,
        message: `Deal created: ${deal.dealNumber}`,
        actorId: input.actorId,
        payload: { dealNumber: deal.dealNumber },
      },
    });

    return deal;
  });
}

export async function changeDealStatusWithEvent(input: ChangeDealStatusInput) {
  if (!input.orgId.trim()) {
    throw new Error("orgId required");
  }

  if (!input.dealId.trim()) {
    throw new Error("dealId required");
  }

  return prisma.$transaction(async (tx) => {
    const deal = await tx.deal.findFirst({
      where: {
        id: input.dealId,
        orgId: input.orgId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!deal) {
      return null;
    }

    if (deal.status === input.nextStatus) {
      return {
        deal,
        eventCreated: false,
        previousStatus: deal.status,
        currentStatus: deal.status,
      };
    }

    const updatedDeal = await tx.deal.update({
      where: { id: deal.id },
      data: { status: input.nextStatus },
      select: {
        id: true,
        status: true,
        updatedAt: true,
      },
    });

    await tx.dealEvent.create({
      data: {
        dealId: deal.id,
        orgId: input.orgId,
        type: DEAL_EVENT_TYPES.STATUS_CHANGED,
        message: `Status changed to ${formatDealStatus(input.nextStatus)}`,
        actorId: input.actorId,
        ip: input.ip ?? undefined,
        userAgent: input.userAgent ?? undefined,
        payload: {
          previousStatus: deal.status,
          newStatus: input.nextStatus,
        },
      },
    });

    return {
      deal: updatedDeal,
      eventCreated: true,
      previousStatus: deal.status,
      currentStatus: updatedDeal.status,
    };
  });
}

export function isPrismaUniqueConstraintError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}
