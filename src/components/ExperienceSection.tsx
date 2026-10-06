import React, { useState } from 'react';
import { UserCheck, Shield, Award, Users, ChevronRight, Check } from 'lucide-react';
import { PROPOSAL_DATA } from '../data/proposalData';
import { sound } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("adultes");
  const categories = PROPOSAL_DATA.kartCategories;
  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];
  const journey = PROPOSAL_DATA.customerJourney;

  return (
    <section id="lexperience" className="relative py-28 bg-[#0a0b0e] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              04 / DIVERSIFICATION &amp; FLUX CLIENTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              ENTRER DANS L'EXPÉRIENCE
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              SÉQUENCE 03 · 0:55 — 1:20
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              4 CATÉGORIES OFFICIELLES
            </span>
          </div>
        </div>

        {/* Narrative Intro */}
        <div className="max-w-3xl mb-14">
          <p className="text-xl sm:text-2xl font-display text-white font-medium">
            « Plus qu'une piste, une destination sportive et familiale pour tout le Bénin. »
          </p>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Chaque catégorie de public dispose d'un matériel adapté et d'un encadrement rigoureux pour concilier sécurité sans faille et plaisir de la vitesse pure.
          </p>
        </div>

        {/* Category Tabs & Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Tab selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    sound.playUiClick();
                  }}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#141620] border-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/10'
                      : 'bg-white/3 border-white/8 text-neutral-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-lg tracking-wider uppercase text-white">
                      {cat.name}
                    </span>
                    <span className="text-xs font-mono text-[#ff3b1d]">{cat.age}</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Category Card */}
          <div className="lg:col-span-8 bg-[#11131a] rounded-2xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff3b1d]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#ff3b1d] uppercase font-semibold">
                    MATÉRIEL HOMOLOGUÉ
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase mt-1">
                    KART {currentCat.name}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
                  Âge recommandé : {currentCat.age}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Description &amp; Ergonomie
                  </h4>
                  <p className="text-base text-neutral-200 leading-relaxed">
                    {currentCat.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Objectif d'expérience &amp; Pédagogie
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {currentCat.focus}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/8 font-mono text-xs text-neutral-300 flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#ff3b1d] shrink-0" />
                  <span>
                    <strong className="text-white">Configuration technique : </strong>
                    {currentCat.specs}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>SÉCURITÉ : NORME CIK-FIA / FFSA KARTING</span>
              <span className="text-[#ff3b1d]">INTÉGRÉ DANS LE SCÉNARIO DU FILM</span>
            </div>
          </div>
        </div>

        {/* Parcours Client : 5 étapes clés */}
        <div className="pt-12 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#ff3b1d] uppercase tracking-wider font-semibold">
              FLUX DES VISITEURS &amp; PROTOCOLE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
              LE PARCOURS CLIENT EN 5 ÉTAPES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {journey.map((item, idx) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-white/3 border border-white/8 relative group hover:border-[#ff3b1d]/40 transition-colors"
              >
                <div className="font-mono text-xs text-[#ff3b1d] mb-3 flex items-center justify-between">
                  <span>ÉTAPE {item.step}</span>
                  {idx < journey.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 hidden lg:block" />
                  )}
                </div>
                <h4 className="font-display font-bold text-base text-white uppercase mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
