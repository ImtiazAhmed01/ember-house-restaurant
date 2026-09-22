"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserRound } from "lucide-react";
import { cx } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/booking", label: "Book a table" },
  { href: "/order", label: "Order ahead" },
];

export function NavBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-ink/8 bg-paper/90 backdrop-blur sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-display font-semibold text-saffron-bright">
            E
          </span>
          <span className="font-display text-lg tracking-tight text-ink">Ember House</span>
        </Link>

        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "rounded-pill px-4 py-2 font-body text-sm transition-colors",
                  active ? "bg-ink text-paper" : "text-ink/70 hover:text-ink hover:bg-ink/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative rounded-full p-2.5 text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brick px-1 text-[10px] font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-pill border border-ink/10 py-1.5 pl-1.5 pr-3.5 text-sm text-ink/80 transition-colors hover:border-ink/20 hover:text-ink"
          >
            {user ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-herb text-[11px] font-semibold text-paper">
                {user.name.charAt(0)}
              </span>
            ) : (
              <UserRound size={18} />
            )}
            {user ? user.name.split(" ")[0] : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
}
