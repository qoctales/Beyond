/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlidePanel {
  id: string;
  title: string;
  image: string;
  caption?: string;
}

const imageModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/*.{jpg,png,jpeg,webp}',
  { eager: true }
);

export function resolveImage(path?: string): string {
  if (!path) return '';
  // 1. Direct Vite bundled module match
  if (imageModules[path]?.default) {
    return imageModules[path].default;
  }
  // 2. Filename match across Vite bundled modules
  const filename = path.split('/').pop();
  if (filename) {
    const match = Object.entries(imageModules).find(([k]) => k.endsWith(filename));
    if (match?.[1]?.default) {
      return match[1].default;
    }
    // 3. Fallback to public asset path
    return `/images/${filename}`;
  }
  return path;
}

export interface SlideData {
  id: number;
  slideNumber: string;
  type: 'cover' | 'storyboard' | 'budget';
  title: string;
  subtitle: string;
  tagline?: string;
  quote?: string;
  activeVerbs: number[]; // indices 0 to 15
  panels: SlidePanel[];
  masterCoverImage?: string;
  manifesto?: {
    headline: string;
    quote?: string;
    points: {
      num?: string;
      title: string;
      text: string;
    }[];
  };
  pillars?: {
    num: string;
    title: string;
    verbs: string;
    desc: string;
  }[];
  ecranText?: string;
  raconteText?: string;
  rythmeSonText?: string;
  signatureKartText?: string;
  filRougeSonoreText?: string;
  audioKey: string;
}

export const SLIDES: SlideData[] = [
  // SLIDE 01 — MASTER BOARD (Go Beyond _ Le rêve en piste)
  {
    id: 1,
    slideNumber: "01",
    type: "cover",
    title: "GO BEYOND",
    subtitle: "DU RÊVE À LA RÉALITÉ",
    tagline: "FILM DE PRÉSENTATION DU FUTUR KARTING INTERNATIONAL",
    activeVerbs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    masterCoverImage: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
    manifesto: {
      headline: "Go Beyond : le manifeste",
      quote: "Africafun Production veut démontrer que le Bénin peut produire des films d'une qualité exceptionnelle, irréprochable. De l'illustration au rendu réaliste, toutes les technologies modernes seront réunies.",
      points: [
        {
          num: "01",
          title: "Au-delà des espérances",
          text: "Ce que le peuple attendait, nous le dépassons. Au-delà d'un simple lieu de divertissement, nous offrons une référence."
        },
        {
          num: "02",
          title: "Au-delà des moyens",
          text: "Tout commence par une idée, un rêve. Chaque début modeste est une promesse. C'est le point de départ de grandes choses."
        },
        {
          num: "03",
          title: "Au-delà des idées classiques",
          text: "Le Bénin crée, innove, invente. Du rêve d'un enfant et du regard d'une conceptrice naît un circuit pensé autrement."
        },
        {
          num: "04",
          title: "Au-delà de l'image que l'on connaît",
          text: "Un Bénin moderne, ambitieux, créatif. Un pays qui inspire et donne envie de venir le découvrir."
        },
        {
          num: "05",
          title: "Au-delà des limites",
          text: "Le sport de haut niveau, c'est viser l'excellence et célébrer chaque record. « Go Beyond » est le cri de chaque pilote qui s'élance."
        },
        {
          num: "06",
          title: "Au-delà de l'ordinaire",
          text: "Le haut de gamme, c'est l'exigence du détail. Des installations soignées, une expérience inoubliable."
        }
      ]
    },
    panels: [
      {
        id: "hero_master",
        title: "Go Beyond — Le Karting au Bénin",
        image: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
        caption: "Le pilote prodige et l'architecte en combinaison face au futur karting international du Bénin"
      }
    ],
    pillars: [
      {
        num: "1",
        title: "De l'étincelle à la vision",
        verbs: "Rêver, oser, jouer, rencontrer, imaginer, dessiner.",
        desc: "L'enfant découvre le possible et apprend à le représenter."
      },
      {
        num: "2",
        title: "De la vision à l'action",
        verbs: "Concevoir, bâtir, s'équiper, frémir.",
        desc: "L'ambition prend forme et le moment d'agir approche."
      },
      {
        num: "3",
        title: "Vers l'accomplissement",
        verbs: "S'engager, se dépasser, rassembler, vibrer.",
        desc: "L'effort individuel rencontre l'énergie collective."
      },
      {
        num: "4",
        title: "De l'expérience à l'héritage",
        verbs: "Transmettre, s'élever.",
        desc: "Ce qui a été construit aujourd'hui ouvre la voie à demain."
      }
    ],
    signatureKartText: "Le kart est toujours là, même quand on ne le voit pas. Il passe par la caméra, qui imite la conduite, et par le son, un moteur qu'on devine avant de le voir. Il gronde de plus en plus fort au fil du film.",
    filRougeSonoreText: "Un souffle d'enfant au début, un moteur lointain au milieu, un rugissement à la course, une dernière note tenue à la fin.",
    audioKey: "01_reve"
  },

  // SLIDE 02 — SÉQUENCE 1 : RÊVER · OSER (Page 1 PDF)
  {
    id: 2,
    slideNumber: "02",
    type: "storyboard",
    title: "RÊVER · OSER",
    subtitle: "SÉQUENCE 01 (00:00 — 00:25)",
    quote: "« Rêver, c'est construire l'avenir. Oser, c'est poser la première planche. »",
    activeVerbs: [0, 1],
    panels: [
      {
        id: "p1_dream",
        title: "L'étincelle du rêve",
        image: "/src/assets/images/rever_etincelle_reve_1791210780013.jpg",
        caption: "L'enfant imagine le circuit dans la terre rouge"
      },
      {
        id: "p1_stones",
        title: "Le tracé imaginaire",
        image: "/src/assets/images/rever_trace_imaginaire_1791210883547.jpg",
        caption: "Tracé au bâton des virages et karts au sol"
      },
      {
        id: "p1_craft",
        title: "L'assemblage artisanal",
        image: "/src/assets/images/rever_assemblage_artisanal_1791210933284.jpg",
        caption: "Assemblage du châssis en bois et direction"
      }
    ],
    ecranText: "Cour de terre rouge, lumière rasante. La caméra descend à hauteur d'enfant : mains qui assemblent les planches, nouent la ficelle, ajustent les roues. Plans courts, le kart naît au montage. Travelling arrière : le kart terminé.",
    raconteText: "L'enfant n'attend pas qu'on lui offre un kart : il le fabrique. Le Bénin bâtit son karting avec ses idées, ses mains, sa volonté.",
    rythmeSonText: "Calme, puis le montage s'accélère. Bois, ficelle, terre, et une mélodie simple.",
    signatureKartText: "Le kart n'existe encore que dans la tête de l'enfant. Les roues sifflent comme une accélération, les planches craquent comme un châssis. À la fin, un « vroum » murmuré : le premier moteur du film.",
    filRougeSonoreText: "Le premier souffle d'enfant : le son de l'aspiration et le murmure mécanique initial.",
    audioKey: "01_reve"
  },

  // SLIDE 03 — SÉQUENCE 2 : JOUER · RENCONTRER (Page 2 PDF)
  {
    id: 3,
    slideNumber: "03",
    type: "storyboard",
    title: "JOUER · RENCONTRER",
    subtitle: "SÉQUENCE 02 (00:25 — 00:55)",
    quote: "« Jouer, c'est tester ses limites. Rencontrer, c'est trouver qui croit en son rêve. »",
    activeVerbs: [2, 3],
    panels: [
      {
        id: "p2_run",
        title: "La course dans la poussière",
        image: "/src/assets/images/jouer_course_poussiere_1791211122585.jpg",
        caption: "Course joyeuse dans la poussière ocre"
      },
      {
        id: "p2_coffee",
        title: "Le regard croisé (Diptyque)",
        image: "/src/assets/images/rencontrer_diptyque_1791211142944.jpg",
        caption: "Regard croisé entre l'enfant et l'architecte"
      },
      {
        id: "p2_overlook",
        title: "La ville et le rêve en plongée",
        image: "/src/assets/images/rencontrer_regard_plongee_1791211159035.jpg",
        caption: "L'architecte observe l'enfant depuis la tour"
      }
    ],
    ecranText: "Travelling au ras du sol, poussière, énergie joyeuse. Le kart bute, ralenti, l'enfant lève la tête. Contre-plongée : une silhouette derrière une vitre, au dernier étage. Plongée : l'enfant, minuscule, face à la ville. Deux mondes séparés par une vitre.",
    raconteText: "L'enfant se heurte à ses limites, puis croise quelqu'un qui comprend son projet. Le Bénin écoute ses habitants et réunit les talents pour répondre à leurs rêves. La vitre sépare, mais elle relie.",
    rythmeSonText: "Vif et bruyant, puis tout se suspend : le souffle de l'enfant, la rumeur de la ville.",
    signatureKartText: "Le moteur, c'est l'enfant : il imite le bruit, prend les virages comme un pilote, la caméra freine et relance avec lui. Dans le bureau, la tasse de la conceptrice frémit, comme si un moteur lointain faisait vibrer le sol.",
    filRougeSonoreText: "Frémissement mécanique à distance : la rumeur urbaine résonne comme un ralenti de moteur.",
    audioKey: "02_forme"
  },

  // SLIDE 04 — SÉQUENCE 3 : IMAGINER · DESSINER (Page 3 PDF)
  {
    id: 4,
    slideNumber: "04",
    type: "storyboard",
    title: "IMAGINER · DESSINER",
    subtitle: "SÉQUENCE 03 (00:55 — 01:20)",
    quote: "« Imaginer, c'est voir l'invisible. Dessiner, c'est lui donner ses premières lignes. »",
    activeVerbs: [4, 5],
    panels: [
      {
        id: "p3_sketch",
        title: "Le carnet de croquis",
        image: "/src/assets/images/imaginer_carnet_croquis_1791211202884.jpg",
        caption: "Premières courbes esquissées au carnet"
      },
      {
        id: "p3_studio",
        title: "La conceptrice à son bureau",
        image: "/src/assets/images/dessiner_bureau_skyline_1791211220618.jpg",
        caption: "L'architecte à son poste face à la ville"
      },
      {
        id: "p3_cad",
        title: "Le plan technique sur écran",
        image: "/src/assets/images/dessiner_plan_cad_kd_1791212938094.jpg",
        caption: "À Cotonou, l'architecte affine le plan 2D du circuit"
      }
    ],
    ecranText: "Par-dessus l'épaule : un carnet, un crayon, les courbes d'un circuit. Macro sur la mine. Un enchaîné fait passer le tracé du papier à l'écran. La conceptrice, face caméra, la ville derrière elle.",
    raconteText: "L'idée prend forme : un savoir-faire béninois, pensé ici, par des talents d'ici.",
    rythmeSonText: "Calme, précis. Crissement du crayon, clavier, nappe sonore légère.",
    signatureKartText: "La caméra suit le tracé comme un kart : elle ralentit dans les courbes, accélère dans les lignes droites, presque embarquée sur la feuille. Le crayon monte et descend comme un régime moteur : plus la ligne est rapide, plus il est aigu.",
    filRougeSonoreText: "Le crissement du graphite se métamorphose en sifflement d'accélération fluide.",
    audioKey: "03_circuit"
  },

  // SLIDE 05 — SÉQUENCE 4 : CONCEVOIR · BÂTIR (Page 4 PDF)
  {
    id: 5,
    slideNumber: "05",
    type: "storyboard",
    title: "CONCEVOIR · BÂTIR",
    subtitle: "SÉQUENCE 04 (01:20 — 01:35)",
    quote: "« Concevoir, c'est donner de la rigueur au rêve. Bâtir, c'est le faire exister. »",
    activeVerbs: [6, 7],
    panels: [
      {
        id: "p4_diorama_view",
        title: "La construction de la maquette",
        image: "/src/assets/images/concevoir_maquette_build_1791211549362.jpg",
        caption: "Assemblage minutieux de la maquette physique"
      },
      {
        id: "p4_hand_kart",
        title: "Le kart en piste sur la maquette",
        image: "/src/assets/images/architecte_kart_skintone_match_1791245565621.jpg",
        caption: "Simulation du tracé avec le kart #07"
      },
      {
        id: "p4_aerial_night",
        title: "Le complexe réel illuminé",
        image: "/src/assets/images/batir_complexe_nuit_lumieres_1791211586769.jpg",
        caption: "Le complexe international illuminé de nuit"
      }
    ],
    ecranText: "Le circuit sur l'écran, dézoom : la maquette sur le bureau, effet miniature. Une main pose un petit kart sur la piste. La maquette s'anime en 3D : survol du circuit, des bâtiments, des tribunes. Le petit kart fait écho à celui de bois.",
    raconteText: "Le rêve devient méthode : plans, modélisation, essais. On a changé d'échelle, pas d'esprit.",
    rythmeSonText: "Montage qui se resserre, percussions précises, premier grondement au loin.",
    signatureKartText: "Le petit kart se met à rouler, la caméra macro le suit : virage, ligne droite, tribunes miniatures. Le son enfle jusqu'à dépasser la maquette : un vrai moteur sort d'un jouet.",
    filRougeSonoreText: "Premières percussions rythmées et basse grondante au loin annonçant la piste.",
    audioKey: "03_circuit"
  },

  // SLIDE 06 — SÉQUENCE 5 : S'ÉQUIPER · FRÉMIR (Page 5 PDF)
  {
    id: 6,
    slideNumber: "06",
    type: "storyboard",
    title: "S'ÉQUIPER · FRÉMIR",
    subtitle: "SÉQUENCE 05 (01:35 — 01:45)",
    quote: "« S'équiper, c'est se préparer à l'excellence. Frémir, c'est sentir que tout va commencer. »",
    activeVerbs: [8, 9],
    panels: [
      {
        id: "p5_paddock_gear",
        title: "L'équipement dans les paddocks",
        image: "/src/assets/images/sequiper_paddock_gear_1791211723227.jpg",
        caption: "Combinaisons et casques prêts aux paddocks"
      },
      {
        id: "p5_cockpit_pov",
        title: "La visière s'abaisse",
        image: "/src/assets/images/fremir_cockpit_volant_1791211739896.jpg",
        caption: "Regard concentré et mains sur le volant"
      },
      {
        id: "p5_five_lights",
        title: "Les cinq feux rouges",
        image: "/src/assets/images/fremir_cinq_feux_rouges_1791211757204.jpg",
        caption: "Les 5 feux rouges allumés sur la grille"
      }
    ],
    ecranText: "Très gros plans : gants, jugulaire, visière qui descend, harnais, mains sur le volant, numéro 7. Vue subjective, tribunes floues. Rien ne roule encore.",
    raconteText: "Le Bénin est prêt : sérieux, sécurité, niveau international. Le frémissement d'un pays qui sent venir quelque chose de grand.",
    rythmeSonText: "Plans courts, tension maximale. Respiration, cliquetis, battement de cœur, puis un silence juste avant le départ.",
    signatureKartText: "Le moteur ronronne, le cœur du pilote s'y cale. Un coup d'accélérateur à vide : il monte, retombe, remonte. Chaque geste a son bruit mécanique : visière, harnais, volant. La caméra vibre, posée sur le châssis.",
    filRougeSonoreText: "Silence tendu, pulsation cardiaque, puis les bips montants des cinq feux rouges.",
    audioKey: "05_lights_out"
  },

  // SLIDE 07 — SÉQUENCE 6 : S'ENGAGER · SE DÉPASSER (Page 6 PDF)
  {
    id: 7,
    slideNumber: "07",
    type: "storyboard",
    title: "S'ENGAGER · SE DÉPASSER",
    subtitle: "SÉQUENCE 06 (01:45 — 02:30)",
    quote: "« S'engager, c'est choisir sa voie. Se dépasser, c'est aller plus loin que prévu. »",
    activeVerbs: [10, 11],
    panels: [
      {
        id: "p6_grid_launch",
        title: "Départ & extinction des feux",
        image: "/src/assets/images/sengager_feux_depart_1791211775501.jpg",
        caption: "Extinction des feux et départ fulgurant"
      },
      {
        id: "p6_tire_curb",
        title: "L'attaque du vibreur",
        image: "/src/assets/images/sengager_pneu_virage_1791211790532.jpg",
        caption: "Friction du pneu slick sur le vibreur"
      },
      {
        id: "p6_battle",
        title: "Le duel en tête",
        image: "/src/assets/images/sedepasser_duel_karts_1791211804690.jpg",
        caption: "Duel roue dans roue entre le #07 et le #12"
      }
    ],
    ecranText: "Ligne de départ, deux karts côte à côte sous le portique « Le Bénin Terre d'Avenir ». Départ ! Caméra embarquée, ras du sol, travelling, plan aérien. Dépassement au ralenti, puis pleine vitesse. Drapeau à damier.",
    raconteText: "Les pilotes se dépassent, mais le vrai dépassement est celui du Bénin : il déjoue les attentes et rayonne à l'international.",
    rythmeSonText: "Le point culminant : coupes rapides, musique qui explose, moteurs, clameur du public.",
    signatureKartText: "Le kart est en pleine puissance : montée en régime, passages de vitesse, pneus qui crissent, freinage, relance. Le dépassement s'entend, avec un effet Doppler. La caméra roule, freine et s'étire comme un pilote.",
    filRougeSonoreText: "Montée en régime continue sur 4 rapports, rugissement des moteurs et effet Doppler.",
    audioKey: "06_race"
  },

  // SLIDE 08 — SÉQUENCE 7 : RASSEMBLER · VIBRER (Page 7 PDF)
  {
    id: 8,
    slideNumber: "08",
    type: "storyboard",
    title: "RASSEMBLER · VIBRER",
    subtitle: "SÉQUENCE 07 (02:30 — 02:50)",
    quote: "« Rassembler, c'est ouvrir ses portes au monde. Vibrer, c'est lui faire sentir un pays qui avance. »",
    activeVerbs: [12, 13],
    panels: [
      {
        id: "p7_gate_walk",
        title: "L'entrée monumentale",
        image: "/src/assets/images/rassembler_entree_famille_1791211823743.jpg",
        caption: "Arrivée des familles au grand portique"
      },
      {
        id: "p7_complex_life",
        title: "La terrasse et les paddocks",
        image: "/src/assets/images/rassembler_terrasse_vie_1791211848213.jpg",
        caption: "Terrasses animées, jeux et paddocks vitrés"
      },
      {
        id: "p7_crowd_cheer",
        title: "La clameur des tribunes",
        image: "/src/assets/images/vibrer_foule_tribunes_1791211862994.jpg",
        caption: "La foule en liesse acclame les bolides"
      }
    ],
    ecranText: "Plan aérien : de l'océan au soleil couchant, on survole le complexe. On descend à hauteur de visage : familles, enfants, professionnels du monde entier, mains levées, drapeaux.",
    raconteText: "Le karting devient un lieu qui attire le monde et donne envie de découvrir le pays : ses sites, sa mémoire, son histoire.",
    rythmeSonText: "Plus ample, plus ouvert : foule, percussions, voix. Une célébration.",
    signatureKartText: "Le moteur est partout : il passe, revient, traverse le site. La basse fait trembler les barrières, les poitrines, les gobelets. Chaque passage de kart déclenche un cri. Le Bénin vibre, au sens propre.",
    filRougeSonoreText: "Basse tellurique traversant le public, percussions africaines et liesse populaire.",
    audioKey: "04_experience"
  },

  // SLIDE 09 — SÉQUENCE 8 : TRANSMETTRE · S'ÉLEVER (Page 8 PDF)
  {
    id: 9,
    slideNumber: "09",
    type: "storyboard",
    title: "TRANSMETTRE · S'ÉLEVER",
    subtitle: "SÉQUENCE 08 (02:50 — 03:00)",
    quote: "« Transmettre, c'est passer le flambeau. S'élever, c'est aller au-delà de tout. »",
    activeVerbs: [14, 15],
    panels: [
      {
        id: "p8_family_joy",
        title: "La fierté partagée",
        image: "/src/assets/images/transmettre_fierte_enfant_1791211879898.jpg",
        caption: "L'architecte applaudit le jeune garçon"
      },
      {
        id: "p8_podium_handover",
        title: "Le passage du flambeau",
        image: "/src/assets/images/transmettre_relais_benin_1791212278040.jpg",
        caption: "Le champion remet le casque blanc au prodige"
      },
      {
        id: "p8_coastal_sunset",
        title: "L'envol vers l'horizon",
        image: "/src/assets/images/selever_complexe_plage_1791211914185.jpg",
        caption: "Vue aérienne du circuit le long de l'océan"
      }
    ],
    ecranText: "Champ-contrechamp : l'enfant, devenu pilote (casque n°12), face à la conceptrice (casque n°7). Podium symétrique, puis contre-plongée sur l'enfant, bras levés, au ralenti. Les trois pilotes réunis. La grue monte et révèle tout le site au coucher du soleil. Titre : GO BEYOND.",
    raconteText: "L'une a transmis une idée, l'autre l'a vécue. Ce qui se transmet : courage, persévérance, résilience. Le peuple béninois s'élève, au-delà de toutes les limites.",
    rythmeSonText: "On respire. La musique atteint son thème complet, puis un dernier silence avant le titre.",
    signatureKartText: "Le moteur s'éteint doucement, comme un kart qui rentre au stand. Sur la montée de grue, une dernière note s'élève comme un rapport enclenché, puis le silence. Le « vroum » de l'enfant revient une seconde : la boucle est bouclée.",
    filRougeSonoreText: "Extinction progressive du moteur, dernière note suspendue et le murmure « vroum » de l'enfant.",
    audioKey: "07_realite"
  },

  // SLIDE 10 — PADDOCK & CADRE BUDGÉTAIRE DE PRODUCTION (Appel d'offres KOFFI & DIABATÉ)
  {
    id: 10,
    slideNumber: "10",
    type: "budget",
    title: "BUDGET",
    subtitle: "OFFRE TECHNIQUE & FINANCIÈRE — AFRIKAFUN / KOFFI & DIABATÉ",
    quote: "« La rigueur de la méthode et la maîtrise technique au service de l'ambition cinématographique. »",
    activeVerbs: [14, 15],
    panels: [
      {
        id: "p10_revit",
        title: "01. Exploitation Revit & DWG",
        image: "/src/assets/images/dessiner_plan_cad_kd_1791212938094.jpg",
        caption: "Intégration rigoureuse des données architecturales fournies"
      },
      {
        id: "p10_ai3d",
        title: "02. Production 3D & IA Photoréaliste",
        image: "/src/assets/images/racetrack_kart_red_1791213468065.jpg",
        caption: "Mise en scène haute fidélité avant construction physique"
      },
      {
        id: "p10_master4k",
        title: "03. Livraison Master 4K UHD",
        image: "/src/assets/images/circuit_complex_benin_aerial_1791141156073.jpg",
        caption: "Film cinématographique de commercialisation et d'investissement"
      }
    ],
    filRougeSonoreText: "Le grondement serein des moteurs au paddock après la course : précision technique, télémétrie et engagement officiel.",
    audioKey: "07_realite"
  }
];
