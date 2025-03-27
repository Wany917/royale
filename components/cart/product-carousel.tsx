"use client";
import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { Button, Image, Link } from "@heroui/react";
import type { Tables } from "@/types/supabase";
import { useProductsStore } from "@/stores/use-products";

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { products } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [products]);

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-medium shadow-small lg:block h-full">
      <div className="absolute top-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute bottom-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-transparent to-black/80" />

      <div className="absolute top-10 z-10 flex w-full items-start justify-between px-10">
        <div className="flex flex-col gap-2">
          <h2 
            className={`text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)] transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentProduct.name}
          </h2>
          {currentProduct.features && (
            <ul className="list-disc list-inside text-white/60 text-sm">
              {currentProduct.features.slice(0, 3).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        {products.map((product, index) => (
          <Image
            key={product.id}
            removeWrapper
            alt={product.name}
            className="absolute inset-0 h-full w-full rounded-none object-cover transition-opacity duration-1000"
            height="100%"
            src={product.image_url}
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-medium bg-background/10 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <div className="flex flex-col gap-1">
          <h2 
            className={`left-10 z-10 text-2xl font-medium text-white/90 transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentProduct.name} ({currentProduct.duration} Days{currentProduct.is_vip ? ' VIP' : ''})
          </h2>
          <p className="left-10 z-10 text-white/80">
            ${currentProduct.price.toFixed(2)}
          </p>
          {currentProduct.description && (
            <p className="text-sm text-white/60 mt-1">
              {currentProduct.description}
            </p>
          )}
        </div>
        <Button
          className="border-white/40 pl-3 text-white"
          startContent={<Icon icon="lucide:plus" width={24} />}
          variant="bordered"
          disabled={currentProduct.stock === 0}
        >
          {currentProduct.stock > 0 ? 'Add to cart' : 'Out of stock'}
        </Button>
      </div>

      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
}