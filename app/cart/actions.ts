"use server";

import { redirect } from "next/navigation";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

import { createClient } from "@/utils/supabase/server";
import CartItem from "@/types/cart-item";
import {
  createOrder,
  createOrderItems,
  getProducts,
} from "@/utils/supabase/queries";

export async function createOrderAction(cartItems: CartItem[]) {
  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect("/auth/login");
    }

    const productIds = cartItems.map((item) => item.id);
    let products = await getProducts(supabase, productIds);

    products = products.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);

      return {
        ...product,
        quantity: cartItem?.quantity,
      };
    });

    const totalPrice = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );

    const order = await createOrder(supabase, {
      id: uuid(),
      customer_id: user.id,
      total_amount: totalPrice,
      payment_status: "PENDING",
      payment_method: "PAYPAL",
      updated_at: null,
      created_at: null,
    });

    const orderItems = products.map((product) => ({
      id: uuid(),
      order_id: order.id,
      product_id: product.id,
      quantity: product.quantity,
      price_at_time: product.price,
      updated_at: null,
      created_at: null,
    }));

    await createOrderItems(supabase, orderItems);

    console.log(`/checkout/${order.id}`);

    redirect(`/checkout/${order.id}`);
    return;
  } catch (error) {
    redirect("/cart");
  }
}
