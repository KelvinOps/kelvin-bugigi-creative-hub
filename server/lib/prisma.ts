// server/lib/prisma.ts
import { PrismaClient } from "../../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });