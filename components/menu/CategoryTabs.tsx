"use client";

import { motion } from "framer-motion";
import { cx } from "@/lib/utils";

export function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="no-scrollbar sticky top-0 z-30 -mx-5 flex gap-2 overflow-x-auto bg-paper/95 px-5 py-3 backdrop-blur sm:top-[65px] sm:mx-0 sm:px-0">
      {categories.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={cx(
              "relative shrink-0 rounded-pill px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-paper" : "text-ink/60 hover:text-ink"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-pill bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        );
      })}
    </div>
  );
}
