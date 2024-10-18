"use client";

import CheckoutLayout from "./CheckoutLayout";

import { CheckoutProvider } from "@/context/checkout-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      <CheckoutLayout>{children}</CheckoutLayout>
    </CheckoutProvider>
  );
}
