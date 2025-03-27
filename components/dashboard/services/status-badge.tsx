"use client";

import { Chip } from "@heroui/react";

interface StatusBadgeProps {
  type: "src" | "stresser" | "api" | "c2";
  status: string;
}

const TYPE_COLORS = {
  src: "primary",
  stresser: "warning",
  api: "secondary",
  c2: "danger",
} as const;

export default function StatusBadge({ type, status }: StatusBadgeProps) {
  return (
    <div className="flex gap-2">
      <Chip color={TYPE_COLORS[type]} variant="flat">
        {type.toUpperCase()}
      </Chip>
      <Chip color={status.toLowerCase() === "active" ? "success" : "default"}>
        {status}
      </Chip>
    </div>
  );
}
