import type { ReactNode } from "react";
import { cn } from "../lib/class-names";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "blue" | "green" | "neutral" | "red";
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  red: "bg-red-50 text-red-700 ring-red-200",
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
