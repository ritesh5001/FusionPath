import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongo-client"
import dbConnect from "@/lib/mongodb"
import User, { IUser } from "@/models/User"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    providers: [
        Google,
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.isPaid = (user as { isPaid?: boolean }).isPaid ?? false
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id || "")
                session.user.isPaid = (token as { isPaid?: boolean }).isPaid ?? false
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
