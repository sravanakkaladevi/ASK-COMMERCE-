"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, openQuickView, formatPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesText =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.occasion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesText && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#1C1512] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 z-10 p-6 sm:p-8"
        >
          {/* Header & Search Input */}
          <div className="flex items-center gap-3 border-b border-[#1C1512]/15 pb-4">
            <Search className="w-6 h-6 text-[#9F7B28]" />
            <input
              type="text"
              autoFocus
              placeholder="Search silk gowns, bridal lehengas, metallic sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-base sm:text-lg font-serif placeholder:font-sans placeholder:text-sm text-[#1C1512] placeholder:text-[#1C1512]/40 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs uppercase text-[#1C1512]/40 hover:text-black font-semibold mr-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#1C1512]/70 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex gap-2 overflow-x-auto py-4 text-xs">
            {[
              { id: "all", label: "All Collections" },
              { id: "gowns", label: "Evening Gowns" },
              { id: "lehengas", label: "Bridal Lehengas" },
              { id: "sarees", label: "Metallic Sarees" },
              { id: "cocktail", label: "Cocktail Maxi" },
              { id: "resort", label: "Silk Midis" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? "bg-[#1C1512] text-[#FAF7F2] shadow-sm font-semibold"
                    : "bg-[#F3E6E0] text-[#1C1512]/70 hover:bg-[#C9A24B]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[55vh] overflow-y-auto pr-1 space-y-3 mt-2">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-[#1C1512]/60">
                <p className="font-serif text-base">No silhouettes match your query.</p>
                <p className="text-xs mt-1">Try searching for &quot;Silk&quot;, &quot;Zardozi&quot;, &quot;Gown&quot;, or &quot;Blush&quot;.</p>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openQuickView(p);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/70 hover:bg-white hover:border-[#C9A24B]/40 border border-transparent transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-18 rounded-xl overflow-hidden bg-[#F3E6E0] shrink-0 border border-[#C9A24B]/20">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#9F7B28] font-bold">
                          {p.occasion}
                        </span>
                        {p.tag && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#1C1512] text-[#DFBE70]">
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-sm font-medium text-[#1C1512] group-hover:text-[#9F7B28] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#1C1512]/60 line-clamp-1">
                        {p.fabric}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-sm text-[#9F7B28]">
                      {formatPrice(p.price)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1C1512]/5 group-hover:bg-[#C9A24B] group-hover:text-[#1C1512] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
