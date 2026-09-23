"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoogleButtonPlaceholder } from "@/components/auth/GoogleButtonPlaceholder";
import { DetailsTab } from "@/components/profile/DetailsTab";
import { BookingsTab } from "@/components/profile/BookingsTab";
import { OrdersTab } from "@/components/profile/OrdersTab";
import { useAuth } from "@/context/AuthContext";
import { cx } from "@/lib/utils";

const TABS = [
    { id: "details", label: "My details" },
    { id: "bookings", label: "Bookings" },
    { id: "orders", label: "Orders" },
] as const;

export default function ProfilePage() {
    const { user, hydrated } = useAuth();
    const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("details");

    if (hydrated && !user) {
        return (
            <div className="mx-auto max-w-sm px-5 pt-16 text-center sm:pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-card border border-ink/10 bg-white/40 p-7"
                >
                    <h1 className="font-display text-2xl text-ink">Your profile</h1>
                    <p className="mt-1.5 text-sm text-ink/55">
                        Sign in to see your bookings, past orders, and details in one place.
                    </p>
                    <div className="mt-6">
                        <GoogleButtonPlaceholder />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="px-5 pt-6 sm:px-6">
            <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wide text-brick">Account</p>
                <h1 className="mt-1 font-display text-3xl text-ink">Your profile</h1>
            </div>

            <div className="mb-6 flex gap-1 border-b border-ink/8">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={cx(
                            "relative px-3.5 py-2.5 text-sm font-medium transition-colors",
                            tab === t.id ? "text-ink" : "text-ink/45 hover:text-ink/70"
                        )}
                    >
                        {t.label}
                        {tab === t.id && (
                            <motion.span
                                layoutId="profile-tab"
                                className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-saffron"
                            />
                        )}
                    </button>
                ))}
            </div>

            {tab === "details" && <DetailsTab />}
            {tab === "bookings" && <BookingsTab />}
            {tab === "orders" && <OrdersTab />}
        </div>
    );
}
