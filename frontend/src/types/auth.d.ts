// types/next-auth.d.ts
import { Session } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

// Extend the built-in session/user types
declare module "next-auth" {
    /**
     * Type for `session.user` which includes fields from Prisma's User model
     */
    interface User extends PrismaUser {
        username: string?;
        subid: string?;
    }

    /**
     * Update the session type to use the extended user type
     */
    interface Session {
        user: User;
    }
}
