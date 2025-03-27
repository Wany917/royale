"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import ServicesList from "./services-list";

import { ServiceType } from "@/types/services";

type ViewType = "grid" | "list";

const serviceCategories = [
  { key: "all", label: "All Services", icon: "solar:widget-2-linear" },
  { key: "src", label: "SRC", icon: "solar:code-square-linear" },
  { key: "api", label: "API", icon: "solar:api-linear" },
  { key: "stresser", label: "Stresser", icon: "solar:server-square-linear" },
  { key: "c2", label: "C2", icon: "solar:shield-minimalistic-linear" },
] as const;

export default function Services() {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [selectedTab, setSelectedTab] = useState<string>("all");

  return (
    <div className="max-w-[1800px] mx-auto">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Active Services</h1>
            <p className="text-small text-default-500">
              Manage your active services and subscriptions
            </p>
          </div>
          <div className="flex gap-2">
            <Tooltip content="Grid view">
              <Button
                isIconOnly
                className={viewType === "grid" ? "bg-default-100" : ""}
                variant="light"
                onPress={() => setViewType("grid")}
              >
                <Icon icon="solar:widget-2-linear" width={20} />
              </Button>
            </Tooltip>
            <Tooltip content="List view">
              <Button
                isIconOnly
                className={viewType === "list" ? "bg-default-100" : ""}
                variant="light"
                onPress={() => setViewType("list")}
              >
                <Icon icon="solar:list-linear" width={20} />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs
            aria-label="Service types"
            selectedKey={selectedTab}
            size="lg"
            onSelectionChange={(key) => setSelectedTab(key.toString())}
          >
            {serviceCategories.map((category) => (
              <Tab
                key={category.key}
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon={category.icon} width={20} />
                    {category.label}
                  </div>
                }
              >
                <ServicesList
                  type={
                    category.key === "all"
                      ? undefined
                      : (category.key as ServiceType)
                  }
                  viewType={viewType}
                />
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
