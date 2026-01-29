import { signIn } from "@/auth"
import SignupClient from "./SignupClient"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export default function SignupPage() {
    return (
        <SignupClient
            signUpAction={async (formData) => {
                "use server"
                const name = String(formData.get("name") || "").trim()
                const email = String(formData.get("email") || "").trim().toLowerCase()
                const password = String(formData.get("password") || "")

                if (!name || !email || !password) return

                await dbConnect()
                const existing = await User.findOne({ email })
                if (existing) return

                const passwordHash = await bcrypt.hash(password, 10)
                await User.create({ name, email, passwordHash, isPaid: false })

                await signIn("credentials", { email, password, redirectTo: "/pay" })
            }}
        />
    )
}
