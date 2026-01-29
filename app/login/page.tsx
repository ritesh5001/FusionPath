
import { signIn } from "@/auth"
import LoginClient from "./LoginClient"

export default function LoginPage() {
    return (
        <LoginClient
            signInAction={async (formData) => {
                "use server"
                const email = String(formData.get("email") || "").trim()
                const password = String(formData.get("password") || "")
                await signIn("credentials", { email, password, redirectTo: "/dashboard" })
            }}
            googleSignInAction={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
            }}
        />
    )
}
