"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GoogleButtonPlaceholder } from "@/components/auth/GoogleButtonPlaceholder";
import { useAuth } from "@/context/AuthContext";

function LoginRedirectWatcher() {
    const { user, hydrated } = useAuth();
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        if (hydrated && user) {
            router.replace(params.get("next") || "/profile");
        }
    }, [hydrated, user, router, params]);

    return null;
}

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-sm px-5 pt-16 sm:pt-24">
            <Suspense fallback={null}>
                <LoginRedirectWatcher />
            </Suspense>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-card border border-ink/10 bg-white/40 p-7 text-center"
            >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink text-base font-display font-semibold text-saffron-bright">
                    E
                </span>
                <h1 className="mt-4 font-display text-2xl text-ink">Sign in to Ember House</h1>
                <p className="mt-1.5 text-sm text-ink/55">
                    See your bookings and order history, and check out faster next time.
                </p>
                <div className="mt-6">
                    <GoogleButtonPlaceholder />
                </div>
            </motion.div>
        </div>
    );
}
