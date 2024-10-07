// components/products/ProductList.tsx

"use client";

import React, { useMemo } from "react";
import { Tabs, Tab, Spacer, Link } from "@nextui-org/react";
import CardProduct from "./CardProduct";
import { products } from "@/mock/_products-tiers";
import { Product } from "@/types/product-types";

interface ProductListProps {}

export default function ProductList(props: ProductListProps) {
  // Grouper les produits par catégorie
  const groupedProducts = useMemo(() => {
    const categories = {
      "Royal C2": products.filter((p) => p.name.startsWith("Royal C2")),
      "Royal Src": products.filter((p) => p.name.startsWith("Royal SRC")),
      "Royal Proxy": products.filter((p) => p.name.startsWith("Royal Proxy")),
      "Royal Api": products.filter((p) => p.name.startsWith("Royal API")),
    };
    return categories;
  }, []);

  return (
    <div className="relative flex max-w-7xl flex-col items-center py-24">
      {/* Fond décoratif */}
      <div
        aria-hidden="true"
        className="px:5 absolute inset-x-0 top-3 z-0 h-full w-full transform-gpu overflow-hidden blur-3xl md:right-20 md:h-auto md:w-auto md:px-36"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#FF71D7] to-[#C9A9E9] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium leading-7 text-secondary">Produits</h2>
        <h1 className="text-4xl font-medium tracking-tight">Obtenez un accès illimité.</h1>
        <Spacer y={4} />
        <h2 className="text-large text-default-500">
          Découvrez le plan idéal, à partir de moins de 2€ par semaine.
        </h2>
      </div>
      <Spacer y={8} />

      {/* Onglets des catégories */}
      <Tabs
        classNames={{
          tabList: "bg-default-100/70",
          cursor: "bg-background dark:bg-default-200/30",
          tab: "data-[hover-unselected=true]:opacity-90",
        }}
        radius="full"
      >
        {Object.keys(groupedProducts).map((category) => (
          <Tab key={category} title={category}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {groupedProducts[category].map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
      <Spacer y={12} />

      {/* Section d'information supplémentaire */}
      <div className="flex py-2">
        <p className="text-default-400">
          Vous êtes un développeur open source ?&nbsp;
          <Link color="foreground" href="#" underline="always">
            Obtenez une réduction
          </Link>
        </p>
      </div>
    </div>
  );
}
