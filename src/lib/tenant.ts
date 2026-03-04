import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function safeEmail(user: any) {
  return (
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    "unknown@example.com"
  );
}

export async function requireDealerContext() {
  const { userId, orgId } = auth();

  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/app/onboarding");

  const [clerkOrg, clerkUser] = await Promise.all([
    clerkClient.organizations.getOrganization({ organizationId: orgId }),
    clerkClient.users.getUser(userId),
  ]);

  const dbOrg = await prisma.org.upsert({
    where: { clerkOrgId: orgId },
    update: { name: clerkOrg.name },
    create: { clerkOrgId: orgId, name: clerkOrg.name, type: "DEALER" },
  });

  const dbUser = await prisma.user.upsert({
    where: { clerkUserId: userId },
    update: {
      email: safeEmail(clerkUser),
      name: clerkUser.fullName ?? clerkUser.username ?? null,
    },
    create: {
      clerkUserId: userId,
      email: safeEmail(clerkUser),
      name: clerkUser.fullName ?? clerkUser.username ?? null,
    },
  });

  await prisma.userOrg.upsert({
    where: { userId_orgId: { userId: dbUser.id, orgId: dbOrg.id } },
    update: {},
    create: { userId: dbUser.id, orgId: dbOrg.id, role: "OWNER" },
  });

  return { dbOrg, dbUser };
}
