import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { scrollToSlideTop } from '../utils/scrollHelper';
import { resolveImage } from '../data/slidesData';

export interface CircuitCheckpoint {
  id: number;
  slideIndex: number;
  standNumber: string; // "01", "02", ... "10"
  num: number;         // 1 to 10
  label: string;
  verbs: string;
  short: string;
  cx: number;
  cy: number;
  image: string;       // Miniature représentative du stand
  imageKarting: string; // Image série Karting Bénin
  imageAaa: string;     // Image série AAA
  isDamier?: boolean;
}

// 10 Stands mathématiquement équidistants le long du circuit avec miniature dédiée
export const CHECKPOINTS: CircuitCheckpoint[] = [
  { 
    id: 0, 
    slideIndex: 0, 
    standNumber: "01", 
    num: 1, 
    label: "Départ", 
    verbs: "DÉPART", 
    short: "S1", 
    cx: 38.0, 
    cy: 91.9,
    image: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
    imageKarting: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
    imageAaa: "/src/assets/images/poster_serie_aaa_moderne_1791447856263.jpg"
  },
  { 
    id: 1, 
    slideIndex: 1, 
    standNumber: "02", 
    num: 2, 
    label: "Rêver · Oser", 
    verbs: "RÊVER · OSER", 
    short: "S2", 
    cx: 81.2, 
    cy: 90.3,
    image: "/src/assets/images/rever_etincelle_reve_1791210780013.jpg",
    imageKarting: "/src/assets/images/rever_etincelle_reve_1791210780013.jpg",
    imageAaa: "/src/assets/images/aaa_ep1_audace_alliance_1791450939734.jpg"
  },
  { 
    id: 2, 
    slideIndex: 2, 
    standNumber: "03", 
    num: 3, 
    label: "Jouer · Rencontrer", 
    verbs: "JOUER · RENCONTRER", 
    short: "S3", 
    cx: 124.4, 
    cy: 88.1,
    image: "/src/assets/images/jouer_course_poussiere_1791211122585.jpg",
    imageKarting: "/src/assets/images/jouer_course_poussiere_1791211122585.jpg",
    imageAaa: "/src/assets/images/aaa_ep2_tournage_plateau_1791450957291.jpg"
  },
  { 
    id: 3, 
    slideIndex: 3, 
    standNumber: "04", 
    num: 4, 
    label: "Imaginer · Dessiner", 
    verbs: "IMAGINER · DESSINER", 
    short: "S4", 
    cx: 165.2, 
    cy: 76.9,
    image: "/src/assets/images/imaginer_carnet_croquis_1791211202884.jpg",
    imageKarting: "/src/assets/images/imaginer_carnet_croquis_1791211202884.jpg",
    imageAaa: "/src/assets/images/dessiner_plan_cad_kd_1791212938094.jpg"
  },
  { 
    id: 4, 
    slideIndex: 4, 
    standNumber: "05", 
    num: 5, 
    label: "Concevoir · Bâtir", 
    verbs: "CONCEVOIR · BÂTIR", 
    short: "S5", 
    cx: 185.7, 
    cy: 40.2,
    image: "/src/assets/images/concevoir_maquette_build_1791211549362.jpg",
    imageKarting: "/src/assets/images/concevoir_maquette_build_1791211549362.jpg",
    imageAaa: "/src/assets/images/aaa_ep4_bar_cotonou_1791451004629.jpg"
  },
  { 
    id: 5, 
    slideIndex: 5, 
    standNumber: "06", 
    num: 6, 
    label: "S'équiper · Frémir", 
    verbs: "S'ÉQUIPER · FRÉMIR", 
    short: "S6", 
    cx: 157.2, 
    cy: 15.6,
    image: "/src/assets/images/fremir_cockpit_volant_1791211739896.jpg",
    imageKarting: "/src/assets/images/fremir_cockpit_volant_1791211739896.jpg",
    imageAaa: "/src/assets/images/aaa_ep5_romeo_salon_ia_1791451019865.jpg"
  },
  { 
    id: 6, 
    slideIndex: 6, 
    standNumber: "07", 
    num: 7, 
    label: "S'engager · Se Dépasser", 
    verbs: "S'ENGAGER · SE DÉPASSER", 
    short: "S7", 
    cx: 117.5, 
    cy: 26.5,
    image: "/src/assets/images/sedepasser_duel_karts_1791211804690.jpg",
    imageKarting: "/src/assets/images/sedepasser_duel_karts_1791211804690.jpg",
    imageAaa: "/src/assets/images/aaa_ep6_poignee_main_1791451035896.jpg"
  },
  { 
    id: 7, 
    slideIndex: 7, 
    standNumber: "08", 
    num: 8, 
    label: "Rassembler · Vibrer", 
    verbs: "RASSEMBLER · VIBRER", 
    short: "S8", 
    cx: 79.7, 
    cy: 30.2,
    image: "/src/assets/images/vibrer_foule_tribunes_1791211862994.jpg",
    imageKarting: "/src/assets/images/vibrer_foule_tribunes_1791211862994.jpg",
    imageAaa: "/src/assets/images/agence_ai_pitch_1791446553710.jpg"
  },
  { 
    id: 8, 
    slideIndex: 8, 
    standNumber: "09", 
    num: 9, 
    label: "Transmettre · S'élever", 
    verbs: "TRANSMETTRE · S'ÉLEVER", 
    short: "S9", 
    cx: 58.5, 
    cy: 26.5,
    image: "/src/assets/images/transmettre_relais_benin_1791212278040.jpg",
    imageKarting: "/src/assets/images/transmettre_relais_benin_1791212278040.jpg",
    imageAaa: "/src/assets/images/aaa_ep8_formation_jeunes_1791451052358.jpg"
  },
  { 
    id: 9, 
    slideIndex: 9, 
    standNumber: "10", 
    num: 10, 
    label: "L'Agence AAA 🏁", 
    verbs: "AGENCE AAA · FINISH", 
    short: "🏁", 
    cx: 38.5, 
    cy: 24.8,
    image: "/src/assets/images/agence_ia_studio_office_1791409217543.jpg",
    imageKarting: "/src/assets/images/batir_complexe_nuit_lumieres_1791211586769.jpg",
    imageAaa: "/src/assets/images/agence_ia_studio_office_1791409217543.jpg",
    isDamier: true
  },
];

export interface InteractiveCircuitMapProps {
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  className?: string;
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
}

export const InteractiveCircuitMap: React.FC<InteractiveCircuitMapProps> = ({
  currentSlideIndex,
  onSelectSlide,
  className = "",
  hoveredIndex: externalHoveredIndex,
  onHoverChange,
}) => {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(null);

  const effectiveHoveredIndex = externalHoveredIndex !== undefined 
    ? externalHoveredIndex 
    : internalHoveredIndex;

  const setHovered = (idx: number | null) => {
    if (onHoverChange) {
      onHoverChange(idx);
    } else {
      setInternalHoveredIndex(idx);
    }
  };

  const activeCheckpoint = CHECKPOINTS[currentSlideIndex] || CHECKPOINTS[0];
  const displayedHover = effectiveHoveredIndex !== null 
    ? (CHECKPOINTS[effectiveHoveredIndex] || activeCheckpoint) 
    : activeCheckpoint;

  const handleCheckpointClick = (idx: number) => {
    sound.playUiClick();
    onSelectSlide(idx);
    scrollToSlideTop();
  };

  return (
    <div className={`relative p-2.5 sm:p-3 rounded-2xl bg-[#090b10] border border-white/15 shadow-xl flex flex-col justify-between max-w-full overflow-hidden ${className}`}>
      
      {/* Top Telemetry Header : Parcours de création */}
      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
        <span className="flex items-center gap-1.5 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e00] animate-ping" />
          <span className="text-white font-bold tracking-wider uppercase">PARCOURS DE CRÉATION</span>
        </span>
        <span className="text-[#ff1e00] font-bold tracking-wide">
          ÉTAPE {currentSlideIndex + 1}/10
        </span>
      </div>

      {/* SVG Track with exactly 10 homogeneously distributed stand checkpoints */}
      <div className="relative w-full aspect-[220/112] overflow-hidden">
        <svg 
          viewBox="0 0 220 112" 
          className="w-full h-full select-none"
        >
          {/* Track Underlay Outer Border */}
          <path
            d="M 25,75 C 10,55 20,25 50,22 C 75,20 85,38 95,38 C 115,38 120,15 140,15 C 170,15 190,18 185,45 C 180,72 155,88 135,88 C 100,88 70,92 40,92 C 28,92 20,85 25,75 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Red Kerb Racing Line */}
          <path
            d="M 25,75 C 10,55 20,25 50,22 C 75,20 85,38 95,38 C 115,38 120,15 140,15 C 170,15 190,18 185,45 C 180,72 155,88 135,88 C 100,88 70,92 40,92 C 28,92 20,85 25,75 Z"
            fill="none"
            stroke="#ff1e00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
            opacity="0.85"
          />

          {/* Start / Finish Checkered Gate mark */}
          <line 
            x1="38" y1="86" x2="38" y2="98" 
            stroke="#ffffff" 
            strokeWidth="3" 
            strokeDasharray="1.5 1.5"
          />

          {/* 10 Clickable Stand / Sector Points (Numbers 1 to 10 with Stand 9 clearly visible & Stand 10 Damier) */}
          {CHECKPOINTS.map((cp, idx) => {
            const isActive = idx === currentSlideIndex;
            const isHovered = idx === effectiveHoveredIndex;

            return (
              <g 
                key={cp.id} 
                className="cursor-pointer transition-transform group"
                onClick={() => handleCheckpointClick(idx)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow ring for active or hovered stand */}
                {(isActive || isHovered) && (
                  <circle
                    cx={cp.cx}
                    cy={cp.cy}
                    r={cp.isDamier ? "9.5" : "8.5"}
                    fill="none"
                    stroke="#ff1e00"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* STAND 10 : Checkered Damier 🏁 */}
                {cp.isDamier ? (
                  <g>
                    {/* Damier outer ring */}
                    <circle
                      cx={cp.cx}
                      cy={cp.cy}
                      r={isActive ? "7.5" : isHovered ? "7" : "6"}
                      fill="#000000"
                      stroke={isActive ? "#ff1e00" : isHovered ? "#ffffff" : "#ff1e00"}
                      strokeWidth={isActive ? "2.2" : "1.8"}
                      className="transition-all duration-200"
                    />
                    {/* Checkered 4-square grid icon */}
                    <g transform={`translate(${cp.cx - 3.2}, ${cp.cy - 3.2})`} pointerEvents="none">
                      <rect x="0" y="0" width="3.2" height="3.2" fill="#ffffff" />
                      <rect x="3.2" y="0" width="3.2" height="3.2" fill="#000000" />
                      <rect x="0" y="3.2" width="3.2" height="3.2" fill="#000000" />
                      <rect x="3.2" y="3.2" width="3.2" height="3.2" fill="#ffffff" />
                    </g>
                    {/* Indicator badge above damier node for clarity */}
                    <text
                      x={cp.cx}
                      y={cp.cy - 7.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="4.5"
                      fontWeight="black"
                      fontFamily="monospace"
                      fill={isActive ? "#ff1e00" : isHovered ? "#ffffff" : "#ff1e00"}
                      pointerEvents="none"
                    >
                      {cp.num}
                    </text>
                  </g>
                ) : (
                  /* STANDS 01 TO 09 (Stand 9 crystal clear and centered) */
                  <>
                    <circle
                      cx={cp.cx}
                      cy={cp.cy}
                      r={isActive ? "6.5" : isHovered ? "6" : "5"}
                      fill={isActive ? "#ff1e00" : isHovered ? "#ffffff" : "#14161f"}
                      stroke={isActive ? "#ffffff" : isHovered ? "#ff1e00" : "rgba(255,255,255,0.45)"}
                      strokeWidth="1.5"
                      className="transition-all duration-200"
                    />

                    {/* Stand number label (1, 2, 3, 4, 5, 6, 7, 8, 9) */}
                    <text
                      x={cp.cx}
                      y={cp.cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="5.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                      fill={isActive ? "#ffffff" : isHovered ? "#000000" : "#ffffff"}
                      pointerEvents="none"
                    >
                      {cp.num}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Racing Kart Position Icon on active checkpoint */}
          <g transform={`translate(${activeCheckpoint.cx - 6}, ${activeCheckpoint.cy - 13})`}>
            <rect x="0" y="0" width="12" height="6.5" rx="2" fill="#ff1e00" />
            <polygon points="6,6.5 4,8.5 8,8.5" fill="#ff1e00" />
            <text 
              x="6" 
              y="3.5" 
              textAnchor="middle" 
              dominantBaseline="central" 
              fontSize="4.2" 
              fontWeight="black" 
              fill="#ffffff" 
              fontFamily="monospace"
            >
              #{String(currentSlideIndex + 1).padStart(2, '0')}
            </text>
          </g>
        </svg>
      </div>

      {/* Stand Info Bar on Hover / Active with split image preview */}
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] font-mono pt-1.5 border-t border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-6 rounded-md overflow-hidden border border-white/20 bg-black shrink-0 relative flex select-none">
            {/* Moitié Gauche : Karting Bénin */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 54% 0, 46% 100%, 0 100%)' }}
            >
              <img 
                src={resolveImage(displayedHover.imageKarting || displayedHover.image)} 
                alt={`${displayedHover.label} — Karting Bénin`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  const filename = (displayedHover.imageKarting || displayedHover.image).split('/').pop();
                  if (filename && !img.src.includes(`/images/${filename}`)) {
                    img.src = `/images/${filename}`;
                  }
                }}
              />
            </div>

            {/* Ligne oblique centrale */}
            <div className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 -skew-x-6 bg-gradient-to-b from-[#ff1e00] via-white to-[#ff1e00] z-10 shadow-[0_0_6px_rgba(255,30,0,0.8)]" />

            {/* Moitié Droite : AAA */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: 'polygon(54% 0, 100% 0, 100% 100%, 46% 100%)' }}
            >
              <img 
                src={resolveImage(displayedHover.imageAaa || displayedHover.image)} 
                alt={`${displayedHover.label} — AAA`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  const filename = (displayedHover.imageAaa || displayedHover.image).split('/').pop();
                  if (filename && !img.src.includes(`/images/${filename}`)) {
                    img.src = `/images/${filename}`;
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[#ff1e00] font-bold">#{displayedHover.num}</span>
            <span className="text-neutral-200 font-medium truncate whitespace-nowrap">
              {displayedHover.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-neutral-400 shrink-0">
          <span className="text-white font-bold">KB</span>
          <span className="text-neutral-500">/</span>
          <span className="text-[#ff1e00] font-bold">AAA</span>
        </div>
      </div>

    </div>
  );
};
