import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  trend?: {
    value: number;
    isUpward: boolean;
  };
}

export default function StatsCard({ title, value, icon, color = "primary", trend }: StatsCardProps) {
  return (
    <Card className="border-none">
      <CardBody className="gap-2">
        <div className="flex justify-between">
          <div className={`rounded-lg bg-${color}/10 p-3`}>
            <Icon
              className={`text-${color}`}
              icon={icon}
              width={24}
            />
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              <Icon
                className={trend.isUpward ? "text-success" : "text-danger"}
                icon={trend.isUpward ? "solar:arrow-up-linear" : "solar:arrow-down-linear"}
                width={18}
              />
              <span className={`text-small ${trend.isUpward ? "text-success" : "text-danger"}`}>
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-small text-default-500">{title}</span>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
      </CardBody>
    </Card>
  );
}