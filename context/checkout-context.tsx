// CheckoutContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextProps {
  currentStep: number;
  cartItemCount: number;
  cartTotal: string;
  setCurrentStep: (step: number) => void;
  setCartItemCount: (count: number) => void;
  setCartTotal: (total: string) => void;
}

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState('');

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        cartItemCount,
        cartTotal,
        setCurrentStep,
        setCartItemCount,
        setCartTotal,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
