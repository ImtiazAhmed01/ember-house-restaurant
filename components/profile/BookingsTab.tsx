"use client";

import Link from "next/link";
import { CalendarDays, X } from "lucide-react";
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
    <ul className="max-w-lg space-y-3">
      {reservations.map((r) => {
        const upcoming = new Date(`${r.date}T${r.time}`) >= new Date();
        return (
          <li
            key={r.id}
            className="flex items-start justify-between gap-3 rounded-card border border-ink/10 bg-white/40 p-4"
          >
            <div>
              <p className="font-display text-base text-ink">
                {formatDateLong(r.date)} · {formatTime12(r.time)}
              </p>
              <p className="mt-0.5 text-sm text-ink/55">Party of {r.partySize} · {r.name}</p>
              {r.notes && <p className="mt-1 text-xs text-ink/40">"{r.notes}"</p>}
              <span
                className={cx(
                  "mt-2 inline-block rounded-pill px-2.5 py-0.5 text-[10px] font-medium",
                  upcoming ? "bg-herb/15 text-herb" : "bg-ink/8 text-ink/45"
                )}
              >
                {upcoming ? "Upcoming" : "Past"}
              </span>
            </div>
            {upcoming && (
              <button
                onClick={() => {
                  cancelReservation(r.id);
                  push("Booking cancelled", "info");
                }}
                aria-label="Cancel booking"
                className="shrink-0 rounded-full p-2 text-ink/40 hover:bg-brick/10 hover:text-brick"
              >
                <X size={16} />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
