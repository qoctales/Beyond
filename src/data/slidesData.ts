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

export interface AgencyEpisodePanel {
  id: string;
  speaker: 'Stéphane' | 'Roméo' | 'Alliance';
  speakerBadge: string;
  speakerColor: 'white' | 'black' | 'dual';
  title: string;
  image: string;
  dialogue: string;
  action: string;
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
  type: 'cover' | 'storyboard' | 'agency';
  title: string;
  subtitle: string;
  tagline?: string;
  quote?: string;
  activeVerbs: number[];
  panels: SlidePanel[];                // 3 visuels Série Karting Bénin
  docuPanels?: AgencyEpisodePanel[];   // 3 visuels Série AAA
  masterCoverImage?: string;
  secondaryCoverImage?: string;
  manifesto?: {
    headline: string;
    quote?: string;
    points: {
      num?: string;
      title: string;
      text: string;
    }[];
  };

  // NOUVEAU TRIPTYQUE CENTRAL (Karting Bénin | AAA | Le sens)
  synopsisKarting?: string;
  synopsisAaa?: string;
  sensBenin?: string;

  // DEUX ENCADRÉS EN MIROIR (Façon de filmer & Ambiance audio)
  realisationKarting?: string;
  audioKarting?: string;
  realisationAaa?: string;
  audioAaa?: string;

  // Compatibilité & clés sonores
  audioKey: string;
  filRougeSonoreText?: string;
  seriesEpisodeTitle?: string;
  seriesEpisodeDesc?: string;
  docuEpisodeTitle?: string;
  docuEpisodeDesc?: string;
  imageText?: string;
  sensText?: string;
  notreForceTitle?: string;
  notreForceText?: string;
}

export const SLIDES: SlideData[] = [
  // SLIDE 01 — COUVERTURE & MANIFESTE
  {
    id: 1,
    slideNumber: "01",
    type: "cover",
    title: "GO BEYOND",
    subtitle: "BD numériques · Deux séries",
    tagline: "KARTING BÉNIN & AAA",
    activeVerbs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    masterCoverImage: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
    secondaryCoverImage: "/src/assets/images/poster_serie_aaa_moderne_1791447856263.jpg",
    manifesto: {
      headline: "Le Manifeste",
      quote: "Ce projet est né pour propulser Afrikafun Production bien au-delà de la production classique en intégrant l'IA : passer de la simple idée à la fabrication concrète de deux séries miroirs, hisser nos compétences au niveau d'experts mondiaux, et démontrer depuis Cotonou qu'un studio béninois peut concevoir des œuvres de calibre international avec un modèle 100% clé en main pour Stéphane.",
      points: [
        {
          num: "01",
          title: "BEYOND · Au-delà de l'existant",
          text: "Propulser Afrikafun d'un studio classique vers un pôle d'avant-garde intégrant l'IA générative au cœur de sa fabrication."
        },
        {
          num: "02",
          title: "BEYOND · Au-delà des limitations",
          text: "Briser les plafonds budgétaires et les délais traditionnels : produire des œuvres cinématographiques ambitieuses à coûts et cadences maîtrisés."
        },
        {
          num: "03",
          title: "BEYOND · Au-delà de nos compétences",
          text: "Hisser immédiatement nos équipes au niveau d'experts mondiaux en maîtrise des pipelines génératifs, 3D hybride et cohérence narrative."
        },
        {
          num: "04",
          title: "BEYOND · Au-delà des frontières",
          text: "Prouver depuis Cotonou qu'un studio béninois peut concevoir des œuvres internationales prêtes à être exportées dans le monde entier."
        },
        {
          num: "05",
          title: "BEYOND · Au-delà de la théorie",
          text: "Sortir des discours et des promesses : fabriquer concrètement deux séries complètes en miroir pour éprouver notre savoir-faire en conditions réelles."
        },
        {
          num: "06",
          title: "BEYOND · Au-delà de la charge : le clé en main",
          text: "Bâtir pour Stéphane une agence autonome et rentable (AAA), entièrement structurée, sans lui imposer la moindre charge de gestion opérationnelle."
        }
      ]
    },
    panels: [
      {
        id: "hero_master",
        title: "Karting Bénin — La Passion du Circuit",
        image: "/src/assets/images/master_hero_combinaison_1791247080379.jpg",
        caption: "Les pilotes en combinaison de course face au futur karting international du Bénin"
      }
    ],
    synopsisKarting: "La quête d'un karting international au Bénin portée par l'ingéniosité et la ferveur populaire de la jeunesse béninoise.",
    synopsisAaa: "L'aventure réelle de la création d'Afrikafun AI Agency par Stéphane Brabant et Roméo Nonvide en totale synergie.",
    sensBenin: "Démontrer que le Bénin réunit le sport automobile de haut niveau et l'audiovisuel augmenté pour rayonner avec fierté dans le monde.",
    realisationKarting: "Caméra dynamique au ras du bitume, lumière naturelle ocre et immersion cinématographique de haute vitesse.",
    audioKarting: "Rugissement de moteurs 2-temps, frottement de pneus slicks sur les vibreurs et clameur festive du littoral atlantique.",
    realisationAaa: "Immersion documentaire en studio à Cotonou, prises de vue aériennes par drone sur les grands chantiers et moments de vie fraternels.",
    audioAaa: "Textures sonores vivantes de Cotonou, percussions nobles, voix de plateau broadcast et nappe musicale contemporaine.",
    audioKey: "01_reve"
  },

  // SLIDE 02 — ÉPISODE 1
  {
    id: 2,
    slideNumber: "02",
    type: "storyboard",
    title: "Rêver · Oser",
    subtitle: "Épisode 1",
    quote: "« Rêver, c'est imaginer l'avenir. Oser, c'est poser la première planche. »",
    activeVerbs: [0, 1],
    panels: [
      {
        id: "kb1_dream",
        title: "L'étincelle du rêve",
        image: "/src/assets/images/rever_etincelle_reve_1791210780013.jpg",
        caption: "L'enfant imagine le circuit dans la terre rouge"
      },
      {
        id: "kb1_stones",
        title: "Le tracé imaginaire",
        image: "/src/assets/images/rever_trace_imaginaire_1791210883547.jpg",
        caption: "Tracé au bâton des virages et karts au sol"
      },
      {
        id: "kb1_craft",
        title: "L'assemblage artisanal",
        image: "/src/assets/images/rever_assemblage_artisanal_1791210933284.jpg",
        caption: "Assemblage du châssis en bois et direction"
      }
    ],
    docuPanels: [
      {
        id: "aaa1_stephane",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "Le rêve d'Afrikafun",
        image: "/src/assets/images/aaa_ep1_stephane_reve_1791450904689.jpg",
        dialogue: "« Afrikafun est solide avec Mon beau Bénin et mes tournages, mais je rêve de faire grandir ma société grâce à l'IA. »",
        action: "Stéphane dans son studio audiovisuel à Cotonou, rêvant d'augmenter sa société grâce aux flux d'IA générative."
      },
      {
        id: "aaa1_romeo",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Le retour aux racines",
        image: "/src/assets/images/aaa_ep1_romeo_retour_1791450921877.jpg",
        dialogue: "« Après 10 ans en France et mon tour du monde, j'ai osé revenir m'installer à Cotonou pour aider mon pays à avancer. »",
        action: "Roméo débarque à Cotonou face à l'Océan, déterminé à mettre la technologie et l'IA au service de sa terre natale."
      },
      {
        id: "aaa1_alliance",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "L'audace partagée",
        image: "/src/assets/images/aaa_ep1_audace_alliance_1791450939734.jpg",
        dialogue: "« Oser s'associer : Stéphane ose sauter le pas de l'IA, Roméo apporte l'architecture logicielle clé en main. »",
        action: "Rencontre stimulante sur une terrasse de Cotonou : pacte d'audace entre l'expertise broadcast et l'IA générative."
      }
    ],
    synopsisKarting: "Dans les ruelles ocre de Cotonou, un jeune garçon fabrique son premier bolide en bois. Sans moyens mais guidé par une passion sans limite, il trace son circuit au sol et imagine déjà les vibreurs d'une arène mondiale.",
    synopsisAaa: "D'un côté, Stéphane rêve de faire grandir sa société grâce à l'IA et ose franchir le pas. De l'autre, Roméo rêve de revenir s'installer au Bénin après son tour du monde et a osé ce retour pour aider son pays à progresser.",
    sensBenin: "La rencontre féconde de deux audaces : celle d'un entrepreneur enraciné qui ose l'innovation de rupture, et celle d'un talent de la diaspora qui choisit de revenir bâtir sur sa terre natale.",
    realisationKarting: "Plans serrés au ras de la terre rouge, poussière ocre en suspension et lumière rasante captant le geste artisanal de l'enfant.",
    audioKarting: "Craquement du bois, roulements qui grincent sur la terre sèche, souffle chaud du vent et premier rugissement de moteur imaginaire.",
    realisationAaa: "Immersion posée dans les locaux d'Afrikafun, contre-plongées sur les visages déterminés et plans moyens sur les équipements de tournage.",
    audioAaa: "Rumeur feutrée de la ville de Cotonou, cliquetis de clavier, discussions passionnées et accords chauds de guitare acoustique.",
    audioKey: "01_reve"
  },

  // SLIDE 03 — ÉPISODE 2
  {
    id: 3,
    slideNumber: "03",
    type: "storyboard",
    title: "Jouer · Rencontrer",
    subtitle: "Épisode 2",
    quote: "« Jouer, c'est tester ses limites. Rencontrer, c'est trouver qui croit en son rêve. »",
    activeVerbs: [2, 3],
    panels: [
      {
        id: "kb2_run",
        title: "La course dans la poussière",
        image: "/src/assets/images/jouer_course_poussiere_1791211122585.jpg",
        caption: "Course joyeuse dans la poussière ocre"
      },
      {
        id: "kb2_glass",
        title: "L'obstacle et la tour",
        image: "/src/assets/images/rencontrer_diptyque_1791211142944.jpg",
        caption: "La vitre de la tour contemporaine"
      },
      {
        id: "kb2_gaze",
        title: "La connexion des regards",
        image: "/src/assets/images/rencontrer_regard_plongee_1791211159035.jpg",
        caption: "L'architecte observe l'enfant depuis la tour"
      }
    ],
    docuPanels: [
      {
        id: "aaa2_plateau",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "Le tournage en plateau",
        image: "/src/assets/images/aaa_ep2_tournage_plateau_1791450957291.jpg",
        dialogue: "« Aujourd'hui dans mon émission, je reçois Roméo. Dès les premières prises sous les projecteurs, je sens un potentiel énorme. »",
        action: "Stéphane filme et interviewe Roméo sur le plateau de son émission."
      },
      {
        id: "aaa2_invite",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "L'invité de Stéphane",
        image: "/src/assets/images/aaa_ep2_invite_romeo_1791450972005.jpg",
        dialogue: "« Face aux caméras d'Afrikafun, j'explique comment l'IA peut décupler la création audiovisuelle en Afrique de l'Ouest. »",
        action: "Présentation des concepts d'audiovisuel augmenté en direct."
      },
      {
        id: "aaa2_alchimie",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "L'alchimie immédiate",
        image: "/src/assets/images/aaa_ep2_alchimie_regie_v2_1791452106391.jpg",
        dialogue: "« Coupez ! Dès la fin du tournage, la discussion continue en régie : “On doit monter une agence ensemble, maintenant.” »",
        action: "Déclic instantané et passage immédiat de l'émission au partenariat."
      }
    ],
    synopsisKarting: "Taro dévale la pente avec son kart artisanal et percute un obstacle devant une tour futuriste. En levant les yeux, il croise le regard de Gaïa, architecte visionnaire qui observe la scène depuis sa baie vitrée.",
    synopsisAaa: "La rencontre se produit en studio : Roméo devient l'invité d'une émission produite par Stéphane. Stéphane le filme sur le plateau, l'alchimie opère instantanément et débouche sur l'envie commune de s'associer.",
    sensBenin: "La capacité des médias béninois à servir de ponts d'accélération, révélant les talents et transformant une simple interview télévisée en projet d'entreprise ambitieux.",
    realisationKarting: "Travelling au ras du sol dans la poussière, choc mat, puis ascension verticale vertigineuse le long de la façade vitrée étincelante.",
    audioKarting: "Cris de joie d'enfants, freinage sec, résonance de la baie vitrée et silence suspendu marquant le basculement du destin.",
    realisationAaa: "Éclairage chaud de plateau télévisé, plans régie broadcast, découpage dynamique entre le présentateur et son invité.",
    audioAaa: "Clap de tournage, résonance de micro cravate, applaudissements de l'équipe et discussions enthousiastes dès l'arrêt des caméras.",
    audioKey: "02_rencontre"
  },

  // SLIDE 04 — ÉPISODE 3
  {
    id: 4,
    slideNumber: "04",
    type: "storyboard",
    title: "Imaginer · Dessiner",
    subtitle: "Épisode 3",
    quote: "« Imaginer, c'est voir l'invisible. Dessiner, c'est lui donner une trajectoire. »",
    activeVerbs: [4, 5],
    panels: [
      {
        id: "kb3_sketch",
        title: "Le carnet de croquis",
        image: "/src/assets/images/imaginer_carnet_croquis_1791211202884.jpg",
        caption: "Gaïa esquisse les virages du futur karting"
      },
      {
        id: "kb3_skyline",
        title: "L'atelier face à Cotonou",
        image: "/src/assets/images/dessiner_bureau_skyline_1791211220618.jpg",
        caption: "Table à dessin et skyline maritime en fond"
      },
      {
        id: "kb3_cad",
        title: "Le plan CAO architectural",
        image: "/src/assets/images/dessiner_plan_cad_kd_1791212938094.jpg",
        caption: "Plans DWG et spécifications techniques"
      }
    ],
    docuPanels: [
      {
        id: "aaa3_romeo_work",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Roméo devant ses écrans",
        image: "/src/assets/images/aaa_ep3_romeo_ecrans_1791452124157.jpg",
        dialogue: "« Devant mon ordinateur, j'imagine les pipelines de travail de la future agence IA : génération d'images, interpolation 3D et prompt design. »",
        action: "Roméo conçoit l'architecture logicielle et les workflows d'automatisation."
      },
      {
        id: "aaa3_stephane_vision",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "Le cadre broadcast",
        image: "/src/assets/images/aaa_ep3_stephane_vision_1791452138768.jpg",
        dialogue: "« Roméo, le rendu doit rivaliser avec les plus grandes productions télévisées. Je veux un studio capable de livrer du sur-mesure clé en main. »",
        action: "Stéphane définit les exigences de qualité et le positionnement marché."
      },
      {
        id: "aaa3_plan_agence",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "L'esquisse d'AAA",
        image: "/src/assets/images/aaa_ep3_alliance_blueprint_1791452155068.jpg",
        dialogue: "« Sur nos écrans, l'agence AAA prend forme concrète : une entité autonome prête à révolutionner la production de contenu. »",
        action: "Validation de la feuille de route technique et créative."
      }
    ],
    synopsisKarting: "Impressionnée par la détermination de Taro, Gaïa ouvre son carnet de croquis. Le modeste kart en bois se métamorphose sur le papier en un tracé international de karting homologué FIA, longeant le littoral atlantique.",
    synopsisAaa: "Séances de travail créatives entre Stéphane et Roméo. Roméo passe des heures devant son ordinateur à esquisser et programmer l'infrastructure de la future agence d'intelligence artificielle de Stéphane.",
    sensBenin: "L'intelligence conceptuelle mise au service du territoire : passer de l'intuition brute à une ingénierie de pointe respectant les plus hauts standards internationaux.",
    realisationKarting: "Mine graphite glissant sur le papier à dessin, courbes tendues des vibreurs, fondu enchaîné élégant vers les plans d'architecture DWG.",
    audioKarting: "Frottement rythmé du crayon sur le papier grain, souffle léger, nappe de synthétiseur montante et note de piano limpide.",
    realisationAaa: "Moniteurs rétroéclairés dans le studio de Cotonou, reflets sur les lunettes de Roméo, plans d'ensemble sur le tableau de bord de production.",
    audioAaa: "Ventilation douce des stations de travail, clics de souris cadencés, échanges techniques denses et gorgées de café.",
    audioKey: "03_croquis"
  },

  // SLIDE 05 — ÉPISODE 4
  {
    id: 5,
    slideNumber: "05",
    type: "storyboard",
    title: "Concevoir · Bâtir",
    subtitle: "Épisode 4",
    quote: "« Concevoir, c'est modéliser l'espace. Bâtir, c'est élever la terre vers le futur. »",
    activeVerbs: [6, 7],
    panels: [
      {
        id: "kb4_arch",
        title: "La modélisation de l'arène",
        image: "/src/assets/images/concevoir_maquette_build_1791211549362.jpg",
        caption: "Maquette en volume et structure du complexe"
      },
      {
        id: "kb4_kart",
        title: "L'implantation du tracé",
        image: "/src/assets/images/concevoir_kart_maquette_1791211566792.jpg",
        caption: "Intégration du kart de compétition et des dégagements"
      },
      {
        id: "kb4_night",
        title: "Le complexe sous les projecteurs",
        image: "/src/assets/images/batir_complexe_nuit_lumieres_1791211586769.jpg",
        caption: "Éclairage nocturne des tribunes et de la piste"
      }
    ],
    docuPanels: [
      {
        id: "aaa4_visio",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "Appels visio réguliers",
        image: "/src/assets/images/stephane_drone_pilot_1791446541819.jpg",
        dialogue: "« Même quand je suis sur le terrain, on se cale des points en visio. Les maquettes d'AAA avancent avec une fluidité remarquable. »",
        action: "Suivi agile sans surcharge administrative pour Stéphane."
      },
      {
        id: "aaa4_bar",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Soirées conviviales à Cotonou",
        image: "/src/assets/images/aaa_ep4_bar_cotonou_1791451004629.jpg",
        dialogue: "« On se retrouve dans un bar de Haie Vive, on boit un verre, on rigole, on apprend à se connaître. L'amitié s'installe naturellement. »",
        action: "Moments de détente et de complicité dans les soirées de Cotonou."
      },
      {
        id: "aaa4_amitie",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "L'amitié scelle le projet",
        image: "/src/assets/images/aaa_ep4_amitie_voiture_1791487979331.jpg",
        dialogue: "« En voiture à travers les rues de Cotonou, on refait le monde, on partage nos visions et nos rires. Une amitié fraternelle et durable s'installe. »",
        action: "Complicité sur la route et discussions passionnées scellant l'alliance."
      }
    ],
    synopsisKarting: "Dans l'agence d'architecture, Gaïa pose délicatement le kart miniature sur le diorama 3D. Soudain, le bâtiment s'illumine : les projecteurs de la piste s'allument, préfigurant l'arène nocturne internationale.",
    synopsisAaa: "Entre deux sessions intenses, Stéphane et Roméo sillonnent Cotonou en voiture, discutent avec passion, rient et confrontent leurs visions : une profonde amitié fraternelle s'installe et consolide durablement leur partenariat.",
    sensBenin: "La convivialité béninoise comme terreau d'affaires : la démonstration que les plus grands projets durables s'appuient sur des relations humaines sincères et chaleureuses.",
    realisationKarting: "Macro sur le kart miniature positionné sur le virage, allumage progressif des faisceaux LED et révélation du tracé illuminé.",
    audioKarting: "Bruit de pas feutrés, déclic de relais électrique et grondement sourd d'un moteur 2-temps qui émerge de la maquette.",
    realisationAaa: "Ambiance nocturne chaleureuse de Cotonou, lumières tamisées de bar, verres qui trinquent, sourires et accolade fraternelle.",
    audioAaa: "Rythmes d'afrobeat entraînants, rumeur joyeuse de la nuit béninoise, éclats de rire complices et tintement de verres.",
    audioKey: "04_maquette"
  },

  // SLIDE 06 — ÉPISODE 5
  {
    id: 6,
    slideNumber: "06",
    type: "storyboard",
    title: "S'équiper · Frémir",
    subtitle: "Épisode 5",
    quote: "« S'équiper, c'est endosser son ambition. Frémir, c'est sentir le cœur battre au signal. »",
    activeVerbs: [8, 9],
    panels: [
      {
        id: "kb5_suit",
        title: "La combinaison de course",
        image: "/src/assets/images/sequiper_paddock_gear_1791211723227.jpg",
        caption: "Ajustement du casque et des gants de pilote"
      },
      {
        id: "kb5_pov",
        title: "La vision ras du sol",
        image: "/src/assets/images/fremir_cockpit_volant_1791211739896.jpg",
        caption: "Mains gantées sur le volant alcantara, baquet ras du sol"
      },
      {
        id: "kb5_lights",
        title: "Les cinq feux rouges",
        image: "/src/assets/images/fremir_cinq_feux_rouges_1791211757204.jpg",
        caption: "Les feux s'allument un à un sur la grille"
      }
    ],
    docuPanels: [
      {
        id: "aaa5_salons",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Salons IA & Dossiers stratégiques",
        image: "/src/assets/images/aaa_ep5_romeo_salon_ia_1791451019865.jpg",
        dialogue: "« Je parcours les salons d'intelligence artificielle de la région et je rédige les dossiers stratégiques pour propulser l'entreprise de Stéphane. »",
        action: "Veille technologique aux avant-postes et structuration des offres d'AAA."
      },
      {
        id: "aaa5_drone",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "Télépilote & Grands chantiers",
        image: "/src/assets/images/aaa_ep5_stephane_terrain_drone_1791452190461.jpg",
        dialogue: "« En parallèle, je pilote mes drones sur les chantiers côtiers et je rencontre le gouvernement pour négocier des contrats de production majeurs. »",
        action: "Direction des équipes terrain et démarchage institutionnel de haut niveau."
      },
      {
        id: "aaa5_synergie",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "L'équipement de l'agence",
        image: "/src/assets/images/aaa_ep5_equiper_studio_synergie_1791452207597.jpg",
        dialogue: "« Stéphane sur le front institutionnel et terrain, Roméo à la pointe de l'ingénierie : l'agence s'équipe des meilleures armes. »",
        action: "Double force de frappe commerciale et technologique."
      }
    ],
    synopsisKarting: "Taro enfile sa combinaison officielle et rabat la visière fumée de son casque. Sanglé dans le baquet de compétition, les mains crispées sur le volant, il fixe le portique de départ où les cinq feux rouges s'allument un à un.",
    synopsisAaa: "Roméo visite des salons d'intelligence artificielle et rédige des dossiers stratégiques pour l'entreprise de Stéphane. En parallèle, Stéphane pilote ses drones sur les grands chantiers et rencontre le gouvernement béninois pour proposer des contrats de production.",
    sensBenin: "La stature d'un Bénin moderne : des institutions ouvertes à l'innovation et des créateurs locaux capables de répondre aux plus grandes commandes publiques et privées.",
    realisationKarting: "Caméra subjective sous la visière fumée, pénombre, gros plan sur les doigts gantés agrippant le volant en pleine montée d'adrénaline.",
    audioKarting: "Respiration contenue sous le casque, bip sonore synchronisé à chaque feu rouge qui s'allume et montée en tension mécanique.",
    realisationAaa: "Montage alterné dynamique entre le vol majestueux du drone de Stéphane sur la côte et les réunions stratégiques de Roméo avec ses dossiers.",
    audioAaa: "Sifflement vif des pales de drone dans le ciel ensoleillé, souffle du vent marin et voix solennelles en salle de réunion institutionnelle.",
    audioKey: "05_depart"
  },

  // SLIDE 07 — ÉPISODE 6
  {
    id: 7,
    slideNumber: "07",
    type: "storyboard",
    title: "S'engager · Se dépasser",
    subtitle: "Épisode 6",
    quote: "« S'engager, c'est plonger à la corde. Se dépasser, c'est refuser la deuxième place. »",
    activeVerbs: [10, 11],
    panels: [
      {
        id: "kb6_green",
        title: "Extinction des feux",
        image: "/src/assets/images/sengager_feux_depart_1791211775501.jpg",
        caption: "Départ arrêté, fumée des pneus sur la grille"
      },
      {
        id: "kb6_drift",
        title: "La friction sur le vibreur",
        image: "/src/assets/images/sengager_pneu_virage_1791211790532.jpg",
        caption: "Friction du pneu slick sur le vibreur"
      },
      {
        id: "kb6_duel",
        title: "Le duel à la corde",
        image: "/src/assets/images/sedepasser_duel_karts_1791211804690.jpg",
        caption: "Dépassement millimétré à pleine vitesse"
      }
    ],
    docuPanels: [
      {
        id: "aaa6_poignee",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "La poignée de main officielle",
        image: "/src/assets/images/aaa_ep6_poignee_main_mature_1791452223407.jpg",
        dialogue: "« On se sert la main : l'alliance est scellée. On s'engage corps et âme pour faire d'AAA une référence incontournable. »",
        action: "Signature et formalisation définitive de l'association."
      },
      {
        id: "aaa6_autoperso",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Se choisir soi-même en héros",
        image: "/src/assets/images/poster_serie_aaa_moderne_1791447856263.jpg",
        dialogue: "« Pour la série AAA, on décide de se mettre nous-mêmes en scène : nos visages, notre travail, nos doutes et notre détermination. »",
        action: "Choix audacieux de s'incarner personnellement dans la série documentaire."
      },
      {
        id: "aaa6_depassement",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "Le dépassement en production",
        image: "/src/assets/images/aaa_ep6_rush_production_duo_1791452240855.jpg",
        dialogue: "« Deux séries créées en miroir, une cadence de folie : on se dépasse pour démontrer la puissance du modèle d'agence. »",
        action: "Lancement du pipeline de fabrication intensive."
      }
    ],
    synopsisKarting: "Extinction des feux ! Les karts s'élancent dans un rugissement de moteurs. Taro prend l'extérieur, plonge à la corde et livre un duel millimétré roue contre roue, mordant les vibreurs peints aux couleurs nationales.",
    synopsisAaa: "Poignée de main officielle entre Stéphane et Roméo. Ils s'engagent pleinement et prennent une décision audacieuse : se choisir eux-mêmes comme protagonistes de la première série AAA pour incarner la transformation.",
    sensBenin: "Le courage des créateurs qui n'hésitent pas à s'engager personnellement et à porter haut les couleurs de leur pays avec authenticité et détermination.",
    realisationKarting: "Travelling décoiffant à 110 km/h au ras du bitume, caméras embarquées tremblantes d'intensité et fumée de gommage au démarrage.",
    audioKarting: "Hurlement des moteurs 2-temps poussés à 14 000 tr/min, claquement des passages de rapports et hurlement des gommes sur l'asphalte.",
    realisationAaa: "Cadrage solennel en contre-plongée sur la poignée de main, gros plan sur la signature de la charte de production d'AAA.",
    audioAaa: "Accord noble de violoncelles, battement solennel de percussions et tintement numérique d'un rendu 3D validé avec succès.",
    audioKey: "06_course"
  },

  // SLIDE 08 — ÉPISODE 7
  {
    id: 8,
    slideNumber: "08",
    type: "storyboard",
    title: "Rassembler · Vibrer",
    subtitle: "Épisode 7",
    quote: "« Rassembler, c'est unir toutes les générations. Vibrer, c'est faire battre un peuple à l'unisson. »",
    activeVerbs: [12, 13],
    panels: [
      {
        id: "kb7_family",
        title: "L'arrivée des familles",
        image: "/src/assets/images/rassembler_entree_famille_1791211823743.jpg",
        caption: "Familles béninoises au village du karting"
      },
      {
        id: "kb7_terrace",
        title: "La terrasse panoramique",
        image: "/src/assets/images/rassembler_terrasse_vie_1791211848213.jpg",
        caption: "Vue sur le circuit et coucher de soleil"
      },
      {
        id: "kb7_crowd",
        title: "La clameur des tribunes",
        image: "/src/assets/images/vibrer_foule_tribunes_1791211862994.jpg",
        caption: "Foule en liesse au passage des bolides"
      }
    ],
    docuPanels: [
      {
        id: "aaa7_recrutement",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "L'équipe s'agrandit",
        image: "/src/assets/images/aaa_ep7_stephane_recrutement_1791452258524.jpg",
        dialogue: "« On commence à rencontrer d'autres talents, à passer des interviews et à structurer une véritable équipe autour de nous. »",
        action: "Entretiens et constitution des pôles de production d'AAA."
      },
      {
        id: "aaa7_mondial",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Spécialistes du monde entier",
        image: "/src/assets/images/aaa_ep7_romeo_experts_monde_1791452273242.jpg",
        dialogue: "« Nous échangeons avec des spécialistes de l'IA et de l'animation à l'international pour les associer à nos productions béninoises. »",
        action: "Connexion du studio de Cotonou aux réseaux d'experts internationaux."
      },
      {
        id: "aaa7_vibration",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "Faire vibrer l'écosystème",
        image: "/src/assets/images/aaa_ep7_equipe_vibration_cotonou_1791452318605.jpg",
        dialogue: "« Cotonou vibre : partenaires, créateurs et diffuseurs se rassemblent autour de notre dynamique. Le mouvement est lancé. »",
        action: "Adhésion générale du marché et des partenaires."
      }
    ],
    synopsisKarting: "Les tribunes s'embrasent ! Familles, jeunes et passionnés se rassemblent sur les terrasses du complexe pour vibrer ensemble au son des moteurs. La course devient une fête populaire et un motif de fierté nationale.",
    synopsisAaa: "L'équipe s'agrandit : Stéphane et Roméo mènent des entretiens et échangent avec des spécialistes du monde entier qu'ils intègrent à la dynamique d'AAA pour faire rayonner le studio depuis Cotonou.",
    sensBenin: "L'attractivité du Bénin : la capacité de rassembler des compétences locales et internationales autour d'une vision d'excellence partagée.",
    realisationKarting: "Plans d'ensemble lumineux sur les tribunes baignées par la lumière dorée de l'Atlantique, sourires des spectateurs et drapeaux agités.",
    audioKarting: "Polyrythmie festive, percussions traditionnelles béninoises, clameur joyeuse de la foule et klaxons de supporters.",
    realisationAaa: "Mosaïque de visioconférences avec des spécialistes internationaux, open space vibrant à Cotonou et réunions d'équipe stimulantes.",
    audioAaa: "Brouhaha créatif d'équipe, sonneries de notifications, rires et applaudissements spontanés lors de la validation des projets.",
    audioKey: "07_tribunes"
  },

  // SLIDE 09 — ÉPISODE 8
  {
    id: 9,
    slideNumber: "09",
    type: "storyboard",
    title: "Transmettre · S'élever",
    subtitle: "Épisode 8",
    quote: "« Transmettre, c'est passer le relais. S'élever, c'est hisser tout un pays vers les sommets. »",
    activeVerbs: [14, 15],
    panels: [
      {
        id: "kb8_pride",
        title: "La fierté partagée",
        image: "/src/assets/images/transmettre_fierte_enfant_1791211879898.jpg",
        caption: "Regard confiant des pilotes au terme du parcours"
      },
      {
        id: "kb8_relais",
        title: "La transmission du casque",
        image: "/src/assets/images/transmettre_relais_benin_1791212278040.jpg",
        caption: "Passage de relais symbolique et fierté béninoise"
      },
      {
        id: "kb8_sunset",
        title: "Le complexe face à l'Océan",
        image: "/src/assets/images/selever_complexe_plage_1791211914185.jpg",
        caption: "Le tracé international baigné par le soleil couchant atlantique"
      }
    ],
    docuPanels: [
      {
        id: "aaa8_formation",
        speaker: "Roméo",
        speakerBadge: "ROMÉO",
        speakerColor: "black",
        title: "Former les jeunes du Bénin",
        image: "/src/assets/images/aaa_ep8_formation_jeunes_1791451052358.jpg",
        dialogue: "« Nous sélectionnons des jeunes du Bénin pour les former à l'IA. Transmettre nos méthodes pour qu'ils deviennent les fers de lance du studio. »",
        action: "Mise en place du programme de formation locale aux technologies d'IA."
      },
      {
        id: "aaa8_agence_top",
        speaker: "Stéphane",
        speakerBadge: "STÉPHANE",
        speakerColor: "white",
        title: "La première agence de la région",
        image: "/src/assets/images/aaa_ep8_stephane_agence_panoramique_1791452335711.jpg",
        dialogue: "« Faire d'AAA la plus grande agence d'IA du Bénin et d'Afrique de l'Ouest : la mission est accomplie, le modèle tourne en totale autonomie. »",
        action: "Pérennisation et souveraineté de l'agence de Stéphane."
      },
      {
        id: "aaa8_elevation",
        speaker: "Alliance",
        speakerBadge: "STÉPHANE & ROMÉO",
        speakerColor: "dual",
        title: "S'élever ensemble",
        image: "/src/assets/images/aaa_ep8_elevation_terrasse_avenir_1791452353420.jpg",
        dialogue: "« En transmettant le savoir aux jeunes béninois, c'est tout un pays qui s'élève vers les sommets de la création mondiale. »",
        action: "Ouverture officielle de l'Agence AAA sur la scène internationale."
      }
    ],
    synopsisKarting: "Sur le podium face à l'Océan Atlantique baigné d'or, le casque de course est transmis à un jeune enfant de la foule. Gaïa contemple le complexe achevé : ce qui était une esquisse dans la poussière est devenu un phare international pour la jeunesse béninoise.",
    synopsisAaa: "Transmettre et s'élever : Stéphane et Roméo sélectionnent et forment de jeunes talents béninois à l'IA afin de faire d'AAA la plus grande agence d'intelligence artificielle du Bénin et d'Afrique de l'Ouest.",
    sensBenin: "La souveraineté créative et technologique du Bénin : former sa propre jeunesse pour qu'elle maîtrise les technologies du futur et hisse le continent vers l'excellence.",
    realisationKarting: "Contre-plongée héroïque sous le ciel couchant, passage de témoin solennel, travelling arrière dévoilant le circuit complet face à la mer.",
    audioKarting: "Mélodie triomphale ample, percussions nobles, souffle d'espoir épanoui et sillage lointain d'un kart sur la ligne droite.",
    realisationAaa: "Salle de formation lumineuse avec la première promotion de jeunes créateurs béninois concentrés devant leurs stations, Stéphane et Roméo à leurs côtés.",
    audioAaa: "Voix bienveillantes de transmission, acclamation enthousiaste des étudiants et mélodie contemporaine d'élévation.",
    audioKey: "08_victoire"
  },

  // SLIDE 10 — CONCLUSION & AGENCE AAA
  {
    id: 10,
    slideNumber: "10",
    type: "agency",
    title: "L'Agence AAA",
    subtitle: "AFRIKAFUN AI AGENCY",
    tagline: "AFRIKAFUN AI AGENCY · KARTING BÉNIN & AAA · DEUX SÉRIES EN MIROIR",
    quote: "« Allier l'intelligence artificielle, l'art narratif et l'ambition africaine pour donner vie aux projets les plus audacieux. »",
    activeVerbs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    panels: [
      {
        id: "p9_agency_1",
        title: "Le Studio de Création",
        image: "/src/assets/images/agence_ia_studio_office_1791409217543.jpg",
        caption: "Studio numérique de production IA à Cotonou"
      },
      {
        id: "p9_agency_2",
        title: "L'Atelier d'Architecture",
        image: "/src/assets/images/dessiner_bureau_skyline_1791211220618.jpg",
        caption: "Conception architecturale et intégration urbaine"
      },
      {
        id: "p9_agency_3",
        title: "La Vision Réalisée",
        image: "/src/assets/images/batir_complexe_nuit_lumieres_1791211586769.jpg",
        caption: "Le complexe de karting sous les étoiles du Bénin"
      }
    ],
    synopsisKarting: "La série « Karting Bénin » prouve la viabilité narrative et promotionnelle du projet de karting international au Bénin : un contenu premium capable de captiver le grand public et de séduire les partenaires.",
    synopsisAaa: "L'Agence AAA est désormais opérationnelle, formée et autonome : Stéphane dispose d'une agence clé en main qui génère de la valeur pour Afrikafun sans solliciter son temps au quotidien.",
    sensBenin: "L'accomplissement d'une vision : une agence pionnière en Afrique de l'Ouest qui prouve que Cotonou invente le futur du divertissement et de la technologie.",
    realisationKarting: "Triptyque d'art contemporain réunissant le studio de production, la table d'architecture et le complexe illuminé face à l'océan.",
    audioKarting: "Thème musical triomphal clôturant avec grandeur l'épopée sportive.",
    realisationAaa: "Plans chaleureux sur l'équipe formée au travail dans les studios d'Afrikafun Prod à Cotonou.",
    audioAaa: "Harmonie contemporaine et percussions subtiles évoquant l'élan d'une Afrique conquérante.",
    audioKey: "08_victoire"
  }
];
