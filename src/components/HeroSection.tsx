import React, { useState } from 'react';
import { ChevronDown, Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  const asset = STORY_ASSETS.dreamHero;
  const [showSketchDetails, setShowSketchDetails] = useState<boolean>(true);

  return (
    <section id="le-reve" className="relative min-h-screen flex flex-col justify-between bg-[#08090c] pt-20 pb-8 overflow-hidden">
      {/* Background with subtle warmth and grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial from-[#18110e]/40 via-[#08090c]/90 to-[#08090c]" />
        <div className="absolute inset-0 viewfinder-grid opacity-25 pointer-events-none" />
      </div>

      {/* Cinematic Viewfinder Top Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono tracking-widest text-white/50 border-b border-white/10 pb-3">
        <div className="flex items-center gap-4">
          <span className="text-[#ff3b1d] font-bold">{asset.shotNumber}</span>
          <span className="text-white/20">|</span>
          <span>{asset.timecode}</span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">ORIGINE DU RÉCIT · TERRE OCRE DU BÉNIN</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ff3b1d] animate-ping" />
          <span className="text-white/80">ÉTAPE 1 / L'ESQUISSE DU RÊVE</span>
        </div>
      </div>

      {/* Main Container : Clean Split / Framing where the child is 100% VISIBLE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Typography & Narrative (Doesn't hide the boy!) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3b1d]/15 border border-[#ff3b1d]/30 text-[#ff3b1d] text-xs font-mono font-bold tracking-wider uppercase">
              <Pencil className="w-3.5 h-3.5" />
              <span>01 / L'ESQUISSE INITIALE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase leading-[0.95]">
              DU RÊVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3eee8] to-[#c8481e]">
                À LA COURSE
              </span>
            </h1>

            <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/70">
              PROJET KARTING — BÉNIN · <span className="text-[#ff3b1d] font-bold">ENTER THE RACE</span>
            </div>

            <p className="text-lg sm:text-xl text-neutral-300 font-light italic border-l-2 border-[#ff3b1d] pl-4">
              « Tout commence par un rêve d'enfant. »
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Dans la terre rouge du Bénin, un enfant assemble avec soin son kart artisanal en bois. 
              Dans son esprit, chaque morceau de bois et chaque ficelle incarnent déjà un véritable bolide de course lancé sur un circuit légendaire.
            </p>

            {/* Interactive Toggle for Thought Bubble */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSketchDetails(!showSketchDetails);
                  sound.playUiClick();
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  showSketchDetails
                    ? 'bg-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/20'
                    : 'bg-white/10 hover:bg-white/15 text-neutral-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showSketchDetails ? "Bulle de rêve active" : "Voir ce qui se passe dans sa tête"}</span>
              </button>

              <button
                type="button"
                onClick={onScrollToNext}
                className="px-4 py-2 rounded-lg text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Découvrir le relais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Unobstructed Image of the Boy + His Floating Animated Dream Bubble */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e1017] shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full relative">
                <img
                  src={asset.src}
                  alt={asset.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-700 brightness-[0.92] contrast-[1.06]"
                />

                {/* Subtle vignette that keeps the boy clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* THE DREAM THOUGHT BUBBLE (Ce qui se passe dans la tête de l'enfant) */}
                {showSketchDetails && (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 max-w-[280px] sm:max-w-xs p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-[#ff3b1d]/50 shadow-2xl text-left animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#ff3b1d] uppercase font-bold tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      <span>DANS L'IMAGINAIRE DU PILOTE</span>
                    </div>

                    {/* Animated One-Line Wireframe Circuit Sketch */}
                    <div className="h-16 w-full my-1.5 border border-white/10 rounded-lg bg-black/60 p-1 relative overflow-hidden flex items-center justify-center">
                      <svg viewBox="0 0 200 60" className="w-full h-full stroke-white/80 fill-none stroke-[1.5]">
                        {/* Dream one-line circuit sketch */}
                        <path
                          d="M 15 45 C 30 15, 60 10, 85 30 C 110 50, 140 15, 170 25 C 190 35, 185 50, 150 50 C 110 50, 80 52, 50 48 Z"
                          strokeDasharray="4 4"
                          className="animate-[dash_6s_linear_infinite]"
                        />
                        {/* Little sketch kart icon */}
                        <circle cx="85" cy="30" r="3.5" fill="#ff3b1d" />
                      </svg>
                      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-white/50">ONE-LINE SKETCH</span>
                    </div>

                    <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                      L'enfant visualise déjà les chicanes, le bruit du moteur et l'ivresse du virage à la corde.
                    </p>
                  </div>
                )}

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 bg-black/70 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff3b1d]" />
                    <span className="font-semibold text-white">L'ENFANT &amp; SON KART DE BOIS</span>
                  </div>
                  <span className="text-white/50 hidden sm:inline">LE POINT DE DÉPART DE L'AVENTURE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Narrative Relay Stepper Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-3">
          <span className="text-[#ff3b1d] font-bold">LA PROGRESSION :</span>
          <span>01. Rêve &amp; Esquisse</span>
          <span>→</span>
          <span>02. Relais Architecte</span>
          <span>→</span>
          <span>03. Maquette 3D</span>
          <span>→</span>
          <span>04. Complexe Réaliste</span>
          <span>→</span>
          <span>05. Le Podium</span>
        </div>

        <button
          type="button"
          onClick={onScrollToNext}
          className="flex items-center gap-1.5 text-white hover:text-[#ff3b1d] transition-colors"
        >
          <span>Poursuivre la narration</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
