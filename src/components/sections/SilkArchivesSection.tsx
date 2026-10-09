"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { SILK_ARCHIVES_DATA, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function SilkArchivesSection() {
  const { addToCart, openQuickView, formatPrice } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleQuickViewArchive = (archiveItem: typeof SILK_ARCHIVES_DATA[0]) => {
    // Find matching full product or create one
    const matched = ALL_PRODUCTS.find((p) => p.name.includes(archiveItem.name.split(" ")[0])) || {
      id: archiveItem.id,
      name: archiveItem.name,
      subtitle: archiveItem.subtitle,
      tag: "PURE ZARI" as const,
      price: archiveItem.price,
      mrp: archiveItem.mrp,
      currency: "INR",
      fabric: archiveItem.fabric,
      weaveOrigin: "Varanasi & Kanchipuram Guild",
      zariType: "Certified Pure Gold Zari",
      occasion: "Festive & Royal" as const,
      category: "banarasi" as const,
      description: `The Silk Archives — ${archiveItem.name}. Handcrafted on master looms over 180 hours of meticulous zari alignment.`,
      details: [
        "100% pure silk mark certified",
        "Tested electroplated zari with hallmark card",
        "Includes matching unstitched blouse piece",
      ],
      images: [archiveItem.image],
      sizes: ["Unstitched (Free Blouse Piece)", "Stitched - 34 (S)", "Stitched - 36 (M)", "Stitched - 38 (L)"],
      colors: [{ name: "Original", hex: "#C9A24B" }],
      rating: archiveItem.rating,
      reviewsCount: 38,
    };
    openQuickView(matched);
  };

  const handleAddArchiveToBag = (archiveItem: typeof SILK_ARCHIVES_DATA[0]) => {
    const matched = ALL_PRODUCTS.find((p) => p.name.includes(archiveItem.name.split(" ")[0])) || {
      id: archiveItem.id,
      name: archiveItem.name,
      subtitle: archiveItem.subtitle,
      tag: "PURE ZARI" as const,
      price: archiveItem.price,
      mrp: archiveItem.mrp,
      currency: "INR",
      fabric: archiveItem.fabric,
      weaveOrigin: "Silk Archives Atelier",
      zariType: "Pure Zari",
      occasion: "Festive & Royal" as const,
      category: "banarasi" as const,
      description: archiveItem.subtitle,
      details: ["Pure Silk", "Silk Mark Certified"],
      images: [archiveItem.image],
      sizes: ["Unstitched (Free Blouse Piece)", "Stitched - 36 (M)"],
      colors: [{ name: "Original", hex: "#C9A24B" }],
      rating: archiveItem.rating,
      reviewsCount: 38,
    };
    addToCart(matched, "Unstitched (Free Blouse Piece)", "Original");
  };

  return (
    <section
      id="archives"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Woven to Be Remembered Silk Archives"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#1C1512]/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>THE SILK ARCHIVES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              Woven to Be{" "}
              <span className="italic font-serif text-[#C9A24B]">Remembered</span>
            </h2>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#7A0C1E]/30 hover:border-[#7A0C1E] hover:bg-[#7A0C1E] hover:text-white flex items-center justify-center transition-colors text-[#7A0C1E]"
              aria-label="Previous archive sarees"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#7A0C1E]/30 hover:border-[#7A0C1E] hover:bg-[#7A0C1E] hover:text-white flex items-center justify-center transition-colors text-[#7A0C1E]"
              aria-label="Next archive sarees"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Infinite Auto-Scrolling Silk Archives Track (Left to Right / Endless Loop) */}
        <div className="relative w-full overflow-hidden py-4 -mx-4 px-4">
          <motion.div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...SILK_ARCHIVES_DATA, ...SILK_ARCHIVES_DATA].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[280px] sm:w-[320px] shrink-0 group rounded-3xl overflow-hidden bg-white p-3 sm:p-4 border border-[#C9A24B]/25 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Frame with Arched Top */}
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative bg-[#1C1512]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#7A0C1E] text-[#F5D061] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {item.tag}
                  </div>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleQuickViewArchive(item)}
                      className="p-3 bg-white/90 hover:bg-white text-[#7A0C1E] rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAddArchiveToBag(item)}
                      className="p-3 bg-[#7A0C1E] hover:bg-[#600917] text-[#FAF7F2] rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Meta Details */}
                <div className="pt-3.5 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-[#9F7B28] font-bold">
                    {item.fabric}
                  </span>
                  <h3 className="font-display text-base sm:text-lg text-[#1C1512] font-medium leading-snug mt-1 group-hover:text-[#7A0C1E] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#1C1512]/60 font-light mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>

                  {/* Price & Rating */}
                  <div className="mt-3 pt-2.5 border-t border-[#1C1512]/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[#7A0C1E]">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-xs text-[#1C1512]/40 line-through">
                        {formatPrice(item.mrp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#D97706] font-semibold">
                      <span>★</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
