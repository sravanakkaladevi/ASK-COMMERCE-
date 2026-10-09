"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  ShieldCheck,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    total,
    discount,
    subtotal,
    shipping,
    formatPrice,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [formData, setFormData] = useState({
    firstName: "Victoria",
    lastName: "Sterling",
    email: "victoria.sterling@haute.com",
    phone: "+1 (555) 389-2910",
    address: "740 Park Avenue, Penthouse B",
    city: "New York",
    postalCode: "10021",
    country: "United States",
    specialInstructions: "Please package in luxury velvet keepsake box with silk garment hanger.",
    paymentMethod: "card",
  });
  const [orderNumber, setOrderNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrder = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep("confirmed");
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C9A24B", "#DFBE70", "#1C1512", "#FAF7F2"],
        });
      } catch (err) {
        console.warn("Confetti error", err);
      }
    }, 1500);
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== "confirmed") setIsCheckoutOpen(false);
          }}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#1C1512] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 z-10 my-auto p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1512]/10">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl tracking-[0.2em] font-medium">
                AURELLE
              </span>
              <span className="text-[#C9A24B] text-xs">·</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#1C1512]/70 font-semibold">
                Atelier Checkout
              </span>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1512]/70 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9F7B28] font-bold">
                <Package className="w-4 h-4" />
                <span>Step 1 of 2: Courier & Bespoke Delivery Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Email Address (for order updates)</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Phone / WhatsApp (for courier)</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-semibold block mb-1">Street Address</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">City</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Postal Code</label>
                  <input
                    required
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Country</label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-semibold block mb-1">
                  Atelier Packaging & Fit Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    setFormData({ ...formData, specialInstructions: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              {/* Order total pill */}
              <div className="p-3 bg-[#F3E6E0] rounded-xl flex items-center justify-between text-xs font-semibold">
                <span>Order Total ({cart.length} items):</span>
                <span className="font-serif text-sm text-[#9F7B28]">{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A24B] hover:bg-[#B38C3B] text-[#1C1512] font-semibold text-xs uppercase tracking-[0.25em] py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group shimmer-gold"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9F7B28] font-bold">
                <Lock className="w-4 h-4" />
                <span>Step 2 of 2: 256-Bit Encrypted Payment</span>
              </div>

              {/* Payment selector */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                  { id: "razorpay", label: "Razorpay / UPI", icon: Sparkles },
                  { id: "applepay", label: "Apple / Google Pay", icon: Lock },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: item.id })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      formData.paymentMethod === item.id
                        ? "border-[#C9A24B] bg-[#C9A24B]/15 text-[#1C1512] font-semibold shadow-sm"
                        : "border-[#1C1512]/15 bg-white text-[#1C1512]/70 hover:border-[#C9A24B]"
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-[#9F7B28]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Inputs Mock */}
              <div className="p-4 bg-white rounded-2xl border border-[#1C1512]/10 space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#1C1512]/20 font-mono focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08 / 28"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C1512]/20 font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Security Code (CVC)</label>
                    <input
                      type="password"
                      defaultValue="888"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C1512]/20 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-[#F3E6E0] rounded-2xl space-y-1.5 text-xs text-[#1C1512]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#9F7B28]">
                    <span>VIP Privilege Savings</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Atelier Delivery</span>
                  <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#1C1512] pt-2 border-t border-[#1C1512]/15">
                  <span>Grand Total</span>
                  <span className="text-[#9F7B28] text-base">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="px-5 py-3 rounded-full border border-[#1C1512]/20 text-xs uppercase tracking-wider font-semibold hover:bg-black/5"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-[#C9A24B] hover:bg-[#B38C3B] text-[#1C1512] font-semibold text-xs uppercase tracking-[0.25em] py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group shimmer-gold disabled:opacity-60"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Authorizing Atelier Order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment of {formatPrice(total)}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-[#1C1512]/50">
                Guaranteed safe checkout powered by 256-bit SSL encryption.
              </p>
            </div>
          )}

          {step === "confirmed" && (
            <div className="mt-8 text-center space-y-5 py-4">
              <div className="w-20 h-20 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#9F7B28] mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C9A24B] font-bold">
                  Order Successfully Confirmed
                </p>
                <h3 className="font-serif text-3xl font-medium text-[#1C1512] mt-1">
                  Thank You, {formData.firstName}
                </h3>
                <p className="text-xs text-[#1C1512]/70 max-w-md mx-auto mt-2 leading-relaxed">
                  Your haute couture ensemble is now queued with our master atelier artisans. A confirmation & tracking link has been sent to <strong className="text-[#1C1512]">{formData.email}</strong>.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#C9A24B]/30 max-w-sm mx-auto text-xs space-y-1">
                <p className="text-[#1C1512]/60">Atelier Reference Number:</p>
                <p className="font-mono text-base font-bold text-[#9F7B28] tracking-wider">
                  {orderNumber}
                </p>
                <p className="text-[11px] text-[#1C1512]/70 pt-2 border-t border-[#1C1512]/10 mt-2">
                  Delivery Destination: {formData.address}, {formData.city}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep("details");
                }}
                className="bg-[#1C1512] hover:bg-[#C9A24B] hover:text-[#1C1512] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-semibold py-3.5 px-8 rounded-full shadow transition-all"
              >
                Return to Maison Aurelle
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
