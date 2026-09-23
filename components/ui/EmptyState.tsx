import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-ink/15 bg-ink/[0.02] px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
        <Icon size={22} className="text-ink/40" strokeWidth={1.6} />
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg text-ink">{title}</p>
        <p className="mx-auto max-w-xs text-sm text-ink/55">{description}</p>
      </div>
      {action}
    </div>
  );
}
