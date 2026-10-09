"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  Ruler,
  Check,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsSizeGuideOpen,
  } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || "M");
      setSelectedColor(quickViewProduct.colors[0]?.name || "Original");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FAF7F2] text-[#1C1512] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1C1512] flex items-center justify-center shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-[#F3E6E0]/60 flex flex-col justify-between">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/5 border border-[#C9A24B]/20">
                <img
                  src={
                    quickViewProduct.images[selectedImageIndex] ||
                    quickViewProduct.images[0]
                  }
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />

                {quickViewProduct.tag && (
                  <span className="absolute top-3 left-3 bg-[#1C1512] text-[#DFBE70] text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full border border-[#C9A24B]/40 shadow">
                    {quickViewProduct.tag}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImageIndex === idx
                          ? "border-[#C9A24B] scale-105 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Buying */}
            <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9F7B28] font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{quickViewProduct.occasion}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1512] leading-snug">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-xs text-[#1C1512]/60 mt-1">
                    {quickViewProduct.subtitle}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-bold text-[#9F7B28]">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.mrp > quickViewProduct.price && (
                    <span className="text-sm line-through text-[#1C1512]/40">
                      {formatPrice(quickViewProduct.mrp)}
                    </span>
                  )}
                  {quickViewProduct.craftHours && (
                    <span className="text-[11px] text-[#1C1512]/70 bg-[#C9A24B]/10 px-2.5 py-0.5 rounded-full border border-[#C9A24B]/30 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C9A24B]" />
                      {quickViewProduct.craftHours}h Handwork
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#1C1512]/75 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Swatches */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1512] block mb-2">
                    Color: <span className="font-normal text-[#1C1512]/70">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2.5">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all relative flex items-center justify-center ${
                          selectedColor === color.name
                            ? "border-[#C9A24B] scale-110 shadow-sm"
                            : "border-black/10 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className="w-3 h-3 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1512]">
                      Size: <span className="font-normal text-[#1C1512]/70">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => {
                        setIsSizeGuideOpen(true);
                      }}
                      className="text-[11px] uppercase tracking-wider text-[#9F7B28] hover:underline flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                          selectedSize === size
                            ? "border-[#1C1512] bg-[#1C1512] text-[#FAF7F2] shadow-sm"
                            : "border-[#1C1512]/20 hover:border-[#C9A24B] text-[#1C1512]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric note */}
                <div className="p-3 bg-white/70 rounded-xl border border-[#1C1512]/5 text-xs space-y-1">
                  <p className="font-semibold text-[#1C1512]">Fabric Composition:</p>
                  <p className="text-[#1C1512]/70">{quickViewProduct.fabric}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#1C1512]/10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#C9A24B] hover:bg-[#B38C3B] text-[#1C1512] font-semibold text-xs uppercase tracking-[0.25em] py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group shimmer-gold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3.5 rounded-full border transition-all ${
                    inWish
                      ? "border-[#C9A24B] bg-[#C9A24B]/20 text-[#9F7B28]"
                      : "border-[#1C1512]/20 hover:border-[#C9A24B] text-[#1C1512]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${inWish ? "fill-[#C9A24B] text-[#C9A24B]" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
