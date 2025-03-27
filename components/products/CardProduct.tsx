"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Chip,
  cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Tables } from "@/types/supabase";
import { useCartStore } from "@/stores/use-cart";

interface CardProductProps {
  product: Tables<"products">;
}

export default function CardProduct({ product }: CardProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const formatDuration = (duration: number) => {
    if (duration === 0) {
      return "lifetime";
    } else if (duration > 29) {
      const months = Math.floor(duration / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    }
    return `${duration} day${duration > 1 ? "s" : ""}`;
  };

  const hasNoStock = product.stock === 0;

  return (
    <Card
      isBlurred
      className={cn(
        "bg-background/60 dark:bg-default-100/50 h-[450px]",
        {
          "!border-small border-secondary/50": product.is_vip,
        }
      )}
      shadow="md"
    >
      <div className="absolute right-3 top-3 flex items-center gap-2">
        {hasNoStock && (
          <Chip
            className="font-medium"
            color="danger"
            size="sm"
            variant="flat"
          >
            Rupture de stock
          </Chip>
        )}
        {product.is_vip && (
          <Chip
            className="font-medium"
            color="secondary"
            size="sm"
            variant="flat"
          >
            VIP
          </Chip>
        )}
      </div>

      <CardHeader className="p-3 pt-12 mx-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-large font-semibold text-center">{product.name}</h2>
          <p className="text-small text-default-500">{product.description}</p>
        </div>
      </CardHeader>

      <div className="px-6">
        <Divider className="my-3 bg-default-400/20" />
      </div>

      <CardBody className="p-3 py-0 flex-1">
        <div className="flex flex-col h-full">
          <div className="mb-6 text-center">
            <p className="flex items-baseline justify-center gap-1">
              <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-5xl font-bold leading-7 tracking-tight text-transparent py-5">
                {product.price}€
              </span>
              <span className="text-small font-medium text-default-400">
                / {formatDuration(product.duration)}
              </span>
            </p>
          </div>

          <ul className="flex flex-col gap-2.5 flex-1">
            {product.features?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Icon 
                  className="text-secondary flex-shrink-0 mt-1" 
                  icon="ci:check" 
                  width={20} 
                />
                <p className="text-default-500">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>

      <CardFooter className="p-3 pt-0">
        <Button
          fullWidth
          color="secondary"
          isDisabled={hasNoStock}
          variant="flat"
          onPress={() => addToCart(product)}
        >
          {hasNoStock ? "Indisponible" : "Choisir ce plan"}
        </Button>
      </CardFooter>
    </Card>
  );
}