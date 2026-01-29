import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongo-client"
import dbConnect from "@/lib/mongodb"
import User, { IUser } from "@/models/User"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = String(credentials?.email || "").trim().toLowerCase()
                const password = String(credentials?.password || "")
                if (!email || !password) return null
                await dbConnect()
                const user = await User.findOne({ email }).lean<IUser>()
                if (!user?.passwordHash) return null

                const isValid = await bcrypt.compare(password, String(user.passwordHash))
                if (!isValid) return null

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    isPaid: user.isPaid ?? false,
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.isPaid = (user as { isPaid?: boolean }).isPaid ?? false;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
})
