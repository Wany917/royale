"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Chip,
  cn,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Tables } from "@/types/supabase";
import { useCartStore } from "@/stores/use-cart";

interface CardProductProps {
  product: Tables<"products">;
}

export default function CardProduct({ product }: CardProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  return (
    <Card
      isBlurred
      className={cn("bg-background/60 p-3 dark:bg-default-100/50", {
        "!border-small border-secondary/50": product.is_vip,
      })}
      shadow="md"
    >
      {product.is_vip ? (
        <Chip
          className="absolute right-4 top-4"
          color="secondary"
          variant="flat"
        >
          VIP
        </Chip>
      ) : null}
      {product.stock == 0 ? (
        <Chip
          className={`absolute ${
            product.is_vip ? "right-14 mr-3" : "right-4"
          } top-4`}
          color="secondary"
          variant="flat"
        >
          {product.stock} LEFT
        </Chip>
      ) : null}
      <CardHeader className="flex flex-col items-start gap-2 pb-6">
        <h2 className="text-large font-medium">{product.name}</h2>
        <p className="text-medium text-default-500">{product.description}</p>
      </CardHeader>
      <Divider />
      <CardBody className="gap-8">
        <p className="flex items-baseline gap-1 pt-2">
          <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent">
            {product.price}€
          </span>
          <span className="text-small font-medium text-default-400">
            /{" "}
            {(() => {
              if (product.duration === 0) {
                return "lifetime";
              } else if (product.duration > 29) {
                const months = Math.floor(product.duration / 30);
                return `${months} month${months > 1 ? "s" : ""}`;
              } else {
                return `${product.duration} day${
                  product.duration > 1 ? "s" : ""
                }`;
              }
            })()}
          </span>
        </p>
        <ul className="flex flex-col gap-2">
          {product.features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Icon className="text-secondary" icon="ci:check" width={24} />
              <p className="text-default-500">{feature}</p>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          as={Link}
          color="secondary"
          onClick={() => addToCart(product)} // TODO: Afficher un message de succès pour l'ajout dans le panier
          variant="flat"
          disabled={product.stock === 0}
        >
          Choisir ce plan
        </Button>
      </CardFooter>
    </Card>
  );
}
