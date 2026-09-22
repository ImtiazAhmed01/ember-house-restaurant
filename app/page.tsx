import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, UtensilsCrossed } from "lucide-react";
import { MENU } from "@/lib/data/menu";
import { DishVisual } from "@/components/menu/DishVisual";
import { money } from "@/lib/utils";
import { HeroReveal } from "@/components/home/HeroReveal";

export default function HomePage() {
  const chefPicks = MENU.filter((m) => m.chefPick && m.available).slice(0, 3);

  return (
    <div>
      <HeroReveal />

      {/* Chef's picks */}
      <section className="px-5 pt-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brick">
              From the kitchen
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
              Tonight, the chef would order
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-ink/70 hover:text-ink sm:flex"
          >
            Full menu <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {chefPicks.map((item) => (
            <Link
              key={item.id}
              href="/menu"
              className="group flex items-center gap-4 rounded-card border border-ink/8 bg-white/40 p-4 transition-colors hover:border-ink/20 sm:flex-col sm:items-start sm:gap-3"
            >
              <DishVisual
                item={item}
                shape="banner"
                className="h-20 w-20 shrink-0 sm:h-40 sm:w-full"
              />
              <div className="min-w-0">
                <p className="font-display text-base text-ink">{item.name}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-ink/55">{item.description}</p>
                <p className="mt-1.5 text-sm font-medium text-brick">{money(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-ink/70 sm:hidden"
        >
          See the full menu <ArrowRight size={15} />
        </Link>
      </section>

      {/* Two paths */}
      <section className="grid grid-cols-1 gap-4 px-5 py-16 sm:grid-cols-2 sm:px-6">
        <Link
          href="/booking"
          className="group relative overflow-hidden rounded-card bg-ink px-7 py-8 text-paper transition-transform hover:-translate-y-0.5"
        >
          <CalendarDays size={22} className="text-saffron-bright" />
          <h3 className="mt-4 font-display text-xl">Book a table</h3>
          <p className="mt-1.5 max-w-[26ch] text-sm text-paper/65">
            Pick a date, time, and party size — we'll hold the table for you.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-saffron-bright">
            Check availability
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/menu"
          className="group relative overflow-hidden rounded-card bg-herb px-7 py-8 text-paper transition-transform hover:-translate-y-0.5"
        >
          <UtensilsCrossed size={22} className="text-paper" />
          <h3 className="mt-4 font-display text-xl">Order ahead</h3>
          <p className="mt-1.5 max-w-[26ch] text-sm text-paper/70">
            Browse the menu, build your order, and pick it up or have it delivered.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-paper">
            Start an order
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      <section className="px-5 pb-16 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-card border border-ink/8 bg-white/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-brick" />
            <p className="text-sm text-ink/70">
              Open daily, noon to 10pm. Live-fire grill, slow-dum biryani, and a table always
              worth booking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
