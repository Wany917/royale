"use client";

import React, { useState, useMemo } from "react";
import { Tabs, Tab, Checkbox, Spacer, Link } from "@nextui-org/react";
import CardProduct from "./CardProduct";
import { products } from "@/mock/_products-tiers";
import { Product } from "@/types/product-types";

interface ProductListProps {}

export default function ProductList(props: ProductListProps) {
  const [showVipOnly, setShowVipOnly] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("all");

  const groupedProducts = useMemo(() => {
    const durations = {
      "all": "Tous les plans",
      "days": "Plans en jours",
      "months": "Plans en mois",
      "lifetime": "Plans à vie",
    };

    const filteredProducts = products.filter(product => 
      (showVipOnly ? product.is_vip : true) &&
      (selectedDuration === "all" || 
       (selectedDuration === "days" && product.duration.includes("day")) ||
       (selectedDuration === "months" && product.duration.includes("month")) ||
       (selectedDuration === "lifetime" && product.duration === "Lifetime"))
    );

    return { durations, filteredProducts };
  }, [showVipOnly, selectedDuration]);

  return (
    <div className="relative flex max-w-7xl flex-col items-center py-24">
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

      <div className="flex max-w-xl flex-col text-center">
        <h2 className="font-medium leading-7 text-secondary">Produits</h2>
        <h1 className="text-4xl font-medium tracking-tight">Notre gamme complète de produits et trouvez celui qui vous convient !</h1>
        <Spacer y={4} />
        <h2 className="text-large text-default-500">
          Découvrez le plan idéal !
        </h2>
      </div>
      <Spacer y={8} />

      <div className="flex flex-col items-center gap-4 w-full mb-8">
        <Tabs 
          selectedKey={selectedDuration} 
          onSelectionChange={(key) => setSelectedDuration(key.toString())}
          classNames={{
            tabList: "bg-default-100/70",
            cursor: "bg-background dark:bg-default-200/30",
            tab: "data-[hover-unselected=true]:opacity-90",
          }}
          radius="full"
        >
          {Object.entries(groupedProducts.durations).map(([key, value]) => (
            <Tab key={key} title={value} />
          ))}
        </Tabs>
        <Checkbox
          isSelected={showVipOnly}
          onValueChange={setShowVipOnly}
          color="secondary"
        >
          Afficher uniquement les plans VIP
        </Checkbox>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {groupedProducts.filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>

      <Spacer y={12} />

      <div className="flex py-2">
        <p className="text-default-400">
          Royal&nbsp;
          {/* <Link color="foreground" href="#" underline="always">
            
          </Link> */}
        </p>
      </div>
    </div>
  );
}