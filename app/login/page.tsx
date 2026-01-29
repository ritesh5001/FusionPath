
import { signIn } from "@/auth"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        30-Day DSA Tracker
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to track your progress
                    </p>
                </div>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google", { redirectTo: "/dashboard" })
                    }}
                    className="mt-8 space-y-6"
                >
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in with Google
                    </button>
                </form>
            </div>
        </div>
    )
}
