"use client";

import { createContext, useContext } from "react";
import { PlacedOrder } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { uid } from "@/lib/utils";

interface OrderContextValue {
  orders: PlacedOrder[];
  hydrated: boolean;
  placeOrder: (
    lines: { itemId: string; name: string; price: number; qty: number }[],
    type: PlacedOrder["type"]
  ) => PlacedOrder;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders, hydrated] = useLocalStorage<PlacedOrder[]>("eh_orders", []);

  function placeOrder(
    lines: { itemId: string; name: string; price: number; qty: number }[],
    type: PlacedOrder["type"]
  ) {
    const order: PlacedOrder = {
      id: uid("ORD").toUpperCase(),
      placedAt: new Date().toISOString(),
      lines,
      total: lines.reduce((s, l) => s + l.price * l.qty, 0),
      type,
      status: "received",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  return (
    <OrderContext.Provider value={{ orders, hydrated, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
