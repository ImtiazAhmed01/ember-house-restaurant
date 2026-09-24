"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { money } from "@/lib/utils";
import { MENU } from "@/lib/data/menu";
import { DishVisual } from "@/components/menu/DishVisual";

export function OrdersTab() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="No orders yet"
        description="Your past orders will land here, so you can reorder your favourites in a couple of taps."
        action={
          <Link href="/menu">
            <Button size="sm" variant="secondary">
              Browse the menu
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ul className="max-w-2xl space-y-5">
        {orders.map((o) => (
          <li key={o.id} className="overflow-hidden rounded-card border border-ink/10 bg-white/60 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center justify-between border-b border-ink/8 bg-white/40 px-5 py-4">
              <div>
                <p className="font-display text-lg capitalize text-ink flex items-center gap-2">
                  {o.type} Order
                  <span className="rounded-pill bg-saffron/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron-deep">
                    {o.status}
                  </span>
                </p>
                <p className="text-xs text-ink/50 mt-1 font-medium">
                  {new Date(o.placedAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-1">Total</p>
                <p className="font-display text-xl text-brick">{money(o.total)}</p>
              </div>
            </div>
            
            <ul className="px-5 py-2 divide-y divide-ink/8">
              {o.lines.map((l) => {
                const menuItem = MENU.find(m => m.id === l.itemId);
                return (
                  <li key={l.itemId} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-stone-100 shadow-sm">
                        {menuItem ? (
                          <DishVisual item={menuItem} shape="square" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-ink/5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-ink text-base">{l.name}</p>
                        <p className="text-sm text-ink/50 mt-0.5 font-medium">Qty: {l.qty} × {money(l.price)}</p>
                      </div>
                    </div>
                    <p className="font-medium text-ink/80">{money(l.price * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      
      <div className="max-w-2xl flex justify-center border-t border-ink/10 pt-6">
        <Link href="/menu">
          <Button variant="secondary" className="flex items-center gap-2 shadow-sm hover:shadow">
            Start a new order <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
