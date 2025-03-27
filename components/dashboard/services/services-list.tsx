"use client";

import { useMemo } from "react";

import ServiceCard from "./service-card";

import { ServiceType } from "@/types/services";
import { mockServices } from "@/mock/_services";

interface ServicesListProps {
  type?: ServiceType;
  viewType?: "grid" | "list";
}

export default function ServicesList({
  type,
  viewType = "grid",
}: ServicesListProps) {
  const filteredServices = useMemo(() => {
    if (!type) return mockServices;

    return mockServices.filter((service) => service.type === type);
  }, [type]);

  const gridClasses =
    viewType === "grid" ? "grid grid-cols-1 lg:grid-cols-2" : "flex flex-col";

  return (
    <div className={`p-4 ${gridClasses} gap-4`}>
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} viewType={viewType} />
        ))
      ) : (
        <div className="col-span-full text-center p-4">
          <p className="text-default-500">No services found</p>
        </div>
      )}
    </div>
  );
}
