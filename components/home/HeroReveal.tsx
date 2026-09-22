"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MENU } from "@/lib/data/menu";
import { DishVisual } from "@/components/menu/DishVisual";
import { Button } from "@/components/ui/Button";

const available = MENU.filter((m) => m.available);
const withPhotos = available.filter((m) => m.image);
const withoutPhotos = available.filter((m) => !m.image);
const scatter = [...withPhotos, ...withoutPhotos].slice(0, 6);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroReveal() {
  return (
    <section className="relative overflow-hidden border-b border-ink/8 bg-gradient-to-b from-herb/[0.06] to-transparent px-5 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <motion.p
            variants={rise}
            className="text-xs font-medium uppercase tracking-wide text-brick"
          >
            Dhaka · wood-fired grill &amp; biryani house
          </motion.p>
          <motion.h1
            variants={rise}
            className="mt-3 max-w-[14ch] text-balance font-display text-4xl leading-[1.05] text-ink sm:text-6xl"
          >
            A table by the fire, or dinner at yours.
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-[42ch] text-base text-ink/60 sm:text-lg">
            Slow-cooked rice, live-coal grill, and a menu built around what's good today.
            Reserve a table or start an order — either way, we're ready for you.
          </motion.p>
          <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/booking">
              <Button size="lg" variant="secondary">
                Book a table
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline" className="group">
                View the menu
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div variants={rise} className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
          {scatter.map((item, i) => {
            const angle = (i / scatter.length) * Math.PI * 2;
            const radius = i % 2 === 0 ? 40 : 32;
            const top = 50 + Math.sin(angle) * radius;
            const left = 50 + Math.cos(angle) * radius;
            const size = i === 0 ? 108 : 64 + (i % 3) * 10;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.25 + i * 0.08,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute overflow-hidden rounded-full border-4 border-paper shadow-lift"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <DishVisual item={item} className="h-full w-full !rounded-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
