import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, Gauge, Flame, Eye, Volume2 } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { audioSystem } from '../utils/audioSystem';

export const LightsOutSection: React.FC = () => {
  const asset = STORY_ASSETS.lightsOut;
  const [lightsCount, setLightsCount] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isGo, setIsGo] = useState<boolean>(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'holding' | 'waiting_go' | 'go' | 'false_start' | 'finished'>('idle');

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const startSequence = () => {
    // Reset
    setIsStarted(true);
    setLightsCount(0);
    setIsGo(false);
    setReactionTime(null);
    setGameState('holding');

    // Announce lights out section to audio engine
    audioSystem.updateSectionSound("05_lights_out");

    let count = 0;
    const interval = window.setInterval(() => {
      count += 1;
      if (count <= 5) {
        setLightsCount(count);
        audioSystem.playCountdownStep(count);
      } else {
        clearInterval(interval);
        setGameState('waiting_go');
        // Random tension delay between 1.2s and 2.5s before lights out!
        const randomDelay = 1200 + Math.random() * 1300;
        timerRef.current = window.setTimeout(() => {
          setLightsCount(0);
          setIsGo(true);
          setGameState('go');
          startTimeRef.current = performance.now();
          audioSystem.playGreenLightLaunch();
        }, randomDelay);
      }
    }, 1000);
  };

  const handleUserReaction = () => {
    if (gameState === 'holding' || gameState === 'waiting_go') {
      // False start!
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('false_start');
      setIsStarted(false);
      return;
    }

    if (gameState === 'go') {
      const delta = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(delta);
      setGameState('finished');
      audioSystem.playDopplerPassBy();
    }
  };

  const macroShots = [
    { title: "CASQUE", desc: "Coque carbone FIA 8860-2018" },
    { title: "VISIÈRE", desc: "Reflet des 5 feux rouges" },
    { title: "MAIN", desc: "Grip ganté sur le volant alcantara" },
    { title: "VOLANT", desc: "Shift-light & palette d'embrayage" },
    { title: "PIED", desc: "Tension maximale sur le pédalier usiné" },
    { title: "ROUE", desc: "Pneus tendres à température optimale" },
    { title: "FEUX", desc: "La potence officielle s'illumine" },
  ];

  return (
    <section id="lights-out" className="relative py-28 bg-[#06070a] border-t border-white/10 carbon-pattern overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#06070a]/80 to-[#06070a]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              05 / CHANGER DE RYTHME
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
              LIGHTS OUT
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              SÉQUENCE 05 · 1:35 — 1:45
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              TENSION ABSOLUE SUR LA GRILLE
            </span>
          </div>
        </div>

        {/* Cinematic Tension Macro Shot & The 5 Starting Lights */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-12">
          {/* Main Visual */}
          <div className="aspect-[16/9] w-full relative">
            <img
              src={asset.src}
              alt={asset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.7] contrast-[1.2]"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* The 5 Red Lights FIA Potence Overlay */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="bg-[#10121a]/95 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 shadow-2xl flex items-center gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5].map((lightNum) => {
                  const isLit = lightsCount >= lightNum;
                  return (
                    <div key={lightNum} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-7 h-7 sm:w-11 sm:h-11 rounded-full border-2 transition-all duration-150 ${
                          isLit
                            ? 'bg-[#ff2000] border-white shadow-[0_0_25px_#ff2000] scale-105'
                            : isGo
                            ? 'bg-neutral-900 border-white/20 opacity-40'
                            : 'bg-neutral-900 border-neutral-700 opacity-60'
                        }`}
                      />
                      <span className="font-mono text-[10px] text-neutral-500 font-bold">
                        {lightNum}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status Banner */}
              <div className="mt-3">
                {isGo ? (
                  <div className="font-display font-black text-3xl sm:text-5xl text-[#00ff66] tracking-widest animate-bounce drop-shadow-[0_0_20px_#00ff66]">
                    GO !
                  </div>
                ) : gameState === 'waiting_go' ? (
                  <div className="font-mono text-xs text-yellow-400 uppercase tracking-widest animate-pulse">
                    ATTENTION AU NOIR...
                  </div>
                ) : gameState === 'holding' ? (
                  <div className="font-mono text-xs text-[#ff3b1d] uppercase tracking-widest font-semibold">
                    MONTÉE EN RÉGIME ({lightsCount}/5)
                  </div>
                ) : (
                  <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    GRILLE D'ALIGNEMENT
                  </div>
                )}
              </div>
            </div>

            {/* Launch Control Trigger Overlay on Mobile/Desktop */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center w-full px-6">
              {gameState === 'idle' || gameState === 'finished' || gameState === 'false_start' ? (
                <div className="flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={startSequence}
                    className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#ff3b1d] hover:bg-[#e03014] text-white font-display font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-[#ff3b1d]/40 transition-all hover:scale-105"
                  >
                    <Flame className="w-5 h-5" />
                    <span>Lancer la procédure de départ (5 Feux)</span>
                  </button>
                  <p className="text-xs font-mono text-neutral-400">
                    Activez les 5 feux et testez votre temps de réaction à l'extinction
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleUserReaction}
                  className={`px-10 py-5 rounded-2xl font-display font-black text-lg sm:text-xl uppercase tracking-widest shadow-2xl transition-all ${
                    isGo
                      ? 'bg-[#00ff66] text-black hover:scale-110 shadow-[0_0_40px_#00ff66]'
                      : 'bg-[#ff3b1d] text-white hover:bg-[#e03014] animate-pulse'
                  }`}
                >
                  {isGo ? "CLIQUEZ MAINTENANT ! (RÉACTION)" : "RESTEZ EN ATTENTE..."}
                </button>
              )}

              {/* Reaction result feedback */}
              {reactionTime !== null && (
                <div className="mt-4 inline-block px-5 py-2 rounded-lg bg-black/80 border border-[#00ff66] text-center backdrop-blur-md">
                  <span className="text-xs font-mono text-neutral-400 uppercase block">
                    VOTRE TEMPS DE RÉACTION
                  </span>
                  <span className="font-mono font-bold text-2xl text-[#00ff66] tabular-nums">
                    {reactionTime} ms
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    {reactionTime < 250 ? "Niveau Pilote F1 / Compétition !" : "Bon réflexe ! Prêt pour la grille."}
                  </span>
                </div>
              )}

              {gameState === 'false_start' && (
                <div className="mt-4 inline-block px-5 py-2 rounded-lg bg-black/80 border border-red-500 text-center backdrop-blur-md">
                  <span className="font-mono font-bold text-sm text-red-500 uppercase">
                    FAUX DÉPART ! (CLIC AVANT LE VERT)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The 7 Macro Focus Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {macroShots.map((item, idx) => (
            <div
              key={item.title}
              className="p-3.5 rounded-xl bg-white/4 border border-white/8 text-center hover:border-[#ff3b1d]/40 transition-colors"
            >
              <span className="font-mono text-[10px] text-[#ff3b1d] block mb-1">
                SHOT 0{idx + 1}
              </span>
              <div className="font-display font-extrabold text-xs text-white uppercase mb-1">
                {item.title}
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
