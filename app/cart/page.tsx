"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, LazyMotion, m, domAnimation } from "framer-motion";
import { Button, RadioGroup } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import OrderSummary from "@/components/cart/order-summary";
import PaymentMethodRadio from "@/components/cart/payment-method-radio";
import { products } from "@/mock/_products-tiers";
import { PayPalIcon } from "@/components/icons";
import { useCartStore } from "@/stores/use-cart";
import { createOrderAction } from "./actions";

export default function Page() {
  const [[pageIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const { setCurrentStep, cart } = useCartStore();

  useEffect(() => {
    setCurrentStep(pageIndex);
  }, [pageIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    if (pageIndex + newDirection < 0 || pageIndex + newDirection > 1) return;
    setPage([pageIndex + newDirection, newDirection]);
  };

  const handleCTAClick = () => {
    if (pageIndex === 1) {
      createOrderAction(cart);
    } else {
      paginate(1);
    }
  };

  const ctaLabel = useMemo(() => {
    switch (pageIndex) {
      case 0:
        return "Continuer au paiement";
      case 1:
        return "Passer la commande";
      default:
        return "Continuer au paiement";
    }
  }, [pageIndex]);

  const stepTitle = useMemo(() => {
    switch (pageIndex) {
      case 0:
        return "Vérifiez votre commande";
      case 1:
        return "Comment souhaitez-vous payer ?";
      default:
        return "Vérifiez votre commande";
    }
  }, [pageIndex]);

  const stepsContent = useMemo(() => {
    const paymentRadioClasses = {
      wrapper: "group-data-[selected=true]:border-foreground",
      base: "data-[selected=true]:border-foreground",
      control: "bg-foreground",
    };

    switch (pageIndex) {
      case 0:
        return <OrderSummary hideTitle items={cart} />;
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <RadioGroup
              aria-label="Sélectionner un moyen de paiement"
              classNames={{ wrapper: "gap-3" }}
              defaultValue="paypal"
            >
              <PaymentMethodRadio
                isRecommended
                classNames={paymentRadioClasses}
                description="Sélectionnez cette option pour payer avec PayPal"
                icon={<PayPalIcon height={30} width={30} />}
                label="PayPal"
                value="paypal"
              />
            </RadioGroup>
          </div>
        );
      default:
        return null;
    }
  }, [pageIndex, cart]);

  return (
    <>
      <div>
        <Button
          className="-ml-2 text-default-700 dark:text-white"
          isDisabled={pageIndex === 0}
          radius="full"
          variant="flat"
          onPress={() => paginate(-1)}
        >
          <Icon icon="solar:arrow-left-outline" width={20} />
          Retour
        </Button>
      </div>

      <AnimatePresence custom={direction} initial={false} mode="wait">
        <LazyMotion features={domAnimation}>
          <m.form
            key={pageIndex}
            animate="center"
            className="mt-8 flex flex-col gap-3 dark:text-white"
            custom={direction}
            exit="exit"
            initial="enter"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={variants}
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-2xl font-medium dark:text-white">
              {stepTitle}
            </h1>
            {stepsContent}
            <Button
              fullWidth
              className="mt-8 bg-gradient-to-r from-primary to-secondary text-white"
              size="lg"
              onPress={handleCTAClick}
            >
              {ctaLabel}
            </Button>
          </m.form>
        </LazyMotion>
      </AnimatePresence>
    </>
  );
}
