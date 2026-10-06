import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Shield, Activity } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { audioSystem } from '../utils/audioSystem';

interface TeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeaserModal: React.FC<TeaserModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const totalDuration = 30; // 30 seconds teaser

  // Dynamic visual cuts across the 30 seconds
  const cuts = [
    { start: 0, end: 5, asset: STORY_ASSETS.dreamHero, title: "L'ORIGINE DU RÊVE", audio: "01_reve" },
    { start: 5, end: 11, asset: STORY_ASSETS.architectRelay, title: "LE RELAIS ARCHITECTURAL", audio: "02_forme" },
    { start: 11, end: 17, asset: STORY_ASSETS.circuitMasterNight, title: "LE COMPLEXE NOCTURNE RÉALISTE", audio: "03_circuit" },
    { start: 17, end: 21, asset: STORY_ASSETS.lightsOut, title: "LIGHTS OUT · TENSION", audio: "05_lights_out" },
    { start: 21, end: 27, asset: STORY_ASSETS.raceAction, title: "PLEINE VITESSE · SPRINT", audio: "06_race" },
    { start: 27, end: 30, asset: STORY_ASSETS.finalCelebration, title: "LE PODIUM SUR LA PLAGE", audio: "07_realite" },
  ];

  const activeCut = cuts.find((c) => currentSec >= c.start && currentSec < c.end) || cuts[0];

  useEffect(() => {
    let interval: number | null = null;
    if (isOpen && isPlaying) {
      interval = window.setInterval(() => {
        setCurrentSec((prev) => {
          if (prev >= totalDuration - 0.5) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isPlaying]);

  // Audio sync when cut changes
  useEffect(() => {
    if (isOpen && isPlaying) {
      audioSystem.updateSectionSound(activeCut.audio);
    }
  }, [activeCut.audio, isOpen, isPlaying]);

  if (!isOpen) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentSec(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg">
      <div className="relative w-full max-w-5xl bg-[#090a0f] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="p-4 bg-black/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b1d] animate-ping" />
            <span className="font-mono text-xs text-[#ff3b1d] uppercase font-bold tracking-widest">
              TEASER OFFICIEL 30" (16:9 UHD)
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-xs font-mono text-white/80 hidden sm:inline">
              AFRIKAFUN × KOFFI &amp; DIABATÉ
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Video Simulator Frame */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group">
          <img
            src={activeCut.asset.src}
            alt={activeCut.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500 scale-105 brightness-[0.85] contrast-[1.1]"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Dynamic Telemetry HUD */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white/80 pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/15">
              <span className="text-[#ff3b1d] font-bold">{activeCut.title}</span>
            </div>
            <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/15">
              <span>TIMECODE : 00:{currentSec < 10 ? `0${Math.floor(currentSec)}` : Math.floor(currentSec)} / 00:30</span>
            </div>
          </div>

          {/* Center Graphic if near end */}
          {currentSec >= 27 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-center z-10 animate-in fade-in">
              <div className="font-display font-black text-3xl sm:text-6xl text-white uppercase tracking-widest mb-2">
                ENTER THE RACE
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#ff3b1d] uppercase font-bold tracking-widest">
                PROJET KARTING BÉNIN · KOFFI &amp; DIABATÉ
              </div>
            </div>
          )}

          {/* Play/Pause Center Overlay on hover if paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <button
                type="button"
                onClick={togglePlay}
                className="p-5 rounded-full bg-[#ff3b1d] text-white shadow-2xl hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 fill-current text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="p-4 bg-[#0a0b0e] border-t border-white/10 space-y-3">
          {/* Progress bar */}
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div
              className="bg-[#ff3b1d] h-full transition-all duration-300"
              style={{ width: `${(currentSec / totalDuration) * 100}%` }}
            />
          </div>

          {/* Buttons row */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isPlaying ? "Pause" : "Lecture"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Recommencer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-neutral-400">
                00:{currentSec < 10 ? `0${Math.floor(currentSec)}` : Math.floor(currentSec)} / 00:30
              </span>
            </div>

            <div className="text-[#ff3b1d] font-semibold">
              PACK DIGITAL OPTION : 1 500 000 FCFA HT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
