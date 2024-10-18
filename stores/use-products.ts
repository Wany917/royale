import { create } from "zustand";
import { Tables } from "@/types/supabase";
import { getProducts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/client";

interface State {
  products: Tables<"products">[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchProducts: () => Promise<void>;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

const supabase = createClient();

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      const products: Tables<"products">[] = await getProducts(supabase);
      set({ products: products, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
