"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { money } from "@/lib/utils";

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
    <ul className="max-w-lg space-y-3">
      {orders.map((o) => (
        <li key={o.id} className="rounded-card border border-ink/10 bg-white/40 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display text-base capitalize text-ink">{o.type}</p>
              <p className="text-xs text-ink/45">
                {new Date(o.placedAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span className="rounded-pill bg-saffron/20 px-2.5 py-1 text-[10px] font-medium capitalize text-saffron-deep">
              {o.status}
            </span>
          </div>
          <ul className="mt-3 space-y-1 border-t border-ink/8 pt-3 text-sm text-ink/65">
            {o.lines.map((l) => (
              <li key={l.itemId} className="flex justify-between">
                <span>
                  {l.qty} × {l.name}
                </span>
                <span>{money(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between border-t border-ink/8 pt-2 text-sm font-semibold text-ink">
            <span>Total</span>
            <span>{money(o.total)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
