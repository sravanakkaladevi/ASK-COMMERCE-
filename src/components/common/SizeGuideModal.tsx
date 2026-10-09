"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, Sparkles, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

const SIZE_TABLE = [
  { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", bustIn: "31-32", waistIn: "24-25", hipIn: "34-35" },
  { size: "S", us: "4-6", uk: "8-10", eu: "36-38", bustIn: "33-34", waistIn: "26-27", hipIn: "36-37" },
  { size: "M", us: "8-10", uk: "12-14", eu: "40-42", bustIn: "35-36", waistIn: "28-29", hipIn: "38-39" },
  { size: "L", us: "12-14", uk: "16-18", eu: "44-46", bustIn: "37-39", waistIn: "30-32", hipIn: "40-42" },
  { size: "XL", us: "16", uk: "20", eu: "48", bustIn: "40-42", waistIn: "33-35", hipIn: "43-45" },
  { size: "XXL", us: "18", uk: "22", eu: "50", bustIn: "43-45", waistIn: "36-38", hipIn: "46-48" },
];

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [userBust, setUserBust] = useState("");
  const [userWaist, setUserWaist] = useState("");
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(userBust);
    const w = parseFloat(userWaist);
    if (!b || !w) return;

    const bustInches = unit === "cm" ? b / 2.54 : b;
    const waistInches = unit === "cm" ? w / 2.54 : w;

    if (bustInches <= 32.5 && waistInches <= 25.5) setRecommendedSize("XS");
    else if (bustInches <= 34.5 && waistInches <= 27.5) setRecommendedSize("S");
    else if (bustInches <= 36.5 && waistInches <= 29.5) setRecommendedSize("M");
    else if (bustInches <= 39.5 && waistInches <= 32.5) setRecommendedSize("L");
    else if (bustInches <= 42.5 && waistInches <= 35.5) setRecommendedSize("XL");
    else setRecommendedSize("XXL (or Bespoke Atelier Tailoring)");
  };

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#1C1512] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 z-10 my-auto p-6 sm:p-8"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1512]/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#9F7B28]">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium">
                  Atelier Size & Fit Matrix
                </h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A24B]">
                  Tailored to Perfection
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#1C1512]/70 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1512]/70">
                  Standard Sizing Guide
                </span>
                <div className="flex bg-[#F3E6E0] p-1 rounded-full text-xs">
                  <button
                    onClick={() => setUnit("in")}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      unit === "in" ? "bg-[#1C1512] text-white shadow-sm" : "text-[#1C1512]/70"
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    onClick={() => setUnit("cm")}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      unit === "cm" ? "bg-[#1C1512] text-white shadow-sm" : "text-[#1C1512]/70"
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#1C1512]/10 bg-white/70">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F3E6E0]/60 text-[#1C1512] uppercase tracking-wider font-semibold border-b border-[#1C1512]/10">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">US / UK</th>
                      <th className="py-2.5 px-3">Bust ({unit})</th>
                      <th className="py-2.5 px-3">Waist ({unit})</th>
                      <th className="py-2.5 px-3">Hips ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1512]/5">
                    {SIZE_TABLE.map((row) => {
                      const bust =
                        unit === "in"
                          ? row.bustIn
                          : `${Math.round(parseInt(row.bustIn.split("-")[0]) * 2.54)}-${Math.round(
                              parseInt(row.bustIn.split("-")[1]) * 2.54
                            )}`;
                      const waist =
                        unit === "in"
                          ? row.waistIn
                          : `${Math.round(parseInt(row.waistIn.split("-")[0]) * 2.54)}-${Math.round(
                              parseInt(row.waistIn.split("-")[1]) * 2.54
                            )}`;
                      const hip =
                        unit === "in"
                          ? row.hipIn
                          : `${Math.round(parseInt(row.hipIn.split("-")[0]) * 2.54)}-${Math.round(
                              parseInt(row.hipIn.split("-")[1]) * 2.54
                            )}`;
                      return (
                        <tr key={row.size} className="hover:bg-[#FAF7F2]/50">
                          <td className="py-2 px-3 font-semibold text-[#9F7B28]">{row.size}</td>
                          <td className="py-2 px-3 text-[#1C1512]/80">{row.us} / {row.uk}</td>
                          <td className="py-2 px-3">{bust}</td>
                          <td className="py-2 px-3">{waist}</td>
                          <td className="py-2 px-3">{hip}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fit Finder Box */}
            <div className="bg-[#F3E6E0] p-5 rounded-2xl border border-[#C9A24B]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#9F7B28] font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fit Calculator</span>
                </div>
                <p className="text-xs text-[#1C1512]/70 mb-3">
                  Enter your natural measurements for an instant size recommendation:
                </p>

                <form onSubmit={calculateSize} className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-[#1C1512] block">
                      Bust ({unit})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder={unit === "in" ? "e.g. 34" : "e.g. 86"}
                      value={userBust}
                      onChange={(e) => setUserBust(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#1C1512] block">
                      Waist ({unit})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder={unit === "in" ? "e.g. 27" : "e.g. 68"}
                      value={userWaist}
                      onChange={(e) => setUserWaist(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#1C1512]/20 bg-white focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1C1512] text-[#FAF7F2] hover:bg-[#C9A24B] hover:text-[#1C1512] text-xs font-semibold py-2 rounded-lg transition-colors mt-2"
                  >
                    Calculate Recommended Size
                  </button>
                </form>

                {recommendedSize && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2.5 bg-white rounded-xl border border-[#C9A24B] text-center"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-[#1C1512]/60">
                      Best Fit Suggestion:
                    </p>
                    <p className="text-sm font-serif font-bold text-[#9F7B28] mt-0.5 flex items-center justify-center gap-1">
                      <Check className="w-4 h-4 text-[#C9A24B]" />
                      Size {recommendedSize}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1C1512]/10 mt-3 text-[10px] text-[#1C1512]/60">
                Need bespoke made-to-measure? We offer complimentary bespoke adjustments on all couture orders.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
