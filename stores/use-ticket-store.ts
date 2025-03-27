import { create } from "zustand";
import { Message, Ticket, NewTicketData } from "@/types/ticket";

interface TicketState {
  tickets: Ticket[];
  activeTicket: Ticket | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setActiveTicket: (ticket: Ticket | null) => void;
  addTicket: (ticketData: NewTicketData) => Promise<void>;
  addMessage: (ticketId: string, message: string) => Promise<void>;
  updateTicketStatus: (ticketId: string, status: Ticket["status"]) => Promise<void>;
  fetchTickets: () => Promise<void>;
}

const mockTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "API Integration Issue",
    category: "API",
    priority: "high",
    status: "open",
    created: Date.now() - 3600000,
    lastUpdated: Date.now() - 3600000,
    userId: "user-1",
    messages: [
      {
        id: "1",
        content: "I'm experiencing issues with the API endpoint...",
        timestamp: Date.now() - 3600000,
        isStaff: false
      },
      {
        id: "2",
        content: "Could you please provide your API key and the exact endpoint?",
        timestamp: Date.now() - 3500000,
        isStaff: true
      }
    ]
  }
  // Add more mock tickets as needed
];

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: mockTickets,
  activeTicket: null,
  isLoading: false,
  error: null,

  setActiveTicket: (ticket) => {
    set({ activeTicket: ticket });
  },

  addTicket: async (ticketData) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      const newTicket: Ticket = {
        id: `T-${Date.now()}`,
        ...ticketData,
        status: "open",
        created: Date.now(),
        lastUpdated: Date.now(),
        userId: "user-1", // In real app, get from auth
        messages: [{
          id: "1",
          content: ticketData.description,
          timestamp: Date.now(),
          isStaff: false
        }]
      };
      
      set(state => ({
        tickets: [newTicket, ...state.tickets],
        error: null
      }));
    } catch (error) {
      set({ error: "Failed to create ticket" });
    } finally {
      set({ isLoading: false });
    }
  },

  addMessage: async (ticketId, content) => {
    set({ isLoading: true });
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        timestamp: Date.now(),
        isStaff: false
      };

      set(state => ({
        tickets: state.tickets.map(ticket => 
          ticket.id === ticketId 
            ? {
                ...ticket,
                messages: [...ticket.messages, newMessage],
                lastUpdated: Date.now()
              }
            : ticket
        ),
        activeTicket: state.activeTicket?.id === ticketId 
          ? {
              ...state.activeTicket,
              messages: [...state.activeTicket.messages, newMessage],
              lastUpdated: Date.now()
            }
          : state.activeTicket,
        error: null
      }));
    } catch (error) {
      set({ error: "Failed to send message" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTicketStatus: async (ticketId, status) => {
    set({ isLoading: true });
    try {
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId
            ? { ...ticket, status, lastUpdated: Date.now() }
            : ticket
        ),
        activeTicket: state.activeTicket?.id === ticketId
          ? { ...state.activeTicket, status, lastUpdated: Date.now() }
          : state.activeTicket,
        error: null
      }));
    } catch (error) {
      set({ error: "Failed to update ticket status" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTickets: async () => {
    set({ isLoading: true });
    try {
      // In real app, fetch from API
      set({ tickets: mockTickets, error: null });
    } catch (error) {
      set({ error: "Failed to fetch tickets" });
    } finally {
      set({ isLoading: false });
    }
  }
}));