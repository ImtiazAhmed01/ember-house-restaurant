"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoogleButtonPlaceholder } from "@/components/auth/GoogleButtonPlaceholder";
import { DetailsTab } from "@/components/profile/DetailsTab";
import { BookingsTab } from "@/components/profile/BookingsTab";
import { OrdersTab } from "@/components/profile/OrdersTab";
import { WaitlistTab } from "@/components/profile/WaitlistTab";
import { useAuth } from "@/context/AuthContext";
import { cx } from "@/lib/utils";

const TABS = [
    { id: "details", label: "My details" },
    { id: "bookings", label: "Bookings" },
    { id: "waitlist", label: "Waitlist" },
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
        <div className="mx-auto max-w-4xl px-5 pt-6 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brick/80">Account</p>
                <h1 className="mt-2 font-display text-4xl text-ink">Your profile</h1>
            </div>

            <div className="mb-8 flex gap-2 border-b border-ink/10 overflow-x-auto no-scrollbar">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={cx(
                            "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
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

            <div className="mt-6">
                {tab === "details" && <DetailsTab />}
                {tab === "bookings" && <BookingsTab />}
                {tab === "waitlist" && <WaitlistTab />}
                {tab === "orders" && <OrdersTab />}
            </div>
        </div>
    );
}
