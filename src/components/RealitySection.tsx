import React from 'react';
import { Sparkles, Trophy, Heart, ArrowRight } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';

export const RealitySection: React.FC = () => {
  const asset = STORY_ASSETS.finalCelebration;

  return (
    <section id="le-reve-devient-realite" className="relative py-28 bg-[#090a0d] border-t border-white/8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Storyboard kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff3b1d] tracking-widest uppercase mb-6">
          <Trophy className="w-3.5 h-3.5" />
          <span>07 / RETOUR AU CALME &amp; BOUCLE NARRATIVE</span>
        </div>

        {/* Narrative Loop Closing Quote */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black text-white tracking-tight uppercase mb-6">
          LE RÊVE DEVIENT RÉALITÉ.
        </h2>

        <p className="text-base sm:text-xl text-neutral-300 font-light max-w-3xl mx-auto leading-relaxed mb-8">
          De l'enfant façonnant son kart en bois dans la cour du village jusqu'au sommet du podium baigné par le soleil couchant de l'Atlantique : la boucle est bouclée. 
          Aux côtés de la conceptrice et de sa famille, le jeune pilote célèbre la victoire d'une vision devenue le lieu de fierté de tout le Bénin.
        </p>

        {/* Narrative progression markers */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400 mb-12">
          <span className="text-[#ff3b1d]">L'ENFANT AU KART EN BOIS</span>
          <span>→</span>
          <span className="text-[#ff3b1d]">LE RELAIS ARCHITECTURAL</span>
          <span>→</span>
          <span className="text-[#ff3b1d]">LE COMPLEXE NOCTURNE</span>
          <span>→</span>
          <span className="text-white font-bold bg-[#ff3b1d]/20 px-3 py-1 rounded border border-[#ff3b1d]/40">
            LE PODIUM #1 RÉUNI SUR LA PLAGE
          </span>
        </div>

        {/* Cinematic Visual Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/12 bg-[#0c0d12] shadow-2xl mb-12">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={asset.src}
              alt={asset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-black/30 to-transparent" />

            {/* Inscribed Signature */}
            <div className="absolute bottom-8 left-8 right-8 text-left">
              <span className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase font-bold block mb-1">
                SÉQUENCE 08 / LE FINAL (2:50 — 3:00)
              </span>
              <div className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                DU RÊVE À LA COURSE
              </div>
              <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                BÉNIN MOTORSPORT COMPLEX · CLIENT : KOFFI &amp; DIABATÉ · RÉALISATION AFRIKAFUN
              </div>
            </div>
          </div>
        </div>

        {/* Summary signature stamp */}
        <div className="font-display font-black text-3xl sm:text-4xl tracking-widest text-[#ff3b1d] uppercase">
          ENTER THE RACE
        </div>
      </div>
    </section>
  );
};
