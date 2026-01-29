import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import PayClient from "./PayClient"

export default async function PayPage() {
    const session = await auth()
    if (!session?.user) redirect("/login")

    await dbConnect()
    const user = await User.findById(session.user.id).lean()
    if (user?.isPaid) redirect("/dashboard")

    return <PayClient logoutAction={logoutAction} />
}

async function logoutAction() {
    "use server"
    await signOut({ redirectTo: "/login" })
}
