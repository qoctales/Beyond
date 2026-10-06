/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SIXTEEN_VERBS = [
  { num: "01", verb: "RÊVER", sub: "Voir avant que cela n'existe", dual: "L'enfant rêve · Le Bénin rêve" },
  { num: "02", verb: "OSER", sub: "Pourquoi pas nous ?", dual: "L'enfant ose · Le Bénin ose" },
  { num: "03", verb: "JOUER", sub: "Découvrir. Essayer. Recommencer.", dual: "L'enfant joue · Le pays expérimente" },
  { num: "04", verb: "RENCONTRER", sub: "Le rêve rencontre une possibilité", dual: "La vision rencontre l'architecture" },
  { num: "05", verb: "IMAGINER", sub: "Voir plus loin", dual: "L'idée se dessine · Le projet s'étend" },
  { num: "06", verb: "DESSINER", sub: "Donner une forme au futur", dual: "Du carnet à la maquette Revit" },
  { num: "07", verb: "CONCEVOIR", sub: "Transformer la vision en projet", dual: "Ingénierie & normes FIA" },
  { num: "08", verb: "BÂTIR", sub: "Faire entrer le projet dans le réel", dual: "De la terre ocre au complexe de classe mondiale" },
  { num: "09", verb: "S'ÉQUIPER", sub: "Prêt", dual: "Casque, gants, kart de compétition" },
  { num: "10", verb: "FRÉMIR", sub: "1 — 2 — 3 — 4 — 5 → GO", dual: "Tension silencieuse sur la grille" },
  { num: "11", verb: "S'ENGAGER", sub: "Entrer dans la course", dual: "La jeunesse africaine prend le volant" },
  { num: "12", verb: "SE DÉPASSER", sub: "Viser plus haut", dual: "La course à l'excellence" },
  { num: "13", verb: "RASSEMBLER", sub: "Un lieu. Des publics. Une expérience.", dual: "Un lieu de vie pour toute la nation" },
  { num: "14", verb: "VIBRER", sub: "Le moteur. Le public. L'enfant.", dual: "L'émotion de la victoire" },
  { num: "15", verb: "TRANSMETTRE", sub: "Un rêve passe à la génération suivante", dual: "L'inspiration transmise aux générations futures" },
  { num: "16", verb: "S'ÉLEVER", sub: "Le regard monte vers l'horizon", dual: "Le drone s'élève · Le Bénin s'élève" },
];

export const CIRCUIT_SECTORS = [
  { sector: "01", name: "PRÉPARER", timecode: "0:00 → 0:25", description: "L'enfant dans la terre rouge, fabrication du kart artisanal, naissance du rêve." },
  { sector: "02", name: "DÉCOUVRIR", timecode: "0:25 → 0:55", description: "Course dans le village, regard croisé devant la tour vitrée de l'architecte." },
  { sector: "03", name: "CHOISIR", timecode: "0:55 → 1:20", description: "Esquisse carnet, transition DWG/Revit, diorama 3D avec kart #07." },
  { sector: "04", name: "CONNECTER", timecode: "1:20 → 1:35", description: "Révélation aérienne crépusculaire du complexe illuminé et de ses espaces de vie." },
  { sector: "05", name: "DÉCOLLER", timecode: "1:35 → 1:45", description: "Tension, visière, volant, les 5 feux rouges de départ s'allument un à un." },
  { sector: "06", name: "COURIR", timecode: "1:45 → 2:30", description: "Extinction des feux : pleine vitesse, montées en régime continues, duel en piste." },
  { sector: "07", name: "RASSEMBLER", timecode: "2:30 → 2:50", description: "Ralentissement, célébration, familles, terrasses, transmission aux plus jeunes." },
  { sector: "08", name: "S'ÉLEVER", timecode: "2:50 → 3:00", description: "Podium sur la plage, regard vers l'Atlantique, le drone s'élève vers l'avenir." },
];

export const PRODUCTION_PIPELINE = [
  { screen: "01", title: "DONNÉES", tags: ["Revit", "DWG", "Plans architecturaux", "Karts FIA", "Topographie terrassement", "Spécifications Koffi & Diabaté"] },
  { screen: "02", title: "CRÉATION", tags: ["Modélisation 3D", "Génération IA photoréaliste", "Motion design télémétrie", "Environnements côtiers", "Personnages & Émotion"] },
  { screen: "03", title: "FINITION", tags: ["Montage cinématographique", "Compositing VFX", "Sound design 5.1 immersif", "Étalonnage couleur luxe", "Master UHD / 4K"] },
];

export const VISUAL_EXPERIENCE_DIALS = [
  { code: "PREMIUM", label: "Lumière dorée & reflets crépusculaires de l'Atlantique", detail: "Lumière d'exception" },
  { code: "PHOTORÉALISTE", label: "Fidélité absolue aux plans et à la volumétrie Revit", detail: "Architecture réelle" },
  { code: "SPORTIVE", label: "Karts de compétition, sensations mécaniques, vibreurs FIA", detail: "Motorsport pur" },
  { code: "IMMERSIVE", label: "Caméras embarquées cockpit, ras du sol à 120 FPS", detail: "Vitesse ressentie" },
  { code: "TECHNOLOGIQUE", label: "Écrans de chronométrage LED, télémétrie, détection", detail: "Précision digitale" },
  { code: "CINÉMATOGRAPHIQUE", label: "Vues aériennes d'envergure, transitions fluides", detail: "Épopée visuelle" },
];

export const PRODUCTION_TIMELINE = [
  { step: "S1", title: "ANALYSE", desc: "Assimilation données Revit/DWG, cadrage artistique et technique" },
  { step: "S2", title: "ÉCRITURE", desc: "Scénario complet, storyboard plan-par-plan et validation narrative" },
  { step: "S3–5", title: "PRODUCTION", desc: "Modélisation 3D du site, générations IA photoréalistes et textures" },
  { step: "S5–6", title: "MONTAGE", desc: "Compositing, intégration VFX et motion design des télémétries" },
  { step: "S7", title: "FINITION", desc: "Composition musicale, sound design continu des moteurs et étalonnage" },
  { step: "S8", title: "FINAL", desc: "Ajustements clients, exports masters 4K UHD et déclinaisons" },
];

export const BUDGET_TELEMETRY = [
  { item: "CONCEPTION", amount: 700000, label: "Direction artistique & scénario" },
  { item: "REVIT / DWG", amount: 700000, label: "Ingénierie & intégration des maquettes" },
  { item: "STORYBOARD", amount: 400000, label: "Découpage technique plan-par-plan" },
  { item: "ENVIRONNEMENTS 3D", amount: 1300000, label: "Modélisation complexe, piste & paddocks" },
  { item: "SÉQUENCES IA", amount: 2000000, label: "Génération photoréaliste & animations dynamiques" },
  { item: "MOTION DESIGN", amount: 600000, label: "Interfaces télémétrie, chronos & titrages" },
  { item: "MONTAGE / VFX", amount: 950000, label: "Rythme cinématographique, dynamique course" },
  { item: "MUSIQUE / SOUND", amount: 700000, label: "Création sonore, bruitages karts & mix 5.1" },
  { item: "ÉTALONNAGE / 4K", amount: 450000, label: "Colorimétrie prestige & master UHD" },
  { item: "PRODUCTION", amount: 700000, label: "Coordination de projet & livrables" },
];

export const TOTAL_BUDGET_HT = 8500000;
export const DIGITAL_PACK_OPTION = 1500000;
