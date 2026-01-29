
import { signIn } from "@/auth"
import LoginClient from "./LoginClient"

export default function LoginPage() {
    return (
        <LoginClient
            signInAction={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
            }}
        />
    )
}
