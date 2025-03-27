export type VideoCategory = "Layer7" | "Layer4" | "API" | "Tools";

export interface ProofVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: VideoCategory;
  views: number;
  duration: string;
  date: string;
}

export const proofCategories = [
  { key: "all", label: "All Videos", icon: "solar:play-list-linear" },
  { key: "layer7", label: "Layer7", icon: "solar:server-square-update-linear" },
  { key: "layer4", label: "Layer4", icon: "solar:server-linear" },
  { key: "api", label: "API", icon: "solar:code-square-linear" },
  { key: "tools", label: "Tools", icon: "solar:widget-linear" }
] as const;

export const proofVideos: ProofVideo[] = [
  {
    id: "1",
    title: "DDOS Attack Explained",
    description: "Learn about different types of DDoS attacks and their impact on network infrastructure",
    thumbnailUrl: "https://i.ytimg.com/vi/ilhGh9CEIwM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ilhGh9CEIwM",
    category: "Layer7",
    views: 24789,
    duration: "8:42",
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "API Testing Complete Guide",
    description: "Comprehensive guide to API testing tools and methodologies",
    thumbnailUrl: "https://i.ytimg.com/vi/VywxIQ2ZXw4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=VywxIQ2ZXw4",
    category: "API",
    views: 15623,
    duration: "12:15",
    date: "2024-01-20"
  },
  {
    id: "3",
    title: "Network Security Testing",
    description: "Professional network security testing demonstration with real-world examples",
    thumbnailUrl: "https://i.ytimg.com/vi/roG0HyUel5A/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=roG0HyUel5A",
    category: "Tools",
    views: 18934,
    duration: "15:30",
    date: "2024-01-25"
  },
  {
    id: "4",
    title: "Understanding TCP/UDP Attacks",
    description: "Deep dive into Layer 4 protocols and common attack vectors",
    thumbnailUrl: "https://i.ytimg.com/vi/AEaKrq3SpW8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=AEaKrq3SpW8",
    category: "Layer4",
    views: 21456,
    duration: "10:18",
    date: "2024-02-01"
  },
  {
    id: "5",
    title: "Web Application Security Testing",
    description: "Comprehensive guide to testing web application security",
    thumbnailUrl: "https://i.ytimg.com/vi/X4eRbHgRawI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=X4eRbHgRawI",
    category: "Tools",
    views: 12567,
    duration: "14:45",
    date: "2024-02-05"
  },
  {
    id: "6",
    title: "HTTP Flood Attack Prevention",
    description: "Learn how to protect against and mitigate HTTP flood attacks",
    thumbnailUrl: "https://i.ytimg.com/vi/BcDZS7iYNsA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BcDZS7iYNsA",
    category: "Layer7",
    views: 19845,
    duration: "11:23",
    date: "2024-02-10"
  }
];