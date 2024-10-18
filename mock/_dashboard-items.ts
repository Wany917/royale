import { SidebarItem } from "@/components/dashboard/sidebar";
export const dashboardItems: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    icon: "chart-pie",
    href: "/dashboard",
  },
  {
    key: "users",
    title: "Users",
    icon: "users",
    href: "/dashboard/users",
  },
  {
    key: "commands",
    title: "Commands",
    icon: "terminal",
    href: "/dashboard/commands",
  },
  {
    key: "settings",
    title: "Settings",
    icon: "cog",
    href: "/dashboard/settings",
  },
];
