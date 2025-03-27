"use client";

import { Icon } from "@iconify/react";
import { Badge, Progress, Link, Button, Image } from "@heroui/react";

import { Logo } from "@/components/icons";
import { useCartStore } from "@/stores/use-cart";
import ProductCarousel from "@/components/cart/product-carousel";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentStep, totalItems, totalPrice } = useCartStore();

  return (
    <section className="flex h-[calc(100vh_-_60px)] w-full gap-8">
      <div className="w-full flex-none py-4 lg:w-[44%]">
        <div className="flex justify-between px-2">
          <div className="flex items-center">
            <Logo size={40} />
            <p className="font-semibold">Royal</p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="text-small font-semibold text-default-700">
                {totalPrice}
              </span>
              <span className="ml-1 text-small text-default-500">
                ({totalItems} items)
              </span>
            </p>
            <Badge className="" content={totalItems} showOutline={false}>
              <Icon icon="solar:cart-check-outline" width={28} />
            </Badge>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col p-4">
          {children}
          <div className="mt-auto flex w-full justify-between gap-8 pb-8 pt-4">
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium dark:text-white">Review</p>
              <Progress
                classNames={{
                  indicator: "!bg-gradient-to-r from-primary to-secondary",
                }}
                value={currentStep >= 0 ? 100 : 0}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="text-small font-medium dark:text-white">Payment</p>
              <Progress
                classNames={{
                  indicator: "!bg-gradient-to-r from-primary to-secondary",
                }}
                value={currentStep >= 1 ? 100 : 0}
              />
            </div>
          </div>
        </div>
      </div>

      <ProductCarousel />
    </section>
  );
}
