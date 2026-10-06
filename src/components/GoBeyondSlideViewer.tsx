import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Volume2, VolumeX
} from 'lucide-react';
import { SLIDES, SlideData, resolveImage } from '../data/slidesData';
import { InteractiveCircuitMap } from './InteractiveCircuitMap';
import { CircuitNarrativeNavigator } from './CircuitNarrativeNavigator';
import { PlanningBudgetSection } from './PlanningBudgetSection';
import { ThreeEntriesBox } from './ThreeEntriesBox';
import { audioSystem } from '../utils/audioSystem';
import { sound } from '../utils/audio';
import { scrollToSlideTop } from '../utils/scrollHelper';

/**
 * Configuration sonore par slide : 
 * Une situation sobre et réaliste où l'on imagine des sons liés à la scène
 */
interface SlideSoundConfig {
  situationImaginee: string;
  ambianceLabel?: string;
  fx1Label?: string;
  fx2Label?: string;
}

const SLIDE_SOUND_CONFIG: Record<number, SlideSoundConfig> = {
  1: {
    situationImaginee: "L'énergie du départ : le souffle du rallye, les rugissements des moteurs de course et le frisson des premiers bolides sur la piste.",
  },
  2: {
    situationImaginee: "Rêve d'enfant et nature : le chant mélodieux des oiseaux, les chants dans la cour et l'écho lointain d'un moteur de rallye qui fait naître la vocation.",
  },
  3: {
    situationImaginee: "Immersion urbaine à Cotonou : rumeur de la ville, circulation animée, klaxons rythmés et passage des voitures dans les artères urbaines.",
  },
  4: {
    situationImaginee: "Le studio d'études et d'ingénierie : l'écriture sur le papier calque, la frappe cadencée sur le clavier d'ordinateur et le souffle des postes de travail.",
  },
  5: {
    situationImaginee: "Les essais dynamiques du complexe : tests de la maquette, passages vifs de rallye et rugissements de karting en pleine accélération sur le tracé.",
  },
  6: {
    situationImaginee: "Montée en tension sur la pré-grille : le rugissement noble du lion emblématique mêlé aux grondements fauves des moteurs, courses et freinages.",
  },
  7: {
    situationImaginee: "L'intensité pure de la course : freinages appuyés au point de corde sur les vibreurs, relances foudroyantes plein gaz et survol rasant du drone à pleine vitesse.",
  },
  8: {
    situationImaginee: "Atmosphère chaleureuse et populaire : liesse des tribunes, foule tranquille et gens qui crient, portés par le bruit du circuit au loin.",
  },
  9: {
    situationImaginee: "Le triomphe et la transmission : foule conquise, salves d'applaudissements nourris et passage d'honneur du rallye sous les acclamations du public.",
  },
  10: {
    situationImaginee: "L'ambiance feutrée du paddock officiel : concentration sur la télémétrie, un peu de rallye feutré aux stands et cadence sereine de l'organisation.",
  },
};

/**
 * Icône de Karting de Compétition CIK-FIA Haute Précision
 * Design agressif, moderne et 100% identifiable (châssis surbaissé, pontons, aileron, baquet, moteur, pneus slicks larges)
 */
const CompetitionKartIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 54 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pneus slicks arrière larges compétition avec écrou central */}
    <rect x="2" y="3" width="8" height="9" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1" />
    <circle cx="6" cy="7.5" r="1.5" fill="#ffffff" />
    <rect x="2" y="24" width="8" height="9" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1" />
    <circle cx="6" cy="28.5" r="1.5" fill="#ffffff" />

    {/* Pare-chocs arrière tubulaire de protection */}
    <path d="M1 9h3v18H1" stroke="#ff1e00" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="8" y="11" width="3" height="14" fill="#2d313f" />

    {/* Pontons latéraux aérodynamiques rouges (Side pods avec écopes de refroidissement) */}
    <path d="M16 6h18l3 4.5h-21l0-4.5z" fill="#ff1e00" />
    <path d="M16 30h18l3-4.5h-21l0 4.5z" fill="#ff1e00" />
    <rect x="20" y="8" width="8" height="1.5" fill="#ffffff" opacity="0.6" />
    <rect x="20" y="26.5" width="8" height="1.5" fill="#ffffff" opacity="0.6" />

    {/* Plancher châssis compétition tubulaire acier (Chassis Floor Pan) */}
    <path d="M11 11h28l5 4.5v5l-5 4.5h-28z" fill="#090b10" stroke="#ffffff" strokeWidth="0.8" />

    {/* Siège baquet course profond */}
    <path d="M16 13h10c2.5 0 3.5 2 3.5 5s-1 5-3.5 5h-10c-1.8 0-2.5-2-2.5-5s0.7-5 2.5-5z" fill="#181a24" stroke="#ff1e00" strokeWidth="0.8" />

    {/* Pilote : Casque aérodynamique avec visière teintée de course */}
    <ellipse cx="21" cy="18" rx="4.2" ry="3.6" fill="#ffffff" />
    <path d="M23 15.5c1.4 1 1.8 1.8 1.8 2.5s-0.4 1.5-1.8 2.5" stroke="#ff1e00" strokeWidth="1.6" strokeLinecap="round" />

    {/* Colonne de direction et volant de course méplat avec palettes */}
    <path d="M29 18h4" stroke="#8890a6" strokeWidth="1.4" />
    <ellipse cx="33" cy="18" rx="1.2" ry="3" fill="#0b0d13" stroke="#ff1e00" strokeWidth="1" />

    {/* Nez profilé, naseau avant et spoiler / splitter aérodynamique avant */}
    <path d="M35 12h10l7 5.5v1l-7 5.5h-10l3.5-6-3.5-6z" fill="#ff1e00" />
    <rect x="42" y="15" width="5" height="6" rx="1" fill="#ffffff" />
    <text x="44.5" y="19" textAnchor="middle" fontSize="3.8" fontWeight="black" fill="#ff1e00" fontFamily="monospace">12</text>

    {/* Pneus slicks avant directeurs */}
    <rect x="40" y="5" width="6.5" height="6.5" rx="1.5" fill="#14161f" stroke="#ffffff" strokeWidth="0.8" />
    <circle cx="43.2" cy="8.2" r="1.2" fill="#ff1e00" />
    <rect x="40" y="24.5" width="6.5" height="6.5" rx="1.5" fill="#14161f" stroke="#ffffff" strokeWidth="0.8" />
    <circle cx="43.2" cy="27.8" r="1.2" fill="#ff1e00" />

    {/* Ligne d'échappement compétition avec pot de détente chromé */}
    <path d="M12 13c1.5-2.5 4-3.5 7-3.5h4c1.5 0 2.5 1 2.5 2" stroke="#9da4b8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

export const GoBeyondSlideViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [audioState, setAudioState] = useState(audioSystem.getState());

  const currentSlide: SlideData = SLIDES[currentSlideIndex];

  // Inscription aux mises à jour de l'état audio
  useEffect(() => {
    return audioSystem.subscribe((st) => setAudioState(st));
  }, []);

  // Synchronisation du numéro de slide avec le système audio (ne démarre aucun son si non demandé)
  useEffect(() => {
    audioSystem.setSlide(currentSlideIndex + 1);
  }, [currentSlideIndex]);

  // Préchargement fluide des images des slides adjacents pour une navigation instantanée
  useEffect(() => {
    const preloadSlideImages = (slideIdx: number) => {
      if (slideIdx < 0 || slideIdx >= SLIDES.length) return;
      const target = SLIDES[slideIdx];
      const srcs: string[] = [];
      if (target.masterCoverImage) srcs.push(resolveImage(target.masterCoverImage));
      if (target.panels) {
        target.panels.forEach((p) => {
          if (p.image) srcs.push(resolveImage(p.image));
        });
      }
      srcs.forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    };

    // Précharge la slide suivante et précédente
    preloadSlideImages(currentSlideIndex + 1);
    preloadSlideImages(currentSlideIndex - 1);
  }, [currentSlideIndex]);

  // Défilement en haut automatique lors du changement de slide
  useLayoutEffect(() => {
    scrollToSlideTop();
  }, [currentSlideIndex]);

  useEffect(() => {
    scrollToSlideTop();
  }, [currentSlideIndex]);

  // Navigation clavier (Flèches Gauche/Droite)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const goToNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      sound.playUiClick();
      setCurrentSlideIndex((prev) => prev + 1);
      scrollToSlideTop();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      sound.playUiClick();
      setCurrentSlideIndex((prev) => prev - 1);
      scrollToSlideTop();
    }
  };

  const handleSelectSlide = (idx: number) => {
    sound.playUiClick();
    setCurrentSlideIndex(idx);
    scrollToSlideTop();
  };

  const [activeFx, setActiveFx] = useState<number | null>(null);

  /**
   * Préchargement immédiat en arrière-plan de toutes les images pour un affichage instantané
   */
  useEffect(() => {
    const allUrls: string[] = [];
    SLIDES.forEach((s) => {
      if (s.masterCoverImage) allUrls.push(resolveImage(s.masterCoverImage));
      s.panels.forEach((p) => allUrls.push(resolveImage(p.image)));
    });
    allUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /**
   * Préchargement prioritaire des images adjacentes lors du changement de slide
   */
  useEffect(() => {
    const urlsToPreload: string[] = [];
    const adjacentIndices = [
      currentSlideIndex,
      (currentSlideIndex + 1) % SLIDES.length,
      (currentSlideIndex - 1 + SLIDES.length) % SLIDES.length
    ];
    adjacentIndices.forEach((idx) => {
      const s = SLIDES[idx];
      if (s.masterCoverImage) urlsToPreload.push(resolveImage(s.masterCoverImage));
      s.panels.forEach((p) => urlsToPreload.push(resolveImage(p.image)));
    });
    urlsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [currentSlideIndex]);

  /**
   * Active ou met en pause l'ambiance sonore de la page courante (sans autoplay)
   */
  const handleToggleSound = () => {
    if (audioState.isMusicPlaying && !audioState.isMuted) {
      audioSystem.stopAll();
    } else {
      audioSystem.toggleMusic(currentSlide.id);
    }
  };

  /**
   * Déclenche un des deux effets sonores réalistes en superposition
   */
  const handleTriggerFx = (fxIndex: 1 | 2) => {
    setActiveFx(fxIndex);
    audioSystem.playSpecificFx(currentSlide.id, fxIndex);
    setTimeout(() => {
      setActiveFx((cur) => (cur === fxIndex ? null : cur));
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white flex flex-col justify-between selection:bg-[#ff1e00] selection:text-white">
      {/* Ancre invisible tout en haut pour le scroll mobile */}
      <div id="slide-top-anchor" className="absolute top-0 left-0 w-0 h-0 pointer-events-none opacity-0" aria-hidden="true" />
      
      {/* =========================================================================
          1. NAVIGATION SUPÉRIEURE ÉPURÉE AVEC ACCÈS AUDIO CLAIR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#07080a]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-8 py-2 sm:py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Identité de marque GO BEYOND avec drapeau du Bénin (net, protégé et garanti sans masquage sur mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="flex w-4 h-3 sm:w-5 sm:h-3.5 overflow-hidden rounded-[2px] shadow-sm shrink-0">
              <div className="w-1.5 sm:w-2 bg-[#008751]" />
              <div className="flex flex-col w-2.5 sm:w-3">
                <div className="h-1 sm:h-1.5 bg-[#fcd116]" />
                <div className="h-2 bg-[#e8112d]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1 font-display font-black text-xs sm:text-sm tracking-wider uppercase">
              <span className="text-white">GO</span>
              <span className="text-[#ff1e00]">BEYOND</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest hidden md:inline">
              KARTING BÉNIN
            </span>
          </div>

          {/* Navigation Karting (Palettes + Numéro de Course) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 p-1 rounded-xl bg-black/80 border border-white/15 shadow-inner shrink-0">
            {/* Palette Gauche */}
            <button
              type="button"
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1 sm:px-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              title="Page précédente (Flèche gauche)"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Page Avant (Desktop) */}
            {currentSlideIndex > 0 && (
              <button
                type="button"
                onClick={goToPrevSlide}
                className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition-colors items-center justify-center cursor-pointer"
                title={`Aller à la page ${SLIDES[currentSlideIndex - 1].slideNumber}`}
              >
                {SLIDES[currentSlideIndex - 1].slideNumber}
              </button>
            )}

            {/* Plaque Numéro de Course */}
            <div className="h-7 sm:h-8 px-2 sm:px-3 rounded-lg bg-[#ff1e00] text-white font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(255,30,0,0.45)]">
              <span className="text-[9px] sm:text-[10px] text-white/70 tracking-tighter">N°</span>
              <span>{currentSlide.slideNumber}</span>
            </div>

            {/* Page Suivante (Desktop) */}
            {currentSlideIndex < SLIDES.length - 1 && (
              <button
                type="button"
                onClick={goToNextSlide}
                className="hidden md:flex w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition-colors items-center justify-center cursor-pointer"
                title={`Aller à la page ${SLIDES[currentSlideIndex + 1].slideNumber}`}
              >
                {SLIDES[currentSlideIndex + 1].slideNumber}
              </button>
            )}

            {/* Palette Droite */}
            <button
              type="button"
              onClick={goToNextSlide}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="p-1 sm:px-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              title="Page suivante (Flèche droite)"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Saut rapide Budget / Paddock (Page 10) */}
          <button
            type="button"
            onClick={() => handleSelectSlide(SLIDES.length - 1)}
            className={`hidden min-[480px]:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              currentSlideIndex === SLIDES.length - 1
                ? 'bg-[#ff1e00] text-white border-[#ff1e00] shadow-[0_0_15px_rgba(255,30,0,0.5)]'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/15 hover:border-[#ff1e00]/50'
            }`}
            title="Accéder directement au Budget & Paddock (Page 10)"
          >
            <span className="text-[11px]">🏁</span>
            <span>BUDGET</span>
          </button>

          {/* Contrôle Audio Épuré sur Demande */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all cursor-pointer ${
                audioState.isMusicPlaying && !audioState.isMuted
                  ? 'border-[#ff1e00] bg-[#ff1e00] text-white shadow-[0_0_12px_rgba(255,30,0,0.5)]'
                  : 'border-white/20 bg-white/5 hover:border-[#ff1e00]/60 hover:bg-[#ff1e00]/15 hover:text-white text-neutral-300'
              }`}
              title={audioState.isMusicPlaying && !audioState.isMuted ? "Pause" : "Écouter"}
            >
              {audioState.isMusicPlaying && !audioState.isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-bold">Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ff1e00]" />
                  <span className="font-bold">Écouter</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. TOILE DE CONTENU PRINCIPALE
          ========================================================================= */}
      <main className="flex-1 max-w-6xl mx-auto w-full min-w-0 px-3 sm:px-8 py-4 sm:py-6 flex flex-col space-y-6">
        
        {/* Barre de Titre de Séquence & Carte du Circuit */}
        <div>
          {currentSlide.type === 'cover' ? (
            /* SLIDE 01 : GRAND TITRE MAÎTRE AVEC CARTE À DROITE */
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 border-b border-white/10 pb-5">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="font-display italic font-black text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none">
                    GO
                  </span>
                  <span className="font-display italic font-black text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ff1e00] tracking-tight uppercase leading-none [text-shadow:0_0_25px_rgba(255,30,0,0.45)] pr-2">
                    BEYOND
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                  <span className="font-display font-black text-xs sm:text-lg md:text-xl text-white uppercase tracking-wider">
                    DU RÊVE À LA RÉALITÉ
                  </span>
                  <div className="flex gap-0.5 opacity-80 shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff1e00]" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ff1e00]" />
                  </div>
                </div>
              </div>

              {/* Carte Interactive du Circuit (affichée sur desktop uniquement pour équilibrer la mise en page, masquée sur mobile pour éliminer tout carré noir sur GO BEYOND) */}
              <div className="hidden lg:block w-72 shrink-0">
                <InteractiveCircuitMap
                  currentSlideIndex={currentSlideIndex}
                  onSelectSlide={handleSelectSlide}
                />
              </div>
            </div>
          ) : (
            /* SLIDES 02-10 : TITRE STAND, CITATION & CARTE À DROITE */
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 border-b border-white/10 pb-5">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-[#ff1e00] font-bold uppercase tracking-wider">
                    {currentSlide.subtitle}
                  </span>
                </div>
                <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl text-white tracking-tight uppercase">
                  {currentSlide.type === 'budget' ? (
                    <span>BUDGET</span>
                  ) : currentSlide.title.includes(' · ') ? (
                    <span className="inline-flex flex-wrap items-baseline gap-x-2">
                      <span>{currentSlide.title.split(' · ')[0]}</span>
                      <span className="text-[#ff1e00] font-normal">·</span>
                      <span>{currentSlide.title.split(' · ')[1]}</span>
                    </span>
                  ) : (
                    <span>{currentSlide.title}</span>
                  )}
                </h1>

                {currentSlide.quote && (
                  <div className="text-sm sm:text-base italic text-neutral-300 font-sans border-l-2 border-[#ff1e00] pl-3 py-0.5">
                    {currentSlide.quote}
                  </div>
                )}
              </div>

              {/* Carte Interactive du Circuit (Positionnement propre sans masquage sur mobile) */}
              <div className="w-full sm:w-80 lg:w-72 shrink-0 mt-3 lg:mt-0">
                <InteractiveCircuitMap
                  currentSlideIndex={currentSlideIndex}
                  onSelectSlide={handleSelectSlide}
                />
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            3. VISUELS DE LA PAGE (SANS BOUTON DE TÉLÉCHARGEMENT)
            ========================================================================= */}
        <div>
          {currentSlide.type === 'cover' ? (
            /* SLIDE 01 : GRAND VISUEL MAÎTRE DE COUVERTURE */
            <div className="space-y-5">
              <div 
                className="relative rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl group"
              >
                <div className="aspect-[16/9] w-full relative">
                  <img
                    src={resolveImage(currentSlide.masterCoverImage || currentSlide.panels[0].image)}
                    alt="Go Beyond — Master Poster"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const rawSrc = currentSlide.masterCoverImage || currentSlide.panels[0].image;
                      const filename = rawSrc.split('/').pop();
                      if (filename && !img.src.includes(`/images/${filename}`)) {
                        img.src = `/images/${filename}`;
                      }
                    }}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* SLIDES 02-10 : LES TROIS IMAGES FONDAMENTALES DU CHAPITRE */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentSlide.panels.map((panel) => {
                const resolvedSrc = resolveImage(panel.image);
                return (
                  <div 
                    key={panel.id} 
                    className="flex flex-col rounded-xl overflow-hidden border border-white/15 bg-[#0b0d12] shadow-xl group"
                  >
                    <div className="aspect-[16/9] w-full relative bg-black overflow-hidden">
                      <img 
                        src={resolvedSrc} 
                        alt={panel.title}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onError={(e) => {
                          const img = e.currentTarget;
                          const filename = panel.image.split('/').pop();
                          if (filename && !img.src.includes(`/images/${filename}`)) {
                            img.src = `/images/${filename}`;
                          }
                        }}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>

                    <div className="p-3 bg-[#0d0f14] border-t border-white/10 text-left flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <div className="font-display font-bold text-xs uppercase text-white tracking-tight leading-tight">
                            {panel.title}
                          </div>
                        </div>
                        {panel.caption && (
                          <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mt-1">
                            {panel.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =========================================================================
            4. CONTENU ÉDITORIAL & SCÉNARISTIQUE
            ========================================================================= */}
        {currentSlide.type === 'budget' ? (
          <div className="space-y-6">
            <ThreeEntriesBox
              imageText={currentSlide.imageText || currentSlide.ecranText}
              sensText={currentSlide.sensText || currentSlide.raconteText}
              notreForceTitle={currentSlide.notreForceTitle}
              notreForceText={currentSlide.notreForceText}
            />
            <PlanningBudgetSection />
          </div>
        ) : currentSlide.pillars ? (
          <>
            {/* SLIDE 01 : SECTION A : MANIFESTE « GO BEYOND » (FOND NOIR) */}
            <div className="w-full rounded-2xl bg-[#090b0e] text-white p-4 sm:p-7 shadow-2xl border border-white/10 space-y-4">
              <div className="w-full border-b border-white/10 pb-4">
                <h3 className="font-display italic font-black text-xl sm:text-2xl text-white tracking-tight uppercase text-left">
                  {currentSlide.manifesto?.headline || "Go Beyond : le manifeste"}
                </h3>

                {currentSlide.manifesto?.quote && (
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 border-l-2 border-[#ff1e00] pl-3.5 font-sans leading-relaxed text-left">
                    {currentSlide.manifesto.quote}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs font-sans">
                {currentSlide.manifesto?.points.map((pt, idx) => (
                  <div 
                    key={pt.title}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-[#ff1e00]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[#ff1e00] font-bold uppercase text-[11px] tracking-wider">
                          {pt.num || `0${idx + 1}`}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e00]/60" />
                      </div>
                      <h4 className="font-display font-bold text-white uppercase text-sm mb-1.5 tracking-tight">
                        {pt.title}
                      </h4>
                      <p className="text-neutral-300 leading-relaxed font-light text-[12px]">
                        {pt.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLIDE 01 : ENCADRÉ « À L'IMAGE / LE SENS / NOTRE FORCE » SOUS LE MANIFESTE (FOND BLANC) */}
            <ThreeEntriesBox
              imageText={currentSlide.imageText || currentSlide.ecranText}
              sensText={currentSlide.sensText || currentSlide.raconteText}
              notreForceTitle={currentSlide.notreForceTitle}
              notreForceText={currentSlide.notreForceText}
            />

            {/* SLIDE 01 : TRACÉ DU CIRCUIT & NAVIGATION PAR LES VERBES (FOND NOIR AVEC CIRCUIT DU BÉNIN) */}
            <CircuitNarrativeNavigator
              onSelectSlide={handleSelectSlide}
              currentSlideIndex={currentSlideIndex}
            />

            {/* SLIDE 01 : SECTION B : LES QUATRE PILIERS DU RÉCIT (FOND BLANC AVEC LES QUATRE PILIERS) */}
            <div className="w-full rounded-2xl bg-white text-neutral-900 p-5 sm:p-8 shadow-2xl border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-neutral-200 pb-3 mb-5">
                <span className="font-mono text-xs text-[#ff1e00] font-bold uppercase tracking-widest">
                  LES QUATRE PILIERS DU RÉCIT CINÉMATOGRAPHIQUE
                </span>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  STRUCTURE SCÉNARISTIQUE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {currentSlide.pillars.map((pil) => (
                  <div 
                    key={pil.num} 
                    className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-[#ff1e00]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-full bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center font-mono font-bold text-xs">
                          0{pil.num}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                          PILIER {pil.num}
                        </span>
                      </div>

                      <h4 className="font-sans font-bold text-xs sm:text-[13px] text-neutral-900 leading-snug">
                        {pil.title}
                      </h4>

                      <div className="text-[10px] font-mono text-[#ff1e00] font-semibold leading-relaxed [word-break:keep-all] hyphens-none">
                        {pil.verbs}
                      </div>

                      <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                        {pil.desc}
                      </p>
                    </div>

                    <div className="h-0.5 w-8 bg-[#ff1e00] pt-1" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* SLIDES 02-09 : ENCADRÉ « À L'IMAGE / LE SENS / NOTRE FORCE » SUR FOND BLANC */
          <ThreeEntriesBox
            imageText={currentSlide.imageText || currentSlide.ecranText}
            sensText={currentSlide.sensText || currentSlide.raconteText}
            notreForceTitle={currentSlide.notreForceTitle}
            notreForceText={currentSlide.notreForceText}
          />
        )}

        {/* =========================================================================
            5. DUAL MOTORSPORT BLOCKS : LA SIGNATURE KART & FIL ROUGE SONORE
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* =======================================================================
              CARTE 1 : LA SIGNATURE KART (ÉPURÉE, PLUS PETITE, AVEC L'ICÔNE KART)
              ======================================================================= */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#10121a] to-[#090b10] border border-[#ff1e00]/30 hover:border-[#ff1e00]/60 shadow-[0_0_25px_rgba(255,30,0,0.12)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 group">
            
            {/* Lueur rouge sportive en arrière-plan */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff1e00]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff1e00]/20 transition-all" />

            <div className="space-y-3.5 relative z-10">
              {/* En-tête avec l'icône de Kart de compétition */}
              <div className="flex items-center gap-3.5 pt-0.5">
                <div className="p-2 rounded-xl bg-black/70 border border-[#ff1e00]/40 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                  <CompetitionKartIcon className="w-10 h-7" />
                </div>
                <div>
                  <h3 className="text-white font-display font-black text-lg sm:text-xl tracking-tight uppercase leading-none">
                    SIGNATURE KARTING
                  </h3>
                </div>
              </div>

              <div className="h-0.5 w-12 bg-gradient-to-r from-[#ff1e00] to-transparent my-1" />

              {/* Texte de narration du kart */}
              <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-sans font-light">
                {currentSlide.signatureKartText || "La rigueur méthodologique au service de l'ambition cinématographique internationale."}
              </p>
            </div>

          </div>

          {/* =======================================================================
              CARTE 2 : FIL ROUGE SONORE
              ======================================================================= */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-black border border-white/20 hover:border-[#ff1e00]/50 shadow-xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              {/* En-tête : FIL ROUGE SONORE épuré */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#ff1e00] font-display font-black text-base sm:text-lg uppercase">
                  <Volume2 className="w-4 h-4 text-[#ff1e00]" />
                  <span>FIL ROUGE SONORE</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  STAND {String(currentSlideIndex + 1).padStart(2, '0')}/10
                </span>
              </div>

              {/* Idée sonore 1 : Fil rouge sonore narratif avec liseré rouge */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-[13px] font-sans text-neutral-200 leading-relaxed italic border-l-2 border-l-[#ff1e00]">
                {currentSlide.filRougeSonoreText}
              </div>

              {/* Idée sonore 2 : Situation sonore imaginée avec le même liseré rouge */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-[13px] font-sans text-neutral-300 leading-relaxed italic border-l-2 border-l-[#ff1e00]">
                {(SLIDE_SOUND_CONFIG[currentSlide.id] || SLIDE_SOUND_CONFIG[1]).situationImaginee}
              </div>
            </div>

            {/* Console de mixage épurée : Ambiance, Effet 1, Effet 2 */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2.5 flex-wrap">
              {/* Ambiance */}
              <button
                type="button"
                onClick={handleToggleSound}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  audioState.isMusicPlaying && !audioState.isMuted
                    ? 'bg-[#ff1e00] text-white border-[#ff1e00] shadow-[0_0_15px_rgba(255,30,0,0.4)]'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-200 border-white/15'
                }`}
                title={audioState.isMusicPlaying && !audioState.isMuted ? "Pause ambiance" : "Lancer l'ambiance"}
              >
                {audioState.isMusicPlaying && !audioState.isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#ff1e00]" />
                    <span>Ambiance</span>
                  </>
                )}
              </button>

              {/* Animation discrète d'onde si l'ambiance joue */}
              {audioState.isMusicPlaying && !audioState.isMuted && (
                <div className="flex items-center gap-1 h-5 px-2 bg-white/5 rounded-lg border border-[#ff1e00]/30 mr-1">
                  {[40, 90, 60, 100, 50, 80, 45, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#ff1e00] rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                    />
                  ))}
                </div>
              )}

              {/* Effet 1 */}
              <button
                type="button"
                onClick={() => handleTriggerFx(1)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeFx === 1
                    ? 'bg-[#ff1e00] text-white border-[#ff1e00] shadow-[0_0_15px_rgba(255,30,0,0.5)] scale-105'
                    : 'bg-white/5 hover:bg-[#ff1e00]/20 hover:border-[#ff1e00]/60 text-neutral-200 border-white/15'
                }`}
                title="Déclencher Effet 1"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activeFx === 1 ? 'animate-bounce text-white' : 'text-[#ff1e00]'}`} />
                <span>Effet 1</span>
              </button>

              {/* Effet 2 */}
              <button
                type="button"
                onClick={() => handleTriggerFx(2)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeFx === 2
                    ? 'bg-[#ff1e00] text-white border-[#ff1e00] shadow-[0_0_15px_rgba(255,30,0,0.5)] scale-105'
                    : 'bg-white/5 hover:bg-[#ff1e00]/20 hover:border-[#ff1e00]/60 text-neutral-200 border-white/15'
                }`}
                title="Déclencher Effet 2"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activeFx === 2 ? 'animate-bounce text-white' : 'text-[#ff1e00]'}`} />
                <span>Effet 2</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* =========================================================================
          6. VIBREUR FIA RACING INFERIEUR
          ========================================================================= */}
      <div className="w-full relative z-30 pointer-events-none">
        <div className="h-2.5 w-full flex overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 -skew-x-12 ${i % 2 === 0 ? 'bg-[#ff1e00]' : 'bg-white'}`} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};
