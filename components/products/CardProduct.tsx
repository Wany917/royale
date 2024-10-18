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

import { Product } from "@/types/product-types";

interface CardProductProps {
  product: Product;
}

export default function CardProduct({ product }: CardProductProps) {
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
            / {product.duration}
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
        <Button fullWidth as={Link} color="secondary" href="#" variant="flat">
          Choisir ce plan
        </Button>
      </CardFooter>
    </Card>
  );
}
