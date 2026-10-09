import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { scrollToSlideTop } from '../utils/scrollHelper';
import { CHECKPOINTS, InteractiveCircuitMap } from './InteractiveCircuitMap';
import { resolveImage } from '../data/slidesData';

interface CircuitNarrativeNavigatorProps {
  onSelectSlide: (index: number) => void;
  currentSlideIndex?: number;
}

export const CircuitNarrativeNavigator: React.FC<CircuitNarrativeNavigatorProps> = ({
  onSelectSlide,
  currentSlideIndex = 0
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSectorClick = (slideIdx: number) => {
    sound.playUiClick();
    onSelectSlide(slideIdx);
    scrollToSlideTop();
  };

  return (
    <div className="w-full rounded-2xl bg-[#08090d] border border-white/15 p-4 sm:p-7 shadow-2xl text-white relative overflow-hidden space-y-5">
      
      {/* Background Racing Atmosphere */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff1e00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header : Parcours de création */}
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e00] animate-pulse shrink-0" />
        <h3 className="font-display italic font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
          PARCOURS DE CRÉATION
        </h3>
      </div>

      {/* Main Grid: Exact Same Interactive Circuit Map on Col 5 + 9 Action Verb Cards on Col 7 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Exact same circuit map as on top of every page (100% unified) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <InteractiveCircuitMap
            currentSlideIndex={currentSlideIndex}
            onSelectSlide={handleSectorClick}
            hoveredIndex={hoveredIndex}
            onHoverChange={setHoveredIndex}
            className="w-full h-full"
          />
        </div>

        {/* 9 Stand Action Cards Grid (Stands 01 to 09 with Damier on 09) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CHECKPOINTS.map((cp, idx) => {
            const isHovered = hoveredIndex === idx;
            const isCurrent = currentSlideIndex === cp.slideIndex;

            return (
              <div
                key={cp.standNumber}
                onClick={() => handleSectorClick(cp.slideIndex)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group overflow-hidden ${
                  cp.isDamier
                    ? isHovered || isCurrent
                      ? 'bg-[#ff1e00] border-[#ff1e00] text-white shadow-[0_0_20px_rgba(255,30,0,0.5)] scale-[1.02]'
                      : 'bg-[#0f1118] border-[#ff1e00]/70 text-white hover:border-[#ff1e00]'
                    : isHovered || isCurrent
                    ? 'bg-white/12 border-[#ff1e00] shadow-[0_0_15px_rgba(255,30,0,0.25)] scale-[1.02]'
                    : 'bg-[#10121a] border-white/10 hover:border-white/25 text-neutral-300'
                }`}
              >
                {/* Image miniature du stand - Coupe split oblique Karting Bénin / AAA */}
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-2 bg-black/60 border border-white/10 shadow-sm select-none group-hover:border-white/30 transition-colors">
                  {/* Côté Gauche : Série Karting Bénin */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}
                  >
                    <img
                      src={resolveImage(cp.imageKarting || cp.image)}
                      alt={`${cp.label} — Karting Bénin`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/85 text-[7px] font-mono font-bold text-white tracking-wider border border-white/20 shadow-sm">
                      KARTING
                    </span>
                  </div>

                  {/* Ligne oblique centrale éclatante */}
                  <div className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 -skew-x-6 bg-gradient-to-b from-[#ff1e00] via-white to-[#ff1e00] z-10 shadow-[0_0_8px_rgba(255,30,0,0.9)]" />

                  {/* Côté Droit : Série AAA */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}
                  >
                    <img
                      src={resolveImage(cp.imageAaa || cp.image)}
                      alt={`${cp.label} — AAA`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/85 text-[7px] font-mono font-bold text-[#ff1e00] tracking-wider border border-[#ff1e00]/40 shadow-sm">
                      AAA
                    </span>
                  </div>
                </div>

                {/* Numéro simple (1, 2, 3, ... 10) placé au-dessus du titre du stand */}
                <div className="flex items-center gap-1.5 mb-1 px-0.5">
                  <span className={`inline-flex items-center justify-center font-mono font-bold text-[11px] leading-none px-1.5 py-0.5 rounded ${
                    cp.isDamier
                      ? 'bg-[#ff1e00] text-white'
                      : isHovered || isCurrent
                      ? 'bg-[#ff1e00] text-white'
                      : 'bg-white/10 text-white/90 group-hover:bg-[#ff1e00] group-hover:text-white transition-colors'
                  }`}>
                    {cp.num}
                  </span>
                  {cp.isDamier && (
                    <span className="text-[10px]" title="Arrivée & Budget">🏁</span>
                  )}
                </div>

                {/* Verbes d'action : même taille exacte pour les deux verbes, DÉPART unique pour stand 1, TRANSMETTRE sans césure */}
                <div className="font-display font-bold text-[10px] text-white uppercase tracking-tight group-hover:text-[#ff1e00] transition-colors leading-tight px-0.5 pb-0.5">
                  {idx === 0 ? (
                    <span className="block whitespace-nowrap overflow-visible">DÉPART</span>
                  ) : cp.verbs.includes('·') ? (
                    <div className="space-y-0.5">
                      <span className="block whitespace-nowrap overflow-visible break-keep [word-break:keep-all] hyphens-none">
                        {cp.verbs.split('·')[0].trim()}
                      </span>
                      <span className="block whitespace-nowrap overflow-visible break-keep [word-break:keep-all] hyphens-none text-white/90">
                        · {cp.verbs.split('·')[1].trim()}
                      </span>
                    </div>
                  ) : (
                    <span className="block whitespace-nowrap overflow-visible break-keep [word-break:keep-all] hyphens-none">
                      {cp.verbs}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
