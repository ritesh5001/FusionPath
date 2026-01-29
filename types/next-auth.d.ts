import NextAuth, { DefaultSession } from "next-auth";

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
