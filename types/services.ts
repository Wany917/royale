import { mockAPIServices } from "@/mock/_mock-api";
import { mockC2Services } from "@/mock/_mock-c2";
import { mockSRCServices } from "@/mock/_mock-src";
import { mockStresserServices } from "@/mock/_mock-stresser";

export type ServiceType = "src" | "stresser" | "api" | "c2";

interface BaseService {
  id: string;
  type: ServiceType;
  name: string;
  status: string;
  expiryDate: string;
}

export interface SRCService extends BaseService {
  type: "src";
  licenseId: string;
  features: string[];
  contactInfo: {
    discord: string;
    telegram: string;
  };
}

export interface StresserService extends BaseService {
  type: "stresser";
  maxPower: string;
  concurrentAttacks: number;
}

export interface APIService extends BaseService {
  type: "api";
  plan: string;
  requests: {
    limit: number;
    used: number;
  };
  endpoints?: string[];
  rateLimit?: string;
}

export interface C2Service extends BaseService {
  type: "c2";
  servers: {
    name: string;
    status: string;
    port: number;
    region: string;
  }[];
  credentials?: {
    username: string;
    password: string;
  };
}

export type Service = SRCService | StresserService | APIService | C2Service;

export const mockServices: Service[] = [
  ...mockSRCServices,
  ...mockStresserServices,
  ...mockAPIServices,
  ...mockC2Services,
];
