"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, UserRound } from "lucide-react";
import { cx } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/booking", label: "Book", icon: CalendarDays },
  { href: "/order", label: "Order", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: UserRound },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-paper/95 backdrop-blur sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex items-stretch justify-between px-1">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className="relative flex flex-col items-center gap-1 py-2.5 text-[11px]"
              >
                <span className="relative">
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={active ? "text-ink" : "text-ink/45"}
                  />
                  {tab.href === "/order" && itemCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-brick px-0.5 text-[9px] font-semibold text-paper">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className={cx(active ? "font-medium text-ink" : "text-ink/45")}>
                  {tab.label}
                </span>
                {active && (
                  <span className="absolute -top-[1px] h-[2px] w-8 rounded-full bg-saffron" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
