import { create } from 'zustand';
import { Service, ServiceType } from '@/types/services';

interface ServicesState {
  services: Service[];
  activeService: Service | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchServices: () => Promise<void>;
  setActiveService: (service: Service | null) => void;
  refreshServiceStatus: (serviceId: string) => Promise<void>;
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  activeService: null,
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      set({ services: data.services });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveService: (service) => {
    set({ activeService: service });
  },

  refreshServiceStatus: async (serviceId) => {
    try {
      const response = await fetch(`/api/services/${serviceId}/status`);
      const data = await response.json();
      set((state) => ({
        services: state.services.map((service) =>
          service.id === serviceId ? { ...service, ...data } : service
        ),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred 2' });
    }
  },
}));