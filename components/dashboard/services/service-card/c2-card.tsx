import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

import BaseCard from "../base-card";

import { C2Service } from "@/types/services";

interface C2CardProps {
  service: C2Service;
  viewType?: "grid" | "list";
}

export function C2Card({ service, viewType = "grid" }: C2CardProps) {
  const isListView = viewType === "list";
  const [showCredentials, setShowCredentials] = useState(false);

  const credentials = {
    username: "admin_user",
    password: "secure_pass",
  };

  const toggleCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  const copyCredentials = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <BaseCard
      headerRight={
        <Button
          color="danger"
          startContent={
            <Icon icon="solar:shield-keyhole-minimalistic-linear" width={20} />
          }
          variant="flat"
        >
          Access Panel
        </Button>
      }
      service={service}
      viewType={viewType}
    >
      <div
        className={`w-full ${isListView ? "flex items-center justify-between gap-4" : ""}`}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-default-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-small font-semibold">Access Credentials</p>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={toggleCredentials}
              >
                <Icon
                  icon={
                    showCredentials
                      ? "solar:eye-closed-linear"
                      : "solar:eye-linear"
                  }
                  width={18}
                />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-default-100 rounded-md p-2">
                  <p className="text-tiny text-default-500">Username</p>
                  <p
                    className={`font-mono ${!showCredentials ? "blur-sm select-none" : ""}`}
                  >
                    {credentials.username}
                  </p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => copyCredentials(credentials.username)}
                >
                  <Icon icon="solar:copy-linear" width={16} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-default-100 rounded-md p-2">
                  <p className="text-tiny text-default-500">Password</p>
                  <p
                    className={`font-mono ${!showCredentials ? "blur-sm select-none" : ""}`}
                  >
                    {credentials.password}
                  </p>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => copyCredentials(credentials.password)}
                >
                  <Icon icon="solar:copy-linear" width={16} />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-small font-semibold mb-2">Available Servers</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.servers.map((server) => (
                <div
                  key={server.name}
                  className="flex items-center gap-2 p-2 rounded-lg bg-default-50"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      server.status === "online" ? "bg-success" : "bg-danger"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{server.name}</p>
                    <div className="flex items-center gap-2 text-tiny text-default-500">
                      <span>{server.region}</span>
                      <span>•</span>
                      <span>Port {server.port}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              startContent={<Icon icon="solar:chart-2-linear" width={18} />}
            >
              Server Status
            </Button>
            <Button
              size="sm"
              startContent={<Icon icon="solar:settings-linear" width={18} />}
            >
              Settings
            </Button>
          </div>
        </div>

        {!isListView && (
          <div className="mt-4 pt-4 border-t border-divider">
            <p className="text-small text-default-500">
              Use your credentials to access the C2 control panel. Click the eye
              icon to reveal credentials.
            </p>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
