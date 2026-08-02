// Disabled for now — prisma, @prisma/client, @prisma/adapter-mariadb removed
// from package.json (Prisma's preinstall script requires Node 20.19+, and the
// deploy environment is on Node 18). Nothing currently imports this file.
// To re-enable: `pnpm add prisma @prisma/client @prisma/adapter-mariadb`,
// restore `postinstall: prisma generate` in package.json, uncomment below.

// import { PrismaClient } from "./generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
//
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
