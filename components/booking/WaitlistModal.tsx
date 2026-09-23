"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDateLong, formatTime12 } from "@/lib/utils";

export interface WaitlistRequest {
  date: string;
  time: string;
  partySize: number;
}

export function WaitlistModal({
  request,
  onClose,
  onSubmit,
}: {
  request: WaitlistRequest | null;
  onClose: () => void;
  onSubmit: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const canSubmit = name.trim().length > 1 && phone.trim().length >= 7;

  return (
    <AnimatePresence>
      {request && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="Join the waitlist"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[90] w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-card bg-paper p-6 shadow-lift"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-ink/5 p-2 text-ink/60 hover:bg-ink/10 hover:text-ink"
            >
              <X size={16} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brick/10 text-brick">
              <ListPlus size={18} />
            </div>
            <h3 className="mt-3 font-display text-xl text-ink">Join the waitlist</h3>
            <p className="mt-1 text-sm text-ink/60">
              {request.time === "any"
                ? `We'll call you if a table for ${request.partySize} opens up on ${formatDateLong(request.date)}.`
                : `Fully booked for ${formatTime12(request.time)} on ${formatDateLong(
                    request.date
                  )}. We'll call you first if a table for ${request.partySize} opens up nearby.`}
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/60">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-card border border-ink/15 bg-white/60 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/60">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-card border border-ink/15 bg-white/60 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
                />
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              disabled={!canSubmit}
              onClick={() => onSubmit(name.trim(), phone.trim())}
              className="mt-5 w-full"
            >
              Join the waitlist
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
