import type { Service } from "@/types/services";

export interface BaseCardProps {
  viewType?: "grid" | "list";
}

export interface ServiceCardProps<T extends Service> extends BaseCardProps {
  service: T;
}