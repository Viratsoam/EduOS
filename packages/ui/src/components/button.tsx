import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/class-names";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-zinc-950 text-white hover:bg-zinc-800",
  secondary: "border border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-50",
  ghost: "text-zinc-700 hover:bg-zinc-100",
};

export function Button({
  children,
  className,
  icon,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
