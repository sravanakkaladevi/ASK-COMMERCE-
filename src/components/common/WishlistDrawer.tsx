"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    wishlistCount,
    toggleWishlist,
    moveToCartFromWishlist,
    formatPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF7F2] text-[#1C1512] z-50 shadow-2xl flex flex-col justify-between border-l border-[#C9A24B]/30"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1C1512]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#9F7B28]">
                  <Heart className="w-4 h-4 fill-[#C9A24B]" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-medium tracking-wide">
                    Saved Curations
                  </h2>
                  <p className="text-[11px] uppercase tracking-widest text-[#1C1512]/60">
                    {wishlistCount} {wishlistCount === 1 ? "Piece" : "Pieces"} in Wishlist
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#1C1512]/70 hover:text-black transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F3E6E0] flex items-center justify-center text-[#C9A24B]">
                    <Heart className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1C1512]">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-[#1C1512]/60 max-w-xs mt-1 leading-relaxed">
                      Save your favorite gowns, lehengas, and silk occasion pieces to revisit anytime.
                    </p>
                  </div>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#1C1512]/5 relative group"
                  >
                    <div className="w-20 h-28 rounded-xl overflow-hidden bg-[#F3E6E0] shrink-0 border border-[#C9A24B]/20">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-sm font-medium text-[#1C1512] line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-[#1C1512]/40 hover:text-red-500 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#1C1512]/60 mt-0.5 line-clamp-1">
                          {product.fabric}
                        </p>
                        <p className="text-xs text-[#9F7B28] font-semibold mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => moveToCartFromWishlist(product)}
                        className="flex items-center justify-center gap-1.5 bg-[#1C1512] hover:bg-[#C9A24B] hover:text-[#1C1512] text-white text-xs font-semibold py-2 px-3 rounded-full transition-colors mt-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-[#1C1512]/10 bg-white/60">
                <button
                  onClick={() => {
                    wishlist.forEach((p) => moveToCartFromWishlist(p));
                  }}
                  className="w-full bg-[#1C1512] hover:bg-[#C9A24B] hover:text-[#1C1512] text-[#FAF7F2] font-semibold text-xs uppercase tracking-[0.25em] py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Move All to Bag</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
