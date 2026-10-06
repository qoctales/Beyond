import React from 'react';

interface RacetrackLoopVerbsProps {
  onSelectSlide?: (slideIndex: number) => void;
}

interface VerbNode {
  num: string;
  verb: string;
  slideIndex: number;
  badgeBg: string;
  badgeBorder: string;
}

// 01 à 08 : Allant de gauche à droite sur la voie supérieure
const TOP_VERBS: VerbNode[] = [
  { num: '01', verb: 'RÊVER', slideIndex: 1, badgeBg: '#eab308', badgeBorder: '#ca8a04' },
  { num: '02', verb: 'OSER', slideIndex: 1, badgeBg: '#22c55e', badgeBorder: '#16a34a' },
  { num: '03', verb: 'JOUER', slideIndex: 2, badgeBg: '#22c55e', badgeBorder: '#16a34a' },
  { num: '04', verb: 'RENCONTRER', slideIndex: 2, badgeBg: '#eab308', badgeBorder: '#ca8a04' },
  { num: '05', verb: 'IMAGINER', slideIndex: 3, badgeBg: '#84cc16', badgeBorder: '#65a30d' },
  { num: '06', verb: 'DESSINER', slideIndex: 3, badgeBg: '#eab308', badgeBorder: '#ca8a04' },
  { num: '07', verb: 'CONCEVOIR', slideIndex: 4, badgeBg: '#0ea5e9', badgeBorder: '#0284c7' },
  { num: '08', verb: 'BÂTIR', slideIndex: 4, badgeBg: '#f97316', badgeBorder: '#ea580c' },
];

// Voie inférieure : après le virage à droite sous BÂTIR (08), on repart de droite (09 S'ÉQUIPER) vers la gauche jusqu'à (16 S'ÉLEVER sous 01 RÊVER).
// Ci-dessous ordonnés de gauche à droite pour correspondre colonne par colonne avec la voie supérieure :
const BOTTOM_VERBS_ALIGNED_LEFT_TO_RIGHT: VerbNode[] = [
  { num: '16', verb: "S'ÉLEVER", slideIndex: 8, badgeBg: '#0ea5e9', badgeBorder: '#0284c7' },   // Sous 01 RÊVER
  { num: '15', verb: 'TRANSMETTRE', slideIndex: 8, badgeBg: '#eab308', badgeBorder: '#ca8a04' },// Sous 02 OSER
  { num: '14', verb: 'VIBRER', slideIndex: 7, badgeBg: '#ef4444', badgeBorder: '#dc2626' },     // Sous 03 JOUER
  { num: '13', verb: 'RASSEMBLER', slideIndex: 7, badgeBg: '#ef4444', badgeBorder: '#dc2626' }, // Sous 04 RENCONTRER
  { num: '12', verb: 'SE DÉPASSER', slideIndex: 6, badgeBg: '#22c55e', badgeBorder: '#16a34a' },// Sous 05 IMAGINER
  { num: '11', verb: "S'ENGAGER", slideIndex: 6, badgeBg: '#0ea5e9', badgeBorder: '#0284c7' },  // Sous 06 DESSINER
  { num: '10', verb: 'FRÉMIR', slideIndex: 5, badgeBg: '#ef4444', badgeBorder: '#dc2626' },     // Sous 07 CONCEVOIR
  { num: '09', verb: "S'ÉQUIPER", slideIndex: 5, badgeBg: '#0284c7', badgeBorder: '#0369a1' },   // Sous 08 BÂTIR (virage)
];

export const RacetrackLoopVerbs: React.FC<RacetrackLoopVerbsProps> = ({ onSelectSlide }) => {
  return (
    <div className="w-full rounded-2xl bg-[#090b10] border border-white/15 p-4 sm:p-5 shadow-2xl relative select-none overflow-hidden">
      
      {/* Header bar épuré : "Cliquez pour naviguer" placé à gauche */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff1e00] tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ff1e00] animate-pulse" />
          <span>Cliquez pour naviguer</span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
          CIRCUIT DES 16 VERBES D'ACTION
        </span>
      </div>

      {/* Circuit Container défilable avec lisibilité maximale */}
      <div className="overflow-x-auto no-scrollbar py-2">
        <div className="min-w-[980px] relative px-6 py-3">
          
          {/* SVG Piste de Circuit en Boucle Ovale (virage à droite reliant 08 à 09) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 980 120">
              <defs>
                <filter id="goldGlowRefinedLoop" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Tarmac Bitume Foncé continu en anneau */}
              <path
                d="M 45 16 L 935 16 A 44 44 0 0 1 935 104 L 45 104 A 44 44 0 0 1 45 16 Z"
                fill="#121620"
                stroke="#222838"
                strokeWidth="28"
                strokeLinejoin="round"
              />

              {/* Ligne extérieure néon dorée motorsport avec virage 180° à droite */}
              <path
                d="M 45 4 L 935 4 A 56 56 0 0 1 935 116 L 45 116 A 56 56 0 0 1 45 4 Z"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                filter="url(#goldGlowRefinedLoop)"
                opacity="0.9"
              />

              {/* Bordure intérieure de piste */}
              <path
                d="M 45 28 L 935 28 A 32 32 0 0 1 935 92 L 45 92 A 32 32 0 0 1 45 28 Z"
                fill="#090b10"
                stroke="#374151"
                strokeWidth="1.5"
              />

              {/* Ligne médiane discontinue */}
              <path
                d="M 55 60 L 925 60"
                stroke="#4b5563"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* Deux Voies de Verbes d'Action parfaitement alignées en 8 colonnes */}
          <div className="relative z-10 flex flex-col justify-between h-[105px] px-4">
            
            {/* VOIE SUPÉRIEURE (Aller de gauche à droite : 01 → 08) */}
            <div className="grid grid-cols-8 gap-2 w-full">
              {TOP_VERBS.map((v) => (
                <button
                  type="button"
                  key={v.num}
                  onClick={() => onSelectSlide?.(v.slideIndex)}
                  className="group flex items-center justify-start gap-1.5 px-1 py-1 rounded transition-all hover:scale-105 focus:outline-none whitespace-nowrap"
                  title={`Aller à la séquence : ${v.verb}`}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black text-black shadow transition-transform group-hover:scale-110 shrink-0"
                    style={{ backgroundColor: v.badgeBg, border: `1.5px solid ${v.badgeBorder}` }}
                  >
                    {v.num}
                  </span>
                  <span className="font-sans font-extrabold text-[11px] sm:text-xs tracking-wide text-white uppercase group-hover:text-[#facc15] transition-colors drop-shadow-sm whitespace-nowrap">
                    {v.verb}
                  </span>
                </button>
              ))}
            </div>

            {/* VOIE INFÉRIEURE (Retour de droite à gauche : 09 sous 08 jusqu'à 16 sous 01) */}
            <div className="grid grid-cols-8 gap-2 w-full">
              {BOTTOM_VERBS_ALIGNED_LEFT_TO_RIGHT.map((v) => (
                <button
                  type="button"
                  key={v.num}
                  onClick={() => onSelectSlide?.(v.slideIndex)}
                  className="group flex items-center justify-start gap-1.5 px-1 py-1 rounded transition-all hover:scale-105 focus:outline-none whitespace-nowrap"
                  title={`Aller à la séquence : ${v.verb}`}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black text-black shadow transition-transform group-hover:scale-110 shrink-0"
                    style={{ backgroundColor: v.badgeBg, border: `1.5px solid ${v.badgeBorder}` }}
                  >
                    {v.num}
                  </span>
                  <span className="font-sans font-extrabold text-[11px] sm:text-xs tracking-wide text-white uppercase group-hover:text-[#38bdf8] transition-colors drop-shadow-sm whitespace-nowrap">
                    {v.verb}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
