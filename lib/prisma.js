// this file for sending DB queries.

// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@/lib/generated/prisma";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}

// globalThis.prisma : this global variable ensures that the Prishma client instance is
// reused across hot reloads during development. Without this each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading to 
// connection issues.