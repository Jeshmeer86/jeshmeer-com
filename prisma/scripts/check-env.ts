// Usage: npx tsx prisma/scripts/check-env.ts
import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
