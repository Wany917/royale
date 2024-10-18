"use server";

import CheckoutForm from "../../../components/checkout/checkout";

import { createClient } from "@/utils/supabase/server";

export default async function CheckoutPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex justify-center text-3xl font-bold mb-6 dark:text-white">
        Finaliser votre commande
      </h1>
      <CheckoutForm user={user} />
    </div>
  );
}
