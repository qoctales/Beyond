/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Megaphone, 
  Users, 
  Layers, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Film,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

export interface EcosystemPole {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  description: string;
  threeMonthsRoadmap: {
    month: string;
    label: string;
    action: string;
    deliverable: string;
  }[];
  advantages: {
    title: string;
    detail: string;
  }[];
  keyAsset: {
    badge: string;
    title: string;
    detail: string;
  };
}

export const ECOSYSTEM_POLES: EcosystemPole[] = [
  {
    id: 'creation',
    number: '01',
    title: 'Création & Nouvelles Œuvres',
    tagline: 'CATALOGUE INITIAL & PROTOCOLE D’EXPANSION',
    icon: Film,
    accentColor: '#ff1e00',
    glowColor: 'rgba(255, 30, 0, 0.25)',
    description: 'Finalisation complète des deux séries en miroir (Karting Bénin et AAA) et mise en place du cahier des charges standardisé permettant d’intégrer et produire rapidement de futures œuvres.',
    threeMonthsRoadmap: [
      {
        month: 'Mois 1',
        label: 'Cadrage & Calibrage stylistique',
        action: 'Fixation de la bible graphique, modélisation des personnages récurrents et tests de cohérence sur les premiers épisodes.',
        deliverable: 'Bible technique et premiers épisodes montés'
      },
      {
        month: 'Mois 2',
        label: 'Production intensive en miroir',
        action: 'Réalisation des 16 épisodes 4K, intégration sonore immersive et formalisation du cahier des charges d’intégration d’œuvres.',
        deliverable: 'Cahier des charges pour intégrer de nouvelles œuvres'
      },
      {
        month: 'Mois 3',
        label: 'Livraison masters & Pérennisation',
        action: 'Mastering broadcast, archivage multi-pistes et validation de la méthodologie pour de futures productions de tiers.',
        deliverable: '16 épisodes 4K livrés + protocole de création'
      }
    ],
    advantages: [
      {
        title: 'Catalogue initial valorisable',
        detail: 'Deux séries achevées et diffusables immédiatement en télévision, sur plateformes web et en festivals.'
      },
      {
        title: 'Cahier des charges pour futures œuvres',
        detail: 'Procédure clé en main pour intégrer rapidement de nouveaux projets (animation, fiction ou documentaires) sans réinventer le pipeline.'
      },
      {
        title: 'Propriété intellectuelle pérenne',
        detail: 'Constitution d’un patrimoine d’actifs créatifs exploitables sous forme de licences, merchandising ou suites.'
      }
    ],
    keyAsset: {
      badge: 'Livrable Majeur',
      title: '2 séries 4K terminées + Cahier des charges d’œuvres',
      detail: 'Une bibliothèque de contenu premium prête pour le marché et un cadre méthodologique réutilisable.'
    }
  },
  {
    id: 'communication',
    number: '02',
    title: 'Communication & Rayonnement',
    tagline: 'STRATÉGIE 360° & VISIBILITÉ PANAFRICAINE',
    icon: Megaphone,
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    description: 'Un plan de communication d’envergure pensé dès l’origine pour faire résonner le projet au Bénin et à l’international, attirer diffuseurs, sponsors et investisseurs.',
    threeMonthsRoadmap: [
      {
        month: 'Mois 1',
        label: 'Conception du plan média 360°',
        action: 'Définition des cibles (médias culturels, tech, grand public), création du kit média, teasers visuels et dossier de presse premium.',
        deliverable: 'Plan de communication et dossier de presse complet'
      },
      {
        month: 'Mois 2',
        label: 'Campagne de teasing & Relations presse',
        action: 'Diffusion de capsules vidéo making-of, interviews des créateurs, prises de parole sur l’innovation culturelle en Afrique.',
        deliverable: 'Couverture médiatique et teasers sur les réseaux'
      },
      {
        month: 'Mois 3',
        label: 'Événement officiel & Lancement',
        action: 'Projection en avant-première à Cotonou, pitchs auprès des diffuseurs TV panafricains et festivals internationaux d’animation/séries.',
        deliverable: 'Avant-première officielle & partenariats diffuseurs'
      }
    ],
    advantages: [
      {
        title: 'Notoriété et aura d’innovation',
        detail: 'Positionnement indiscutable comme précurseur de la production augmentée en Afrique de l’Ouest.'
      },
      {
        title: 'Attractivité auprès des marques et sponsors',
        detail: 'Visibilité accrue facilitant les accords de sponsoring, placements de produit et co-productions.'
      },
      {
        title: 'Portée internationale',
        detail: 'Présence ciblée dans les festivals d’animation, marchés du film et rencontres tech mondiales.'
      }
    ],
    keyAsset: {
      badge: 'Stratégie Active',
      title: 'Plan de communication 360° opérationnel',
      detail: 'Kit média complet, relations presse ciblées et calendrier d’activation pour maximiser l’impact.'
    }
  },
  {
    id: 'jeunes',
    number: '03',
    title: 'Accompagnement des Jeunes',
    tagline: 'TRANSMISSION, MENTORAT & FORMATION LOCALE',
    icon: Users,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    description: 'Un programme structuré de mentorat et d’insertion des jeunes talents béninois (storytellers, artistes visuels, techniciens) au cœur même de la fabrication des séries.',
    threeMonthsRoadmap: [
      {
        month: 'Mois 1',
        label: 'Sélection & Ateliers d’initiation',
        action: 'Recrutement d’un pool de jeunes créateurs locaux passionnés, immersion dans les outils d’IA et les méthodes narratives modernes.',
        deliverable: 'Promotion de jeunes talents sélectionnée et outillée'
      },
      {
        month: 'Mois 2',
        label: 'Mentorat en production réelle',
        action: 'Pratique quotidienne en studio aux côtés des directeurs techniques, travail direct sur les décors, textures et animations.',
        deliverable: 'Montée en compétence certifiée sur projets réels'
      },
      {
        month: 'Mois 3',
        label: 'Insertion & Autonomie créative',
        action: 'Les jeunes prennent en charge des modules entiers et deviennent les référents techniques du studio pour les futures productions.',
        deliverable: 'Équipe locale qualifiée et prête à opérer'
      }
    ],
    advantages: [
      {
        title: 'Capital humain local qualifié',
        detail: 'Création d’un vivier de compétences rares à Cotonou, directement formées sur les flux de production réels.'
      },
      {
        title: 'Impact sociétal et transmission',
        detail: 'Rôle d’ascenseur professionnel pour la jeunesse créative béninoise, valorisant le génie local.'
      },
      {
        title: 'Autonomie durable du studio',
        detail: 'Le studio dispose d’opérateurs formés sur place, capables d’exécuter sans dépendance extérieure permanente.'
      }
    ],
    keyAsset: {
      badge: 'Capital Humain',
      title: 'Programme de mentorat et pool de talents formés',
      detail: 'Une équipe locale d’artistes et techniciens opérationnels pour assurer la suite des productions.'
    }
  },
  {
    id: 'process',
    number: '04',
    title: 'Process & Organisation Industrielle',
    tagline: 'CAHIER DES CHARGES, MÉTHODOLOGIE & RÉSILIENCE',
    icon: FileText,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description: 'Standardisation de l’ensemble de la chaîne de valeur : cahier des charges de fabrication, protocoles de validation, modèles juridiques et archivage des actifs numériques.',
    threeMonthsRoadmap: [
      {
        month: 'Mois 1',
        label: 'Formalisation des flux de travail',
        action: 'Rédaction du guide des normes techniques, des conventions de nommage, des prompts calibrés et des protocoles de post-production.',
        deliverable: 'Guide méthodologique de production'
      },
      {
        month: 'Mois 2',
        label: 'Sécurisation juridique & IP',
        action: 'Établissement des modèles de contrats, cessions de droits, clauses de propriété intellectuelle et conformité internationale.',
        deliverable: 'Pack juridique complet et modèles de contrats'
      },
      {
        month: 'Mois 3',
        label: 'Cahier des charges définitif',
        action: 'Consolidation de l’ensemble des process dans un cahier des charges clé en main permettant de reproduire l’exploit sur commande.',
        deliverable: 'Cahier des charges industriel complet et validé'
      }
    ],
    advantages: [
      {
        title: 'Reproductibilité parfaite',
        detail: 'Possibilité de lancer un nouveau projet en quelques jours grâce à des recettes de production éprouvées.'
      },
      {
        title: 'Sécurité contractuelle totale',
        detail: 'Cadre légal solide pour rassurer partenaires financiers, diffuseurs institutionnels et investisseurs.'
      },
      {
        title: 'Gain de temps et d’énergie',
        detail: 'Suppression des tâtonnements et des frictions grâce à des process documentés et clairs.'
      }
    ],
    keyAsset: {
      badge: 'Méthodologie',
      title: 'Cahier des charges et process industriels éprouvés',
      detail: 'Toute la chaîne technique documentée pour garantir une qualité constante et reproductible.'
    }
  },
  {
    id: 'economie',
    number: '05',
    title: 'Modèle Économique & Croissance',
    tagline: 'REVENUS DIVERSIFIÉS & VALORISATION SANS SURCHARGE',
    icon: TrendingUp,
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    description: 'Génération de nouvelles lignes de revenus à forte valeur ajoutée sans solliciter de temps de gestion opérationnelle quotidien, renforçant la valeur globale de la structure.',
    threeMonthsRoadmap: [
      {
        month: 'Mois 1',
        label: 'Offre commerciale & Grille tarifaire',
        action: 'Cartographie des besoins du marché (spots publicitaires augmentés, visualisations architecturales, habillages TV) et grilles de prix.',
        deliverable: 'Catalogue de prestations à haute marge'
      },
      {
        month: 'Mois 2',
        label: 'Prospection pilote auprès de tiers',
        action: 'Présentation de l’offre auprès d’institutions, de grands comptes régionaux et de promoteurs immobiliers ou sportifs.',
        deliverable: 'Premiers devis émis et marques d’intérêt fermes'
      },
      {
        month: 'Mois 3',
        label: 'Activation des premiers contrats',
        action: 'Signature de prestations rémunératrices gérées par l’architecture logicielle et les équipes formées, en flux régulier.',
        deliverable: 'Flux de revenus récurrents activés'
      }
    ],
    advantages: [
      {
        title: 'Revenus additionnels récurrents',
        detail: 'Capacité de facturer des prestations premium pour des clients externes en s’appuyant sur l’outil créé.'
      },
      {
        title: 'Zéro surcharge opérationnelle quotidienne',
        detail: 'Exécution technique prise en charge par l’organisation rodée, sans vampiriser le temps de direction.'
      },
      {
        title: 'Valorisation de l’entreprise',
        detail: 'Multiplication des actifs immatériels et montée en valeur de l’ensemble de l’écosystème de production.'
      }
    ],
    keyAsset: {
      badge: 'Rendement',
      title: 'Structure rentable et modèles de revenus validés',
      detail: 'Une diversification financière concrète s’appuyant sur des prestations à haute marge.'
    }
  }
];

export const AaaAgencyRoadmap: React.FC = () => {
  const [activePoleId, setActivePoleId] = useState<string>('creation');

  const activePole = ECOSYSTEM_POLES.find(p => p.id === activePoleId) || ECOSYSTEM_POLES[0];
  const ActiveIcon = activePole.icon;

  const handleSelectPole = (id: string) => {
    sound.click();
    setActivePoleId(id);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* 1. INTRO DE L'ÉCOSYSTÈME SANS SCISSION EN DEUX BLOCS */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0e1017] via-[#090b10] to-[#050608] border border-white/15 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700" 
          style={{ backgroundColor: activePole.glowColor }}
        />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e00] animate-pulse" />
              <span className="font-mono text-xs text-[#ff1e00] font-bold uppercase tracking-wider">
                ÉCOSYSTÈME DE COLLABORATION
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
              DÉPLOIEMENT CONCRET SUR 3 MOIS
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
              Bénéfices mutuels &amp; Construction durable
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed font-light">
              Au-delà de la production des 16 épisodes des deux séries, cette alliance pose les fondations d'un écosystème complet. Cliquez sur chacun des 5 pôles pour explorer en détail les bénéfices concrets et ce qui est réalisé pas à pas sur les 3 mois.
            </p>
          </div>
        </div>
      </div>

      {/* 2. SÉLECTEUR INTERACTIF DES 5 PÔLES DE L'ÉCOSYSTÈME */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ECOSYSTEM_POLES.map((pole) => {
          const PoleIcon = pole.icon;
          const isSelected = pole.id === activePoleId;
          return (
            <button
              key={pole.id}
              onClick={() => handleSelectPole(pole.id)}
              className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-3 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'bg-[#151922] border-white/40 shadow-xl ring-1 ring-white/30 scale-[1.02]'
                  : 'bg-[#0a0c11]/80 border-white/10 hover:border-white/20 hover:bg-[#10121a]'
              }`}
            >
              {/* Liseré lumineux actif */}
              {isSelected && (
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: pole.accentColor }}
                />
              )}

              <div className="flex items-center justify-between w-full">
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                  }`}
                  style={{ backgroundColor: isSelected ? pole.accentColor : 'rgba(255,255,255,0.06)' }}
                >
                  <PoleIcon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] font-bold text-neutral-400">
                  {pole.number}
                </span>
              </div>

              <div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">
                  Pôle {pole.number}
                </span>
                <h3 className={`font-display font-bold text-xs sm:text-[13px] uppercase tracking-tight leading-snug transition-colors ${
                  isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                }`}>
                  {pole.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. FICHE DÉTAILLÉE DU PÔLE ACTIF */}
      <div className="rounded-2xl bg-[#0b0d14] border border-white/20 p-5 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Entête du pôle actif */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg"
              style={{ backgroundColor: activePole.accentColor }}
            >
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-white">
                  PÔLE {activePole.number}
                </span>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  {activePole.tagline}
                </span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                {activePole.title}
              </h3>
            </div>
          </div>

          {/* Badge livrable clé */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 max-w-sm shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#ff1e00] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activePole.keyAsset.badge}</span>
            </div>
            <div className="font-display font-bold text-xs text-white uppercase mt-0.5">
              {activePole.keyAsset.title}
            </div>
          </div>
        </div>

        {/* Description introductive du pôle */}
        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
          {activePole.description}
        </p>

        {/* SECTION A : CE QUI SERA FAIT PENDANT LES 3 MOIS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#ff1e00]" />
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
              Ce qui est réalisé pendant les 3 mois
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {activePole.threeMonthsRoadmap.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#10121a] border border-white/10 flex flex-col justify-between space-y-3 hover:border-white/20 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: activePole.accentColor }}
                    >
                      {step.month}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      Étape {idx + 1}/3
                    </span>
                  </div>

                  <h5 className="font-display font-bold text-xs sm:text-sm text-white uppercase mt-1">
                    {step.label}
                  </h5>

                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {step.action}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-start gap-1.5 text-[11px] font-mono text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-200">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B : AVANTAGES & BÉNÉFICES DIRECTS */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#ff1e00]" />
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
              Bénéfices &amp; Avantages tangibles pour le projet
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {activePole.advantages.map((adv, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 hover:border-white/25 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: activePole.accentColor }}
                  />
                  <h5 className="font-display font-bold text-xs uppercase text-white tracking-tight">
                    {adv.title}
                  </h5>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {adv.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. CHRONOLOGIE DE SYNTHÈSE DES 3 MOIS (COLLABORATION UNIFIÉE) */}
      <div className="rounded-xl bg-[#090b10] border border-white/10 p-4 sm:p-5 text-xs font-mono text-neutral-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Compass className="w-4 h-4 text-[#ff1e00] shrink-0" />
          <span className="font-bold text-white uppercase tracking-wider">
            Synthèse 3 Mois :
          </span>
          <span className="text-neutral-400">
            M1 Lancement &amp; Méthodes → M2 Production &amp; Mentorat → M3 Masters, Autonomie &amp; Nouvelles Œuvres
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wider">
            Écosystème pérenne
          </span>
        </div>
      </div>

    </div>
  );
};
