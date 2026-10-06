import React, { useState } from 'react';
import { Calendar, Flag, CheckCircle2, ChevronDown, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface WeekStep {
  id: number;
  sectorNum: string;
  weeks: string;
  durationBadge: string;
  title: string;
  phaseName: string;
  description: string;
  deliverables: string[];
  racingNote: string;
  isDamier?: boolean;
}

const CIRCUIT_WEEKS: WeekStep[] = [
  {
    id: 1,
    sectorNum: "01",
    weeks: "Semaines 1 — 2",
    durationBadge: "JALON 1 · START",
    title: "Conception, Revit / DWG & Storyboard",
    phaseName: "DÉPART ARRÊTÉ & FONDATIONS TECHNIQUES",
    description: "Exploitation rigoureuse des données architecturales KOFFI & DIABATÉ (plans DWG, maquettes Revit), écriture scénaristique plan par plan, cadrages et validation du storyboard complet.",
    deliverables: ["Analyse technique Revit/DWG", "Note d'intention validée", "Storyboard & prévisualisation"],
    racingNote: "Les feux s'allument : calage technique au millimètre avant d'entrer en piste."
  },
  {
    id: 2,
    sectorNum: "02",
    weeks: "Semaines 3 — 5",
    durationBadge: "JALON 2 · PLEIN GAZ",
    title: "Environnements 3D & Production IA Photoréaliste",
    phaseName: "MODÉLISATION GÉOMÉTRIQUE & GÉNÉRATIONS HAUTE FIDÉLITÉ",
    description: "Modélisation des environnements du complexe et de la piste, intégration des volumes BIM, génération IA des séquences impossibles à tourner sur site nu (pilotes, karts en course, tension du départ).",
    deliverables: ["Scènes 3D calées", "Générations photoréalistes IA", "Animations karts & foule"],
    racingNote: "Accélération maximale : donner corps et vie au circuit avant même le premier coup de pioche."
  },
  {
    id: 3,
    sectorNum: "03",
    weeks: "Semaines 5 — 6",
    durationBadge: "JALON 3 · CHICANE RYTHME",
    title: "Montage, Motion Design & Compositing VFX",
    phaseName: "ASSEMBLAGE CINÉMATOGRAPHIQUE & TÉLÉMÉTRIE VISUELLE",
    description: "Montage plan par plan, synchronisation narrative, incrustation des données de chronométrage, habillage graphique aux codes du motorsport et compositing VFX des lumières et de la poussière.",
    deliverables: ["Premier montage assemblé (Ours)", "Habillage motion design", "Incrustations télémétriques"],
    racingNote: "Le montage se resserre : chaque seconde de film est étalonnée pour maintenir la tension."
  },
  {
    id: 4,
    sectorNum: "04",
    weeks: "Semaine 7",
    durationBadge: "JALON 4 · STAND AUDIO",
    title: "Musique Originale, Sound Design & Première Version",
    phaseName: "IMMERSION SONORE & LIVRAISON V1 OFFICIELLE",
    description: "Composition de la bande originale, design sonore mécanique haute fidélité (vrombissement 4T, crissement des pneus, souffle du vent marin), mixage spatialisé et présentation de la Version 1.",
    deliverables: ["Film complet V1 (Image & Son)", "Ouverture cycle correction 1", "Session d'écoute client"],
    racingNote: "L'émotion monte : le moteur rugit dans les casques et transporte le spectateur en piste."
  },
  {
    id: 5,
    sectorNum: "05",
    weeks: "Semaine 8",
    durationBadge: "JALON 5 · DAMIER FINAL 🏁",
    title: "Étalonnage 4K, Retours & Livraison Master Final",
    phaseName: "LIGNE D'ARRIVÉE AU DAMIER & MASTERS UHD/4K",
    description: "Intégration du second cycle de retours clients, étalonnage couleur cinéma (teintes chaudes du littoral et contrastes racing), exports des masters 4K UHD définitifs et des déclinaisons.",
    deliverables: ["Master 4K UHD définitif 16:9", "Fichiers de projection & diffusion", "Archives et exports haute résolution"],
    racingNote: "Drapeau à damier levé : mission accomplie et livraison du film d'exception pour KOFFI & DIABATÉ.",
    isDamier: true
  }
];

export const VerticalCircuitCalendar: React.FC = () => {
  const [selectedWeekId, setSelectedWeekId] = useState<number>(1);

  const handleSelectWeek = (id: number) => {
    sound.playUiClick();
    setSelectedWeekId(id);
  };

  return (
    <div className="rounded-2xl bg-[#0b0d13] border border-white/15 p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header of the Vertical Circuit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-[#ff1e00] text-white font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <span>⏱️</span>
              <span>CALENDRIER VERTICAL</span>
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
              SECTION 4 · PLANNING D'EXÉCUTION
            </span>
          </div>
          <h4 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
            LE CIRCUIT DES SEMAINES : 6 À 8 SEMAINES DE COURSE
          </h4>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/4 px-3 py-1.5 rounded-lg border border-white/10 shrink-0">
          <Calendar className="w-4 h-4 text-[#ff1e00]" />
          <span>NAVIGATION AU FIL DES SEMAINES</span>
        </div>
      </div>

      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
        Le calendrier est conçu comme un <strong>circuit vertical par étapes</strong> : de la ligne de départ (exploitation des maquettes Revit/DWG) jusqu'à la ligne d'arrivée au damier (livraison du master 4K UHD). Cliquez sur chaque virage de semaine pour découvrir son programme d'action et ses livrables contractuels.
      </p>

      {/* Main Vertical Track + Week Station Cards */}
      <div className="relative pl-6 sm:pl-10 space-y-5 pt-2">
        
        {/* Continuous Vertical Racing Asphalt Line with Curb Stripes */}
        <div className="absolute left-2.5 sm:left-4 top-2 bottom-4 w-2 bg-neutral-900 border-x border-white/15 rounded-full overflow-hidden">
          {/* Alternating Red and White racing kerb hashes */}
          <div className="w-full h-full flex flex-col">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-3 w-full ${i % 2 === 0 ? 'bg-[#ff1e00]' : 'bg-white'}`} 
              />
            ))}
          </div>
        </div>

        {/* Dynamic Kart Position indicator that follows selected week */}
        {CIRCUIT_WEEKS.map((step) => {
          const isSelected = selectedWeekId === step.id;

          return (
            <div 
              key={step.id}
              onClick={() => handleSelectWeek(step.id)}
              className={`relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-[#121520] border-[#ff1e00] shadow-[0_0_25px_rgba(255,30,0,0.25)] translate-x-1 sm:translate-x-2'
                  : 'bg-white/3 border-white/8 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {/* Checkpoint Node placed exactly on the vertical racing track line */}
              <div 
                className={`absolute -left-[27px] sm:-left-[39px] top-5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-mono font-black text-xs z-10 transition-transform ${
                  isSelected 
                    ? 'scale-125 shadow-[0_0_12px_rgba(255,30,0,0.8)]' 
                    : 'scale-100 hover:scale-110'
                } ${
                  step.isDamier
                    ? 'bg-black border-2 border-white'
                    : isSelected 
                    ? 'bg-[#ff1e00] text-white border-2 border-white' 
                    : 'bg-[#14161f] text-neutral-400 border border-white/20'
                }`}
              >
                {step.isDamier ? (
                  /* Mini 4-square checkered flag */
                  <div className="w-3.5 h-3.5 grid grid-cols-2 grid-rows-2">
                    <div className="bg-white" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-white" />
                  </div>
                ) : (
                  <span>{step.sectorNum}</span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 space-y-3">
                
                {/* Header row of step card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#ff1e00] px-2 py-0.5 rounded bg-[#ff1e00]/10 border border-[#ff1e00]/20">
                      {step.weeks}
                    </span>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      {step.phaseName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      step.isDamier
                        ? 'bg-white text-black font-black'
                        : isSelected
                        ? 'bg-[#ff1e00] text-white'
                        : 'bg-white/5 text-neutral-400'
                    }`}>
                      {step.durationBadge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h5 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight">
                  {step.title}
                </h5>

                {/* Detailed description */}
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {step.description}
                </p>

                {/* Deliverables tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Livrables contractuels de cette étape :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((del, dIdx) => (
                      <span 
                        key={dIdx}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-[#ff1e00]/10 border-[#ff1e00]/30 text-white'
                            : 'bg-white/4 border-white/8 text-neutral-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#ff1e00] shrink-0" />
                        <span>{del}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Racing Note */}
                {isSelected && (
                  <div className="mt-2 p-2.5 rounded-lg bg-black/40 border-l-2 border-[#ff1e00] text-[11px] font-sans text-neutral-300 italic flex items-center justify-between">
                    <span>« {step.racingNote} »</span>
                    <span className="text-[10px] font-mono font-bold text-[#ff1e00] not-italic ml-2 uppercase">
                      Étape active
                    </span>
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};
