"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

import StatusBadge from "./status-badge";

import { Service } from "@/types/services";

interface BaseCardProps {
  service: Service;
  viewType?: "grid" | "list";
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}

export default function BaseCard({
  service,
  viewType = "grid",
  headerRight,
  children,
}: BaseCardProps) {
  const isListView = viewType === "list";

  return (
    <Card className={`w-full ${isListView ? "max-w-full" : ""}`}>
      <CardHeader className="flex justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <StatusBadge status={service.status} type={service.type} />
          </div>
          <p className="text-small text-default-500">
            Expires: {new Date(service.expiryDate).toLocaleDateString()}
          </p>
        </div>
        {headerRight}
      </CardHeader>
      <Divider />
      <CardBody
        className={`gap-4 ${isListView ? "flex-row items-center" : ""}`}
      >
        {children}
      </CardBody>
    </Card>
  );
}
