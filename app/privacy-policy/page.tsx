export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 px-6 py-16">
            <div className="mx-auto w-full max-w-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-white/20 dark:border-slate-700/50">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Privacy Policy</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Effective date: 30 January 2026</p>

                <div className="space-y-6 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                    <p>
                        This Privacy Policy explains how FusionPath collects, uses, and protects your personal information.
                    </p>
                    <div className="space-y-3">
                        <p className="font-semibold text-slate-900 dark:text-white">Information we collect</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Email address and name for account creation and authentication.</li>
                            <li>Profile image (if provided by OAuth providers).</li>
                            <li>Progress data related to your dashboard usage.</li>
                            <li>Payment status (not full payment details).</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <p className="font-semibold text-slate-900 dark:text-white">How we use information</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide and improve the FusionPath service.</li>
                            <li>Authenticate users and secure accounts.</li>
                            <li>Maintain progress tracking and access control.</li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <p className="font-semibold text-slate-900 dark:text-white">Data protection</p>
                        <p>
                            We use reasonable security measures to protect your data. We do not sell your personal
                            information.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p className="font-semibold text-slate-900 dark:text-white">Contact</p>
                        <p>Questions or requests: <span className="font-medium">nextgenfusion.dev@gmail.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
