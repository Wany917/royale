import { C2Service } from "@/types/services";

export const mockC2Services: C2Service[] = [
  {
    id: "c2-1",
    type: "c2",
    name: "Royal C2 Enterprise",
    status: "active",
    expiryDate: "2024-12-31",
    servers: [
      {
        name: "EU-1",
        status: "online",
        port: 8443,
        region: "Europe"
      },
      {
        name: "EU-2",
        status: "online",
        port: 8444,
        region: "Europe"
      },
      {
        name: "US-1",
        status: "online",
        port: 8443,
        region: "North America"
      },
      {
        name: "AS-1",
        status: "maintenance",
        port: 8443,
        region: "Asia"
      }
    ],
    credentials: {
      username: "enterprise_user",
      password: "securePassword123!"
    },
    urlConnection: "https://c2.royal-enterprise.com",
    maxBots: 100000,
    features: [
      "Real-time monitoring",
      "Multi-server support",
      "Advanced bot management",
      "Custom scripts support",
      "24/7 Technical support",
      "Advanced Analytics",
      "Team Management"
    ],
    panelVersion: "2.5.0"
  },
  {
    id: "c2-2",
    type: "c2",
    name: "Royal C2 Professional",
    status: "active",
    expiryDate: "2024-11-30",
    servers: [
      {
        name: "EU-3",
        status: "online",
        port: 8443,
        region: "Europe"
      },
      {
        name: "US-2",
        status: "online",
        port: 8443,
        region: "North America"
      }
    ],
    credentials: {
      username: "pro_user",
      password: "proAccess789!"
    },
    urlConnection: "https://c2.royal-pro.com",
    maxBots: 50000,
    features: [
      "Real-time monitoring",
      "Multi-server support",
      "Bot management",
      "Basic scripts support",
      "Priority support"
    ],
    panelVersion: "2.5.0"
  }
];