"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CartLine, MenuItem } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { MENU } from "@/lib/data/menu";

interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: MenuItem, qty?: number) => void;
  setQty: (itemId: string, qty: number) => void;
  remove: (itemId: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  detailedLines: { item: MenuItem; qty: number }[];
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines, hydrated] = useLocalStorage<CartLine[]>("eh_cart", []);
  const [isOpen, setIsOpen] = useState(false);

  function add(item: MenuItem, qty = 1) {
    if (!item.available) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.itemId === item.id);
      if (existing) {
        return prev.map((l) => (l.itemId === item.id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { itemId: item.id, qty }];
    });
    setIsOpen(true);
  }

  function setQty(itemId: string, qty: number) {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.itemId !== itemId);
      return prev.map((l) => (l.itemId === itemId ? { ...l, qty } : l));
    });
  }

  function remove(itemId: string) {
    setLines((prev) => prev.filter((l) => l.itemId !== itemId));
  }

  function clear() {
    setLines([]);
  }

  const detailedLines = useMemo(
    () =>
      lines
        .map((l) => {
          const item = MENU.find((m) => m.id === l.itemId);
          return item ? { item, qty: l.qty } : null;
        })
        .filter((x): x is { item: MenuItem; qty: number } => x !== null),
    [lines]
  );

  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = detailedLines.reduce((sum, l) => sum + l.item.price * l.qty, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        hydrated,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        add,
        setQty,
        remove,
        clear,
        itemCount,
        subtotal,
        detailedLines,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
