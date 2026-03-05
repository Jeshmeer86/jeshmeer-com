import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create a default INTERNAL org for your own admin use (optional)
  const internal = await prisma.org.upsert({
    where: { name: "Sovereign Internal" },
    update: {},
    create: { type: "INTERNAL", name: "Sovereign Internal" },
  });

  // Ensure every org has a subscription row (FREE by default)
  const orgs = await prisma.org.findMany({ select: { id: true } });

  for (const o of orgs) {
    await prisma.orgSubscription.upsert({
      where: { orgId: o.id },
      update: {},
      create: { orgId: o.id, plan: "FREE", status: "ACTIVE" },
    });
  }

  console.log(
    `Seeded. INTERNAL org: ${internal.id}. Subscriptions ensured for ${orgs.length} org(s).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
