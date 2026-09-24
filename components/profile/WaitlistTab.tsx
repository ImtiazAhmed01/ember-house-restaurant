"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { formatDateLong } from "@/lib/utils";

export function WaitlistTab() {
  const { waitlist } = useBooking();

  if (waitlist.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Not on any waitlist"
        description="If you join a waitlist for a busy evening, it'll show up here."
        action={
          <Link href="/booking">
            <Button size="sm" variant="secondary">
              Check availability
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ul className="max-w-2xl grid gap-4 sm:grid-cols-2">
        {waitlist.map((w) => (
          <li
            key={w.id}
            className="flex flex-col justify-between gap-3 rounded-card border border-ink/10 bg-white/60 p-5 shadow-sm transition hover:shadow-md hover:border-ink/20"
          >
            <div>
              <p className="font-display text-lg text-ink">
                {formatDateLong(w.date)}
              </p>
              <p className="text-sm font-medium text-ink/70">
                {w.time === "any" ? "Any time" : w.time}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 text-xs font-semibold text-ink">
                  {w.partySize}
                </span>
                <span>Guests under "{w.name}"</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between border-t border-ink/8 pt-4">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-saffron/20 px-2.5 py-1 text-xs font-medium text-saffron-deep">
                <Clock size={12} /> Waitlisted
              </span>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="max-w-2xl flex justify-center border-t border-ink/10 pt-6">
        <Link href="/booking">
          <Button variant="secondary" className="flex items-center gap-2">
            Check other dates <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
