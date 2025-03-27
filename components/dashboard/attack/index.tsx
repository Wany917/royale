"use client";

import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Input,
  Button,
  Select,
  SelectItem,
  Progress,
  Chip 
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface AttackMethod {
  label: string;
  value: string;
  description: string;
  maxPower: string;
}

const attackMethods: AttackMethod[] = [
  { label: "HTTP", value: "http", description: "Layer 7 HTTP Flood", maxPower: "120k/s" },
  { label: "HTTPS", value: "https", description: "Layer 7 HTTPS Flood", maxPower: "80k/s" },
  { label: "TCP", value: "tcp", description: "Layer 4 TCP Amplification", maxPower: "150 GBPS" },
  { label: "UDP", value: "udp", description: "Layer 4 UDP Flood", maxPower: "120 GBPS" }
];

export default function AttackDashboard() {
  const [isAttackActive, setIsAttackActive] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [selectedMethod, setSelectedMethod] = React.useState<string>("http");

  React.useEffect(() => {
    if (isAttackActive) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 1;
          if (newProgress === 100) {
            setIsAttackActive(false);
            return 0;
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAttackActive]);

  const handleAttack = () => {
    setIsAttackActive(true);
    setProgress(0);
  };

  const handleStop = () => {
    setIsAttackActive(false);
    setProgress(0);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Icon icon="solar:server-path-linear" className="text-success" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Concurrent Attacks</p>
              <p className="text-xl font-bold">2/5</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon icon="solar:thunder-linear" className="text-warning" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Power Usage</p>
              <p className="text-xl font-bold">45.5 GBPS</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-danger/10 rounded-lg">
              <Icon icon="solar:clock-circle-linear" className="text-danger" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Time Remaining</p>
              <p className="text-xl font-bold">14:35:22</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Attack Configuration */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Launch Attack</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Target"
              placeholder="Enter target URL or IP"
              labelPlacement="outside"
              startContent={
                <Icon icon="solar:target-linear" className="text-default-400" width={20} />
              }
            />
            <Select
              label="Attack Method"
              placeholder="Select attack method"
              labelPlacement="outside"
              selectedKeys={[selectedMethod]}
              onChange={(e) => setSelectedMethod(e.target.value)}
            >
              {attackMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  <div className="flex flex-col">
                    <span>{method.label}</span>
                    <span className="text-tiny text-default-500">{method.description}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="Duration (seconds)"
              placeholder="60"
              labelPlacement="outside"
              startContent={
                <Icon icon="solar:clock-circle-linear" className="text-default-400" width={20} />
              }
            />
            <Input
              type="number"
              label="Threads"
              placeholder="1000"
              labelPlacement="outside"
              startContent={
                <Icon icon="solar:layers-linear" className="text-default-400" width={20} />
              }
            />
            <Input
              type="number"
              label="Power (%)"
              placeholder="100"
              labelPlacement="outside"
              startContent={
                <Icon icon="solar:lightning-linear" className="text-default-400" width={20} />
              }
            />
          </div>

          {isAttackActive && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-small text-default-500">Attack Progress</p>
                <p className="text-small text-default-700">{progress}%</p>
              </div>
              <Progress
                size="md"
                radius="sm"
                value={progress}
                color="warning"
                showValueLabel={true}
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button
              color="danger"
              variant="flat"
              startContent={<Icon icon="solar:shield-warning-linear" width={20} />}
              isDisabled={!isAttackActive}
              onPress={handleStop}
            >
              Stop Attack
            </Button>
            <Button
              color="warning"
              startContent={<Icon icon="solar:play-circle-linear" width={20} />}
              isDisabled={isAttackActive}
              onPress={handleAttack}
            >
              Launch Attack
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Active Attacks */}
      <Card>
        <CardHeader className="flex justify-between">
          <h2 className="text-xl font-bold">Active Attacks</h2>
          <Button
            size="sm"
            color="default"
            variant="flat"
            startContent={<Icon icon="solar:history-linear" width={18} />}
          >
            Attack History
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[1, 2].map((attack) => (
              <Card key={attack} shadow="none" className="border-1 border-default-100">
                <CardBody className="flex flex-row justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Icon 
                      icon="solar:server-path-linear" 
                      className="text-warning" 
                      width={24} 
                    />
                    <div>
                      <p className="font-medium">example.com</p>
                      <p className="text-small text-default-500">HTTP Flood • 120s</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Chip color="warning" variant="flat">45 GBPS</Chip>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      isIconOnly
                      onPress={() => {}}
                    >
                      <Icon icon="solar:close-circle-linear" width={20} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}