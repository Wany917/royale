import { Tables } from "./supabase";

interface CartItem extends Tables<"products"> {
  quantity: number;
}

export default CartItem;
