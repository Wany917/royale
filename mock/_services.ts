export const mockServices = [
    {
      id: "1",
      type: "src",
      name: "Royal SRC Premium",
      status: "active",
      licenseId: "RSRC-12345-67890-ABCDE-FGHIJ-KLMNO",
      expiryDate: "2024-12-31",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      contactInfo: {
        discord: "royal-support",
        telegram: "@royal_support"
      }
    },
    {
      id: "2",
      type: "stresser",
      name: "Royal Stresser Pro",
      status: "active",
      maxPower: "100 GBPS",
      concurrentAttacks: 5,
      expiryDate: "2024-12-31",
    },
    {
      id: "3",
      type: "api",
      name: "Royal API",
      status: "active",
      plan: "Enterprise",
      requests: {
        limit: 100000,
        used: 45000
      },
      expiryDate: "2024-12-31",
    },
    {
      id: "4",
      type: "c2",
      name: "Royal C2",
      status: "active",
      servers: ["EU-1", "US-1"],
      expiryDate: "2024-12-31",
    }
  ];