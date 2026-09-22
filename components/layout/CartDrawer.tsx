"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DishVisual } from "@/components/menu/DishVisual";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { money } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, detailedLines, setQty, remove, subtotal, itemCount } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Your cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-paper shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <h2 className="font-display text-xl text-ink">
                Your order {itemCount > 0 && <span className="text-ink/40">· {itemCount}</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {detailedLines.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your cart is empty"
                  description="Add a few dishes from the menu — they'll show up here, ready to order."
                  action={
                    <Link href="/menu" onClick={closeCart}>
                      <Button size="sm" variant="secondary">
                        Browse the menu
                      </Button>
                    </Link>
                  }
                />
              ) : (
                <ul className="space-y-4">
                  {detailedLines.map(({ item, qty }) => (
                    <li key={item.id} className="flex gap-3">
                      <DishVisual item={item} className="h-16 w-16 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-body text-sm font-medium text-ink">
                            {item.name}
                          </p>
                          <button
                            onClick={() => remove(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="shrink-0 text-ink/35 hover:text-brick"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-xs text-ink/50">{money(item.price)} each</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => setQty(item.id, qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/5"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">{qty}</span>
                          <button
                            onClick={() => setQty(item.id, qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/5"
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
              )}
            </div>

            {detailedLines.length > 0 && (
              <div className="border-t border-ink/8 px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-sm text-ink/60">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">{money(subtotal)}</span>
                </div>
                <Link href="/order" onClick={closeCart}>
                  <Button variant="secondary" size="lg" className="w-full">
                    Go to checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
