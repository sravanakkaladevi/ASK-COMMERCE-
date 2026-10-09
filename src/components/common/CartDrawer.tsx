"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingProgress,
    freeShippingThreshold,
    couponCode,
    isCouponApplied,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCoupon(inputCoupon);
    if (success) {
      setInputCoupon("");
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Slide-in Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF7F2] text-[#1C1512] z-50 shadow-2xl flex flex-col justify-between border-l border-[#C9A24B]/30"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1C1512]/10 bg-[#FAF7F2]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#9F7B28]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-medium tracking-wide">
                      Shopping Bag
                    </h2>
                    <p className="text-[11px] uppercase tracking-widest text-[#1C1512]/60">
                      {cartCount} {cartCount === 1 ? "Silhouette" : "Silhouettes"} Selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-[#1C1512]/70 hover:text-black transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="mt-4 pt-3 border-t border-[#1C1512]/5">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5 text-[#1C1512]/80">
                    <Truck className="w-3.5 h-3.5 text-[#C9A24B]" />
                    {freeShippingProgress >= 100 ? (
                      <span className="text-[#9F7B28] font-semibold">
                        Complimentary Worldwide Express Unlocked
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#1C1512]">{formatPrice(remainingForFreeShipping)}</strong> for Free Express
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-[#C9A24B] font-bold">
                    {freeShippingProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#1C1512]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A24B] to-[#DFBE70] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F3E6E0] flex items-center justify-center text-[#C9A24B]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1C1512]">
                      Your Bag is Empty
                    </h3>
                    <p className="text-xs text-[#1C1512]/60 max-w-xs mt-1 leading-relaxed">
                      Discover our curated couture dresses, evening gowns, and bridal lehengas crafted for modern grace.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 text-xs uppercase tracking-[0.2em] font-medium bg-[#1C1512] text-[#FAF7F2] px-6 py-2.5 rounded-full hover:bg-[#C9A24B] hover:text-[#1C1512] transition-colors"
                  >
                    Explore New Arrivals
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-3.5 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#1C1512]/5 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-28 rounded-xl overflow-hidden bg-[#F3E6E0] shrink-0 border border-[#C9A24B]/20">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium text-[#1C1512] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#1C1512]/40 hover:text-red-600 transition-colors p-1"
                            title="Remove silhouette"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#1C1512]/60 mt-0.5">
                          Size: <span className="font-semibold text-[#1C1512]">{item.selectedSize}</span> · Color:{" "}
                          <span className="font-semibold text-[#1C1512]">{item.selectedColor}</span>
                        </p>
                        <p className="text-xs text-[#9F7B28] font-semibold mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1C1512]/5">
                        <div className="flex items-center gap-2 border border-[#1C1512]/15 rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#1C1512]/60 hover:text-[#1C1512] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#1C1512]/60 hover:text-[#1C1512] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-serif font-semibold text-[#1C1512]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#1C1512]/10 bg-white/60 space-y-4">
                {/* Coupon Code Section */}
                <div>
                  {isCouponApplied ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#C9A24B]/10 border border-[#C9A24B]/30 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 text-[#9F7B28] font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Privilege Code: <strong>{couponCode}</strong></span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Privilege Code (e.g. AURELLE10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 text-xs uppercase px-3 py-2 rounded-full border border-[#1C1512]/20 focus:outline-none focus:border-[#C9A24B] bg-[#FAF7F2]"
                      />
                      <button
                        type="submit"
                        className="text-xs uppercase tracking-wider font-semibold bg-[#1C1512] text-[#FAF7F2] px-4 py-2 rounded-full hover:bg-[#C9A24B] hover:text-[#1C1512] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Subtotal breakdown */}
                <div className="space-y-1.5 text-xs text-[#1C1512]/70 pt-2 border-t border-[#1C1512]/10">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1C1512]">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#9F7B28]">
                      <span>VIP Privilege Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Atelier Courier Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-semibold">Complimentary</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-[#1C1512] pt-2 border-t border-[#1C1512]/10">
                    <span>Estimated Total</span>
                    <span className="text-[#9F7B28] text-base">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-[#C9A24B] hover:bg-[#B38C3B] text-[#1C1512] font-semibold text-xs uppercase tracking-[0.25em] py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group shimmer-gold"
                >
                  <span>Proceed to Atelier Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust badge */}
                <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-wider text-[#1C1512]/50">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C9A24B]" />
                    Insured Worldwide
                  </span>
                  <span>·</span>
                  <span>14-Day Exchanges</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
