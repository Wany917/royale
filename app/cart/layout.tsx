
"use client";

import { CheckoutProvider } from '@/context/checkout-context';
import CheckoutLayout from './CheckoutLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      <CheckoutLayout>
        {children}
      </CheckoutLayout>
    </CheckoutProvider>
  );
}
