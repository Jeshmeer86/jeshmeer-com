// tests/utils/createDeal.ts
import { request } from "@playwright/test";

export async function createTestDeal(
  baseUrl: string,
  orgId: string,
  dealNumber: string,
) {
  const api = await request.newContext();
  const res = await api.post(`${baseUrl}/api/test/create-deal`, {
    data: {
      orgId,
      dealNumber,
    },
  });
  if (!res.ok()) throw new Error("Failed to create test deal");
  const data = await res.json();
  await api.dispose();
  return data.dealId;
}
