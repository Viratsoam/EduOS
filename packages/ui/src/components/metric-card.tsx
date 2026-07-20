import type { ReactNode } from "react";

export interface MetricCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
  detail: string;
}

export function MetricCard({ detail, icon, label, value }: MetricCardProps) {
  return (
    <article className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{value}</p>
        </div>
        {icon ? <div className="rounded-md bg-zinc-100 p-2 text-zinc-700">{icon}</div> : null}
      </div>
      <p className="mt-3 text-sm text-zinc-600">{detail}</p>
    </article>
  );
}
