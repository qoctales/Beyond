import React, { useState } from 'react';
import { Volume2, VolumeX, FileText, Play } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  onOpenPdf: () => void;
  onOpenTeaser: () => void;
  onOpenAssets: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPdf, onOpenTeaser, onOpenAssets }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isAmbientOn, setIsAmbientOn] = useState(sound.isAmbientActive());

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleAmbient = () => {
    const active = sound.toggleAmbient();
    setIsAmbientOn(active);
    sound.playUiClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090c]/90 backdrop-blur-md border-b border-white/8 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-3 group text-white tracking-wider">
          <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-[#ff3b1d] transition-colors">
            AFRIKAFUN
          </span>
          <span className="text-white/30 font-light">/</span>
          <span className="font-sans text-xs tracking-widest text-neutral-400 uppercase font-medium">
            KOFFI &amp; DIABATÉ
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <a href="#le-reve" className="hover:text-white transition-colors">
            01. Le Rêve
          </a>
          <a href="#le-circuit" className="hover:text-white transition-colors">
            03. Le Circuit
          </a>
          <a href="#lexperience" className="hover:text-white transition-colors">
            04. L'Expérience
          </a>
          <a href="#lights-out" className="hover:text-white transition-colors">
            05. Lights Out
          </a>
          <a href="#approche" className="hover:text-white transition-colors">
            08. Approche
          </a>
          <a href="#budget" className="hover:text-white transition-colors">
            10. Budget
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
            title={isMuted ? "Activer le son" : "Couper le son"}
            aria-label="Contrôle audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#ff3b1d]" />}
            <span className="hidden sm:inline text-[11px]">{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeaser}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-white bg-white/10 hover:bg-white/15 rounded border border-white/15 transition-all whitespace-nowrap"
          >
            <Play className="w-3 h-3 fill-current text-[#ff3b1d]" />
            <span>TEASER 30"</span>
          </button>

          <button
            type="button"
            onClick={onOpenPdf}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-[#ff3b1d] hover:bg-[#e03014] rounded transition-all shadow-lg shadow-[#ff3b1d]/20 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Proposition PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
