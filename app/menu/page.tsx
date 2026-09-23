"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, Leaf } from "lucide-react";
import { MENU, CATEGORIES } from "@/lib/data/menu";
import { MenuItem } from "@/lib/types";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { ItemDetailModal } from "@/components/menu/ItemDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { cx } from "@/lib/utils";

export default function MenuPage() {
    const [active, setActive] = useState<string>(CATEGORIES[0]);
    const [query, setQuery] = useState("");
    const [vegOnly, setVegOnly] = useState(false);
    const [selected, setSelected] = useState<MenuItem | null>(null);

    const filtered = useMemo(() => {
        return MENU.filter((item) => {
            if (item.category !== active) return false;
            if (vegOnly && !item.tags.includes("veg") && !item.tags.includes("vegan")) return false;
            if (query.trim()) {
                const q = query.trim().toLowerCase();
                if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
                    return false;
                }
            }
            return true;
        });
    }, [active, query, vegOnly]);

    return (
        <div className="px-5 pt-6 sm:px-6">
            <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-wide text-brick">Menu</p>
                <h1 className="mt-1 font-display text-3xl text-ink">What&apos;s cooking today</h1>
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the menu…"
                        className="w-full rounded-pill border border-ink/12 bg-white/50 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 focus:border-ink/30 focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => setVegOnly((v) => !v)}
                    className={cx(
                        "flex shrink-0 items-center justify-center gap-1.5 rounded-pill border px-4 py-2.5 text-sm font-medium transition-colors",
                        vegOnly
                            ? "border-herb bg-herb text-paper"
                            : "border-ink/12 bg-white/50 text-ink/70 hover:border-ink/25"
                    )}
                >
                    <Leaf size={14} />
                    Veg only
                </button>
            </div>

            <CategoryTabs categories={CATEGORIES} active={active} onChange={setActive} />

            <div className="mt-4 pb-8">
                {filtered.length === 0 ? (
                    <EmptyState
                        icon={SearchX}
                        title="Nothing matches"
                        description={
                            query.trim()
                                ? `No dishes in ${active} match "${query.trim()}". Try another search or category.`
                                : `No dishes match your filters in ${active} right now.`
                        }
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {filtered.map((item) => (
                            <MenuItemCard key={item.id} item={item} onOpen={setSelected} />
                        ))}
                    </div>
                )}
            </div>

            <ItemDetailModal item={selected} onClose={() => setSelected(null)} />
        </div>
    );
}
