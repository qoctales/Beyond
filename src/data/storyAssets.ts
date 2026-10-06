/**
 * Asset Registry for AFRIKAFUN - Projet Karting Bénin
 * 
 * Ce fichier centralise toutes les images du projet et respecte la structure 
 * demandée pour faciliter le remplacement ultérieur par les images finales 
 * issues des rendus 3D ou des prises de vue réelles.
 * 
 * Structure des dossiers recommandée pour les assets définitifs :
 * /public/images/dream/       -> 01 & 02 : L'enfant, la maquette artisanale, le rêve
 * /public/images/design/      -> 02 : L'architecte, les plans DWG, croquis, modélisation
 * /public/images/circuit/     -> 03 : Vues aériennes, plans de masse, wireframe, pistes
 * /public/images/experience/  -> 04 : Karts (Enfants, Juniors, Adultes, Biplaces), accueil, briefing
 * /public/images/lightsout/   -> 05 : Gros plans casques, visières, volants, feux de départ
 * /public/images/race/        -> 06 : Caméra embarquée, vitesse, dépassements, virages
 * /public/images/final/       -> 07 & 11 : Podium, coucher de soleil plage, retour au calme
 */

export interface StoryAsset {
  id: string;
  section: string;
  title: string;
  caption: string;
  shotNumber: string;
  timecode: string;
  camAngle: string;
  src: string;
  fallbackColor?: string;
  categoryFolder: string;
}

export const STORY_ASSETS = {
  // 01 — LE RÊVE & LA BULLE D'IMAGINATION (One-line sketch / Illustration)
  dreamHero: {
    id: "dream_hero_01",
    section: "01_LE_REVE",
    title: "L'enfant et sa bulle de rêve",
    caption: "Tout commence par un rêve. L'enfant dans sa cour de terre rouge imagine le tracé et son premier bolide.",
    shotNumber: "SHOT 01",
    timecode: "00:00 — 00:25",
    camAngle: "CAM / EYE-LEVEL PORTRAIT",
    src: "/src/assets/images/boy_dream_sketch_bubble_1791142373211.jpg",
    categoryFolder: "/images/dream/enfant_bulle_croquis_kart.jpg",
  },

  // 02 — LE RELAIS : DE L'ENFANT À L'ARCHITECTE
  architectRelay: {
    id: "architect_relay_02",
    section: "02_LE_REVE_PREND_FORME",
    title: "Le regard croisé et le relais",
    caption: "L'enfant lève les yeux vers l'immeuble vitré. L'architecte aperçoit le jeune rêveur et s'apprête à donner vie à son ambition.",
    shotNumber: "SHOT 05",
    timecode: "00:25 — 00:40",
    camAngle: "CAM / REVERSE OVERLOOK WINDOW",
    src: "/src/assets/images/architect_window_relay_1791142385710.jpg",
    categoryFolder: "/images/design/architecte_relais_fenetre.jpg",
  },

  // 02B — DE LA MAQUETTE 3D AU DIORAMA
  architectDiorama: {
    id: "architect_diorama_02b",
    section: "02_LE_REVE_PREND_FORME",
    title: "La maquette d'étude et le diorama 3D",
    caption: "L'architecte pose le kart miniature #7 sur la maquette physique du circuit, face aux plans numériques Revit.",
    shotNumber: "SHOT 10",
    timecode: "00:40 — 00:55",
    camAngle: "CAM / MACRO TABLETOP DIORAMA",
    src: "/src/assets/images/architect_diorama_model_1791142397085.jpg",
    categoryFolder: "/images/design/maquette_diorama_bureau.jpg",
  },

  // 03 — LE COMPLEXE RÉALISTE DE NUIT (RÉALISME & LUXE)
  circuitMasterNight: {
    id: "circuit_master_night_03",
    section: "03_LE_CIRCUIT_PREND_VIE",
    title: "Le complexe ultra-réaliste illuminé",
    caption: "Vue aérienne crépusculaire du complexe de karting : piste éclairée, paddocks vitrés, restaurant et promenade familiale.",
    shotNumber: "SHOT 18",
    timecode: "00:55 — 01:20",
    camAngle: "CAM / AERIAL TWILIGHT MASTERSHOT",
    src: "/src/assets/images/luxury_karting_complex_night_1791142411643.jpg",
    categoryFolder: "/images/circuit/complexe_luxe_nocturne_benin.jpg",
  },

  // 05 — LIGHTS OUT (MACRO COCKPIT)
  lightsOut: {
    id: "lights_out_05",
    section: "05_LIGHTS_OUT",
    title: "Tension sur la grille de départ",
    caption: "Gros plan sur la visière irisée reflétant les 5 feux rouges. Tension maximale avant le signal.",
    shotNumber: "SHOT 35",
    timecode: "01:35 — 01:45",
    camAngle: "CAM / MACRO VISOR REFLECTION",
    src: "/src/assets/images/lights_out_cockpit_macro_1791141166211.jpg",
    categoryFolder: "/images/lightsout/visiere_volant_feux.jpg",
  },

  // 06 — ENTER THE RACE (ACTION SPRINT)
  raceAction: {
    id: "race_action_06",
    section: "06_ENTER_THE_RACE",
    title: "Pleine vitesse vers le drapeau à damier",
    caption: "Sprint final au coude-à-coude sur la piste côtière devant les tribunes en liesse.",
    shotNumber: "SHOT 52",
    timecode: "01:45 — 02:30",
    camAngle: "CAM / TRACKSIDE ULTRA HIGH-SPEED 120FPS",
    src: "/src/assets/images/race_action_finish_sunset_1791141175656.jpg",
    categoryFolder: "/images/race/karts_pleine_vitesse_sunset.jpg",
  },

  // 07 — LE RÊVE DEVIENT RÉALITÉ (PODIUM FAMILIAL SUR LA PLAGE)
  finalCelebration: {
    id: "final_celebration_07",
    section: "07_LE_REVE_DEVIENT_REALITE",
    title: "Le triomphe sur la plage du Bénin",
    caption: "L'enfant du début, désormais sur la plus haute marche du podium #1, avec la conceptrice et sa famille réunie.",
    shotNumber: "SHOT 76",
    timecode: "02:50 — 03:00",
    camAngle: "CAM / HERO LOW ANGLE SUNSET",
    src: "/src/assets/images/family_podium_celebration_1791142425911.jpg",
    categoryFolder: "/images/final/podium_victoire_plage.jpg",
  },
};

