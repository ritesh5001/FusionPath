import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            isPaid?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        isPaid?: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        isPaid?: boolean;
    }
}
