"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  SelectItem,
  Select,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import StatsCard from "./stats-card";
import AttackHeatmap from "./attack-heatmap";
import DynamicGraph from "./dynamic-graph";

import { mockStats, mockTickets } from "@/mock/_attack-data";

const methods = [
  { label: "HTTP", value: "http" },
  { label: "HTTPS", value: "https" },
  { label: "TCP", value: "tcp" },
  { label: "UDP", value: "udp" },
  { label: "ICMP", value: "icmp" },
];

export default function Overview() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!isClient) return ""; // Ne pas rendre la date côté serveur

    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-[1800px] mx-auto p-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatsCard
          color="primary"
          icon="solar:shield-minimalistic-broken"
          title="Total Attacks"
          trend={mockStats.totalAttacks.trend}
          value={mockStats.totalAttacks.value}
        />
        <StatsCard
          color="warning"
          icon="solar:fire-linear"
          title="Active Attacks"
          trend={mockStats.activeAttacks.trend}
          value={mockStats.activeAttacks.value}
        />
        <StatsCard
          color="success"
          icon="solar:chart-2-linear"
          title="Success Rate"
          trend={mockStats.successRate.trend}
          value={mockStats.successRate.value}
        />
        <StatsCard
          color="secondary"
          icon="solar:graph-new-linear"
          title="Total Requests"
          trend={mockStats.totalRequests.trend}
          value={mockStats.totalRequests.value}
        />
      </div>
      {/* Main Content Grid - 12 Column System */}
      <div className="grid grid-cols-12 gap-4">
        {/* Quick Attack Panel */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full">
            <CardHeader className="flex gap-2">
              <Icon
                className="text-primary"
                icon="solar:fire-linear"
                width={24}
              />
              <div>
                <h3 className="text-xl font-bold">Quick Attack</h3>
                <p className="text-small text-default-500">
                  Launch attack instantly
                </p>
              </div>
            </CardHeader>
            <CardBody className="gap-4">
              <Input
                endContent={
                  <Icon
                    className="text-default-400"
                    icon="solar:link-linear"
                    width={20}
                  />
                }
                label="Target URL"
                labelPlacement="outside"
                placeholder="Enter target URL"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      https://
                    </span>
                  </div>
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  endContent={
                    <span className="text-default-400 text-small">sec</span>
                  }
                  label="Duration"
                  labelPlacement="outside"
                  placeholder="60"
                  startContent={
                    <Icon
                      className="text-default-400"
                      icon="solar:clock-circle-linear"
                      width={20}
                    />
                  }
                  type="number"
                />
                <Select
                  label="Method"
                  labelPlacement="outside"
                  placeholder="Attack type"
                  startContent={
                    <Icon
                      className="text-default-400"
                      icon="solar:server-linear"
                      width={20}
                    />
                  }
                >
                  {methods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                fullWidth
                className="mt-2"
                color="primary"
                startContent={<Icon icon="solar:play-linear" width={20} />}
              >
                Launch Attack
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Real-time Graph */}
        <div className="col-span-12 lg:col-span-8">
          {isClient && ( // Rendu conditionnel du graphique
            (<Card className=" h-full">
              <CardHeader className="flex gap-2">
                <Icon
                  className="text-primary"
                  icon="solar:graph-new-linear"
                  width={24}
                />
                <div>
                  <h3 className="text-xl font-bold">Live Monitoring</h3>
                  <p className="text-small text-default-500">
                    Real-time attack statistics
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <DynamicGraph />
              </CardBody>
            </Card>)
          )}
        </div>

        {/* Attack Heatmap */}
        <div className="col-span-12 lg:col-span-8">
          {isClient && ( // Rendu conditionnel de la heatmap
            (<Card className="">
              <CardHeader className="flex gap-2">
                <Icon
                  className="text-primary"
                  icon="solar:calendar-linear"
                  width={24}
                />
                <div>
                  <h3 className="text-xl font-bold">Attack Distribution</h3>
                  <p className="text-small text-default-500">
                    Last 7 days activity
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <AttackHeatmap />
              </CardBody>
            </Card>)
          )}
        </div>

        {/* Support Tickets */}
        <div className="col-span-12 lg:col-span-4">
          <Card className=" h-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex gap-2">
                <Icon
                  className="text-primary"
                  icon="solar:ticket-linear"
                  width={24}
                />
                <div>
                  <h3 className="text-xl font-bold">Active Tickets</h3>
                  <p className="text-small text-default-500">
                    Support requests
                  </p>
                </div>
              </div>
              <Button
                color="primary"
                endContent={<Icon icon="solar:add-circle-linear" width={20} />}
                size="sm"
              >
                New Ticket
              </Button>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                {isClient &&
                  mockTickets.map(
                    (
                      ticket, // Rendu conditionnel des tickets
                    ) => (
                      <Card
                        key={ticket.id}
                        isPressable
                        className="border-1 border-default-200"
                      >
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {ticket.title}
                                </span>
                                <div
                                  className={`px-2 py-0.5 rounded-full text-tiny ${
                                    ticket.priority === "high"
                                      ? "bg-danger/10 text-danger"
                                      : "bg-warning/10 text-warning"
                                  }`}
                                >
                                  {ticket.priority}
                                </div>
                              </div>
                              <p className="text-tiny text-default-500">
                                {formatDate(ticket.created)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                color={
                                  ticket.status === "open"
                                    ? "primary"
                                    : "default"
                                }
                                size="sm"
                                variant="flat"
                              >
                                {ticket.status}
                              </Button>
                              <Button isIconOnly size="sm" variant="light">
                                <Icon
                                  icon="solar:arrow-right-linear"
                                  width={16}
                                />
                              </Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ),
                  )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
