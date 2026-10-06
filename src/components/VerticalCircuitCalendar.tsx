import React, { useState } from 'react';
import { Flag, CheckCircle2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface WeekStep {
  id: number;
  sectorNum: string;
  weeks: string;
  shortWeeks: string;
  durationBadge: string;
  title: string;
  phaseName: string;
  description: string;
  deliverables: string[];
  racingNote: string;
  isFinish?: boolean;
}

const CIRCUIT_WEEKS: WeekStep[] = [
  {
    id: 1,
    sectorNum: "01",
    weeks: "Semaines 1 — 2",
    shortWeeks: "S 1—2",
    durationBadge: "JALON 1 · DÉPART",
    title: "Conception, Revit / DWG & Storyboard",
    phaseName: "FONDATIONS TECHNIQUES & CADRAGES",
    description: "Exploitation rigoureuse des données architecturales KOFFI & DIABATÉ (plans DWG, maquettes Revit), écriture scénaristique plan par plan et validation du storyboard.",
    deliverables: ["Analyse Revit / DWG", "Note d'intention", "Storyboard validé"],
    racingNote: "Les feux s'allument : calage technique au millimètre avant d'entrer en piste."
  },
  {
    id: 2,
    sectorNum: "02",
    weeks: "Semaines 3 — 5",
    shortWeeks: "S 3—5",
    durationBadge: "JALON 2 · PRODUCTION",
    title: "Environnements 3D & Production IA",
    phaseName: "MODÉLISATION BIM & RENDUS PHOTORÉALISTES",
    description: "Modélisation des environnements du complexe et de la piste, intégration des volumes architecturaux, génération IA haute fidélité des karts en course et des perspectives spectaculaires.",
    deliverables: ["Scènes 3D calées", "Rendus photoréalistes IA", "Animations en piste"],
    racingNote: "Accélération maximale : donner corps et vie au circuit avant même le premier coup de pioche."
  },
  {
    id: 3,
    sectorNum: "03",
    weeks: "Semaines 5 — 6",
    shortWeeks: "S 5—6",
    durationBadge: "JALON 3 · RYTHME",
    title: "Montage, Motion & Compositing VFX",
    phaseName: "ASSEMBLAGE CINÉMATOGRAPHIQUE & TÉLÉMÉTRIE",
    description: "Montage plan par plan, synchronisation narrative, habillage graphique motorsport et compositing VFX des ambiances, lumières et poussières.",
    deliverables: ["Premier montage assemblé", "Habillage motion design", "Incrustations télémétrie"],
    racingNote: "Le montage se resserre : chaque seconde est étalonnée pour maintenir la tension."
  },
  {
    id: 4,
    sectorNum: "04",
    weeks: "Semaine 7",
    shortWeeks: "S 7",
    durationBadge: "JALON 4 · AUDIO",
    title: "Musique Originale, Sound Design & Version 1",
    phaseName: "IMMERSION SONORE & LIVRAISON V1 OFFICIELLE",
    description: "Composition de la bande originale, design sonore mécanique haute fidélité (moteurs, crissement des pneus, souffle marin), mixage spatialisé et présentation de la Version 1.",
    deliverables: ["Film complet V1 (Image & Son)", "Session d'écoute client", "Cycle de retours 1"],
    racingNote: "L'émotion monte : le moteur rugit dans les casques et transporte le spectateur en piste."
  },
  {
    id: 5,
    sectorNum: "05",
    weeks: "Semaine 8",
    shortWeeks: "S 8",
    durationBadge: "JALON 5 · ARRIVÉE",
    title: "Étalonnage 4K, Retours & Livraison Master Final",
    phaseName: "LIGNE D'ARRIVÉE & LIVRAISON MASTERS UHD/4K",
    description: "Intégration du second cycle de retours clients, étalonnage couleur cinéma, exports des masters définitifs 4K UHD 16:9 et archives complètes.",
    deliverables: ["Master 4K UHD définitif 16:9", "Fichiers de projection", "Archives & déclinaisons"],
    racingNote: "Drapeau d'arrivée levé : mission accomplie et livraison du film d'exception pour KOFFI & DIABATÉ.",
    isFinish: true
  }
];

export const VerticalCircuitCalendar: React.FC = () => {
  const [selectedWeekId, setSelectedWeekId] = useState<number>(1);

  const activeStep = CIRCUIT_WEEKS.find((s) => s.id === selectedWeekId) || CIRCUIT_WEEKS[0];

  const handleSelectWeek = (id: number) => {
    sound.playUiClick();
    setSelectedWeekId(id);
  };

  const handlePrev = () => {
    if (selectedWeekId > 1) {
      handleSelectWeek(selectedWeekId - 1);
    }
  };

  const handleNext = () => {
    if (selectedWeekId < CIRCUIT_WEEKS.length) {
      handleSelectWeek(selectedWeekId + 1);
    }
  };

  return (
    <div className="h-full rounded-2xl bg-[#0b0d13] border border-white/15 p-5 sm:p-7 shadow-2xl flex flex-col justify-between space-y-5">
      
      {/* 1. En-tête harmonieux et proportionné */}
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-[#ff1e00] font-bold uppercase tracking-wider block">
                SECTION 4 · PLANNING
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                · 6 À 8 SEMAINES
              </span>
            </div>
            <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight flex items-center gap-2">
              <span>LE CIRCUIT DES SEMAINES</span>
            </h4>
          </div>

          {/* Navigation compacte des secteurs */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={selectedWeekId === 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all border border-white/10 cursor-pointer"
              title="Secteur précédent"
              aria-label="Secteur précédent"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs text-neutral-300 px-2.5 py-1 bg-white/5 rounded-md border border-white/10">
              <strong className="text-[#ff1e00] font-bold">{selectedWeekId}</strong> / {CIRCUIT_WEEKS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedWeekId === CIRCUIT_WEEKS.length}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all border border-white/10 cursor-pointer"
              title="Secteur suivant"
              aria-label="Secteur suivant"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Le Ruban du Circuit : 5 Checkpoints élégants avec vibreurs FIA */}
        <div className="pt-4 pb-2">
          <div className="relative py-2">
            {/* Ligne d'asphalte avec bordure vibreur rouge et blanc */}
            <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-neutral-800 rounded-full overflow-hidden flex">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 -skew-x-12 ${i % 2 === 0 ? 'bg-[#ff1e00]' : 'bg-white/90'}`} 
                />
              ))}
            </div>

            {/* Balises interactives des 5 secteurs */}
            <div className="relative z-10 flex items-center justify-between">
              {CIRCUIT_WEEKS.map((step) => {
                const isSelected = selectedWeekId === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectWeek(step.id)}
                    className="group flex flex-col items-center gap-1.5 transition-all cursor-pointer focus:outline-none"
                    title={`${step.durationBadge} : ${step.title}`}
                  >
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        isSelected
                          ? 'bg-[#ff1e00] text-white border-2 border-white scale-110 shadow-[0_0_15px_rgba(255,30,0,0.7)]'
                          : 'bg-[#14161f] text-neutral-400 border border-white/20 hover:border-white/60 hover:text-white hover:scale-105'
                      }`}
                    >
                      {step.isFinish ? (
                        /* Jalon 5 : Uniquement le drapeau, sans damier */
                        <Flag className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`} />
                      ) : (
                        <span>{step.sectorNum}</span>
                      )}
                    </div>

                    <span className={`text-[10px] font-mono tracking-tight font-semibold ${
                      isSelected ? 'text-[#ff1e00]' : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}>
                      {step.shortWeeks}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Carte synthétique du Secteur Actif (compacte et lisible) */}
      <div className="p-4 sm:p-5 rounded-xl bg-white/3 border border-white/8 space-y-3 relative overflow-hidden flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Ligne d'état du secteur */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-[#ff1e00] px-2 py-0.5 rounded bg-[#ff1e00]/15 border border-[#ff1e00]/30">
                {activeStep.weeks}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                {activeStep.phaseName}
              </span>
            </div>

            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-neutral-200 border border-white/15 flex items-center gap-1">
              {activeStep.isFinish && <Flag className="w-3 h-3 text-[#ff1e00]" />}
              <span>{activeStep.durationBadge}</span>
            </span>
          </div>

          {/* Titre du secteur */}
          <h5 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight">
            {activeStep.title}
          </h5>

          {/* Description claire et proportionnée */}
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            {activeStep.description}
          </p>

          {/* Livrables contractuels clés */}
          <div className="pt-1.5 flex flex-wrap gap-1.5">
            {activeStep.deliverables.map((del, dIdx) => (
              <span 
                key={dIdx}
                className="px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 bg-black/40 border border-white/10 text-neutral-200"
              >
                <CheckCircle2 className="w-3 h-3 text-[#ff1e00] shrink-0" />
                <span>{del}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Note de course / brief opérationnel */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-sans text-neutral-300 italic">
          <span className="border-l-2 border-[#ff1e00] pl-2 leading-relaxed">
            « {activeStep.racingNote} »
          </span>
          <span className="text-[10px] font-mono font-bold text-[#ff1e00] not-italic ml-2 uppercase shrink-0">
            SECTEUR {activeStep.sectorNum}
          </span>
        </div>

      </div>

    </div>
  );
};
