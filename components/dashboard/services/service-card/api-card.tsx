import { Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import BaseCard from "../base-card";

import { APIService } from "@/types/services";

interface APICardProps {
  service: APIService;
  viewType?: "grid" | "list";
}

export default function APICard({ service, viewType = "grid" }: APICardProps) {
  const router = useRouter();
  const isListView = viewType === "list";
  const requestPercentage =
    (service.requests.used / service.requests.limit) * 100;

  return (
    <BaseCard
      headerRight={
        <Button
          color="secondary"
          startContent={<Icon icon="solar:code-square-linear" width={20} />}
          variant="flat"
          onPress={() => router.push("/dashboard/api-manager")}
        >
          API Manager
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
            <p className="text-small font-semibold mb-1">Plan</p>
            <div className="flex gap-2 items-center">
              <p className="text-xl font-bold text-secondary">{service.plan}</p>
              {service.rateLimit && (
                <span className="text-tiny bg-secondary-50 text-secondary-500 px-2 py-1 rounded-full">
                  {service.rateLimit} rate limit
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <p className="text-small font-semibold">API Requests</p>
              <p className="text-small text-default-500">
                {service.requests.used.toLocaleString()} /{" "}
                {service.requests.limit.toLocaleString()}
              </p>
            </div>
            <Progress color="secondary" size="sm" value={requestPercentage} />
          </div>

          {service.endpoints && (
            <div>
              <p className="text-small font-semibold mb-1">
                Available Endpoints
              </p>
              <div className="flex flex-wrap gap-2">
                {service.endpoints.map((endpoint) => (
                  <code
                    key={endpoint}
                    className="text-xs bg-default-100 px-2 py-1 rounded"
                  >
                    {endpoint}
                  </code>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isListView && (
          <div className="mt-4 pt-4 border-t border-divider">
            <p className="text-small text-default-500">
              Visit the API Manager for documentation and detailed usage
              analytics.
            </p>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
