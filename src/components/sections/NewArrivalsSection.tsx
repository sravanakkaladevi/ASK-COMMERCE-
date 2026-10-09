"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { ProductCategory, SareeProduct } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function NewArrivalsSection() {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, formatPrice } =
    useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  const categories: { id: ProductCategory; label: string }[] = [
    { id: "all", label: "All Weaves" },
    { id: "banarasi", label: "Banarasi Kadwa" },
    { id: "kanjeevaram", label: "Kanjeevaram Silk" },
    { id: "organza", label: "Organza & Tissue" },
    { id: "chanderi", label: "Chanderi Handloom" },
    { id: "tussar", label: "Wild Tussar" },
  ];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  return (
    <section
      id="new-arrivals"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="ASK New Arrivals Collection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 pb-4 border-b border-[#1C1512]/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>FRESH FROM THE LOOMS</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              New Arrivals<span className="text-[#7A0C1E]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1512]/70 font-light max-w-md mt-1.5">
              Uncompromising handloom purity. Each saree is woven in limited single-edition batches.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#7A0C1E] text-[#FAF7F2] font-semibold shadow-md"
                    : "bg-white text-[#1C1512]/75 hover:bg-[#7A0C1E]/10 hover:text-[#7A0C1E] border border-[#1C1512]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Saree Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
          {filteredProducts.map((product) => {
            const inWish = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white p-3 sm:p-4 border border-[#C9A24B]/20 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* 3:4 Portrait Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#1C1512]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badges */}
                  {product.tag && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#7A0C1E] text-[#F5D061] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1512] hover:text-[#7A0C1E] hover:scale-110 shadow-md transition-all z-10"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        inWish ? "fill-[#7A0C1E] text-[#7A0C1E]" : ""
                      }`}
                    />
                  </button>

                  {/* Hover Quick Action Tray */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="flex-1 py-2 bg-white/90 hover:bg-white text-[#1C1512] text-[11px] font-medium uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[#7A0C1E] hover:bg-[#600917] text-white rounded-xl shadow-md transition-all"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
                    </button>
                  </div>
                </div>

                {/* Saree Info */}
                <div className="pt-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9F7B28] font-bold block mb-1">
                      {product.weaveOrigin}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-medium text-[#1C1512] group-hover:text-[#7A0C1E] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#1C1512]/60 font-light mt-0.5 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Add to Bag Footer */}
                  <div className="mt-3 pt-2.5 border-t border-[#1C1512]/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[#7A0C1E]">
                        {formatPrice(product.price)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-[11px] text-[#1C1512]/40 line-through">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#7A0C1E] hover:text-[#991B1B] transition-colors flex items-center gap-1"
                    >
                      <span>Add</span>
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
