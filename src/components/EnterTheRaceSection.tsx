import React, { useState, useEffect } from 'react';
import { Play, Gauge, Zap, Activity, Radio, Flag, RefreshCw } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { audioSystem } from '../utils/audioSystem';

interface EnterTheRaceSectionProps {
  onOpenTeaser: () => void;
}

export const EnterTheRaceSection: React.FC<EnterTheRaceSectionProps> = ({ onOpenTeaser }) => {
  const asset = STORY_ASSETS.raceAction;
  const [speed, setSpeed] = useState<number>(78);
  const [rpm, setRpm] = useState<number>(10400);
  const [sector, setSector] = useState<number>(1);
  const [lapTime, setLapTime] = useState<string>("00:48.312");

  useEffect(() => {
    const interval = setInterval(() => {
      // Dynamic telemetry oscillation
      setSpeed(Math.floor(74 + Math.random() * 18));
      setRpm(Math.floor(9800 + Math.random() * 2200));
      setSector((prev) => (prev % 3) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleSimulatePass = () => {
    audioSystem.playContinuousAccelerationSequence();
    setSpeed(98);
    setRpm(12400);
  };

  return (
    <section id="enter-the-race" className="relative py-28 bg-[#07080b] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              06 / LE CLIMAX AUDIOVISUEL
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
              ENTER THE RACE
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              SÉQUENCE 06 · 1:45 — 2:30
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              RYTHME MAXIMUM &amp; CAMÉRA EMBARQUÉE
            </span>
          </div>
        </div>

        {/* Narrative & Action Headline */}
        <div className="max-w-3xl mb-12">
          <p className="text-xl sm:text-2xl font-display text-white font-medium">
            « Le spectateur doit avoir l'impression d'être assis dans le baquet. »
          </p>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Virages pris à la corde, vibreurs rasés à pleine charge, clameur des tribunes côtières et duel roues contre roues. 
            C'est ici que le film déploie toute sa puissance cinématique et son sound design motorsport.
          </p>
        </div>

        {/* Cinematic Main Action Player Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={asset.src}
              alt={asset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Live Motorsport Telemetry Overlay (HUD) */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
              {/* Telemetry Left */}
              <div className="p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-left font-mono">
                <div className="flex items-center gap-2 text-[10px] text-[#ff3b1d] font-bold uppercase mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>ONBOARD TELEMETRY · KART #07</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-3xl sm:text-4xl text-white tabular-nums">
                    {speed}
                  </span>
                  <span className="text-xs text-neutral-400 font-semibold">KM/H</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-1 flex items-center gap-3">
                  <span>RPM : <strong className="text-white">{rpm}</strong></span>
                  <span>SECTEUR : <strong className="text-[#ff3b1d]">S0{sector}</strong></span>
                </div>
              </div>

              {/* Timing Right */}
              <div className="p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-right font-mono hidden sm:block">
                <div className="text-[10px] text-neutral-400 uppercase">CHRONOMÉTRAGE OFFICIEL</div>
                <div className="font-display font-bold text-xl text-white tabular-nums text-[#00ff66]">
                  {lapTime}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  DELTA : <span className="text-[#00ff66] font-semibold">-0.248s (BEST LAP)</span>
                </div>
              </div>
            </div>

            {/* Center Big Play Button for 30" Teaser */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
              <button
                type="button"
                onClick={onOpenTeaser}
                className="group/btn flex items-center gap-4 px-8 py-5 rounded-2xl bg-[#ff3b1d] hover:bg-[#e03014] text-white font-display font-black text-base sm:text-xl uppercase tracking-wider shadow-2xl shadow-[#ff3b1d]/40 transition-all hover:scale-105"
              >
                <div className="p-2 rounded-full bg-white/20 group-hover/btn:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current text-white" />
                </div>
                <span>WATCH THE 30" TEASER</span>
              </button>
              <p className="text-xs font-mono text-white/80 mt-3 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                Découvrez la simulation audiovisuelle du teaser promotionnel
              </p>
            </div>

            {/* Bottom Bar Audio Action Cue */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white/80 bg-black/75 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-[#ff3b1d] font-bold">DÉPASSEMENT EN SORTIE DU VIRAGE 04</span>
                <span className="text-white/20 hidden md:inline">|</span>
                <span className="text-neutral-300 hidden md:inline">Caméra ras du sol 120 FPS</span>
              </div>

              <button
                type="button"
                onClick={handleSimulatePass}
                className="px-3 py-1.5 bg-[#ff3b1d] hover:bg-[#e03014] text-white rounded text-[11px] font-mono font-bold transition-all shadow-lg shadow-[#ff3b1d]/20"
                title="Déclencher la montée en régime continue (4 rapports)"
              >
                Accélération continue (4 rapports)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
