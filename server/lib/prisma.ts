// server/lib/prisma.ts
//
import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

export const pool = new pg.Pool({
  connectionString,
  ssl: true,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  keepAlive: true,
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database pool error:", err);
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });