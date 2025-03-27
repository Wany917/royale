import { StresserService } from "@/types/services";

export const mockStresserServices: StresserService[] = [
  {
    id: "stresser-1",
    type: "stresser",
    name: "Royal Stresser Pro",
    status: "active",
    expiryDate: "2024-12-31",
    maxPower: "100 GBPS",
    concurrentAttacks: 5
  },
  {
    id: "stresser-2",
    type: "stresser",
    name: "Royal Stresser Enterprise",
    status: "active",
    expiryDate: "2024-11-30",
    maxPower: "250 GBPS",
    concurrentAttacks: 10
  },
  {
    id: "stresser-3",
    type: "stresser",
    name: "Royal Stresser Basic",
    status: "active",
    expiryDate: "2024-10-15",
    maxPower: "50 GBPS",
    concurrentAttacks: 3
  }
];