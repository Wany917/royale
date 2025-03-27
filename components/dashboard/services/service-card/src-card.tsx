import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import BaseCard from "../base-card";

import { SRCService } from "@/types/services";

interface SRCCardProps {
  service: SRCService;
  viewType?: "grid" | "list";
}

export function SRCCard({ service, viewType = "grid" }: SRCCardProps) {
  const isListView = viewType === "list";

  return (
    <BaseCard
      headerRight={
        <Button
          color="primary"
          startContent={
            <Icon icon="solar:key-minimalistic-linear" width={20} />
          }
          variant="flat"
        >
          Copy License
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
            <p className="text-small font-semibold mb-1">License ID</p>
            <code className="text-sm bg-default-100 p-2 rounded-lg block">
              {service.licenseId.length > 35
                ? `${service.licenseId.slice(0, 35)}...`
                : service.licenseId}
            </code>
          </div>

          <div>
            <p className="text-small font-semibold mb-1">Features</p>
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="text-tiny bg-primary-50 text-primary-500 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-small font-semibold mb-1">Contact Us</p>
            <div className="flex gap-2">
              <Button
                as="a"
                href={service.contactInfo.discord}
                size="sm"
                startContent={
                  <Icon icon="solar:chat-square-like-linear" width={18} />
                }
                target="_blank"
              >
                Discord
              </Button>
              <Button
                as="a"
                href={service.contactInfo.telegram}
                size="sm"
                startContent={<Icon icon="solar:telegram-linear" width={18} />}
                target="_blank"
              >
                Telegram
              </Button>
            </div>
          </div>
        </div>

        {!isListView && (
          <div className="mt-4 pt-4 border-t border-divider">
            <p className="text-small text-default-500">
              Need help? Join our community on Discord or Telegram for support
              and updates.
            </p>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
