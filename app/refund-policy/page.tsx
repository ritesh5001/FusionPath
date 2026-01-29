export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-violet-950 px-6 py-16">
            <div className="mx-auto w-full max-w-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-indigo-500/10 border border-white/20 dark:border-slate-700/50">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Refund Policy</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Effective date: 30 January 2026</p>

                <div className="space-y-6 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                    <p>
                        FusionPath offers a one-time payment for lifetime access to the dashboard. All payments are final.
                    </p>
                    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 p-5">
                        <p className="font-semibold text-slate-900 dark:text-white mb-2">No refunds after payment</p>
                        <p>
                            Once payment is completed and access is granted, we do not offer refunds or chargebacks for any
                            reason. Please ensure that FusionPath meets your needs before purchasing.
                        </p>
                    </div>
                    <p>
                        If you experience technical issues that prevent access, please contact us and we will help resolve
                        the problem.
                    </p>
                    <p>
                        Support: <span className="font-medium">nextgenfusion.dev@gmail.com</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
