"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    subtotal,
    formatPrice,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sarees", href: "#new-arrivals" },
    { name: "Six Moods", href: "#six-moods" },
    { name: "Archives", href: "#archives" },
    { name: "Master Weaver", href: "#craft" },
    { name: "Bridal", href: "#bridal" },
    { name: "Custom Look", href: "#change-look" },
    { name: "Edits", href: "#occasions" },
    { name: "Soundscape", href: "#ambient-player" },
    { name: "Stories", href: "#stories" },
  ];

  return (
    <>
      {/* Top Privilege Bar - Auto-hides on scroll for undisturbed browsing */}
      {!isScrolled && (
        <div className="bg-[#7A0C1E] text-[#FAF7F2] text-[11px] sm:text-xs py-2 px-3 sm:px-6 text-center font-sans tracking-[0.18em] border-b border-[#C9A24B]/30 relative z-40 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center gap-2 text-white/80 text-[11px]">
              <Phone className="w-3 h-3 text-[#DFBE70]" />
              <span>Atelier Concierge: +91 9********* (+91 98765 43210)</span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3 mx-auto md:mx-0">
              <span className="bg-[#F5D061] text-[#7A0C1E] text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider shadow-sm animate-pulse">
                DIWALI SALE
              </span>
              <span className="font-medium text-white/95">
                FREE SHIPPING WORLDWIDE OVER ₹5,000
              </span>
              <span className="hidden lg:inline text-[#DFBE70]">·</span>
              <span className="hidden lg:inline text-white/85">
                USE CODE: <strong className="text-[#F5D061] font-bold">UTSAV25</strong> FOR 25% OFF
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-[10px] text-[#DFBE70] uppercase tracking-widest">
                100% PURE SILK MARK
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Pure Dark Luxury Header */}
      <header
        className="sticky top-0 left-0 right-0 z-30 py-3.5 bg-[#140E0E] border-b border-[#C9A24B]/35 shadow-2xl text-white transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-full hover:bg-white/10 text-[#F5D061] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="group flex flex-col items-start">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-[0.22em] font-medium leading-none text-[#FAF7F2]">
                ASK
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.45em] font-bold text-[#F5D061] mt-1">
                HANDCRAFTED SILKS
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-200 relative py-1 text-[#FAF7F2]/90 hover:text-[#F5D061] group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5D061] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Currency, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] sm:text-xs uppercase font-semibold tracking-wider py-1 px-3 rounded-full border border-[#C9A24B]/40 text-[#DFBE70] bg-[#C9A24B]/15 hover:border-[#F5D061] transition-all"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCurrencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-28 bg-[#1C1512] border border-[#C9A24B]/30 rounded-xl shadow-xl py-1.5 z-50 text-[#FAF7F2]"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {(["INR", "USD", "EUR", "GBP"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs tracking-wider flex items-center justify-between hover:bg-[#7A0C1E]/40 transition-colors ${
                        currency === c ? "text-[#DFBE70] font-semibold" : "text-[#FAF7F2]/80"
                      }`}
                    >
                      <span>{c}</span>
                      {currency === c && <span className="text-[#DFBE70] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-[#FAF7F2] hover:text-[#F5D061] transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button with badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-[#FAF7F2] hover:text-[#F5D061] transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A0C1E] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Button with Count and Price */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#7A0C1E] hover:bg-[#600917] text-[#FAF7F2] font-medium text-xs uppercase tracking-wider px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shimmer-gold"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
              <span className="hidden sm:inline font-semibold">
                {subtotal > 0 ? formatPrice(subtotal) : "Bag"}
              </span>
              <span className="w-4 h-4 rounded-full bg-[#F5D061] text-[#7A0C1E] text-[10px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#1C1512] text-[#FAF7F2] z-50 p-6 flex flex-col justify-between border-r border-[#C9A24B]/30"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#C9A24B]/20">
                  <div>
                    <span className="font-display text-2xl tracking-[0.22em] text-[#FAF7F2]">
                      ASK
                    </span>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#DFBE70] mt-0.5">
                      Handcrafted Silks
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#FAF7F2]/70 hover:text-white rounded-full border border-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="mt-6 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-serif tracking-widest text-[#FAF7F2]/90 hover:text-[#DFBE70] transition-colors flex items-center justify-between py-2 border-b border-white/5 group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#DFBE70] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Bottom Currency & VIP Contact */}
              <div className="pt-4 border-t border-[#C9A24B]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#FAF7F2]/60">
                    Currency
                  </span>
                  <div className="flex gap-2">
                    {(["INR", "USD", "EUR", "GBP"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`text-xs px-2.5 py-1 rounded-full border ${
                          currency === c
                            ? "border-[#DFBE70] bg-[#DFBE70]/20 text-[#DFBE70]"
                            : "border-white/10 text-white/60"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#FAF7F2]/70 tracking-wider text-center">
                  Loom Concierge & Video Call Shopping:{" "}
                  <a
                    href="https://wa.me/919840012345"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#DFBE70] font-semibold underline block mt-1"
                  >
                    WhatsApp +91 98400 12345
                  </a>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
