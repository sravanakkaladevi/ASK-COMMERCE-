"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { SWAPPER_LOOKS, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ChangeLookSwapperSection() {
  const { addToCart, formatPrice } = useCart();
  const [selectedLookIdx, setSelectedLookIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("36 (M)");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const currentLook = SWAPPER_LOOKS[selectedLookIdx] || SWAPPER_LOOKS[0];
  const currentColor = currentLook.colors[selectedColorIdx] || currentLook.colors[0];

  const handleSelectLook = (idx: number) => {
    setSelectedLookIdx(idx);
    setSelectedColorIdx(0);
  };

  const handleAddToCart = () => {
    const matchedProduct = ALL_PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(currentLook.title.toLowerCase().split(" ")[0])
    ) || {
      id: currentLook.id,
      name: currentLook.title,
      subtitle: currentLook.description,
      price: currentLook.price,
      mrp: currentLook.mrp,
      currency: "INR",
      fabric: currentLook.fabric,
      weaveOrigin: "DRIFT Atelier Studio",
      zariType: "Pure Zari",
      occasion: "Festive & Royal" as const,
      category: "organza" as const,
      description: currentLook.description,
      details: ["Pure Silk", "Silk Mark Certified"],
      images: [currentLook.mainImage],
      sizes: currentLook.sizes,
      colors: currentLook.colors.map((c) => ({ name: c.name, hex: c.hex })),
      rating: currentLook.rating,
      reviewsCount: currentLook.reviewsCount,
    };

    addToCart(
      matchedProduct,
      selectedSize,
      currentColor.name,
      1,
      `Blouse Tailoring: ${selectedSize}`
    );
  };

  return (
    <section
      id="change-look"
      className="py-16 sm:py-24 bg-white text-[#1C1512] relative overflow-hidden border-y border-[#1C1512]/10"
      aria-label="Interactive Dress and Look Swapper"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#7A0C1E] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>INTERACTIVE ATELIER DRAPES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1C1512] tracking-tight">
            Customize &amp; Change Look<span className="text-[#7A0C1E]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1512]/70 font-light mt-2">
            Switch silhouettes in real-time, pick custom blouse sizes, and inspect authentic drape falls.
          </p>
        </div>

        {/* 3-Column Interactive Swapper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#C9A24B]/30 shadow-xl">
          {/* Left Column: Vertical Look Thumbnails (3 cols) */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <div className="hidden lg:block text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-1">
              Change Look
            </div>

            {SWAPPER_LOOKS.map((look, idx) => {
              const isSelected = selectedLookIdx === idx;
              return (
                <button
                  key={look.id}
                  onClick={() => handleSelectLook(idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all text-left w-full shrink-0 lg:shrink ${
                    isSelected
                      ? "bg-white border-[#7A0C1E] shadow-md ring-2 ring-[#7A0C1E]/20"
                      : "bg-[#FAF7F2] border-[#1C1512]/10 hover:border-[#7A0C1E]/50 hover:bg-white"
                  }`}
                >
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative">
                    <img
                      src={look.thumbnails[0]}
                      alt={look.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-[#9F7B28] font-bold block uppercase">
                      LOOK 0{idx + 1}
                    </span>
                    <h4 className="font-display text-xs sm:text-sm font-semibold text-[#1C1512] truncate">
                      {look.title}
                    </h4>
                    <span className="text-xs font-bold text-[#7A0C1E]">
                      {formatPrice(look.price)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Model Drape Preview (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4.4] rounded-3xl overflow-hidden bg-[#140E0E] shadow-2xl border border-[#C9A24B]/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentLook.id}-${currentColor.name}`}
                  src={currentColor.image || currentLook.mainImage}
                  alt={currentLook.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Tag Pill Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#F5D061] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-white/20">
                SILK MARK CERTIFIED
              </div>

              {/* Watermark in corner */}
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold drop-shadow">
                DRIFT ATELIER &apos;26
              </div>
            </div>
          </div>

          {/* Right Column: Customizer & Add to Cart (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Reviews Stars */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#D97706] text-sm">★★★★★</div>
                <span className="text-xs text-[#1C1512]/60 font-medium">
                  {currentLook.rating} ({currentLook.reviewsCount} reviews)
                </span>
              </div>

              {/* Saree Title */}
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1C1512] leading-tight mb-2">
                {currentLook.title}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#7A0C1E]">
                  {formatPrice(currentLook.price)}
                </span>
                <span className="text-sm text-[#1C1512]/40 line-through">
                  {formatPrice(currentLook.mrp)}
                </span>
                <span className="text-xs font-semibold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded">
                  20% OFF
                </span>
              </div>

              <p className="text-xs text-[#1C1512]/75 font-light leading-relaxed mb-6">
                {currentLook.description}
              </p>

              {/* Color Swatch Picker */}
              <div className="mb-5">
                <label className="text-[11px] uppercase tracking-wider text-[#1C1512] font-bold block mb-2">
                  Select Colour / Swatch:{" "}
                  <span className="text-[#7A0C1E] font-medium">{currentColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {currentLook.colors.map((col, cIdx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIdx(cIdx)}
                      className={`w-7 h-7 rounded-full border-2 transition-all relative flex items-center justify-center ${
                        selectedColorIdx === cIdx
                          ? "border-[#7A0C1E] scale-110 shadow-md ring-2 ring-[#7A0C1E]/20"
                          : "border-white hover:scale-105"
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColorIdx === cIdx && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blouse Size Selector */}
              <div className="mb-6">
                <label className="text-[11px] uppercase tracking-wider text-[#1C1512] font-bold block mb-2">
                  Select Blouse Size / Custom Fit:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currentLook.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-2 text-[11px] rounded-xl border text-center font-medium transition-all ${
                        selectedSize === sz
                          ? "bg-[#7A0C1E] text-white border-[#7A0C1E] shadow-sm font-bold"
                          : "bg-white text-[#1C1512] border-[#1C1512]/15 hover:border-[#7A0C1E]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Luxury Pill Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#7A0C1E] hover:bg-[#600917] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.22em] py-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 shimmer-gold active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
                <span>Add to Cart — {formatPrice(currentLook.price)}</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-4 border-t border-[#1C1512]/10 grid grid-cols-2 gap-3 text-[11px] text-[#1C1512]/70 font-light">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#7A0C1E]" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A0C1E]" />
                <span>100% Pure Silk Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
