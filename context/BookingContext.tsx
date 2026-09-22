"use client";

import { createContext, useContext } from "react";
import { Reservation, WaitlistEntry } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { uid } from "@/lib/utils";

interface BookingContextValue {
  reservations: Reservation[];
  waitlist: WaitlistEntry[];
  hydrated: boolean;
  addReservation: (r: Omit<Reservation, "id" | "createdAt" | "status">) => Reservation;
  addWaitlist: (w: Omit<WaitlistEntry, "id" | "createdAt">) => WaitlistEntry;
  cancelReservation: (id: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations, hydratedA] = useLocalStorage<Reservation[]>(
    "eh_reservations",
    []
  );
  const [waitlist, setWaitlist, hydratedB] = useLocalStorage<WaitlistEntry[]>(
    "eh_waitlist",
    []
  );

  function addReservation(r: Omit<Reservation, "id" | "createdAt" | "status">) {
    const reservation: Reservation = {
      ...r,
      id: uid("RES").toUpperCase(),
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };
    setReservations((prev) => [reservation, ...prev]);
    return reservation;
  }

  function addWaitlist(w: Omit<WaitlistEntry, "id" | "createdAt">) {
    const entry: WaitlistEntry = {
      ...w,
      id: uid("WL").toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    setWaitlist((prev) => [entry, ...prev]);
    return entry;
  }

  function cancelReservation(id: string) {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <BookingContext.Provider
      value={{
        reservations,
        waitlist,
        hydrated: hydratedA && hydratedB,
        addReservation,
        addWaitlist,
        cancelReservation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
