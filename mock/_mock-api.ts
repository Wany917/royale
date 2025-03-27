import { APIService } from "@/types/services";

export const mockAPIServices: APIService[] = [
  {
    id: "api-1",
    type: "api",
    name: "Royal API Plan",
    status: "active",
    expiryDate: "2024-12-31",
    plan: "Plazn Type",
    requests: {
      limit: 1000000,
      used: 450000,
    },
  },
  {
    id: "api-2",
    type: "api",
    name: "Royal API Professional",
    status: "active",
    expiryDate: "2024-11-30",
    plan: "Professional",
    requests: {
      limit: 500000,
      used: 280000,
    },
  },
  {
    id: "api-3",
    type: "api",
    name: "Royal API Standard",
    status: "active",
    expiryDate: "2024-10-15",
    plan: "Standard",
    requests: {
      limit: 100000,
      used: 75000,
    },
  },
];
