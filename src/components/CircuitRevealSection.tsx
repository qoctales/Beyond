import React, { useState } from 'react';
import { Eye, MapPin, Sparkles, Sliders, Flag, Coffee, ShieldCheck, Users, Baby, Compass, Utensils } from 'lucide-react';
import { STORY_ASSETS } from '../data/storyAssets';
import { sound } from '../utils/audio';

export const CircuitRevealSection: React.FC = () => {
  const asset = STORY_ASSETS.circuitMasterNight;
  const [selectedZone, setSelectedZone] = useState<number>(0);

  const zones = [
    {
      id: "piste-principale",
      title: "Piste Compétition & Éclairage Nocturne",
      subtitle: "1 200 mètres aux normes CIK-FIA",
      icon: Flag,
      desc: "Tracé modulable bordé de palmiers et de vibreurs FIA, illuminé par des mâts d'éclairage LED haute puissance pour les courses en nocturne.",
      features: ["Vitesse de pointe 95 km/h", "Chicanes rapides", "Éclairage nocturne 1000 Lux"],
    },
    {
      id: "zone-enfants",
      title: "Circuit Dédié aux Enfants & Familles",
      subtitle: "L'apprentissage sécurisé dès 6 ans",
      icon: Baby,
      desc: "Une piste dédiée aux jeunes pilotes avec des karts légers à bridage électronique, arceaux intégraux et moniteurs diplômés. L'enfant du début y trouve son premier véritable terrain de jeu.",
      features: ["Piste école séparée", "Bridage électronique à distance", "Pédaliers & volants réglables"],
    },
    {
      id: "paddocks-stands",
      title: "Bâtiment Paddock & Stands Vitrés",
      subtitle: "Architecture contemporaine à deux niveaux",
      icon: ShieldCheck,
      desc: "Conçu par Koffi & Diabaté : ateliers mécaniques en rez-de-chaussée, alignement des karts sous bandeaux néon rouge, et terrasse panoramique VIP à l'étage.",
      features: ["30 stands équipés", "Terrasse VIP couverte", "Bornes de charge et télémétrie"],
    },
    {
      id: "restaurant-telemetrie",
      title: "Restaurant & Lounge Télémétrie Live",
      subtitle: "Immersion gastronomique face à la piste",
      icon: Utensils,
      desc: "Grandes baies vitrées donnant sur la ligne droite des stands. Des écrans géants diffusent les temps au tour en direct (Best Lap) et la carte interactive du circuit.",
      features: ["Écrans de chronométrage en direct", "Restauration locale et internationale", "Vue plongeante 180°"],
    },
    {
      id: "promenade-entree",
      title: "Entrée Monumentale & Promenade Paysagée",
      subtitle: "Un lieu de vie pour tout le Bénin",
      icon: Compass,
      desc: "Portique d'entrée architectural KARTING, allées piétonnes en bois illuminées, palmiers et jeux d'eau où parents et enfants se promènent en toute sérénité au crépuscule.",
      features: ["Portique signalétique iconique", "Accès plage et océan", "Parc paysager arboré"],
    },
  ];

  return (
    <section id="le-circuit" className="relative py-28 bg-[#08090c] border-t border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-2">
              03 / LE CIRCUIT PREND VIE — RÉALISME TOTAL
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              LE COMPLEXE RÉALISTE DE NUIT
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-neutral-400 block tracking-wider">
              {asset.shotNumber} · {asset.timecode}
            </span>
            <span className="font-mono text-xs text-[#ff3b1d] block font-semibold">
              LUXE, SPORT AUTOMOBILE &amp; DESTINATION FAMILIALE
            </span>
          </div>
        </div>

        {/* Narrative core statement */}
        <div className="max-w-3xl mb-12">
          <p className="text-xl sm:text-3xl font-display text-white font-semibold">
            « Donner vie au projet avant sa construction : de la piste aux espaces de vie. »
          </p>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Ici, l'esquisse s'efface pour laisser place à l'hyper-réalisme du futur complexe de karting au Bénin. 
            Éclairage nocturne spectaculaire, terrasse VIP, restaurant connecté avec télémétrie en direct, et espace sécurisé dédié aux enfants.
          </p>
        </div>

        {/* Grand Master Night Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0c0d12] shadow-2xl mb-10 group">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={asset.src}
              alt={asset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.9] contrast-[1.08] transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-black/30 pointer-events-none" />

            {/* Viewfinder Telemetry */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white/80 pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                <span>NOCTURNE RÉALISTE · ÉCLAIRAGE CÔTIER DU BÉNIN</span>
              </div>
              <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 hidden sm:block">
                SOURCE : MAQUETTE REVIT KOFFI &amp; DIABATÉ
              </div>
            </div>

            {/* Dynamic Highlight on Active Zone */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-md p-5 rounded-xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#ff3b1d] font-bold uppercase mb-1">
                  <span>ZONE 0{selectedZone + 1} / 05</span>
                  <span>·</span>
                  <span>{zones[selectedZone].subtitle}</span>
                </div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  {zones[selectedZone].title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                  {zones[selectedZone].desc}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                {zones[selectedZone].features.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-mono text-white whitespace-nowrap"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Zone Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {zones.map((zone, idx) => {
            const Icon = zone.icon;
            const isSelected = selectedZone === idx;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  setSelectedZone(idx);
                  sound.playUiClick();
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#151822] border-[#ff3b1d] text-white shadow-lg shadow-[#ff3b1d]/20'
                    : 'bg-white/3 border-white/8 text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#ff3b1d] font-bold">0{idx + 1}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#ff3b1d]' : 'text-neutral-500'}`} />
                </div>
                <div className="font-display font-bold text-xs uppercase text-white mb-1">
                  {zone.title}
                </div>
                <div className="text-[11px] text-neutral-400 truncate">
                  {zone.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
