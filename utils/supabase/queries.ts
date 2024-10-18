import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

import { Tables } from "@/types/supabase";

export const getProducts = cache(
  async (
    supabase: SupabaseClient,
    productIds: string[] = [],
    limit: number = 10,
    offset: number = 0,
  ) => {
    let query = supabase.from("products").select("*");

    if (productIds.length > 0) {
      query = query.in("id", productIds);
    } else {
      query = query.range(offset, offset + limit - 1);
    }

    const { data: products, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return products;
  },
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
    console.log(orderData);

    return orderData;
  },
);

export const createOrderItems = cache(
  async (supabase: SupabaseClient, orderItems: Tables<"order_items">[]) => {
    const { error } = await supabase.from("order_items").insert(orderItems);
    console.log('test');
    if (error) {
      throw new Error(error.message);
    }

    return;
  },
);
