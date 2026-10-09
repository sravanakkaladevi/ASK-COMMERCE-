"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/context/CartContext";

export default function NewsletterFooterSection() {
  const { showToast } = useToast();
  const {
    setIsPureZariGuideOpen,
    setIsSilkCareOpen,
    setIsTrackOrderOpen,
    setIsShippingPolicyOpen,
  } = useCart();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast({
        title: "Please enter a valid email",
        message: "Enter your email address to receive your ₹2,000 welcome voucher.",
        type: "info",
      });
      return;
    }

    setIsSubscribed(true);
    showToast({
      title: "Welcome to the Silk Circle",
      message: "Your ₹2,000 discount voucher (UTSAV25) has been sent to your inbox!",
      type: "success",
    });
  };

  return (
    <footer id="newsletter" className="bg-[#120E0E] text-[#FAF7F2] relative overflow-hidden border-t border-[#C9A24B]/30">
      {/* 1. Pre-Footer Silk Circle Invitation Banner */}
      <div className="bg-[#7A0C1E] py-12 sm:py-16 border-b border-[#C9A24B]/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FAF7F2]/10 border border-[#F5D061]/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.25em] uppercase text-[#F5D061] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SILK CONNOISSEURS CIRCLE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#FAF7F2] tracking-tight mb-4">
            Receive ₹2,000 Off Your First Heirloom Order
          </h2>

          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Gain private access to limited loom releases, master artisan exhibitions, and complimentary bespoke blouse tailoring.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              disabled={isSubscribed}
              className="flex-1 px-5 py-3.5 rounded-full bg-black/40 border border-[#F5D061]/40 text-white placeholder-white/50 text-xs focus:outline-none focus:border-[#F5D061] backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="bg-[#F5D061] hover:bg-[#e4bf4a] text-[#7A0C1E] font-bold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-full shadow-xl transition-all shimmer-gold active:scale-95 whitespace-nowrap"
            >
              {isSubscribed ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start mb-4">
              <span className="font-display text-3xl sm:text-4xl tracking-[0.22em] font-medium leading-none text-[#F5D061]">
                ASK
              </span>
              <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-[#DFBE70] mt-1.5">
                HANDCRAFTED SILKS
              </span>
            </div>
            <p className="text-xs text-white/70 font-light max-w-sm leading-relaxed mb-6">
              Handcrafted silks, woven for modern royalty. Honoring centuries of Indian handloom heritage through direct weaver partnerships and certified pure zari authenticity.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#DFBE70]">
              <Award className="w-5 h-5 text-[#F5D061]" />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                100% Silk Mark Certified India
              </span>
            </div>
          </div>

          {/* Col 1: Shop Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#F5D061] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#new-arrivals" className="hover:text-[#F5D061] transition-colors">Varanasi Banarasi</a></li>
              <li><a href="#new-arrivals" className="hover:text-[#F5D061] transition-colors">Kanchipuram Silks</a></li>
              <li><a href="#new-arrivals" className="hover:text-[#F5D061] transition-colors">Organza &amp; Tissue</a></li>
              <li><a href="#new-arrivals" className="hover:text-[#F5D061] transition-colors">Chanderi Handloom</a></li>
              <li><a href="#bridal" className="hover:text-[#F5D061] transition-colors">The Bridal Trousseau</a></li>
              <li><a href="#six-moods" className="hover:text-[#F5D061] transition-colors">Six Moods Palette</a></li>
            </ul>
          </div>

          {/* Col 2: Atelier Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#F5D061] mb-4">
              Atelier Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-[#F5D061] transition-colors">Video Call Shopping</a></li>
              <li><a href="#change-look" className="hover:text-[#F5D061] transition-colors">Custom Blouse Tailoring</a></li>
              <li>
                <button onClick={() => setIsSilkCareOpen(true)} className="hover:text-[#F5D061] transition-colors text-left">
                  Silk Care &amp; Storage
                </button>
              </li>
              <li>
                <button onClick={() => setIsPureZariGuideOpen(true)} className="hover:text-[#F5D061] transition-colors text-left">
                  Pure Zari Testing Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-[#F5D061] transition-colors text-left">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setIsShippingPolicyOpen(true)} className="hover:text-[#F5D061] transition-colors text-left">
                  Worldwide Shipping &amp; Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atelier & Loom Locations */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#F5D061] mb-4">
              Our Looms
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5D061] shrink-0 mt-0.5" />
                <span>Ghat View Loom Guild, Varanasi (UP)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5D061] shrink-0 mt-0.5" />
                <span>Temple Weaver Street, Kanchipuram (TN)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5D061] shrink-0 mt-0.5" />
                <span>Jubilee Hills Flagship Atelier &amp; Loom, Hyderabad (TG)</span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-[#DFBE70]">
                <Phone className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>+91 9********* (+91 98765 43210)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 ASK Handcrafted Silks. All rights reserved. Handcrafted with reverence in India.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Handloom GI Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
