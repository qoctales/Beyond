import React, { useState } from 'react';
import { Film, Clock, Monitor, RefreshCw, Volume2, CheckCircle, ChevronRight } from 'lucide-react';
import { PROPOSAL_DATA } from '../data/proposalData';
import { sound } from '../utils/audio';

export const FilmSpecsSection: React.FC = () => {
  const sequences = PROPOSAL_DATA.filmSequences;
  const deliverable = PROPOSAL_DATA.deliverable;
  const [selectedSeqIndex, setSelectedSeqIndex] = useState<number>(0);
  const selectedSeq = sequences[selectedSeqIndex];

  return (
    <section id="le-film" className="relative py-28 bg-[#08090c] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              09 / LIVRABLE PRINCIPAL &amp; STORYBOARD
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              LE FILM DE PRÉSENTATION
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              FORMAT CINÉMA : 16:9 — UHD / 4K
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              DURÉE CIBLE : 2’30 À 3’00
            </span>
          </div>
        </div>

        {/* Specs Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-4 rounded-xl bg-white/4 border border-white/8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>DURÉE CIBLE</span>
            </div>
            <div className="font-display font-black text-xl text-white">2’30 — 3’00</div>
            <div className="text-xs text-neutral-400 mt-0.5">Rythme narratif millimétré</div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] mb-1">
              <Monitor className="w-3.5 h-3.5" />
              <span>RÉSOLUTION</span>
            </div>
            <div className="font-display font-black text-xl text-white">UHD / 4K</div>
            <div className="text-xs text-neutral-400 mt-0.5">Master 3840 × 2160 pixels</div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>FORMAT IMAGE</span>
            </div>
            <div className="font-display font-black text-xl text-white">16:9 NATIVE</div>
            <div className="text-xs text-neutral-400 mt-0.5">Optique cinéma &amp; grand écran</div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff3b1d] mb-1">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>CORRECTIONS</span>
            </div>
            <div className="font-display font-black text-xl text-white">2 PHASES</div>
            <div className="text-xs text-neutral-400 mt-0.5">Incluses après livraison V1</div>
          </div>
        </div>

        {/* Interactive Storyboard Timeline */}
        <div className="mb-14">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>DÉCOUPAGE CHRONOLOGIQUE DES 8 SÉQUENCES</span>
            <span className="text-[#ff3b1d]">Sélectionnez une séquence pour explorer</span>
          </div>

          {/* Timeline Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
            {sequences.map((seq, idx) => {
              const isSelected = selectedSeqIndex === idx;
              return (
                <button
                  key={seq.number}
                  type="button"
                  onClick={() => {
                    setSelectedSeqIndex(idx);
                    sound.playUiClick();
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-[#151722] border-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/20'
                      : 'bg-white/3 border-white/8 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#ff3b1d] block">
                    0{idx + 1}
                  </span>
                  <div className="font-display font-bold text-xs uppercase truncate text-white">
                    {seq.title}
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 block mt-0.5">
                    {seq.timecode}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sequence Detail Inspector Card */}
          <div className="p-8 rounded-2xl bg-[#0f1118] border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-widest">
                  {selectedSeq.number} · TIMECODE : {selectedSeq.timecode}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                  {selectedSeq.title}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/8 max-w-md text-xs font-mono text-neutral-300 flex items-start gap-2.5">
                <Volume2 className="w-4 h-4 text-[#ff3b1d] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">Ambiance sonore :</span>
                  <span>{selectedSeq.audioAtmosphere}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Déroulé scénaristique
                </h4>
                <p className="text-base text-neutral-200 leading-relaxed">
                  {selectedSeq.description}
                </p>
              </div>

              <div className="lg:col-span-4">
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Éléments visuels majeurs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeq.visualElements.map((elem) => (
                    <span
                      key={elem}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usages prévus du film */}
        <div className="p-6 rounded-2xl bg-white/3 border border-white/8">
          <div className="text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-wider mb-3">
            DESTINATIONS COMMERCIALES DU FILM PRINCIPAL
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deliverable.purposes.map((p) => (
              <div key={p} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
