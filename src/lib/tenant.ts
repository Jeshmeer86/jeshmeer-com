import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

type Reason = "SIGN_IN" | "NO_ORG";
type Plan = "FREE" | "PRO" | "ELITE";

type TenantContext =
  | { ok: false; reason: Reason }
  | {
      ok: true;
      userId: string;
      clerkOrgId: string;
      dbUserId: string;
      dbOrgId: string;
      role: string;
      plan: Plan;
    };

function mapClerkOrgRoleToAppRole(orgRole?: string | null) {
  const r = (orgRole ?? "").toLowerCase();
  if (r.includes("admin") || r.includes("owner")) return "OWNER";
  if (r.includes("member")) return "SALES";
  return "READ_ONLY";
}

export async function requireDashboardContext(): Promise<TenantContext> {
  const { isAuthenticated, userId, orgId, orgRole } = await auth();

  if (!isAuthenticated || !userId) return { ok: false, reason: "SIGN_IN" };
  if (!orgId) return { ok: false, reason: "NO_ORG" };

  const client = await clerkClient();

  const clerkUser = await client.users.getUser(userId);
  const email = clerkUser.emailAddresses?.[0]?.emailAddress;
  if (!email) throw new Error("Clerk user has no email address.");

  const fullName =
    clerkUser.fullName ??
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ??
    null;

  const clerkOrg = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const dbUser = await prisma.user.upsert({
    where: { email },
    update: { clerkUserId: userId, name: fullName ?? undefined },
    create: { email, clerkUserId: userId, name: fullName ?? undefined },
  });

  const dbOrg = await prisma.org.upsert({
    where: { clerkOrgId: orgId },
    update: { name: clerkOrg.name },
    create: { clerkOrgId: orgId, name: clerkOrg.name, type: "DEALER" },
  });

  const membership = await prisma.userOrg.upsert({
    where: {
      userId_orgId: { userId: dbUser.id, orgId: dbOrg.id },
    },
    update: {},
    create: {
      userId: dbUser.id,
      orgId: dbOrg.id,
      role: mapClerkOrgRoleToAppRole(orgRole),
    },
  });

  const sub = await prisma.orgSubscription.upsert({
    where: { orgId: dbOrg.id },
    update: {},
    create: { orgId: dbOrg.id, plan: "FREE", status: "ACTIVE" },
  });

  return {
    ok: true,
    userId,
    clerkOrgId: orgId,
    dbUserId: dbUser.id,
    dbOrgId: dbOrg.id,
    role: membership.role,
    plan: sub.plan as Plan,
  };
}

export const requireDealerContext = requireDashboardContext;
export default requireDashboardContext;
