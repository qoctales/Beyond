import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Wind, Zap, Sliders, X, Radio, Info } from 'lucide-react';
import { audioSystem, AudioMixerState, AUDIO_FILE_PATHS } from '../utils/audioSystem';

interface AudioMixerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioMixerDrawer: React.FC<AudioMixerDrawerProps> = ({ isOpen, onClose }) => {
  const [state, setState] = useState<AudioMixerState>(audioSystem.getState());
  const [showFileGuide, setShowFileGuide] = useState(false);

  useEffect(() => {
    return audioSystem.subscribe((newState) => {
      setState(newState);
    });
  }, []);

  if (!isOpen) return null;

  const sectionLabels: Record<string, { title: string; desc: string }> = {
    "01_reve": { title: "01 — LE RÊVE", desc: "Vent léger, terre, roulement du kart artisanal en bois" },
    "02_forme": { title: "02 — LE RÊVE PREND FORME", desc: "Crayon sur papier, clics d'atelier, musique naissante" },
    "03_circuit": { title: "03 — LE CIRCUIT PREND VIE", desc: "Basse progressive, résonance de construction, énergie" },
    "04_experience": { title: "04 — L'EXPÉRIENCE", desc: "Ambiance de lieu, échanges, moteur en arrière-plan" },
    "05_lights_out": { title: "05 — LIGHTS OUT", desc: "Tension, battement sourd, moteur au ralenti, 5 feux" },
    "06_race": { title: "06 — ENTER THE RACE", desc: "Explosion des moteurs, Doppler, vitesse, dépassements" },
    "07_realite": { title: "07 — LE RÊVE DEVIENT RÉALITÉ", desc: "Retour au calme, souffle marin, boucle narrative" },
  };

  const currentInfo = sectionLabels[state.currentSection] || {
    title: "ATMOSPHÈRE CINÉMATIQUE",
    desc: "Progression sonore continue synchronisée au scroll",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1017] rounded-2xl border border-white/15 p-6 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ff3b1d]/10 text-[#ff3b1d]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#ff3b1d] uppercase font-bold">
                CONSOLE AUDIO CINÉMATIQUE
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">
                MIXAGE &amp; AMBIANCES SONORES
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Sound On/Off Button */}
        <div className="mb-6 p-4 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {state.isMuted ? (
              <div className="p-2 rounded-full bg-neutral-800 text-neutral-400">
                <VolumeX className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-[#ff3b1d] text-white animate-pulse">
                <Volume2 className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="font-display font-bold text-sm text-white">
                {state.isMuted ? "SON DÉSACTIVÉ" : "EXPÉRIENCE SONORE ACTIVE"}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {state.isMuted
                  ? "Cliquez pour activer la bande-son narrative synchronisée"
                  : "Le paysage sonore s'adapte automatiquement à votre lecture"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => audioSystem.toggleSound()}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all ${
              state.isMuted
                ? 'bg-[#ff3b1d] hover:bg-[#e03014] text-white shadow-lg shadow-[#ff3b1d]/20'
                : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
            }`}
          >
            {state.isMuted ? "SOUND ON" : "SOUND OFF"}
          </button>
        </div>

        {/* Current narrative track card */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#141722] border border-[#ff3b1d]/30 flex items-start gap-3">
          <Radio className="w-4 h-4 text-[#ff3b1d] shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs">
            <span className="font-mono text-[#ff3b1d] uppercase font-bold tracking-wider">
              {currentInfo.title}
            </span>
            <p className="text-neutral-300 mt-0.5 leading-relaxed">
              {currentInfo.desc}
            </p>
          </div>
        </div>

        {/* 3 Independent Volume Sliders */}
        <div className="space-y-4 mb-6">
          {/* Musique */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/8">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-2 text-neutral-300">
                <Music className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>VOLUME MUSIQUE ORIGINALE</span>
              </span>
              <span className="text-white font-semibold">
                {Math.round(state.musicVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.musicVolume}
              onChange={(e) => audioSystem.setMusicVolume(parseFloat(e.target.value))}
              disabled={state.isMuted}
              className="w-full accent-[#ff3b1d] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
            />
          </div>

          {/* Ambiances */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/8">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-2 text-neutral-300">
                <Wind className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>VOLUME AMBIANCES (VENT, LIEU, TERRE)</span>
              </span>
              <span className="text-white font-semibold">
                {Math.round(state.ambienceVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.ambienceVolume}
              onChange={(e) => audioSystem.setAmbienceVolume(parseFloat(e.target.value))}
              disabled={state.isMuted}
              className="w-full accent-[#ff3b1d] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
            />
          </div>

          {/* SFX / Bruitages */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/8">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-2 text-neutral-300">
                <Zap className="w-3.5 h-3.5 text-[#ff3b1d]" />
                <span>VOLUME EFFETS SPÉCIAUX (MOTEURS, FEUX, PNEUS)</span>
              </span>
              <span className="text-white font-semibold">
                {Math.round(state.sfxVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.sfxVolume}
              onChange={(e) => audioSystem.setSfxVolume(parseFloat(e.target.value))}
              disabled={state.isMuted}
              className="w-full accent-[#ff3b1d] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
            />
          </div>
        </div>

        {/* Audio Files Architecture Toggle */}
        <div className="pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowFileGuide(!showFileGuide)}
            className="flex items-center justify-between w-full text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#ff3b1d]" />
              <span>Arborescence des fichiers audio définitifs</span>
            </span>
            <span className="text-neutral-500 font-bold">{showFileGuide ? "−" : "+"}</span>
          </button>

          {showFileGuide && (
            <div className="mt-3 p-3 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-neutral-300 space-y-1.5 max-h-40 overflow-y-auto">
              {Object.entries(AUDIO_FILE_PATHS).map(([key, p]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-neutral-400">{key}:</span>
                  <span className="text-[#ff3b1d]">{p}</span>
                </div>
              ))}
              <div className="pt-2 text-[10px] text-neutral-400 italic">
                Déposez vos fichiers MP3 dans /public/assets/audio/ pour basculer sur les masters studio.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
