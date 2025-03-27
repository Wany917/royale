import { Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import BaseCard from "../base-card";

import { StresserService } from "@/types/services";

interface StresserCardProps {
  service: StresserService;
  viewType?: "grid" | "list";
}

export function StresserCard({
  service,
  viewType = "grid",
}: StresserCardProps) {
  const router = useRouter();
  const isListView = viewType === "list";

  return (
    <BaseCard
      headerRight={
        <Button
          color="warning"
          startContent={<Icon icon="solar:chart-linear" width={20} />}
          variant="flat"
          onPress={() => router.push("/dashboard/stresser")}
        >
          Open Dashboard
        </Button>
      }
      service={service}
      viewType={viewType}
    >
      <div
        className={`w-full ${isListView ? "flex items-center justify-between" : ""}`}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-small font-semibold mb-1">Power Capacity</p>
            <p className="text-xl font-bold text-warning-600">
              {service.maxPower}
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <p className="text-small font-semibold">Concurrent Attacks</p>
              <p className="text-small text-default-500">
                {service.concurrentAttacks} max
              </p>
            </div>
            <Progress
              color="warning"
              size="sm"
              value={(service.concurrentAttacks / 10) * 100}
            />
          </div>

          <div className="flex gap-2">
            <Button
              color="warning"
              size="sm"
              startContent={<Icon icon="solar:chart-2-linear" width={18} />}
              variant="flat"
            >
              View Statistics
            </Button>
            <Button
              color="warning"
              size="sm"
              startContent={<Icon icon="solar:history-linear" width={18} />}
              variant="flat"
            >
              Attack History
            </Button>
          </div>
        </div>

        {!isListView && (
          <div className="mt-4 pt-4 border-t border-divider">
            <p className="text-small text-default-500">
              Access your stresser dashboard to launch attacks and view detailed
              statistics.
            </p>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
