"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Eye, ShoppingBag, Music } from "lucide-react";
import { AMBIENT_MOODS, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AmbientMoodPlayerSection() {
  const { addToCart, openQuickView, formatPrice } = useCart();
  const [activeMoodIdx, setActiveMoodIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentMood = AMBIENT_MOODS[activeMoodIdx] || AMBIENT_MOODS[0];

  // Synthesize Indian Classical Ambient Raga Drone
  const startSynthAudio = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      stopSynthAudio();

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsPlayingAudio(true);
    } catch (e) {
      console.warn("Web Audio initialization:", e);
    }
  };

  const stopSynthAudio = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      setIsPlayingAudio(false);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleToggleSound = () => {
    if (isPlayingAudio) {
      stopSynthAudio();
    } else {
      startSynthAudio(currentMood.freq);
    }
  };

  const handleSelectMood = (idx: number) => {
    setActiveMoodIdx(idx);
    if (isPlayingAudio) {
      startSynthAudio(AMBIENT_MOODS[idx].freq);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section
      id="ambient-player"
      className="py-20 sm:py-28 text-[#FAF7F2] relative overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor:
          activeMoodIdx === 0
            ? "#1A1412"
            : activeMoodIdx === 1
            ? "#2B0912"
            : "#15120E",
      }}
      aria-label="Ambient Raga Mood Player"
    >
      {/* Background glow matching active mood */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${currentMood.accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Mood Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#DFBE70] font-bold mb-2">
              <Music className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>ATMOSPHERIC SOUNDSCAPES &amp; DRAPES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-normal text-white">
              {currentMood.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light mt-1">
              {currentMood.subtitle}
            </p>
          </div>

          {/* Mood Selectors & Sound Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/15">
              {AMBIENT_MOODS.map((mood, mIdx) => (
                <button
                  key={mood.id}
                  onClick={() => handleSelectMood(mIdx)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    activeMoodIdx === mIdx
                      ? "bg-[#7A0C1E] text-[#F5D061] font-bold shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {mood.title}
                </button>
              ))}
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              className={`p-3 rounded-full border transition-all flex items-center gap-2 ${
                isPlayingAudio
                  ? "bg-[#F5D061] text-[#7A0C1E] border-[#F5D061] shadow-lg animate-pulse"
                  : "bg-black/40 text-white border-white/20 hover:border-white"
              }`}
              title={isPlayingAudio ? "Mute Raga" : "Play Ambient Raga"}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase hidden sm:inline">
                    Raga Live
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[11px] font-medium uppercase hidden sm:inline">
                    Play Raga
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Gallery for Current Mood */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Hero Shot (6 cols) */}
          <div className="md:col-span-6 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] relative bg-black shadow-2xl border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMood.id}
                src={currentMood.heroImage}
                alt={currentMood.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <span className="bg-[#7A0C1E]/80 backdrop-blur-sm text-[#F5D061] px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                {currentMood.ragaName}
              </span>
              <span className="text-white/80 font-light">432 Hz Solfeggio Tuning</span>
            </div>
          </div>

          {/* 3 Gallery Cards on the right (6 cols) */}
          <div className="md:col-span-6 grid grid-cols-3 gap-3.5">
            {currentMood.gallery.map((gItem, gIdx) => (
              <div
                key={gIdx}
                className="group rounded-2xl overflow-hidden bg-black/50 border border-white/15 p-2.5 flex flex-col justify-between shadow-lg"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black">
                  <img
                    src={gItem.image}
                    alt={gItem.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => openQuickView(ALL_PRODUCTS[gIdx] || ALL_PRODUCTS[0])}
                      className="p-1.5 bg-white text-black rounded-full hover:scale-110"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCart(ALL_PRODUCTS[gIdx] || ALL_PRODUCTS[0])}
                      className="p-1.5 bg-[#7A0C1E] text-white rounded-full hover:scale-110"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#F5D061]" />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-display text-xs font-medium text-white truncate">
                    {gItem.title}
                  </h4>
                  <span className="text-xs font-bold text-[#F5D061] block mt-0.5">
                    {formatPrice(gItem.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
