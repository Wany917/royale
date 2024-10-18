"use client";

import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { createOrderAction } from "@/app/cart/actions";

const ThankYouPage = () => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement du numéro de commande
    const timer = setTimeout(() => {
      setOrderNumber("ORD-" + Math.floor(100000 + Math.random() * 900000));
      setIsLoading(false);
    }, 100); // Petit délai pour simuler le chargement

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    return () => clearTimeout(timer);
  }, []);

  const handleConfetti = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8">
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <Button
            className="h-9 overflow-hidden border-1 border-success-100 bg-success-50 px-[18px] py-2 text-small font-normal leading-5 text-success-500"
            endContent={
              <Icon
                className="flex-none outline-none [&>path]:stroke-[2]"
                icon="solar:check-circle-bold"
                width={20}
              />
            }
            radius="full"
            variant="bordered"
          >
            Paiement réussi
          </Button>
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Merci pour votre achat !
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            Votre commande a été traitée avec succès. Vous recevrez bientôt un
            email de confirmation avec les détails de votre achat.
          </p>
          <div className="mt-4 text-center font-semibold text-xl text-primary">
            {isLoading ? (
              <Spinner color="primary" />
            ) : (
              <>
                Numéro de commande:{" "}
                <span className="text-secondary">{orderNumber}</span>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <Button
              className="h-10 w-[163px] bg-primary px-[16px] py-[10px] text-small font-medium leading-5 text-white"
              radius="full"
              onPress={handleConfetti}
            >
              Fêter ça !
            </Button>
            <Button
              className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
              color="secondary"
              endContent={
                <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full">
                  <Icon
                    className="text-default-500 [&>path]:stroke-[1.5]"
                    icon="solar:arrow-right-linear"
                    width={16}
                  />
                </span>
              }
              radius="full"
              variant="flat"
              onPress={() => router.push("/dashboard")}
            >
              Espace client
            </Button>
          </div>
        </section>
        <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 scale-150 select-none sm:scale-125">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50" />
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
