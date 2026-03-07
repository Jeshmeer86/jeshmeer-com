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
  // =============================
  // TEMP DEV BYPASS - LOCAL ONLY
  // =============================
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_AUTH_BYPASS === "1"
  ) {
    // Try to detect localhost/127.0.0.1
    let isLocalhost = false;
    if (typeof window !== "undefined") {
      isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    } else if (typeof require !== "undefined") {
      try {
        const req = (globalThis as any).req || (globalThis as any).request;
        const host = req?.headers?.host || "";
        isLocalhost =
          host.startsWith("localhost") || host.startsWith("127.0.0.1");
      } catch {}
    }
    // Fallback: allow if NODE_ENV is not production and bypass is set
    if (isLocalhost || process.env.FORCE_DEV_AUTH_BYPASS === "1") {
      const userId = process.env.DEV_AUTH_BYPASS_USER_ID || "dev-user";
      const orgId = process.env.DEV_AUTH_BYPASS_CLERK_ORG_ID || "dev-org";
      const orgName = process.env.DEV_AUTH_BYPASS_ORG_NAME || "Dev Org";
      // Upsert org row
      const dbOrg = await prisma.org.upsert({
        where: { clerkOrgId: orgId },
        update: { name: orgName },
        create: { clerkOrgId: orgId, name: orgName, type: "DEALER" },
      });
      // Upsert user row
      const dbUser = await prisma.user.upsert({
        where: { email: userId + "@dev.local" },
        update: { clerkUserId: userId, name: "Dev User" },
        create: {
          email: userId + "@dev.local",
          clerkUserId: userId,
          name: "Dev User",
        },
      });
      // Upsert membership
      const membership = await prisma.userOrg.upsert({
        where: { userId_orgId: { userId: dbUser.id, orgId: dbOrg.id } },
        update: {},
        create: {
          userId: dbUser.id,
          orgId: dbOrg.id,
          role: "OWNER",
        },
      });
      // Upsert subscription
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
  }
  // =============================
  // END TEMP DEV BYPASS
  // =============================

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
