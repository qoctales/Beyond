import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Download } from 'lucide-react';
import { SIXTEEN_VERBS } from '../data/dossier16PagesData';
import { audioSystem } from '../utils/audioSystem';
import { generateProposalPdf } from '../utils/pdfGenerator';
import { sound } from '../utils/audio';

interface LapTimerProgressProps {
  currentVerbIndex: number;
}

export const LapTimerProgress: React.FC<LapTimerProgressProps> = ({ currentVerbIndex }) => {
  const [audioState, setAudioState] = useState(audioSystem.getState());

  useEffect(() => {
    return audioSystem.subscribe((state) => {
      setAudioState(state);
    });
  }, []);

  const handleToggleAudio = () => {
    audioSystem.toggleSound();
  };

  const handleDownloadPdf = () => {
    sound.playUiClick();
    generateProposalPdf();
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#08090c]/90 backdrop-blur-md border-t border-white/10 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-neutral-400">
        
        {/* Left: Lap Indicator / Dual reading */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b1d] animate-ping" />
            <span>LAP</span>
            <span className="text-[#ff3b1d]">
              {String(Math.min(16, currentVerbIndex + 1)).padStart(2, '0')}/16
            </span>
          </span>

          <span className="text-white/20 hidden md:inline">|</span>
          <span className="text-white hidden lg:inline font-semibold">
            {SIXTEEN_VERBS[Math.min(15, currentVerbIndex)]?.verb}
          </span>
          <span className="text-neutral-500 hidden xl:inline">
            — {SIXTEEN_VERBS[Math.min(15, currentVerbIndex)]?.dual}
          </span>
        </div>

        {/* Center: Minimalist Scroll-Track Ticker of 16 Verbs */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-2xl px-2">
          {SIXTEEN_VERBS.map((item, idx) => {
            const isActive = idx === currentVerbIndex;
            const isPassed = idx < currentVerbIndex;
            return (
              <span
                key={item.num}
                className={`transition-colors whitespace-nowrap cursor-default ${
                  isActive
                    ? 'text-[#ff3b1d] font-bold scale-105'
                    : isPassed
                    ? 'text-white/80'
                    : 'text-white/25'
                }`}
              >
                {item.num} {item.verb}
                {idx < 15 && <span className="text-white/15 ml-2">·</span>}
              </span>
            );
          })}
        </div>

        {/* Right: Sound & PDF controls without cluttering */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              audioState.isMuted
                ? 'hover:text-white text-neutral-500'
                : 'text-[#ff3b1d] font-bold bg-[#ff3b1d]/10'
            }`}
            title="Activer / Couper le son"
          >
            {audioState.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            <span className="hidden md:inline">{audioState.isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <span className="text-white/20">|</span>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-[#ff3b1d] hover:text-white text-neutral-300 font-bold transition-all"
            title="Télécharger la proposition PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">PDF</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
