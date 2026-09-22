"use client";

import { useState } from "react";
import { MenuItem } from "@/lib/types";
import { DishArt } from "@/components/menu/DishArt";
import { cx } from "@/lib/utils";

export function DishVisual({
    item,
    shape = "square",
    className = "",
    sizes,
}: {
    item: MenuItem;
    shape?: "square" | "circle" | "banner";
    className?: string;
    sizes?: string;
}) {
    const [failed, setFailed] = useState(false);
    const showPhoto = Boolean(item.image) && !failed;

    const shapeClass =
        shape === "circle" ? "rounded-full" : shape === "banner" ? "rounded-card" : "rounded-card";

    if (!showPhoto) {
        return (
            <div className={cx(shapeClass, "overflow-hidden", className)}>
                <DishArt art={item.art} size="lg" className="h-full w-full !rounded-none" />
            </div>
        );
    }

    return (
        <div
            className={cx(
                shapeClass,
                "group/visual relative overflow-hidden bg-ink/5",
                className
            )}
        >
            {/* Gradient placeholder shows immediately, photo fades in on top */}
            <div className="absolute inset-0">
                <DishArt art={item.art} size="lg" className="h-full w-full !rounded-none" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                sizes={sizes}
                onError={() => setFailed(true)}
                className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover/visual:scale-105"
            />
        </div>
    );
}
