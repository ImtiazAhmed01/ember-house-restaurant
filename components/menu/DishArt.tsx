import { Leaf, Flame, Fish, Wheat, Drumstick, Soup, CakeSlice, CupSoda } from "lucide-react";
import { MenuItem } from "@/lib/types";

const ICONS = {
    leaf: Leaf,
    flame: Flame,
    fish: Fish,
    wheat: Wheat,
    drumstick: Drumstick,
    soup: Soup,
    cake: CakeSlice,
    cup: CupSoda,
} as const;

export function DishArt({
    art,
    size = "md",
    className = "",
}: {
    art: MenuItem["art"];
    size?: "sm" | "md" | "lg";
    className?: string;
}) {
    const Icon = ICONS[art.icon];
    const dims = size === "lg" ? 96 : size === "md" ? 56 : 40;
    const iconSize = size === "lg" ? 40 : size === "md" ? 24 : 18;
    const gradientId = `${art.icon}-${art.from.replace("#", "")}-${art.to.replace("#", "")}`;

    return (
        <div
            className={`relative shrink-0 overflow-hidden rounded-card ${className}`}
            style={{ width: dims, height: dims }}
            aria-hidden="true"
        >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs>
                    <radialGradient id={gradientId} cx="30%" cy="30%" r="80%">
                        <stop offset="0%" stopColor={art.to} stopOpacity="1" />
                        <stop offset="100%" stopColor={art.from} stopOpacity="1" />
                    </radialGradient>
                </defs>
                <rect width="100" height="100" fill={`url(#${gradientId})`} />
                <circle cx="78" cy="18" r="30" fill="white" opacity="0.06" />
                <circle cx="10" cy="92" r="26" fill="black" opacity="0.08" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <Icon size={iconSize} strokeWidth={1.6} className="text-white/90" />
            </div>
        </div>
    );
}
