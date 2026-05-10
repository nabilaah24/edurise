import React from "react";
import { Icon, IconProps } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  icon: IconProps["type"];
  emptyState?: string;
  label: string;
  value: number;
  className?: HTMLDivElement["className"];
}

function SummaryCard({
  icon,
  emptyState,
  value,
  label,
  className,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 flex flex-row md:flex-col lg:flex-row gap-2 md:gap-6 items-center",
        className,
      )}
    >
      <div className="size-15 flex items-center justify-center rounded-full bg-white-subtle">
        <Icon type={icon} className="size-8" />
      </div>
      {emptyState || (
        <div className="space-y-1.5">
          <div className="font-medium font-poppins text-2xl">{value}</div>
          <div>{label}</div>
        </div>
      )}
    </div>
  );
}

export { SummaryCard };
export type { SummaryCardProps };
