"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Eye, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function BestSellersSection() {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, formatPrice } =
    useCart();

  const bestSellers = ALL_PRODUCTS.filter((p) => p.isBestSeller || p.rating >= 4.96);

  return (
    <section
      id="best-sellers"
      className="py-16 sm:py-24 bg-[#F5EFE6] text-[#1C1512] relative overflow-hidden"
      aria-label="Best Sellers Collection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-[#1C1512]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>MOST ADORED SILKS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              Best Sellers<span className="text-[#7A0C1E]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#1C1512]/70 font-light max-w-sm">
            Heirloom weaves cherished by brides and connoisseurs across over 40 countries.
          </p>
        </div>

        {/* Product Cards Row / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 4).map((product, idx) => {
            const inWish = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white p-3.5 sm:p-4 border border-[#C9A24B]/30 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#1C1512]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#F5D061] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <span>★</span>
                    <span>{product.rating} ({product.reviewsCount})</span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1512] hover:text-[#7A0C1E] shadow-md transition-all"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        inWish ? "fill-[#7A0C1E] text-[#7A0C1E]" : ""
                      }`}
                    />
                  </button>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="flex-1 py-2 bg-white text-[#1C1512] text-[11px] font-medium uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[#7A0C1E] hover:bg-[#600917] text-white rounded-xl shadow-md transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9F7B28] font-bold block mb-0.5">
                      {product.craftHours ? `${product.craftHours} Craft Hours` : "Pure Silk"}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-medium text-[#1C1512] group-hover:text-[#7A0C1E] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#1C1512]/5 flex items-center justify-between">
                    <span className="font-semibold text-sm sm:text-base text-[#7A0C1E]">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xs font-bold uppercase tracking-wider text-[#7A0C1E] hover:text-[#991B1B]"
                    >
                      + Bag
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
