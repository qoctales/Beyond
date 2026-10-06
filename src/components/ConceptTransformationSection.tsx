import React, { useState } from 'react';
import { Layers, Compass, Cpu, Building2, Eye, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { sound } from '../utils/audio';

export const ConceptTransformationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'relay' | 'diorama'>('relay');
  const relayAsset = STORY_ASSETS.architectRelay;
  const dioramaAsset = STORY_ASSETS.architectDiorama;

  const currentAsset = activeTab === 'relay' ? relayAsset : dioramaAsset;

  return (
    <section id="le-reve-prend-forme" className="relative py-28 bg-[#0b0c10] border-t border-white/8 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              02 / LE RELAIS CRÉATIF &amp; LA TRANSFORMATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              LE RÊVE PREND FORME
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              {currentAsset.shotNumber} · {currentAsset.timecode}
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              DU RÊVE D'ENFANT À L'INGÉNIERIE ARCHITECTURALE
            </span>
          </div>
        </div>

        {/* Narrative Connection Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-2xl sm:text-3xl font-display text-white font-medium leading-snug">
              « L'enfant a le rêve. <br />
              <span className="text-[#ff3b1d]">L'architecte sait comment lui donner vie. »</span>
            </p>
            <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
              L'enfant court dans la rue avec son kart artisanal et s'arrête devant un édifice contemporain. 
              Au sommet de la tour, la conceptrice de <strong className="text-white">Koffi &amp; Diabaté</strong> le regarde depuis la baie vitrée. 
              Elle comprend que ce futur complexe ne doit pas être une simple piste : il doit accueillir aussi bien l'initiation des plus jeunes que les familles béninoises et l'exigence des pilotes internationaux.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('relay');
                  sound.playUiClick();
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'relay'
                    ? 'bg-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>1. Le Relais &amp; La Fenêtre</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('diorama');
                  sound.playUiClick();
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'diorama'
                    ? 'bg-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>2. La Maquette Diorama 3D</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/3 border border-white/5 font-mono text-xs text-neutral-300">
              {activeTab === 'relay' ? (
                <div>
                  <strong className="text-white block mb-1">Le passage de témoin :</strong>
                  Le regard croisé scelle la rencontre entre l'imagination spontanée de l'enfant et la rigueur du bureau d'architecture.
                </div>
              ) : (
                <div>
                  <strong className="text-white block mb-1">La prévisualisation physique :</strong>
                  L'architecte place délicatement le kart #7 sur le diorama miniature, reliant les plans Revit à la future réalité de terrain.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Showcase Card with CAD & Narrative Overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e1017] shadow-2xl">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={currentAsset.src}
              alt={currentAsset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700 brightness-[0.88] contrast-[1.08]"
            />
            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-black/30 pointer-events-none" />

            {/* Vector circuit wireframe overlay if in diorama mode */}
            {activeTab === 'diorama' && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                viewBox="0 0 1000 560"
                fill="none"
              >
                <path
                  d="M 120 400 L 800 400 C 860 400 900 360 880 300 C 860 240 800 260 740 220 C 690 180 700 110 630 90 C 560 70 500 130 440 130 C 380 130 340 70 260 100 C 190 130 170 210 240 250 C 300 290 250 350 190 360 Z"
                  stroke="#ff3b1d"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>
            )}

            {/* In-Image Caption Pill */}
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-xs font-mono">
              <span className="text-[#ff3b1d] font-bold block">{currentAsset.title}</span>
              <span className="text-neutral-300">{currentAsset.caption}</span>
            </div>

            {/* Bottom Technical Indicators */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80 bg-black/75 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="flex items-center gap-4">
                <span>INTÉGRATION : REVIT / DWG KOFFI &amp; DIABATÉ</span>
                <span className="text-white/20 hidden md:inline">|</span>
                <span className="hidden md:inline">ÉCHELLE MAQUETTE : 1:100</span>
              </div>
              <div className="text-[#ff3b1d] font-bold">
                KART #07 EN SITUATION
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
