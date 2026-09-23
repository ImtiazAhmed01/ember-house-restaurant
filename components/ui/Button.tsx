import { ButtonHTMLAttributes, forwardRef } from "react";
import { cx } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const base =
            "inline-flex items-center justify-center gap-2 rounded-pill font-body font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]";
        const variants = {
            primary: "bg-ink text-paper hover:bg-ink-soft",
            secondary: "bg-saffron text-ink hover:bg-saffron-bright",
            outline: "border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/[0.03]",
            ghost: "text-ink/70 hover:bg-ink/5 hover:text-ink",
        };
        const sizes = {
            sm: "px-3.5 py-1.5 text-xs",
            md: "px-5 py-2.5 text-sm",
            lg: "px-7 py-3.5 text-base",
        };
        return (
            <button
                ref={ref}
                className={cx(base, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
