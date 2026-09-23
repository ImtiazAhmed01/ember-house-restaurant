"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bike, CheckCircle2, Minus, Plus, ShoppingBag, Store, Trash2, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useToast } from "@/context/ToastContext";
import { DishVisual } from "@/components/menu/DishVisual";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { cx, money } from "@/lib/utils";
import { PlacedOrder } from "@/lib/types";

const ORDER_TYPES = [
    { id: "delivery" as const, label: "Delivery", icon: Bike, note: "35–45 min to your door" },
    { id: "pickup" as const, label: "Pickup", icon: Store, note: "Ready in 20 min" },
    { id: "dine-in" as const, label: "Dine-in", icon: UtensilsCrossed, note: "Fired as you arrive" },
];

const DELIVERY_FEE = 60;

export default function OrderPage() {
    const { detailedLines, setQty, remove, subtotal, clear } = useCart();
    const { placeOrder } = useOrders();
    const { push } = useToast();
    const [type, setType] = useState<(typeof ORDER_TYPES)[number]["id"]>("delivery");
    const [placed, setPlaced] = useState<PlacedOrder | null>(null);

    const fee = type === "delivery" ? DELIVERY_FEE : 0;
    const total = subtotal + fee;

    function handlePlaceOrder() {
        const lines = detailedLines.map((l) => ({
            itemId: l.item.id,
            name: l.item.name,
            price: l.item.price,
            qty: l.qty,
        }));
        const order = placeOrder(lines, type);
        setPlaced(order);
        clear();
        push("Order placed — thanks!");
    }

    if (placed) {
        return <OrderConfirmed order={placed} />;
    }

    return (
        <div className="px-5 pt-6 sm:px-6">
            <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wide text-brick">Checkout</p>
                <h1 className="mt-1 font-display text-3xl text-ink">Your order</h1>
            </div>

            {detailedLines.length === 0 ? (
                <EmptyState
                    icon={ShoppingBag}
                    title="Your cart is empty"
                    description="You haven't added anything yet. Browse the menu and add a few dishes to get started."
                    action={
                        <Link href="/menu">
                            <Button variant="secondary">Browse the menu</Button>
                        </Link>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.3fr_1fr]">
                    <div>
                        <ul className="space-y-4">
                            {detailedLines.map(({ item, qty }) => (
                                <li key={item.id} className="flex gap-4 border-b border-ink/8 pb-4">
                                    <DishVisual item={item} className="h-20 w-20 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="font-body text-sm font-medium text-ink">{item.name}</p>
                                            <button
                                                onClick={() => remove(item.id)}
                                                aria-label={`Remove ${item.name}`}
                                                className="text-ink/35 hover:text-brick"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                        <p className="text-xs text-ink/50">{money(item.price)} each</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                onClick={() => setQty(item.id, qty - 1)}
                                                aria-label="Decrease quantity"
                                                className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 hover:bg-ink/5"
                                            >
                                                <Minus size={13} />
                                            </button>
                                            <span className="w-5 text-center text-sm font-medium">{qty}</span>
                                            <button
                                                onClick={() => setQty(item.id, qty + 1)}
                                                aria-label="Increase quantity"
                                                className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 hover:bg-ink/5"
                                            >
                                                <Plus size={13} />
                                            </button>
                                            <span className="ml-auto text-sm font-medium text-ink">
                                                {money(item.price * qty)}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-fit space-y-5 rounded-card border border-ink/10 bg-white/40 p-5">
                        <div>
                            <p className="mb-2 text-xs font-medium text-ink/60">How would you like it?</p>
                            <div className="space-y-2">
                                {ORDER_TYPES.map((t) => {
                                    const Icon = t.icon;
                                    const isActive = type === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setType(t.id)}
                                            className={cx(
                                                "flex w-full items-center gap-3 rounded-card border px-3.5 py-2.5 text-left transition-colors",
                                                isActive
                                                    ? "border-ink bg-ink text-paper"
                                                    : "border-ink/12 bg-white/50 text-ink hover:border-ink/25"
                                            )}
                                        >
                                            <Icon size={17} />
                                            <span className="flex-1">
                                                <span className="block text-sm font-medium">{t.label}</span>
                                                <span className={cx("block text-xs", isActive ? "text-paper/60" : "text-ink/45")}>
                                                    {t.note}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-1.5 border-t border-ink/8 pt-4 text-sm">
                            <div className="flex justify-between text-ink/60">
                                <span>Subtotal</span>
                                <span>{money(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-ink/60">
                                <span>{type === "delivery" ? "Delivery fee" : "Service fee"}</span>
                                <span>{fee > 0 ? money(fee) : "Free"}</span>
                            </div>
                            <div className="flex justify-between border-t border-ink/8 pt-2 text-base font-semibold text-ink">
                                <span>Total</span>
                                <span>{money(total)}</span>
                            </div>
                        </div>

                        <Button variant="secondary" size="lg" onClick={handlePlaceOrder} className="w-full">
                            Place order · {money(total)}
                        </Button>
                        <p className="text-center text-[11px] text-ink/40">
                            This is a design demo — no payment is taken and nothing is really sent to a
                            kitchen.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function OrderConfirmed({ order }: { order: PlacedOrder }) {
    const steps = ["received", "preparing", "ready", "completed"] as const;
    const activeIndex = steps.indexOf(order.status);

    return (
        <div className="px-5 pt-10 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-lg rounded-card border border-herb/25 bg-herb/[0.05] p-7 text-center"
            >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-herb text-paper">
                    <CheckCircle2 size={22} />
                </div>
                <h1 className="mt-4 font-display text-2xl text-ink">Order placed</h1>
                <p className="mt-1.5 text-sm text-ink/60">
                    {order.lines.reduce((s, l) => s + l.qty, 0)} items · {money(order.total)}
                </p>
                <p className="mt-2 inline-block rounded-pill bg-white px-4 py-1.5 font-mono text-xs text-ink/60">
                    {order.id}
                </p>

                <div className="mt-7 flex items-center justify-between">
                    {steps.map((s, i) => (
                        <div key={s} className="flex flex-1 flex-col items-center">
                            <div className="flex w-full items-center">
                                <span
                                    className={cx(
                                        "h-2 w-2 shrink-0 rounded-full",
                                        i <= activeIndex ? "bg-saffron" : "bg-ink/15"
                                    )}
                                />
                                {i < steps.length - 1 && (
                                    <span className={cx("h-[2px] flex-1", i < activeIndex ? "bg-saffron" : "bg-ink/10")} />
                                )}
                            </div>
                            <span className={cx("mt-1.5 text-[10px] capitalize", i <= activeIndex ? "text-ink" : "text-ink/35")}>
                                {s}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/menu">
                        <Button variant="secondary" className="w-full">
                            Order something else
                        </Button>
                    </Link>
                    <Link href="/profile">
                        <Button variant="outline" className="w-full">
                            View past orders
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
