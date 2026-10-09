"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustRibbonSection from "@/components/sections/TrustRibbonSection";
import SixMoodsSection from "@/components/sections/SixMoodsSection";
import SilkArchivesSection from "@/components/sections/SilkArchivesSection";
import NewArrivalsSection from "@/components/sections/NewArrivalsSection";
import BestSellersSection from "@/components/sections/BestSellersSection";
import BridalCollectionSection from "@/components/sections/BridalCollectionSection";
import TrendsAndSpecialsSection from "@/components/sections/TrendsAndSpecialsSection";
import AutumnLookbookSection from "@/components/sections/AutumnLookbookSection";
import ChangeLookSwapperSection from "@/components/sections/ChangeLookSwapperSection";
import OccasionBentoSection from "@/components/sections/OccasionBentoSection";
import WorthAttentionSection from "@/components/sections/WorthAttentionSection";
import AmbientMoodPlayerSection from "@/components/sections/AmbientMoodPlayerSection";
import StoriesDrapeSection from "@/components/sections/StoriesDrapeSection";
import FabricCraftSection from "@/components/sections/FabricCraftSection";
import NewsletterFooterSection from "@/components/sections/NewsletterFooterSection";

// Interactive Overlays & Drawers
import CartDrawer from "@/components/common/CartDrawer";
import WishlistDrawer from "@/components/common/WishlistDrawer";
import QuickViewModal from "@/components/common/QuickViewModal";
import SizeGuideModal from "@/components/common/SizeGuideModal";
import SearchModal from "@/components/common/SearchModal";
import FilmModal from "@/components/common/FilmModal";
import CheckoutModal from "@/components/common/CheckoutModal";
import PureZariGuideModal from "@/components/common/PureZariGuideModal";
import SilkCareModal from "@/components/common/SilkCareModal";
import TrackOrderModal from "@/components/common/TrackOrderModal";
import ShippingPolicyModal from "@/components/common/ShippingPolicyModal";

export default function DriftSilkStorePage() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1C1512] selection:bg-[#7A0C1E] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Video Showroom Hero Section */}
      <HeroSection />

      {/* 3. Pure Zari Certified Trust Ribbon Marquee */}
      <TrustRibbonSection />

      {/* 4. SIX MOODS Arched Cards Section */}
      <SixMoodsSection />

      {/* 5. "Woven to Be Remembered" Silk Archives Carousel */}
      <SilkArchivesSection />

      {/* 6. Master Karigar & Atelier Handloom Craft (WEAVER VIDEO) */}
      <FabricCraftSection />

      {/* 7. New Arrivals (Varanasi, Kanchi, Organza, Chanderi) */}
      <NewArrivalsSection />

      {/* 8. Best Sellers */}
      <BestSellersSection />

      {/* 9. The Bridal Collection (Dark Luxury & Spotlight Red) */}
      <BridalCollectionSection />

      {/* 10. Trend of the Day & Seasonal Special */}
      <TrendsAndSpecialsSection />

      {/* 11. Autumn — Winter 2026 Lookbook (3 Arched Frames) */}
      <AutumnLookbookSection />

      {/* 12. "Change Look" Interactive Saree Swapper */}
      <ChangeLookSwapperSection />

      {/* 13. "EDITS FOR every occasion" Bento Grid */}
      <OccasionBentoSection />

      {/* 14. "Worth your attention" Motion Reels */}
      <WorthAttentionSection />

      {/* 15. Ambient Raga & Soundscape Player (First Light, Courtyard Air, Temple Bells) */}
      <AmbientMoodPlayerSection />

      {/* 16. "LATEST TRENDS" & Stories Behind The Drape */}
      <StoriesDrapeSection />

      {/* 17. Connoisseurs Circle & Footer */}
      <NewsletterFooterSection />

      {/* Client-Side E-Commerce Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchModal />
      <FilmModal />
      <CheckoutModal />
      <PureZariGuideModal />
      <SilkCareModal />
      <TrackOrderModal />
      <ShippingPolicyModal />
    </main>
  );
}
