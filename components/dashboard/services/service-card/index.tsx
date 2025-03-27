import { SRCCard } from "./src-card";
import { StresserCard } from "./stresser-card";
import APICard from "./api-card";
import { C2Card } from "./c2-card";

import { Service } from "@/types/services";

interface ServiceCardProps {
  service: Service;
  viewType?: "grid" | "list";
}

export default function ServiceCard({
  service,
  viewType = "grid",
}: ServiceCardProps) {
  switch (service.type) {
    case "src":
      return <SRCCard service={service} viewType={viewType} />;
    case "stresser":
      return <StresserCard service={service} viewType={viewType} />;
    case "api":
      return <APICard service={service} viewType={viewType} />;
    case "c2":
      return <C2Card service={service} viewType={viewType} />;
    default:
      return null;
  }
}
