import { SRCService } from "@/types/services";

export const mockSRCServices: SRCService[] = [
  {
    id: "src-1",
    type: "src",
    name: "Royal SRC Premium",
    status: "active",
    expiryDate: "2024-12-31",
    licenseId: "RSRC-12345-67890-ABCDE-FGHIJ-KLMNO",
    features: [
      "Multi-platform Support",
      "Advanced Cryptography",
      "Real-time Updates",
      "Custom Builds",
      "Priority Support"
    ],
    contactInfo: {
      discord: "royal-support",
      telegram: "@royal_support"
    }
  },
  {
    id: "src-2",
    type: "src",
    name: "Royal SRC Enterprise",
    status: "active",
    expiryDate: "2024-11-30",
    licenseId: "RSRC-98765-43210-ZYXWV-UTSRQ-PONML",
    features: [
      "Enterprise Support",
      "Custom Integrations",
      "API Access",
      "Team Management",
      "Advanced Analytics"
    ],
    contactInfo: {
      discord: "royal-enterprise",
      telegram: "@royal_enterprise"
    }
  },
  {
    id: "src-3",
    type: "src",
    name: "Royal SRC Standard",
    status: "active",
    expiryDate: "2024-10-15",
    licenseId: "RSRC-24680-13579-ABCDE-FGHIJ-KLMNO",
    features: [
      "Basic Support",
      "Standard Features",
      "Community Access",
      "Regular Updates"
    ],
    contactInfo: {
      discord: "royal-standard",
      telegram: "@royal_standard"
    }
  }
];