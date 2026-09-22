"use client";

import { Flame, Plus } from "lucide-react";
import { MenuItem } from "@/lib/types";
import { DishVisual } from "@/components/menu/DishVisual";
import { money, cx } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export function MenuItemCard({
  item,
  onOpen,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
}) {
  const { add } = useCart();
  const { push } = useToast();

  function quickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (!item.available) return;
    add(item, 1);
    push(`Added ${item.name} to your order`);
  }

  return (
    <button
      onClick={() => onOpen(item)}
      className={cx(
        "group flex w-full items-start gap-4 rounded-card border border-ink/8 bg-white/40 p-4 text-left transition-all",
        item.available ? "hover:border-ink/20 hover:bg-white/70" : "opacity-60"
      )}
    >
      <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
        <DishVisual item={item} className="h-full w-full" />
        {!item.available && (
          <span className="absolute inset-0 flex items-center justify-center rounded-card bg-ink/50 text-[10px] font-semibold uppercase tracking-wide text-paper backdrop-blur-[1px]">
            Sold out
          </span>
        )}
        {item.image && item.available && (item.popular || item.chefPick) && (
          <span className="absolute left-1.5 top-1.5 rounded-pill bg-ink/70 px-2 py-0.5 text-[9px] font-medium text-paper backdrop-blur-sm">
            {item.chefPick ? "Chef's pick" : "Popular"}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-base text-ink">{item.name}</p>
          <p className="shrink-0 font-body text-sm font-medium text-ink">{money(item.price)}</p>
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-ink/55">{item.description}</p>

        <div className="mt-2 flex items-center gap-2">
          {item.spiceLevel > 0 && (
            <span className="flex items-center gap-0.5 text-brick">
              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                <Flame key={i} size={11} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
          )}
          {item.popular && (
            <span className="rounded-pill bg-saffron/20 px-2 py-0.5 text-[10px] font-medium text-saffron-deep">
              Popular
            </span>
          )}
          {item.chefPick && (
            <span className="rounded-pill bg-herb/15 px-2 py-0.5 text-[10px] font-medium text-herb">
              Chef's pick
            </span>
          )}

          {item.available && (
            <span
              role="button"
              onClick={quickAdd}
              aria-label={`Add ${item.name} to order`}
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:scale-105 active:scale-95"
            >
              <Plus size={14} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
