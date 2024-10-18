"use client";

import { Icon } from "@iconify/react";
import { Badge, Progress, Link, Button, Image } from "@nextui-org/react";

import { Logo } from "@/components/icons";
import { useCartStore } from "@/stores/use-cart";

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

      <div className="relative hidden w-full overflow-hidden rounded-medium shadow-small lg:block">
        <div className="absolute top-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute bottom-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-transparent to-black/80" />

        <div className="absolute top-10 z-10 flex w-full items-start justify-between px-10">
          <h2 className="text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
            Royal C2: The future of automation
          </h2>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  className="text-white/80"
                  icon="solar:star-bold"
                  width={16}
                />
              ))}
            </div>
            <Link
              className="text-white/60"
              href="#"
              size="sm"
              underline="always"
            >
              120 reviews
            </Link>
          </div>
        </div>
        <Image
          removeWrapper
          alt="Royal C2"
          className="absolute inset-0 z-0 h-full w-full rounded-none object-cover"
          height="100%"
          src="https://example.com/path-to-your-product-image.jpg"
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-medium bg-background/10 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 ">
          <div className="flex flex-col gap-1">
            <h2 className="left-10 z-10 text-2xl font-medium text-white/90">
              Royal C2 (14 Days VIP)
            </h2>
            <p className="left-10 z-10 text-white/80">$35.00</p>
          </div>
          <Button
            className="border-white/40 pl-3 text-white"
            startContent={<Icon icon="lucide:plus" width={24} />}
            variant="bordered"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
}
