import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { SidebarItem } from "@/components/dashboard/sidebar";

export const items: SidebarItem[] = [
  {
    key: "overview",
    href: "/dashboard",
    icon: "solar:home-2-linear",
    title: "Overview",
  },
  {
    key: "services",
    href: "/dashboard/services",
    icon: "solar:widget-2-outline",
    title: "Services",
    endContent: (
      <Chip size="sm" variant="flat" color="primary">
        Active
      </Chip>
    ),
  },
  {
    key: "api-manager",
    href: "/dashboard/api-manager",
    icon: "solar:code-square-linear",
    title: "API Manager",
  },
  {
    key: "stresser",
    href: "/dashboard/stresser",
    icon: "solar:server-square-linear",
    title: "Stresser",
  },
  {
    key: "tutorials",
    href: "/dashboard/tutorials",
    icon: "solar:book-linear",
    title: "Tutorials & Proof",
  },
  {
    key: "support",
    href: "/dashboard/support",
    icon: "solar:chat-square-call-linear",
    title: "Support",
    endContent: (
      <Chip size="sm" variant="flat" color="warning">
        2
      </Chip>
    ),
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    icon: "solar:settings-linear",
    title: "Settings",
  },
];