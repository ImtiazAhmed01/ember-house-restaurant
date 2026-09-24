"use client";

import Link from "next/link";
import { CalendarDays, X, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useToast } from "@/context/ToastContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { cx, formatDateLong, formatTime12 } from "@/lib/utils";

export function BookingsTab() {
  const { reservations, cancelReservation } = useBooking();
  const { push } = useToast();

  if (reservations.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No bookings yet"
        description="Once you reserve a table, it'll show up here with all the details."
        action={
          <Link href="/booking">
            <Button size="sm" variant="secondary">
              Book a table
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ul className="max-w-2xl grid gap-4 sm:grid-cols-2">
        {reservations.map((r) => {
          const upcoming = new Date(`${r.date}T${r.time}`) >= new Date();
          return (
            <li
              key={r.id}
              className={cx(
                "group relative flex flex-col justify-between gap-3 rounded-card border bg-white/60 p-5 shadow-sm transition duration-300 hover:shadow-md",
                upcoming ? "border-ink/10 hover:border-ink/20" : "border-ink/5 opacity-80 hover:opacity-100"
              )}
            >
              <div>
                <p className="font-display text-lg text-ink">
                  {formatDateLong(r.date)}
                </p>
                <p className="text-sm font-medium text-ink/70">
                  {formatTime12(r.time)}
                </p>
                
                <div className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 text-xs font-semibold text-ink">
                    {r.partySize}
                  </span>
                  <span>Guests under "{r.name}"</span>
                </div>
                
                {r.notes && (
                  <p className="mt-3 text-xs italic text-ink/50 bg-ink/5 p-2 rounded-md">
                    "{r.notes}"
                  </p>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-4">
                <span
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                    upcoming ? "bg-herb/15 text-herb" : "bg-ink/8 text-ink/45"
                  )}
                >
                  <CalendarDays size={12} />
                  {upcoming ? "Upcoming" : "Past"}
                </span>
                
                {upcoming && (
                  <button
                    onClick={() => {
                      cancelReservation(r.id);
                      push("Booking cancelled", "info");
                    }}
                    aria-label="Cancel booking"
                    className="shrink-0 rounded-full p-2 text-ink/40 transition hover:bg-brick/10 hover:text-brick"
                    title="Cancel booking"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      
      <div className="max-w-2xl flex justify-center border-t border-ink/10 pt-6">
        <Link href="/booking">
          <Button variant="secondary" className="flex items-center gap-2 shadow-sm hover:shadow">
            Book another table <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
