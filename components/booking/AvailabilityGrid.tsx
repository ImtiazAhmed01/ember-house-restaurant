"use client";

import { motion } from "framer-motion";
import { cx, formatTime12 } from "@/lib/utils";

export interface SlotState {
  time: string;
  tablesLeft: number;
  disabled: boolean;
}

export function AvailabilityGrid({
  slots,
  selected,
  onSelect,
  onWaitlist,
}: {
  slots: SlotState[];
  selected: string | null;
  onSelect: (time: string) => void;
  onWaitlist: (time: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => {
        const soldOut = slot.tablesLeft <= 0;
        const limited = slot.tablesLeft > 0 && slot.tablesLeft <= 1;
        const isSelected = selected === slot.time;

        if (slot.disabled) {
          return (
            <div
              key={slot.time}
              className="cursor-not-allowed rounded-card border border-ink/6 bg-ink/[0.02] px-2 py-2.5 text-center text-sm text-ink/25 line-through"
            >
              {formatTime12(slot.time)}
            </div>
          );
        }

        if (soldOut) {
          return (
            <button
              key={slot.time}
              onClick={() => onWaitlist(slot.time)}
              className="group flex flex-col items-center gap-0.5 rounded-card border border-dashed border-brick/30 bg-brick/[0.04] px-2 py-2 text-center transition-colors hover:border-brick/50 hover:bg-brick/[0.08]"
            >
              <span className="text-sm text-ink/50 line-through">{formatTime12(slot.time)}</span>
              <span className="text-[10px] font-medium text-brick">Join waitlist</span>
            </button>
          );
        }

        return (
          <motion.button
            key={slot.time}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(slot.time)}
            className={cx(
              "relative flex flex-col items-center gap-0.5 rounded-card border px-2 py-2.5 text-center transition-colors",
              isSelected
                ? "border-ink bg-ink text-paper"
                : "border-ink/12 bg-white/50 text-ink hover:border-ink/30"
            )}
          >
            <span className="text-sm font-medium">{formatTime12(slot.time)}</span>
            <span
              className={cx(
                "text-[10px] font-medium",
                isSelected ? "text-saffron-bright" : limited ? "text-brick" : "text-herb"
              )}
            >
              {limited ? "1 table left" : "Open"}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
