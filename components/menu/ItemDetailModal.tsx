"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Minus, Plus, X } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { DishVisual } from "@/components/menu/DishVisual";
import { Button } from "@/components/ui/Button";
import { money } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const TAG_LABEL: Record<string, string> = {
  veg: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  spicy: "Spicy",
  "contains-nuts": "Contains nuts",
};

export function ItemDetailModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const { push } = useToast();

  useEffect(() => {
    setQty(1);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label={item.name}
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] overflow-y-auto rounded-t-sheet bg-paper shadow-lift sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-card"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-ink/40 p-2 text-paper backdrop-blur-sm hover:bg-ink/60"
            >
              <X size={16} />
            </button>

            <DishVisual item={item} shape="banner" className="h-48 w-full !rounded-none sm:h-56" />

            <div className="p-6">
              <h3 className="font-display text-xl text-ink">{item.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{item.description}</p>

            {item.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-pill bg-herb/10 px-2.5 py-1 text-xs font-medium text-herb"
                  >
                    {TAG_LABEL[t]}
                  </span>
                ))}
                {item.spiceLevel > 0 && (
                  <span className="flex items-center gap-1 rounded-pill bg-brick/10 px-2.5 py-1 text-xs font-medium text-brick">
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                    Spice
                  </span>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-5">
              <p className="font-display text-xl text-ink">{money(item.price)}</p>
              {item.available ? (
                <div className="flex items-center gap-3 rounded-pill border border-ink/15 px-2 py-1.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink/5"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-ink/5"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ) : (
                <span className="text-sm font-medium text-ink/40">Sold out today</span>
              )}
            </div>

            <Button
              variant="secondary"
              size="lg"
              disabled={!item.available}
              onClick={() => {
                add(item, qty);
                push(`Added ${qty} × ${item.name} to your order`);
                onClose();
              }}
              className="mt-5 w-full"
            >
              {item.available ? `Add ${qty} to order · ${money(item.price * qty)}` : "Unavailable"}
            </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
