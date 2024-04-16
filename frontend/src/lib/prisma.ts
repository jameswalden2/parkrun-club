import { PrismaClient } from "@prisma/client";

// This ensures that we're reusing the existing connection in a hot-reloading environment like Next.js in development mode.
// Global is used here to maintain a cached connection across hot reloads in development.

declare global {
    // Allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const db: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;
