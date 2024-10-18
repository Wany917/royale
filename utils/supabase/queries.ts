import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

import { Tables } from "@/types/supabase";

export const getProducts = cache(
  async (supabase: SupabaseClient, productIds: string[] = []) => {
    let query = supabase.from("products").select("*");

    if (productIds.length > 0) {
      query = query.in("id", productIds);
    }

    const { data: productsData, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return productsData;
  }
);

export const createOrder = cache(
  async (supabase: SupabaseClient, order: Tables<"orders">) => {
    const { data: orderData, error } = await supabase
      .from("orders")
      .insert(order)
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return orderData;
  }
);

export const createOrderItems = cache(
  async (supabase: SupabaseClient, orderItems: Tables<"order_items">[]) => {
    const { error } = await supabase.from("order_items").insert(orderItems);
    if (error) {
      throw new Error(error.message);
    }

    return;
  }
);
