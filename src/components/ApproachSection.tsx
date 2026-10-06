import React from 'react';
import { Database, Box, Sparkles, Film, CheckCircle2, MonitorCheck } from 'lucide-react';
import { PROPOSAL_DATA } from '../data/proposalData';

export const ApproachSection: React.FC = () => {
  const pipeline = PROPOSAL_DATA.technicalPipeline.steps;
  const differences = PROPOSAL_DATA.ourDifference;

  const icons = [Database, Box, Sparkles, Film, MonitorCheck];

  return (
    <section id="approche" className="relative py-28 bg-[#0a0b0e] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              08 / MÉTHODOLOGIE TECHNIQUE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              NOTRE APPROCHE HYBRIDE
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              DONNER VIE AVANT LA CONSTRUCTION
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              PIPELINE AFRIKAFUN PRO
            </span>
          </div>
        </div>

        {/* Narrative Context & Constraint transformed into opportunity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
              « Transformer la contrainte du terrassement en avantage stratégique. »
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Le futur karting est actuellement en phase de développement et le site est encore en phase de terrassement. 
              Attendre la fin du chantier pour tourner des images réelles reporterait la commercialisation et la recherche de partenaires de plusieurs mois.
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              AFRIKAFUN transforme cette situation en créant un <strong className="text-white">film de lancement photoréaliste en 4K UHD</strong>. 
              À partir de la maquette Revit et des plans DWG de Koffi &amp; Diabaté, nous projetons les investisseurs et le public dans l'équipement en pleine effervescence.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white/4 border border-white/10">
            <div className="text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-wider mb-2">
              LE RÔLE DE L'INTELLIGENCE ARTIFICIELLE
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              L'IA n'est pas utilisée comme une fin en soi, mais comme un instrument cinématographique de pointe pour générer des scènes impossibles à capturer aujourd'hui :
            </p>
            <ul className="text-xs font-mono text-neutral-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0" />
                <span>Pilotes en combinaison et en situation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0" />
                <span>Karts lancés à pleine vitesse et dépassements</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0" />
                <span>Départs sous haute tension feux rouges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b1d] shrink-0" />
                <span>Tribunes pleines et familles dans les espaces de loisirs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5-Step Pipeline Flow */}
        <div className="mb-20">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6">
            LE PIPELINE DE PRODUCTION EN 5 ÉTAPES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipeline.map((item, idx) => {
              const Icon = icons[idx] || Box;
              return (
                <div
                  key={item.step}
                  className="p-5 rounded-xl bg-[#11131b] border border-white/10 relative group hover:border-[#ff3b1d]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#ff3b1d] font-bold">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[#ff3b1d] transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white uppercase mb-2">
                    {item.label}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notre Différence Cards */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-xs font-mono text-[#ff3b1d] uppercase tracking-wider font-semibold mb-6">
            15 / NOTRE DIFFÉRENCE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {differences.map((diff) => (
              <div
                key={diff.title}
                className="p-4 rounded-xl bg-white/3 border border-white/8 hover:border-white/20 transition-colors"
              >
                <div className="font-display font-black text-sm text-white uppercase mb-1.5">
                  {diff.title}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {diff.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
