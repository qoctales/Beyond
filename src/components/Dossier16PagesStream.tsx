import React, { useState } from 'react';
import { 
  Flag, Play, CheckCircle2, ChevronRight, Layers, Cpu, Compass, 
  Sparkles, Shield, Trophy, Zap, Sliders, Box, Eye, Monitor
} from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { 
  SIXTEEN_VERBS, CIRCUIT_SECTORS, PRODUCTION_PIPELINE, 
  VISUAL_EXPERIENCE_DIALS, PRODUCTION_TIMELINE, BUDGET_TELEMETRY, 
  TOTAL_BUDGET_HT, DIGITAL_PACK_OPTION 
} from '../data/dossier16PagesData';
import { audioSystem } from '../utils/audioSystem';
import { sound } from '../utils/audio';

interface Dossier16PagesStreamProps {
  onVerbChange?: (verbIndex: number) => void;
}

export const Dossier16PagesStream: React.FC<Dossier16PagesStreamProps> = ({ onVerbChange }) => {
  const [includeDigitalPack, setIncludeDigitalPack] = useState(false);
  const [lightsTriggered, setLightsTriggered] = useState(false);
  const [lightsCountdown, setLightsCountdown] = useState(0);

  // Trigger 5 lights countdown sequence on Page 07
  const handleTriggerLights = () => {
    setLightsTriggered(true);
    setLightsCountdown(1);
    sound.playCountdownBeep(1);

    const timer2 = setTimeout(() => { setLightsCountdown(2); sound.playCountdownBeep(2); }, 1000);
    const timer3 = setTimeout(() => { setLightsCountdown(3); sound.playCountdownBeep(3); }, 2000);
    const timer4 = setTimeout(() => { setLightsCountdown(4); sound.playCountdownBeep(4); }, 3000);
    const timer5 = setTimeout(() => { setLightsCountdown(5); sound.playCountdownBeep(5); }, 4000);
    const timerGo = setTimeout(() => {
      setLightsCountdown(6); // 6 means GO!
      sound.playGoLaunch();
      audioSystem.playContinuousAccelerationSequence();
    }, 5200);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timerGo);
    };
  };

  const grandTotal = TOTAL_BUDGET_HT + (includeDigitalPack ? DIGITAL_PACK_OPTION : 0);
  const grandTotalFormatted = grandTotal.toLocaleString('fr-FR') + ' FCFA HT';

  return (
    <div className="relative w-full overflow-x-hidden bg-[#07080a] text-white">

      {/* Trajectory Racing Line that cuts through all pages */}
      <div className="fixed left-4 sm:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-[#ff3b1d]/40 to-white/10 z-0 pointer-events-none" />

      {/* =========================================================================
          PAGE 01 — DÉPART
          ========================================================================= */}
      <section 
        id="page-01" 
        data-page="1" 
        data-verb-index="0"
        className="relative min-h-screen flex flex-col justify-between p-6 sm:p-16 lg:p-24 border-b border-white/8 overflow-hidden"
      >
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/50 tracking-widest uppercase">
          <span>01 / DÉPART</span>
          <span>AFRIKAFUN PRODUCTION</span>
        </div>

        {/* Central Bold Statement with Trajectory behind it */}
        <div className="relative z-10 my-auto py-12 max-w-5xl">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase mb-4 font-semibold">
            PROPOSITION CINÉMATOGRAPHIQUE OFFICIELLE
          </div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-[0.88] text-white mb-6">
            ENTER THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ff3b1d]">
              RACE
            </span>
          </h1>

          <div className="text-xl sm:text-3xl font-display uppercase tracking-tight text-neutral-300">
            FILM DE PRÉSENTATION DU FUTUR KARTING
          </div>

          <div className="mt-8 font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
            2’30 — 3’00 <span className="text-white/20 mx-2">|</span> 16:9 <span className="text-white/20 mx-2">|</span> UHD / 4K
          </div>
        </div>

        {/* Visual of child & kart, trajectory crossing behind */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
            <div className="aspect-[16/9] w-full relative">
              <img 
                src={STORY_ASSETS.dreamHero.src} 
                alt="L'enfant et son kart"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.85] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-6 font-mono text-xs text-white/70">
                SHOT 01 · L'ORIGINE DU RÊVE DANS LA TERRE DU BÉNIN
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 font-mono text-xs text-neutral-500 text-right hidden lg:block">
            KOFFI &amp; DIABATÉ ARCHITECTES <br />
            CONSULTATION AUDIOVISUELLE
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 02 — L'IDÉE
          ========================================================================= */}
      <section 
        id="page-02" 
        data-page="2" 
        data-verb-index="0"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#08090c]"
      >
        <div className="max-w-5xl mx-auto w-full text-center space-y-12">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            02 / L'IDÉE
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-tight">
            VOIR AVANT QUE <br />
            <span className="text-white/40">CELA N'EXISTE.</span>
          </h2>

          <div className="flex items-center justify-center gap-4 sm:gap-8 font-mono text-sm sm:text-xl font-bold tracking-widest text-[#ff3b1d]">
            <span>RÊVER.</span>
            <span className="text-white/20">·</span>
            <span>OSER.</span>
            <span className="text-white/20">·</span>
            <span>CONSTRUIRE.</span>
          </div>

          <div className="text-xs sm:text-sm font-mono text-neutral-400 space-y-1 pt-6 border-t border-white/10 max-w-md mx-auto">
            <p>Un enfant imagine un kart.</p>
            <p className="text-white font-semibold">Une ambition prend forme.</p>
          </div>

          {/* Parallel Stills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 text-left">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <div className="aspect-[16/10] relative">
                <img 
                  src={STORY_ASSETS.dreamHero.src} 
                  alt="L'enfant imagine"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute bottom-3 left-4 font-mono text-[10px] text-white/60">
                  L'ÉTINCELLE SPONTANÉE
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <div className="aspect-[16/10] relative">
                <img 
                  src={STORY_ASSETS.circuitMasterNight.src} 
                  alt="Le complexe à venir"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute bottom-3 left-4 font-mono text-[10px] text-white/60">
                  L'AMORCE DU FUTUR COMPLEXE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 03 — RÊVER / OSER
          ========================================================================= */}
      <section 
        id="page-03" 
        data-page="3" 
        data-verb-index="1"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#090a0e]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            03 / RÊVER &amp; OSER
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photogram 1: RÊVER */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-neutral-400">01 / VERBE</span>
              <h3 className="text-4xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                RÊVER
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-light">
                Voir avant que cela n'existe.
              </p>
              <div className="p-4 rounded-xl bg-white/3 border border-white/8 font-mono text-xs text-neutral-400">
                enfant → idée → petit kart artisanal
              </div>
            </div>

            {/* Photogram 2: OSER */}
            <div className="space-y-4 border-l border-white/10 md:pl-12">
              <span className="font-mono text-xs text-neutral-400">02 / VERBE</span>
              <h3 className="text-4xl sm:text-5xl font-display font-black uppercase text-[#ff3b1d] tracking-tight">
                OSER
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-light">
                Pourquoi pas nous ?
              </p>
              <div className="p-4 rounded-xl bg-white/3 border border-white/8 font-mono text-xs text-neutral-400">
                La trajectoire commence à s'élargir vers l'ambition nationale.
              </div>
            </div>
          </div>

          <div className="pt-8 text-center font-mono text-xs text-neutral-500 tracking-widest uppercase border-t border-white/10">
            Une idée commence toujours par un mouvement.
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 04 — JOUER / RENCONTRER
          ========================================================================= */}
      <section 
        id="page-04" 
        data-page="4" 
        data-verb-index="3"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#08090c]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            04 / JOUER &amp; RENCONTRER
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                  JOUER
                </h3>
                <p className="text-sm font-mono text-neutral-400 mt-1">
                  Découvrir. Essayer. Recommencer.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-3xl sm:text-4xl font-display font-black uppercase text-[#ff3b1d] tracking-tight">
                  RENCONTRER
                </h3>
                <p className="text-sm font-mono text-neutral-400 mt-1">
                  Le rêve rencontre une possibilité.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Le petit kart avance dans la poussière. Puis un obstacle. Un regard levé. 
                Le visage de l'architecte au sommet de la tour. 
                La trajectoire du bois devient une ligne tracée au crayon.
              </p>
            </div>

            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
              <div className="aspect-[16/9] w-full relative">
                <img 
                  src={STORY_ASSETS.architectRelay.src} 
                  alt="Le regard croisé"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-85"
                />
                <div className="absolute bottom-4 left-6 font-mono text-xs text-white/70 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                  LE REGARD CROISÉ · L'ENFANT ET L'ARCHITECTE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 05 — IMAGINER / DESSINER
          ========================================================================= */}
      <section 
        id="page-05" 
        data-page="5" 
        data-verb-index="5"
        className="relative min-h-screen flex flex-col justify-between p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#0a0b0f]"
      >
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/50 tracking-widest uppercase">
          <span>05 / IMAGINER &amp; DESSINER</span>
          <span>DE L'ESQUISSE AU TRACÉ</span>
        </div>

        <div className="relative z-10 my-auto py-12 max-w-4xl space-y-8">
          <div>
            <span className="font-mono text-xs text-neutral-400 block mb-2 uppercase">IMAGINER</span>
            <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-white tracking-tight">
              VOIR PLUS LOIN.
            </h2>
          </div>

          <div>
            <span className="font-mono text-xs text-[#ff3b1d] block mb-2 uppercase font-semibold">DESSINER</span>
            <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-neutral-300 tracking-tight">
              DONNER UNE FORME <br />
              <span className="text-[#ff3b1d]">AU FUTUR.</span>
            </h2>
          </div>
        </div>

        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/15 bg-black/60">
          <div className="aspect-[21/9] sm:aspect-[24/9] w-full relative">
            <img 
              src={STORY_ASSETS.architectDiorama.src} 
              alt="L'architecte dessine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 font-mono text-xs text-white/70">
              LA LIGNE DE TRAJECTOIRE DEVIENT UN TRACÉ DE CIRCUIT
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 06 — CONCEVOIR / BÂTIR
          ========================================================================= */}
      <section 
        id="page-06" 
        data-page="6" 
        data-verb-index="7"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#08090c]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            06 / CONCEVOIR &amp; BÂTIR
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs text-neutral-400">CONCEVOIR</span>
              <p className="text-2xl sm:text-3xl font-display font-bold text-white uppercase mt-1">
                Transformer la vision en projet.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-[#ff3b1d] font-semibold">BÂTIR</span>
              <p className="text-2xl sm:text-3xl font-display font-bold text-neutral-300 uppercase mt-1">
                Faire entrer le projet dans le réel.
              </p>
            </div>
          </div>

          {/* Grande transformation horizontale */}
          <div className="p-6 rounded-2xl bg-white/3 border border-white/10 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#ff3b1d] font-bold uppercase tracking-widest">
              <span>MÉTHODOLOGIE : DE LA DONNÉE AU PHÉNIX ARCHITECTURAL</span>
              <span>REVIT / DWG KOFFI &amp; DIABATÉ</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500">ÉTAPE 1</span>
                <div className="font-display font-bold text-base text-white">CRAYON</div>
                <p className="text-xs text-neutral-400 font-mono">Carnet &amp; esquisse manuelle</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500">ÉTAPE 2</span>
                <div className="font-display font-bold text-base text-white">ÉCRAN</div>
                <p className="text-xs text-neutral-400 font-mono">Plans DWG &amp; BIM Revit</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500">ÉTAPE 3</span>
                <div className="font-display font-bold text-base text-white">MAQUETTE</div>
                <p className="text-xs text-neutral-400 font-mono">Diorama 3D &amp; kart #07</p>
              </div>
              <div className="p-4 rounded-xl bg-[#ff3b1d]/10 border border-[#ff3b1d]/30 space-y-2">
                <span className="text-[10px] font-mono text-[#ff3b1d]">ÉTAPE 4</span>
                <div className="font-display font-bold text-base text-white">ARCHITECTURE</div>
                <p className="text-xs text-neutral-300 font-mono">Complexe de classe mondiale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 07 — S'ÉQUIPER / FRÉMIR
          ========================================================================= */}
      <section 
        id="page-07" 
        data-page="7" 
        data-verb-index="9"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#050608]"
      >
        <div className="max-w-5xl mx-auto w-full space-y-12 text-center">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            07 / S'ÉQUIPER &amp; FRÉMIR · RUPTURE DE RYTHME
          </div>

          <div className="space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase">S'ÉQUIPER</span>
            <h2 className="text-6xl sm:text-8xl font-display font-black uppercase text-white tracking-tight">
              PRÊT.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-neutral-400 uppercase pt-2">
              <span>kart</span>
              <span>·</span>
              <span>casque</span>
              <span>·</span>
              <span>combinaison</span>
              <span>·</span>
              <span>paddock</span>
              <span>·</span>
              <span>équipements</span>
              <span>·</span>
              <span>piste</span>
            </div>
          </div>

          {/* 5 FEUX DE DÉPART */}
          <div className="py-8 space-y-6">
            <span className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase block">
              FRÉMIR : 1 — 2 — 3 — 4 — 5
            </span>

            {/* Lights Gantry */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 p-4 rounded-2xl bg-black border border-white/15 max-w-xl mx-auto">
              {[1, 2, 3, 4, 5].map((lightNum) => {
                const isRed = lightsCountdown >= lightNum && lightsCountdown < 6;
                const isGreen = lightsCountdown === 6;
                return (
                  <div key={lightNum} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 ${
                        isGreen 
                          ? 'bg-[#00ff66] border-[#00ff66] shadow-[0_0_20px_#00ff66]' 
                          : isRed 
                          ? 'bg-[#ff1e00] border-[#ff1e00] shadow-[0_0_20px_#ff1e00]' 
                          : 'bg-neutral-900 border-white/20'
                      }`}
                    />
                    <span className="font-mono text-[10px] text-neutral-500">{lightNum}</span>
                  </div>
                );
              })}
            </div>

            {/* Launch Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTriggerLights}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-[#ff3b1d] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                {lightsCountdown === 6 ? "FEUX VERTS : GO !" : "ENCLENCHER LES FEUX DE DÉPART"}
              </button>
            </div>

            {lightsCountdown === 6 && (
              <div className="font-display font-black text-6xl sm:text-8xl text-[#00ff66] tracking-tighter uppercase animate-bounce pt-4">
                GO
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 08 — S'ENGAGER / SE DÉPASSER
          ========================================================================= */}
      <section 
        id="page-08" 
        data-page="8" 
        data-verb-index="11"
        className="relative min-h-screen flex flex-col justify-between p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#06070a]"
      >
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/50 tracking-widest uppercase">
          <span>08 / S'ENGAGER &amp; SE DÉPASSER</span>
          <span>PLEINE VITESSE · 120 FPS</span>
        </div>

        <div className="relative z-10 my-auto py-8 space-y-6 max-w-4xl">
          <div className="space-y-1">
            <span className="font-mono text-xs text-neutral-400">S'ENGAGER</span>
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
              ENTRER DANS LA COURSE.
            </h2>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs text-[#ff3b1d]">SE DÉPASSER</span>
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-neutral-300 tracking-tight">
              VISER PLUS HAUT.
            </h2>
          </div>
        </div>

        {/* Action Shot Viewport */}
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
          <div className="aspect-[16/9] w-full relative">
            <img 
              src={STORY_ASSETS.raceAction.src} 
              alt="Course de karts"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#ff3b1d] font-bold uppercase tracking-widest">
                  LA COURSE À L'EXCELLENCE
                </div>
                <div className="text-xs font-mono text-neutral-300 mt-0.5">
                  Point de jonction entre le pilote et le pays.
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs bg-black/80 px-4 py-2 rounded-lg border border-white/10">
                <span className="text-[#00ff66] font-bold">BEST LAP : 52.231s</span>
                <span className="text-white/30">|</span>
                <span>VIT. MAX : 98 KM/H</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 09 — RASSEMBLER
          ========================================================================= */}
      <section 
        id="page-09" 
        data-page="9" 
        data-verb-index="12"
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#08090c]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-12">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500 uppercase">
            <span className="text-[#ff3b1d] font-bold">09 / RASSEMBLER · RALENTISSEMENT</span>
            <span>UN LIEU. DES PUBLICS. UNE EXPÉRIENCE.</span>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-5xl sm:text-7xl font-display font-black uppercase text-white tracking-tight">
              UN LIEU DE VIE.
            </h2>
            <p className="text-sm sm:text-base font-mono text-neutral-400 max-w-xl mx-auto">
              La vitesse s'efface pour révéler le complexe comme carrefour populaire, familial et touristique.
            </p>
          </div>

          {/* Mosaïque des Publics */}
          <div className="p-6 rounded-2xl bg-white/3 border border-white/10 space-y-6">
            <div className="font-mono text-xs text-[#ff3b1d] font-bold uppercase tracking-wider">
              LES PUBLICS ACCUEILLIS :
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono text-xs text-center">
              {['ENFANTS', 'JUNIORS', 'ADULTES', 'BIPLACES', 'FAMILLES', 'AMIS', 'SPECTATEURS'].map((pub) => (
                <div key={pub} className="p-3 rounded-lg bg-black/40 border border-white/5 text-white font-semibold">
                  {pub}
                </div>
              ))}
            </div>

            <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider pt-2 border-t border-white/5">
              LES ESPACES DU SITE :
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
              {['PISTES CIK-FIA', 'RESTAURATION PANORAMIQUE', 'BOUTIQUES & ACCUEIL', 'LOISIRS & SÉMINAIRES', 'DÉCOUVERTE JEUNESSE'].map((esp) => (
                <div key={esp} className="p-3 rounded-lg bg-white/5 border border-white/5 text-neutral-300">
                  {esp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 10 — VIBRER / TRANSMETTRE / S'ÉLEVER
          ========================================================================= */}
      <section 
        id="page-10" 
        data-page="10" 
        data-verb-index="15"
        className="relative min-h-screen flex flex-col justify-between p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#090a0d]"
      >
        <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/50 tracking-widest uppercase">
          <span>10 / LA FINALE ÉMOTIONNELLE</span>
          <span>BOUCLE NARRATIVE &amp; IMPACT</span>
        </div>

        <div className="relative z-10 my-auto py-12 max-w-5xl space-y-12">
          {/* VIBRER */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-neutral-400 uppercase">VIBRER</span>
            <div className="text-3xl sm:text-5xl font-display font-black uppercase text-white">
              Le moteur. Le public. L'enfant.
            </div>
          </div>

          {/* TRANSMETTRE */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#ff3b1d] uppercase font-semibold">TRANSMETTRE</span>
            <div className="text-3xl sm:text-5xl font-display font-black uppercase text-neutral-300">
              Un rêve passe à la génération suivante.
            </div>
          </div>

          {/* S'ÉLEVER */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <span className="font-mono text-xs text-white/50 uppercase">S'ÉLEVER</span>
            <h2 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#ff3b1d] tracking-tighter">
              ENTER THE RACE.
            </h2>
            <div className="font-mono text-xs text-neutral-400">
              La caméra quitte le podium, s'élève au-dessus du littoral, et plonge dans l'impact graphique.
            </div>
          </div>
        </div>

        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/15 bg-black/60">
          <div className="aspect-[21/9] w-full relative">
            <img 
              src={STORY_ASSETS.finalCelebration.src} 
              alt="Le triomphe sur la plage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-85"
            />
            <div className="absolute bottom-4 left-6 font-mono text-xs text-white/70">
              FINALE CINÉMATOGRAPHIQUE · LE BÉNIN S'ÉLÈVE
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 11 — LE FILM EN UN COUP D'ŒIL (LE CIRCUIT VU DU DESSUS)
          ========================================================================= */}
      <section 
        id="page-11" 
        data-page="11" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#07080a]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="flex items-center justify-between font-mono text-xs text-white/50 uppercase">
            <span className="text-[#ff3b1d] font-bold">11 / LE FILM EN UN COUP D'ŒIL</span>
            <span>8 SECTEURS CHRONOMÉTRÉS</span>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
              LE CIRCUIT DU FILM
            </h2>
            <div className="font-mono text-sm text-[#ff3b1d] font-bold">
              2’30 — 3’00 | FILM PRINCIPAL UHD / 4K
            </div>
          </div>

          {/* 8 Secteurs Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {CIRCUIT_SECTORS.map((sec) => (
              <div 
                key={sec.sector}
                className="p-4 rounded-xl bg-white/3 border border-white/8 hover:border-[#ff3b1d]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#ff3b1d]/20 text-[#ff3b1d] font-bold">
                    SECTEUR {sec.sector}
                  </span>
                  <span className="text-neutral-500">{sec.timecode}</span>
                </div>
                <div className="font-display font-bold text-sm text-white uppercase mb-1">
                  {sec.name}
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 12 — COMMENT NOUS DONNONS VIE AU FUTUR (3 ÉCRANS)
          ========================================================================= */}
      <section 
        id="page-12" 
        data-page="12" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#090a0d]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            12 / COMMENT NOUS DONNONS VIE AU FUTUR
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
            DONNÉES → CRÉATION → FILM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {PRODUCTION_PIPELINE.map((pipe) => (
              <div key={pipe.screen} className="p-6 rounded-2xl bg-black border border-white/12 space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>ÉCRAN {pipe.screen}</span>
                  <Monitor className="w-4 h-4 text-[#ff3b1d]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase">
                  {pipe.title}
                </h3>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {pipe.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1d]" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 13 — L'EXPÉRIENCE VISUELLE (6 CADRANS)
          ========================================================================= */}
      <section 
        id="page-13" 
        data-page="13" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#07080a]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            13 / L'EXPÉRIENCE VISUELLE
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
            6 CADRANS D'EXCELLENCE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISUAL_EXPERIENCE_DIALS.map((dial) => (
              <div key={dial.code} className="p-5 rounded-xl bg-white/3 border border-white/8 space-y-2">
                <div className="font-mono text-xs text-[#ff3b1d] font-bold tracking-wider">
                  {dial.code}
                </div>
                <div className="font-display font-bold text-lg text-white">
                  {dial.detail}
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {dial.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 14 — LE PARCOURS DE PRODUCTION (CHRONOMÈTRE 6-8 SEMAINES)
          ========================================================================= */}
      <section 
        id="page-14" 
        data-page="14" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#090a0d]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="flex items-center justify-between font-mono text-xs text-white/50 uppercase">
            <span className="text-[#ff3b1d] font-bold">14 / LE PARCOURS DE PRODUCTION</span>
            <span>PISTE EN VUE AÉRIENNE</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-6xl font-display font-black uppercase text-white tracking-tight">
              CALENDRIER DE COURSE
            </h2>
            <div className="p-4 rounded-xl bg-black border border-white/15 font-mono text-center">
              <span className="text-[10px] text-neutral-400 uppercase block">DURÉE TOTALE</span>
              <span className="text-3xl font-display font-black text-[#ff3b1d]">6–8 SEMAINES</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {PRODUCTION_TIMELINE.map((time) => (
              <div key={time.step} className="p-4 rounded-xl bg-white/3 border border-white/8">
                <div className="text-[#ff3b1d] font-bold text-sm mb-1">{time.step}</div>
                <div className="text-white font-bold text-base font-display mb-1">{time.title}</div>
                <p className="text-neutral-400 font-sans text-xs">{time.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 15 — L'ÉCRAN DE COURSE : LES LIVRABLES
          ========================================================================= */}
      <section 
        id="page-15" 
        data-page="15" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 border-b border-white/8 bg-[#07080a]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="font-mono text-xs text-[#ff3b1d] tracking-widest uppercase">
            15 / L'ÉCRAN DE COURSE · LES LIVRABLES
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Screen */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-black border border-white/15 space-y-4">
              <div className="text-xs font-mono text-[#ff3b1d] font-bold tracking-widest uppercase">
                ÉCRAN PRINCIPAL
              </div>
              <h3 className="text-4xl sm:text-5xl font-display font-black text-white uppercase">
                FILM PRINCIPAL
              </h3>
              <div className="font-mono text-2xl text-neutral-300 font-bold">
                02:30 — 03:00
              </div>
              <div className="font-mono text-sm text-neutral-400">
                16:9 · UHD / 4K
              </div>
              <div className="pt-4 border-t border-white/10 font-mono text-xs text-neutral-400 uppercase tracking-widest">
                COMMERCIALISATION · PARTENAIRES · WEB · ÉVÉNEMENTS · INSTITUTIONNEL
              </div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/3 border border-white/10 space-y-4 font-mono text-xs">
              <div className="text-neutral-400 font-bold uppercase tracking-wider">
                CLASSEMENT DES FORMATS :
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded bg-white/5 text-white flex justify-between">
                  <span>01 — FILM PRINCIPAL</span>
                  <span className="text-[#00ff66]">INCLUS</span>
                </div>
                <div className="p-3 rounded bg-white/5 text-neutral-300 flex justify-between">
                  <span>02 — TEASER 30" (16:9)</span>
                  <span className="text-[#ff3b1d]">PACK DIGITAL</span>
                </div>
                <div className="p-3 rounded bg-white/5 text-neutral-300 flex justify-between">
                  <span>03 — 3 × VERTICAL 15" (9:16)</span>
                  <span className="text-[#ff3b1d]">PACK DIGITAL</span>
                </div>
                <div className="p-3 rounded bg-white/5 text-neutral-300 flex justify-between">
                  <span>04 — 3 × DÉCLINAISONS</span>
                  <span className="text-[#ff3b1d]">PACK DIGITAL</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-neutral-500">
                Option Pack Digital : 1 500 000 FCFA HT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 16 — LE TABLEAU DE BORD FINANCIER
          ========================================================================= */}
      <section 
        id="page-16" 
        data-page="16" 
        className="relative min-h-screen flex flex-col justify-center p-6 sm:p-16 lg:p-24 bg-[#050608]"
      >
        <div className="max-w-6xl mx-auto w-full space-y-10">
          <div className="flex items-center justify-between font-mono text-xs text-white/50 uppercase">
            <span className="text-[#ff3b1d] font-bold">16 / TABLEAU DE BORD FINANCIER</span>
            <span>TÉLÉMÉTRIE BUDGET</span>
          </div>

          {/* Grand Écran Central */}
          <div className="p-8 rounded-2xl bg-black border border-white/20 text-center space-y-4 shadow-2xl">
            <div className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
              PROPOSITION TOTALE DU FILM (BASE 4K UHD)
            </div>
            <div className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight">
              8 500 000 <span className="text-2xl sm:text-4xl text-[#ff3b1d]">FCFA HT</span>
            </div>
          </div>

          {/* 10 Modules */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            {BUDGET_TELEMETRY.map((mod) => (
              <div key={mod.item} className="p-3.5 rounded-xl bg-white/3 border border-white/8 space-y-1">
                <div className="text-neutral-400 text-[10px] truncate">{mod.item}</div>
                <div className="text-white font-bold text-sm">
                  {mod.amount.toLocaleString('fr-FR')} F
                </div>
              </div>
            ))}
          </div>

          {/* 3 Voyants Pit-Stop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#ff3b1d]/20 text-[#ff3b1d] font-bold text-base">40 %</span>
              <span className="text-neutral-300">À LA COMMANDE</span>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#ff3b1d]/20 text-[#ff3b1d] font-bold text-base">40 %</span>
              <span className="text-neutral-300">STORYBOARD VALIDÉ</span>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#00ff66]/20 text-[#00ff66] font-bold text-base">20 %</span>
              <span className="text-neutral-300">LIVRAISON DU MASTER FINAL</span>
            </div>
          </div>

          {/* Signature Finale */}
          <div className="text-center pt-8 border-t border-white/10">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#ff3b1d] uppercase tracking-widest">
              ENTER THE RACE
            </div>
            <div className="text-xs font-mono text-neutral-500 mt-2">
              AFRIKAFUN PRODUCTION · PROJET KARTING BÉNIN · KOFFI &amp; DIABATÉ
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
