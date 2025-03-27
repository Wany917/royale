export type TicketPriority = "high" | "medium" | "low";
export type TicketStatus = "open" | "pending" | "closed";
export type TicketCategory = "API" | "Billing" | "Technical" | "Other";

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  isStaff: boolean;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  created: number;
  lastUpdated: number;
  messages: Message[];
  userId: string;
  staffId?: string;
}

export interface NewTicketData {
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
}