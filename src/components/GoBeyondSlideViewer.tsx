import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Volume2, VolumeX, Film, Layers, Video, Sparkles, Headphones
} from 'lucide-react';
import { SLIDES, SlideData, resolveImage } from '../data/slidesData';
import { InteractiveCircuitMap } from './InteractiveCircuitMap';
import { CircuitNarrativeNavigator } from './CircuitNarrativeNavigator';
import { ThreeEntriesBox } from './ThreeEntriesBox';
import { AaaAgencyRoadmap } from './AaaAgencyRoadmap';
import { AiRobotCameraIcon } from './icons/AiRobotCameraIcon';
import { CompetitionKartIcon } from './icons/CompetitionKartIcon';
import { audioSystem } from '../utils/audioSystem';
import { sound } from '../utils/audio';
import { scrollToSlideTop } from '../utils/scrollHelper';

export const GoBeyondSlideViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [audioState, setAudioState] = useState(audioSystem.getState());

  useEffect(() => {
    return audioSystem.subscribe((state) => {
      setAudioState(state);
    });
  }, []);

  const currentSlide: SlideData = SLIDES[currentSlideIndex] || SLIDES[0];

  const handleSelectSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      sound.playUiClick();
      setCurrentSlideIndex(index);
      scrollToSlideTop();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      sound.playUiClick();
      handleSelectSlide(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      sound.playUiClick();
      handleSelectSlide(currentSlideIndex + 1);
    }
  };

  useLayoutEffect(() => {
    scrollToSlideTop();
  }, [currentSlideIndex]);

  // Raccourcis clavier (Flèches gauche / droite)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const handleToggleSound = () => {
    if (!audioState.isMusicPlaying && !audioState.isMuted) {
      audioSystem.playSlideSoundDesign(currentSlide.id);
    } else {
      audioSystem.toggleMusic(currentSlide.id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white flex flex-col justify-between selection:bg-[#ff1e00] selection:text-white">
      
      {/* =========================================================================
          1. NAVIGATION SUPÉRIEURE ÉPURÉE
          - Identité : Taro & Gaïa | Go Beyond (sans drapeau du Bénin)
          - Gaïa avec tréma ï
          - Go en rouge et Beyond en blanc
          - Bouton à damier amenant vers la page 10 "AAA"
          ========================================================================= */}
      <header className="w-full bg-[#07080a] border-b border-white/10 px-3 sm:px-8 py-2.5 sm:py-3.5 sticky top-0 z-50 backdrop-blur-md bg-[#07080a]/90">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Identité de marque : simplement Go Beyond */}
          <div 
            onClick={() => handleSelectSlide(0)}
            className="flex items-center gap-2 shrink-0 cursor-pointer group"
            title="Retour à l'accueil"
          >
            <span className="font-display italic font-black text-base sm:text-lg tracking-wider uppercase">
              <span className="text-[#ff1e00]">Go</span> <span className="text-white">Beyond</span>
            </span>
          </div>

          {/* Navigation Karting (Palettes + Numéro de Course) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 p-1 rounded-xl bg-[#101218] border border-white/15 shrink-0">
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

          {/* Bouton Damier vers la page 10 AAA + Contrôle Audio */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Bouton à damier vers la page 10 "AAA" */}
            <button
              type="button"
              onClick={() => handleSelectSlide(9)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                currentSlideIndex === 9
                  ? 'border-[#ff1e00] bg-[#ff1e00] text-white shadow-[0_0_12px_rgba(255,30,0,0.5)]'
                  : 'border-white/20 bg-white/5 hover:border-[#ff1e00]/60 hover:bg-[#ff1e00]/15 text-neutral-200 hover:text-white'
              }`}
              title="Aller à la page 10 · AAA (Studio IA & Feuille de Route)"
            >
              <span className="w-3.5 h-3.5 rounded-sm border border-white/40 shadow-sm bg-[repeating-conic-gradient(#000_0%_25%,#fff_0%_50%)] [background-size:4px_4px] inline-block shrink-0" />
              <span>AAA</span>
            </button>

            {/* Contrôle Audio */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all cursor-pointer ${
                audioState.isMusicPlaying && !audioState.isMuted
                  ? 'border-[#ff1e00] bg-[#ff1e00] text-white shadow-[0_0_12px_rgba(255,30,0,0.5)]'
                  : 'border-white/20 bg-white/5 hover:border-[#ff1e00]/60 hover:bg-[#ff1e00]/15 hover:text-white text-neutral-300'
              }`}
              title={audioState.isMusicPlaying && !audioState.isMuted ? "Pause" : "Écouter"}
            >
              {audioState.isMusicPlaying && !audioState.isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-bold hidden min-[400px]:inline">Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ff1e00]" />
                  <span className="font-bold hidden min-[400px]:inline">Écouter</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. TOILE DE CONTENU PRINCIPALE (10 PAGES FLUIDES SANS ONGLETS ENCOMBRANTS)
          ========================================================================= */}
      <main className="flex-1 max-w-6xl mx-auto w-full min-w-0 px-3 sm:px-8 py-4 sm:py-6 flex flex-col space-y-6">
        
        {/* =========================================================================
            CAS PARTICULIER : PAGE 10 DÉDIÉE À L'AGENCE AAA
            ========================================================================= */}
        {currentSlide.type === 'agency' ? (
          <div className="space-y-6">
            {/* Entête Page 10 */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 border-b border-white/10 pb-5">
              <div className="space-y-2">
                <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
                  Avantages et gains
                </h1>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 uppercase tracking-wider">
                  Écosystème de collaboration · Déploiement et bénéfices sur 3 mois
                </p>
              </div>

              {/* Carte Interactive du Circuit sur Desktop */}
              <div className="hidden lg:block w-72 shrink-0">
                <InteractiveCircuitMap
                  currentSlideIndex={currentSlideIndex}
                  onSelectSlide={handleSelectSlide}
                />
              </div>
            </div>

            {/* Composant de Feuille de Route et Organisation de l'Agence AAA */}
            <AaaAgencyRoadmap />

            {/* Carte du circuit sur Mobile */}
            <div className="block lg:hidden w-full">
              <InteractiveCircuitMap
                currentSlideIndex={currentSlideIndex}
                onSelectSlide={handleSelectSlide}
              />
            </div>
          </div>
        ) : (
          /* =========================================================================
             PAGES 01 À 09 : COUVERTURE DU PROJET & LES 8 ÉPISODES DE LA WEB-SÉRIE
             ========================================================================= */
          <>
            {/* Barre de Titre de Séquence & Carte du Circuit */}
            <div>
              {currentSlide.type === 'cover' ? (
                /* SLIDE 01 : GRAND TITRE GO BEYOND & LES DEUX SÉRIES */
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 border-b border-white/10 pb-5">
                  <div className="flex flex-col">
                    {/* Gros titre du projet global : GO BEYOND */}
                    <div className="flex items-baseline gap-2 sm:gap-4 flex-wrap">
                      <h1 className="font-display italic font-black text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none">
                        <span className="text-[#ff1e00]">GO</span>{" "}
                        <span className="text-white">BEYOND</span>
                      </h1>
                    </div>

                    {/* Sous-titre : BD numériques · Deux séries */}
                    <div className="mt-2 sm:mt-3">
                      <p className="font-display italic font-black text-xl sm:text-2xl md:text-3xl text-neutral-200 tracking-wider uppercase">
                        BD numériques · Deux séries
                      </p>
                    </div>
                  </div>

                  {/* Carte Interactive du Circuit sur desktop */}
                  <div className="hidden lg:block w-72 shrink-0">
                    <InteractiveCircuitMap
                      currentSlideIndex={currentSlideIndex}
                      onSelectSlide={handleSelectSlide}
                    />
                  </div>
                </div>
              ) : (
                /* SLIDES 02-09 : TITRE STAND, CITATION & CARTE DU CIRCUIT */
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 border-b border-white/10 pb-5">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-[#ff1e00] font-bold uppercase tracking-wider">
                        {currentSlide.subtitle}
                      </span>
                    </div>
                    <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl text-white tracking-tight uppercase">
                      {currentSlide.title.includes(' · ') ? (
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

                  {/* Carte Interactive du Circuit sur Desktop uniquement */}
                  <div className="hidden lg:block w-72 shrink-0">
                    <InteractiveCircuitMap
                      currentSlideIndex={currentSlideIndex}
                      onSelectSlide={handleSelectSlide}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* =========================================================================
                3. VISUELS DE LA PAGE : TARO & GAÏA (COUVERTURE OU STORYBOARD 3 CASES)
                ========================================================================= */}
            <div>
              {currentSlide.type === 'cover' ? (
                /* SLIDE 01 : AFFICHE 1 — TARO & GAÏA (FICTION) */
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <CompetitionKartIcon className="w-5 h-4" />
                      <span className="px-2.5 py-0.5 rounded bg-[#ff1e00] text-white font-mono text-[10px] font-black uppercase tracking-wider">
                        AFFICHE 1 · KARTING BÉNIN
                      </span>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl group">
                    <div className="aspect-[16/9] w-full relative">
                      <img
                        src={resolveImage(currentSlide.masterCoverImage || currentSlide.panels[0].image)}
                        alt="Karting Bénin — Master Poster"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* SLIDES 02-09 : LES TROIS IMAGES POUR KARTING BÉNIN */
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <CompetitionKartIcon className="w-5 h-4" />
                      <span className="px-2 py-0.5 rounded bg-[#ff1e00] text-white font-mono text-[9px] font-black uppercase tracking-wider">
                        KARTING BÉNIN
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      3 cases BD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentSlide.panels.map((panel) => {
                      const resolvedSrc = resolveImage(panel.image);
                      return (
                        <div 
                          key={panel.id} 
                          className="flex flex-col rounded-xl overflow-hidden border border-white/15 bg-[#0b0d12] shadow-xl group hover:border-[#ff1e00]/40 transition-colors"
                        >
                          <div className="aspect-[16/9] w-full relative bg-black overflow-hidden">
                            <img 
                              src={resolvedSrc} 
                              alt={panel.title}
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                              className="w-full h-full object-cover select-none group-hover:scale-[1.02] transition-transform duration-500"
                            />
                          </div>

                          <div className="p-3 bg-[#0d0f14] border-t border-white/10 text-left flex-1 flex flex-col justify-between">
                            <div>
                              <div className="font-display font-bold text-xs uppercase text-white tracking-tight leading-tight">
                                {panel.title}
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
                </div>
              )}
            </div>

            {/* CARTE DU CIRCUIT SUR MOBILE SOUS LES IMAGES */}
            <div className="block lg:hidden w-full">
              <InteractiveCircuitMap
                currentSlideIndex={currentSlideIndex}
                onSelectSlide={handleSelectSlide}
              />
            </div>

            {/* =========================================================================
                4. SECTION CENTRALE : MANIFESTE (PAGE 1) OU TRIPTYQUE ÉDITORIAL (PAGES 2-9)
                ========================================================================= */}
            {currentSlideIndex === 0 ? (
              /* SLIDE 01 : LE MANIFESTE */
              <div className="space-y-6">
                <div className="w-full rounded-2xl bg-[#090b0e] text-white p-4 sm:p-7 shadow-2xl border border-white/10 space-y-4">
                  <div className="w-full border-b border-white/10 pb-4">
                    <h3 className="font-display italic font-black text-xl sm:text-2xl text-white tracking-tight uppercase text-left">
                      {currentSlide.manifesto?.headline || "Le Manifeste"}
                    </h3>

                    {currentSlide.manifesto?.quote && (
                      <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 border-l-2 border-[#ff1e00] pl-3.5 font-sans leading-relaxed text-left">
                        {currentSlide.manifesto.quote}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs font-sans">
                    {currentSlide.manifesto?.points.map((pt, pIdx) => (
                      <div 
                        key={pIdx} 
                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff1e00]/40 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-xs font-bold text-[#ff1e00]">{pt.num}</span>
                            <h4 className="font-display font-bold text-white text-xs uppercase">{pt.title}</h4>
                          </div>
                          <p className="text-neutral-300 leading-relaxed font-light">{pt.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLIDE 01 : AFFICHE 2 — AAA (ARRIVE APRÈS LE MANIFESTE) */}
                {currentSlide.secondaryCoverImage && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-white text-neutral-900 font-mono text-[10px] font-black uppercase tracking-wider">
                          AFFICHE 2 · AAA
                        </span>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl group">
                      <div className="aspect-[16/9] w-full relative">
                        <img
                          src={resolveImage(currentSlide.secondaryCoverImage)}
                          alt="AAA — Master Poster"
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          className="w-full h-full object-cover select-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* SLIDES 02-09 : NOUVEAU TRIPTYQUE CENTRAL (KARTING BÉNIN | AAA | LE SENS) */
              <ThreeEntriesBox
                synopsisKarting={currentSlide.synopsisKarting}
                synopsisAaa={currentSlide.synopsisAaa}
                sensBenin={currentSlide.sensBenin}
              />
            )}

            {/* =========================================================================
                5. SECTION EN DESSOUS : LES TROIS IMAGES BD DE LA SÉRIE AAA (SLIDES 02-09)
                ========================================================================= */}
            {currentSlideIndex > 0 && currentSlide.docuPanels && currentSlide.docuPanels.length > 0 && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <AiRobotCameraIcon className="w-5 h-5 text-white" />
                    <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider">
                      AAA
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    3 cases BD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentSlide.docuPanels.map((docu) => {
                    const resolvedSrc = resolveImage(docu.image);
                    return (
                      <div 
                        key={docu.id}
                        className="flex flex-col rounded-xl overflow-hidden border border-white/15 bg-[#0b0d12] shadow-xl group hover:border-[#ff1e00]/40 transition-colors"
                      >
                        <div className="aspect-[16/9] w-full relative bg-black overflow-hidden">
                          <img
                            src={resolvedSrc}
                            alt={docu.title}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full object-cover select-none group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>

                        <div className="p-3 bg-[#0d0f14] border-t border-white/10 text-left flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-display font-bold text-xs uppercase text-white tracking-tight leading-tight">
                              {docu.title}
                            </div>
                            <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mt-1">
                              {docu.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                6. DEUX ENCADRÉS EN MIROIR : KARTING BÉNIN (GAUCHE) & AAA (DROITE)
                   Réalisation & Ambiance sonore + Fil rouge sonore (3 boutons)
                ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* ENCADRÉ GAUCHE : KARTING BÉNIN */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#10121a] to-[#090b10] border border-[#ff1e00]/30 hover:border-[#ff1e00]/60 shadow-[0_0_25px_rgba(255,30,0,0.12)] flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff1e00]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff1e00]/20 transition-all" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-black/70 border border-[#ff1e00]/40 shrink-0 group-hover:scale-105 transition-transform">
                        <CompetitionKartIcon className="w-7 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-[#ff1e00] font-bold uppercase tracking-wider block">
                          SÉRIE
                        </span>
                        <h3 className="text-white font-display font-black text-base sm:text-lg uppercase">
                          KARTING BÉNIN
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Bande vidéo : Réalisation */}
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-[#ff1e00]/15 text-[#ff1e00] shrink-0 mt-0.5">
                      <Film className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-sans font-light">
                      {currentSlide.realisationKarting}
                    </p>
                  </div>

                  {/* Casque audio : Ambiance sonore */}
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                      <Headphones className="w-4 h-4 text-[#ff1e00]" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                      {currentSlide.audioKarting}
                    </p>
                  </div>
                </div>
              </div>

              {/* ENCADRÉ DROITE : AAA */}
              <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-black border border-white/20 hover:border-[#ff1e00]/50 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 group">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white text-black shrink-0 shadow-sm border border-neutral-300">
                        <AiRobotCameraIcon className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                          SÉRIE
                        </span>
                        <h3 className="text-white font-display font-black text-base sm:text-lg uppercase">
                          AAA
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Bande vidéo : Réalisation */}
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                      <Film className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-sans font-light">
                      {currentSlide.realisationAaa}
                    </p>
                  </div>

                  {/* Casque audio : Ambiance sonore */}
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                      <Headphones className="w-4 h-4 text-[#ff1e00]" />
                    </div>
                    <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                      {currentSlide.audioAaa}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* NAVIGATEUR DES 10 STANDS DU CIRCUIT */}
            <div className="w-full pt-4">
              <CircuitNarrativeNavigator
                currentSlideIndex={currentSlideIndex}
                onSelectSlide={handleSelectSlide}
              />
            </div>
          </>
        )}

      </main>

      {/* =========================================================================
          6. VIBREUR RACING INFÉRIEUR
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
