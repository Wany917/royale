"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Tabs, Tab, Checkbox, Spacer } from "@heroui/react";
import { Video } from "../video";
import CardProduct from "./CardProduct";

import { useProductsStore } from "@/stores/use-products";


const DURATION_VIDEOS = {
  "all": {
    title: "Découvrez tous nos produits",
    description: "Un aperçu complet de notre gamme de produits et services.",
    videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1702689955157-d32c9210345e?q=80&w=1200"
  },
  "days": {
    title: "Plans Journaliers",
    description: "La flexibilité maximale avec nos plans à court terme.",
    videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1702638091529-17d546ba18b5?q=80&w=1200"
  },
  "months": {
    title: "Plans Mensuels",
    description: "La solution idéale pour un engagement à moyen terme.",
    videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1702511464548-1a397cae1264?q=80&w=1200"
  },
  "lifetime": {
    title: "Plans à Vie",
    description: "Un investissement unique pour un accès illimité.",
    videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1702851500258-9167ebdd8897?q=80&w=1200"
  }
};

export default function ProductList() {
  const [showVipOnly, setShowVipOnly] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<keyof typeof DURATION_VIDEOS>("all");
  const { products, isLoading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const groupedProducts = useMemo(() => {
    const durations = {
      all: "Tous les plans",
      days: "Par jours",
      months: "Par mois",
      lifetime: "À vie",
    };

    const filteredProducts = products.filter(
      (product) =>
        (showVipOnly ? product.is_vip : true) &&
        (selectedDuration === "all" ||
          (selectedDuration === "days" &&
            product.duration < 30 &&
            product.duration !== 0) ||
          (selectedDuration === "months" &&
            product.duration > 29 &&
            product.duration !== 0) ||
          (selectedDuration === "lifetime" && product.duration === 0))
    );

    return { durations, filteredProducts };
  }, [showVipOnly, selectedDuration, products]);

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
        <h1 className="text-4xl font-medium tracking-tight">
          Notre gamme complète de produits et trouvez celui qui vous convient !
        </h1>
        <Spacer y={4} />
        <div className="text-center space-y-2">
          <h2 className="text-large text-default-500">
            Découvrez le plan idéal !
          </h2>
          
        </div>
      </div>
      <Spacer y={8} />

      <div className="flex flex-col items-center gap-4 w-full mb-8">
        <Tabs
          classNames={{
            tabList: "bg-default-100/70",
            cursor: "bg-background dark:bg-default-200/30",
            tab: "data-[hover-unselected=true]:opacity-90",
          }}
          radius="full"
          selectedKey={selectedDuration}
          onSelectionChange={(key) => setSelectedDuration(key as keyof typeof DURATION_VIDEOS)}
        >
          {Object.entries(groupedProducts.durations).map(([key, value]) => (
            <Tab key={key} title={value} />
          ))}
        </Tabs>
        <Checkbox
          color="secondary"
          isSelected={showVipOnly}
          onValueChange={setShowVipOnly}
        >
          Afficher uniquement les plans VIP
        </Checkbox>
      </div>

      {isLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {groupedProducts.filteredProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}

      <Spacer y={12} />

      <div className="flex justify-center">
            {DURATION_VIDEOS[selectedDuration] && (
              <Video {...DURATION_VIDEOS[selectedDuration]} />
            )}
      </div>
    </div>
  );
}
