import jsPDF from 'jspdf';
import { 
  SIXTEEN_VERBS, CIRCUIT_SECTORS, PRODUCTION_PIPELINE, 
  VISUAL_EXPERIENCE_DIALS, PRODUCTION_TIMELINE, BUDGET_TELEMETRY, 
  TOTAL_BUDGET_HT, DIGITAL_PACK_OPTION 
} from '../data/dossier16PagesData';

/**
 * Générateur PDF officiel AFRIKAFUN Production — Dossier 16 Pages
 * Rendu éditorial haut de gamme 1:1 avec les 16 pages de la présentation.
 */
export function generateProposalPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Cinematic Color Palette
  const charcoal = [15, 17, 23] as const;
  const racingRed = [255, 59, 29] as const;
  const darkGray = [60, 64, 75] as const;
  const lightGray = [110, 115, 125] as const;

  const addPageHeader = (pageTitle: string, pageNum: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...racingRed);
    doc.text(`PAGE ${String(pageNum).padStart(2, '0')} // ${pageTitle}`, margin, 15);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightGray);
    doc.text('AFRIKAFUN PRODUCTION · PROJET KARTING BÉNIN', pageWidth - margin, 15, { align: 'right' });

    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, 18, pageWidth - margin, 18);
  };

  const addPageFooter = (pageNum: number) => {
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.text('ENTER THE RACE — Dossier de Présentation Officiel', margin, pageHeight - 10);
    doc.text(`Page ${pageNum} / 16`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // ==========================================
  // PAGE 01 — DÉPART
  // ==========================================
  addPageHeader('DÉPART', 1);

  // Red Accent Line
  doc.setFillColor(...racingRed);
  doc.rect(margin, 40, 5, 45, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...charcoal);
  doc.text('ENTER THE RACE', margin + 12, 54);

  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text('FILM DE PRÉSENTATION DU FUTUR KARTING', margin + 12, 65);

  doc.setFontSize(11);
  doc.setTextColor(...racingRed);
  doc.text('AFRIKAFUN PRODUCTION', margin + 12, 75);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text('2’30 — 3’00  |  16:9  |  UHD / 4K', margin + 12, 83);

  // Box Visuel & Ambiance
  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 105, contentWidth, 120, 3, 3, 'F');
  doc.setDrawColor(225, 228, 235);
  doc.roundedRect(margin, 105, contentWidth, 120, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...charcoal);
  doc.text('VISUEL : L’ENFANT ET LE PETIT KART ARTISANAL', margin + 12, 125);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  const p1Text = doc.splitTextToSize(
    "Une image cinématographique puissante de l'enfant dans la poussière ocre du Bénin, construisant son petit kart en bois avec des roues de fortune et de la ficelle rouge. Une ligne de trajectoire graphique rouge traverse la page et disparaît derrière le titre. Pas de paragraphe superflu : l'image raconte le point de départ de l'ambition.",
    contentWidth - 24
  );
  doc.text(p1Text, margin + 12, 138);

  addPageFooter(1);

  // ==========================================
  // PAGE 02 — L'IDÉE
  // ==========================================
  doc.addPage();
  addPageHeader("L'IDÉE", 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...charcoal);
  doc.text('VOIR AVANT QUE CELA N’EXISTE.', margin, 60);

  doc.setFontSize(18);
  doc.setTextColor(...racingRed);
  doc.text('RÊVER.  OSER.  CONSTRUIRE.', margin, 80);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 105, contentWidth, 120, 3, 3, 'F');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(...charcoal);
  doc.text('« Un enfant imagine un kart. Une ambition prend forme. »', margin + 15, 130);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  const p2Text = doc.splitTextToSize(
    "Composition en vis-à-vis : à gauche, l'enfant dans son geste créatif ; à droite, l'amorce contemporaine du futur complexe de karting. Sans expliquer le parallèle avec de longs discours : le spectateur et le décideur comprennent instinctivement que la trajectoire de l'enfant est celle du Bénin tout entier.",
    contentWidth - 30
  );
  doc.text(p2Text, margin + 15, 150);

  addPageFooter(2);

  // ==========================================
  // PAGE 03 — RÊVER / OSER
  // ==========================================
  doc.addPage();
  addPageHeader('RÊVER / OSER', 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...charcoal);
  doc.text('01 / RÊVER', margin, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.text('Voir avant que cela n’existe.', margin, 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...racingRed);
  doc.text('02 / OSER', margin, 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.text('Pourquoi pas nous ?', margin, 100);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 125, contentWidth, 80, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  doc.text('À gauche : enfant → idée → petit kart artisanal.', margin + 12, 145);
  doc.text('À droite : un mouvement graphique transforme cette petite trajectoire en grande trajectoire.', margin + 12, 157);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...racingRed);
  doc.text('Une idée commence toujours par un mouvement.', margin + 12, 175);

  addPageFooter(3);

  // ==========================================
  // PAGE 04 — JOUER / RENCONTRER
  // ==========================================
  doc.addPage();
  addPageHeader('JOUER / RENCONTRER', 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...charcoal);
  doc.text('03 / JOUER', margin, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.text('Découvrir. Essayer. Recommencer.', margin, 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...racingRed);
  doc.text('04 / RENCONTRER', margin, 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.text('Le rêve rencontre une possibilité.', margin, 100);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 125, contentWidth, 95, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  const p4Text = doc.splitTextToSize(
    "Le petit kart avance dans la poussière. Puis un obstacle. Un regard levé. Le visage de l'architecte au sommet de la tour vitrée de Koffi & Diabaté. La rencontre de deux volontés : la trajectoire du petit kart en bois devient graphiquement une ligne dessinée au crayon sur une table d'étude.",
    contentWidth - 24
  );
  doc.text(p4Text, margin + 12, 145);

  addPageFooter(4);

  // ==========================================
  // PAGE 05 — IMAGINER / DESSINER
  // ==========================================
  doc.addPage();
  addPageHeader('IMAGINER / DESSINER', 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text('IMAGINER', margin, 50);
  doc.setFontSize(22);
  doc.setTextColor(...charcoal);
  doc.text('VOIR PLUS LOIN.', margin, 62);

  doc.setFontSize(14);
  doc.setTextColor(...racingRed);
  doc.text('DESSINER', margin, 90);
  doc.setFontSize(22);
  doc.setTextColor(...charcoal);
  doc.text('DONNER UNE FORME AU FUTUR.', margin, 102);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 125, contentWidth, 90, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  const p5Text = doc.splitTextToSize(
    "Pleine largeur visuelle : la conceptrice face à l'horizon atlantique, puis son carnet de croquis. Le trait spontané du crayon commence à épouser les courbes d'un tracé de circuit automobile. La ligne continue sur la page suivante.",
    contentWidth - 24
  );
  doc.text(p5Text, margin + 12, 145);

  addPageFooter(5);

  // ==========================================
  // PAGE 06 — CONCEVOIR / BÂTIR
  // ==========================================
  doc.addPage();
  addPageHeader('CONCEVOIR / BÂTIR', 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...charcoal);
  doc.text('CONCEVOIR : Transformer la vision en projet.', margin, 45);
  doc.text('BÂTIR : Faire entrer le projet dans le réel.', margin, 55);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 70, contentWidth, 145, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...racingRed);
  doc.text('UNE SEULE GRANDE TRANSFORMATION HORIZONTALE :', margin + 12, 85);

  doc.setFontSize(14);
  doc.setTextColor(...charcoal);
  doc.text('CRAYON  →  ÉCRAN  →  MAQUETTE  →  ARCHITECTURE', margin + 12, 100);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkGray);
  const p6Text = doc.splitTextToSize(
    "Cette double page met en scène la méthode AFRIKAFUN : intégration rigoureuse de la maquette Revit, des plans DWG et des spécifications de Koffi & Diabaté. L'architecte place délicatement le kart miniature #07 sur le diorama physique, préfigurant l'implantation réelle du futur complexe sur le terrain de terrassement.",
    contentWidth - 24
  );
  doc.text(p6Text, margin + 12, 120);

  addPageFooter(6);

  // ==========================================
  // PAGE 07 — S'ÉQUIPER / FRÉMIR
  // ==========================================
  doc.addPage();
  addPageHeader('S’ÉQUIPER / FRÉMIR', 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text('S’ÉQUIPER', margin, 50);

  doc.setFontSize(26);
  doc.setTextColor(...charcoal);
  doc.text('PRÊT.', margin, 64);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text('KART · CASQUE · COMBINAISON · PADDOCK · ÉQUIPEMENTS · PISTE', margin, 74);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...racingRed);
  doc.text('FRÉMIR', margin, 100);

  doc.setFontSize(22);
  doc.setTextColor(...charcoal);
  doc.text('1 — 2 — 3 — 4 — 5', margin, 114);

  doc.setFontSize(32);
  doc.setTextColor(...racingRed);
  doc.text('GO', margin, 134);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 155, contentWidth, 60, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkGray);
  doc.text('Rupture de rythme cinématographique : les feux de départ deviennent l’élément graphique.', margin + 12, 175);
  doc.text('On bascule immédiatement de l’ingénierie à l’adrénaline pure du sport automobile.', margin + 12, 185);

  addPageFooter(7);

  // ==========================================
  // PAGE 08 — S'ENGAGER / SE DÉPASSER
  // ==========================================
  doc.addPage();
  addPageHeader('S’ENGAGER / SE DÉPASSER', 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text('S’ENGAGER', margin, 50);
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('ENTRER DANS LA COURSE.', margin, 62);

  doc.setFontSize(14);
  doc.setTextColor(...racingRed);
  doc.text('SE DÉPASSER', margin, 85);
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('VISER PLUS HAUT.', margin, 97);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 120, contentWidth, 90, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...racingRed);
  doc.text('LA COURSE À L’EXCELLENCE', margin + 12, 140);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkGray);
  const p8Text = doc.splitTextToSize(
    "Énorme plan de course à ras du sol, caméra embarquée à 120 images/seconde, montées en régime continues, chronomètre et télémétrie. « La course à l'excellence » devient ici le point de jonction parfait entre l'effort du pilote et l'essor de la nation béninoise.",
    contentWidth - 24
  );
  doc.text(p8Text, margin + 12, 155);

  addPageFooter(8);

  // ==========================================
  // PAGE 09 — RASSEMBLER
  // ==========================================
  doc.addPage();
  addPageHeader('RASSEMBLER', 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...charcoal);
  doc.text('RASSEMBLER', margin, 50);

  doc.setFontSize(14);
  doc.setTextColor(...darkGray);
  doc.text('UN LIEU. DES PUBLICS. UNE EXPÉRIENCE.', margin, 62);

  doc.setFontSize(20);
  doc.setTextColor(...racingRed);
  doc.text('UN LIEU DE VIE.', margin, 80);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 100, contentWidth, 120, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...charcoal);
  doc.text('COMPOSITION EN MOSAÏQUE DES PUBLICS :', margin + 12, 120);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('ENFANTS  ·  JUNIORS  ·  ADULTES  ·  BIPLACES  ·  FAMILLES  ·  AMIS  ·  SPECTATEURS', margin + 12, 132);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...charcoal);
  doc.text('LES DIMENSIONS DU COMPLEXE :', margin + 12, 152);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  doc.text('PISTES CIK-FIA  ·  RESTAURATION PANORAMIQUE  ·  BOUTIQUES  ·  LOISIRS  ·  DÉCOUVERTE', margin + 12, 164);

  const p9Text = doc.splitTextToSize(
    "Ralentissement du rythme : la vitesse s'efface pour révéler le complexe comme carrefour familial, populaire et touristique pour le Bénin et la sous-région.",
    contentWidth - 24
  );
  doc.text(p9Text, margin + 12, 185);

  addPageFooter(9);

  // ==========================================
  // PAGE 10 — VIBRER / TRANSMETTRE / S'ÉLEVER
  // ==========================================
  doc.addPage();
  addPageHeader('VIBRER / TRANSMETTRE / S’ÉLEVER', 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...charcoal);
  doc.text('14 / VIBRER : Le moteur. Le public. L’enfant.', margin, 45);
  doc.text('15 / TRANSMETTRE : Un rêve passe à la génération suivante.', margin, 55);

  doc.setFontSize(20);
  doc.setTextColor(...racingRed);
  doc.text('16 / S’ÉLEVER', margin, 75);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...darkGray);
  const p10Text = doc.splitTextToSize(
    "La caméra quitte le regard complice de l'enfant et de l'architecte sur le podium en bord de mer. Elle s'élève au-dessus de la foule, de la piste et du territoire béninois. Chute cinématographique, le mouvement devient graphique, impactant :",
    contentWidth
  );
  doc.text(p10Text, margin, 88);

  doc.setFillColor(15, 17, 23);
  doc.roundedRect(margin, 120, contentWidth, 75, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('ENTER THE RACE', margin + 15, 155);

  doc.setFontSize(12);
  doc.setTextColor(...racingRed);
  doc.text('FIN DE LA NARRATION — DÉBUT DU DOSSIER TECHNIQUE', margin + 15, 172);

  addPageFooter(10);

  // ==========================================
  // PAGE 11 — LE FILM EN UN COUP D'ŒIL
  // ==========================================
  doc.addPage();
  addPageHeader('LE FILM EN UN COUP D’ŒIL', 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('LE CIRCUIT EN 8 SECTEURS', margin, 45);

  doc.setFontSize(14);
  doc.setTextColor(...racingRed);
  doc.text('2’30 — 3’00  |  FILM PRINCIPAL UHD / 4K', margin, 55);

  let ySector = 75;
  CIRCUIT_SECTORS.forEach((sec) => {
    doc.setFillColor(246, 247, 250);
    doc.rect(margin, ySector, contentWidth, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...racingRed);
    doc.text(`SECTEUR ${sec.sector} — ${sec.name} (${sec.timecode})`, margin + 4, ySector + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkGray);
    doc.text(sec.description, margin + 4, ySector + 10.5);

    ySector += 17;
  });

  addPageFooter(11);

  // ==========================================
  // PAGE 12 — COMMENT NOUS DONNONS VIE AU FUTUR
  // ==========================================
  doc.addPage();
  addPageHeader('COMMENT NOUS DONNONS VIE AU FUTUR', 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('DONNÉES  →  CRÉATION  →  FILM', margin, 50);

  let yScreen = 75;
  PRODUCTION_PIPELINE.forEach((scr) => {
    doc.setFillColor(246, 247, 250);
    doc.roundedRect(margin, yScreen, contentWidth, 38, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...racingRed);
    doc.text(`ÉCRAN ${scr.screen} : ${scr.title}`, margin + 8, yScreen + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...darkGray);
    doc.text(scr.tags.join('  ·  '), margin + 8, yScreen + 22);

    yScreen += 45;
  });

  addPageFooter(12);

  // ==========================================
  // PAGE 13 — L'EXPÉRIENCE VISUELLE
  // ==========================================
  doc.addPage();
  addPageHeader('L’EXPÉRIENCE VISUELLE', 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('6 CADRANS D’EXCELLENCE', margin, 50);

  let yDial = 75;
  VISUAL_EXPERIENCE_DIALS.forEach((dial, idx) => {
    doc.setFillColor(246, 247, 250);
    doc.roundedRect(margin, yDial, contentWidth, 18, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...racingRed);
    doc.text(dial.code, margin + 6, yDial + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...charcoal);
    doc.text(dial.detail, margin + 45, yDial + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkGray);
    doc.text(dial.label, margin + 45, yDial + 13);

    yDial += 23;
  });

  addPageFooter(13);

  // ==========================================
  // PAGE 14 — LE PARCOURS DE PRODUCTION
  // ==========================================
  doc.addPage();
  addPageHeader('LE PARCOURS DE PRODUCTION', 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('LE CALENDRIER DE COURSE', margin, 50);

  doc.setFontSize(14);
  doc.setTextColor(...racingRed);
  doc.text('CHRONOMÈTRE TOTAL : 6 À 8 SEMAINES', margin, 62);

  let yTime = 80;
  PRODUCTION_TIMELINE.forEach((t) => {
    doc.setFillColor(246, 247, 250);
    doc.rect(margin, yTime, contentWidth, 17, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...racingRed);
    doc.text(t.step, margin + 6, yTime + 7);

    doc.setTextColor(...charcoal);
    doc.text(t.title, margin + 25, yTime + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkGray);
    doc.text(t.desc, margin + 25, yTime + 13);

    yTime += 21;
  });

  addPageFooter(14);

  // ==========================================
  // PAGE 15 — L'ÉCRAN DE COURSE : LES LIVRABLES
  // ==========================================
  doc.addPage();
  addPageHeader('LES LIVRABLES', 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...charcoal);
  doc.text('ÉCRAN DE COURSE : LES LIVRABLES', margin, 45);

  doc.setFillColor(15, 17, 23);
  doc.roundedRect(margin, 60, contentWidth, 45, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('FILM PRINCIPAL : 02:30 — 03:00', margin + 10, 77);

  doc.setFontSize(10);
  doc.setTextColor(...racingRed);
  doc.text('FORMAT : 16:9 | ULTRA HD / 4K', margin + 10, 88);

  doc.setFillColor(246, 247, 250);
  doc.roundedRect(margin, 120, contentWidth, 75, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...charcoal);
  doc.text('OPTION PACK DIGITAL : 1 500 000 FCFA HT', margin + 10, 135);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.text('• 1 Teaser de 30 secondes (16:9) pour lancements & médias', margin + 10, 147);
  doc.text('• 3 Vidéos verticales (9:16 de 15s) optimisées TikTok / Instagram Reels', margin + 10, 157);
  doc.text('• 3 Déclinaisons courtes thématiques (architecture, famille, compétition)', margin + 10, 167);

  addPageFooter(15);

  // ==========================================
  // PAGE 16 — LE TABLEAU DE BORD FINANCIER
  // ==========================================
  doc.addPage();
  addPageHeader('TABLEAU DE BORD FINANCIER', 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...racingRed);
  doc.text('8 500 000 FCFA HT', margin, 45);

  doc.setFontSize(11);
  doc.setTextColor(...charcoal);
  doc.text('PROPOSITION TOTALE DU FILM (BASE 4K UHD)', margin, 54);

  let yBud = 68;
  BUDGET_TELEMETRY.forEach((b) => {
    doc.setFillColor(246, 247, 250);
    doc.rect(margin, yBud, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...charcoal);
    doc.text(b.item, margin + 4, yBud + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    doc.text(b.label, margin + 50, yBud + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...racingRed);
    doc.text(`${b.amount.toLocaleString('fr-FR')} FCFA`, pageWidth - margin - 4, yBud + 4.8, { align: 'right' });

    yBud += 8.2;
  });

  // 3 Pit-Stop Steps
  doc.setFillColor(15, 17, 23);
  doc.roundedRect(margin, yBud + 6, contentWidth, 38, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('MODALITÉS DE RÈGLEMENT (3 ÉTAPES PIT-STOP) :', margin + 8, yBud + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...racingRed);
  doc.text('40 % À LA COMMANDE  ·  40 % STORYBOARD VALIDÉ  ·  20 % MASTER FINAL', margin + 8, yBud + 26);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('ENTER THE RACE.', margin + 8, yBud + 37);

  addPageFooter(16);

  // Trigger browser download
  doc.save('AFRIKAFUN_Dossier_16_Pages_Karting_Benin.pdf');
}
