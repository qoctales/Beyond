/**
 * AFRIKAFUN - IMMERSIVE AUDIO SYSTEM
 * 
 * Moteur audio cinématique procédural Web Audio haute fidélité (Approche A) :
 * - Aucune dépendance externe ni fichier mp3 manquant.
 * - 10 compositions musicales ambiantes distinctes et évolutives (Slides 1 à 10, y compris la page Budget).
 * - 10 designs sonores réalistes narratifs synchronisés aux étapes cinématographiques du projet.
 * - Transitions en fondu croisé (cross-fade) douces lors de la navigation entre les pages.
 * - Bus séparés : Master, Musique, Ambiance, Effets Réalistes (SFX).
 */

export interface AudioMixerState {
  isMuted: boolean;
  masterVolume: number;
  musicVolume: number;
  ambienceVolume: number;
  sfxVolume: number;
  currentSection: string;
  currentSlideNumber: number;
  currentSoundTitle: string;
  isMusicPlaying: boolean;
  isPlayingRealisticFx: boolean;
}

export const AUDIO_FILE_PATHS = {
  ambienceEarth: "/assets/audio/ambience-earth.mp3",
  kartChild: "/assets/audio/kart-child.mp3",
  design: "/assets/audio/design.mp3",
  buildUp: "/assets/audio/build-up.mp3",
  countdown: "/assets/audio/countdown.mp3",
  race: "/assets/audio/race.mp3",
  final: "/assets/audio/final.mp3",
  musicTheme: "/assets/audio/music-theme.mp3",
};

type Listener = (state: AudioMixerState) => void;

class CinematicAudioSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // OFF by default (autoplay policy)
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Channel volumes (0 to 1)
  private masterVol = 0.85;
  private musicVol = 0.75;
  private ambienceVol = 0.70;
  private sfxVol = 0.90;

  private currentSection = "slide_1";
  private currentSlideNumber: number = 1;
  private isMusicPlaying: boolean = false;
  private isPlayingRealisticFx: boolean = false;
  private listeners: Listener[] = [];

  // Active procedural nodes & intervals for continuous music & ambiance
  private activeMusicOscs: OscillatorNode[] = [];
  private activeMusicGains: GainNode[] = [];
  private activeAmbienceNodes: AudioNode[] = [];
  private activeIntervals: number[] = [];

  constructor() {
    // Initialized upon first user interaction
  }

  public subscribe(fn: Listener) {
    this.listeners.push(fn);
    fn(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    const st = this.getState();
    this.listeners.forEach((l) => l(st));
  }

  public getState(): AudioMixerState {
    return {
      isMuted: this.isMuted,
      masterVolume: this.masterVol,
      musicVolume: this.musicVol,
      ambienceVolume: this.ambienceVol,
      sfxVolume: this.sfxVol,
      currentSection: this.currentSection,
      currentSlideNumber: this.currentSlideNumber,
      currentSoundTitle: this.getSlideSoundTitle(this.currentSlideNumber),
      isMusicPlaying: this.isMusicPlaying,
      isPlayingRealisticFx: this.isPlayingRealisticFx,
    };
  }

  public getSlideNumber(): number {
    return this.currentSlideNumber;
  }

  public setSlide(slideNumber: number) {
    if (this.currentSlideNumber === slideNumber && this.activeMusicOscs.length > 0) {
      return;
    }
    this.currentSlideNumber = slideNumber;
    this.currentSection = `slide_${slideNumber}`;
    this.notify();

    // Never play sound automatically if muted or if music was not explicitly started
    if (!this.isMuted && this.isMusicPlaying) {
      this.initAudio();
      this.updateSlideAmbience(slideNumber);
    }
  }

  /**
   * Lance l'expérience sonore complète superposant les deux couches :
   * 1) La musique cinématique continue de la page
   * 2) Le design sonore réaliste concret de la scène
   */
  public playFullImmersion(slideNumber?: number) {
    const targetSlide = slideNumber || this.currentSlideNumber;
    this.currentSlideNumber = targetSlide;
    this.currentSection = `slide_${targetSlide}`;
    this.initAudio();
    this.isMuted = false;
    this.isMusicPlaying = true;

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
    }

    this.updateSlideAmbience(targetSlide);
    this.playSlideSoundDesign(targetSlide);
    this.notify();
  }

  /**
   * Active ou désactive la musique d'ambiance seule
   */
  public toggleMusic(slideNumber?: number): boolean {
    const targetSlide = slideNumber || this.currentSlideNumber;
    this.currentSlideNumber = targetSlide;
    this.currentSection = `slide_${targetSlide}`;
    this.initAudio();

    if (this.isMusicPlaying && !this.isMuted) {
      this.stopContinuousSounds();
      this.isMusicPlaying = false;
    } else {
      this.isMuted = false;
      this.isMusicPlaying = true;
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
      }
      this.updateSlideAmbience(targetSlide);
    }
    this.notify();
    return this.isMusicPlaying;
  }

  /**
   * Déclenche les sons réalistes narratifs de la page seule
   */
  public toggleRealistic(slideNumber?: number) {
    const targetSlide = slideNumber || this.currentSlideNumber;
    this.currentSlideNumber = targetSlide;
    this.playSlideSoundDesign(targetSlide);
  }

  public getSlideSoundTitle(slideNumber: number): string {
    switch (slideNumber) {
      case 1:
        return "Ouverture : Souffle de l'Atlantique & Thème Cinématique Majestueux";
      case 2:
        return "Rêver & Oser : Balafon Chaleureux & Roulements de Terre Rouge";
      case 3:
        return "Jouer & Rencontrer : Suspense Suspendu & Vibration Tour Vitrée";
      case 4:
        return "Imaginer & Dessiner : Arpèges Néo-Classiques d'Architecte & Trait de Crayon";
      case 5:
        return "Concevoir & Bâtir : Pulsation Horlogère de Précision & Métamorphose 3D";
      case 6:
        return "S'équiper & Frémir : Battement Sourd, Visière Fermée & 5 Feux Rouges FIA";
      case 7:
        return "S'engager & Se Dépasser : Poursuite Plein Gaz, 4 Rapports & Vibreurs";
      case 8:
        return "Rassembler & Vibrer : Polyrythmie Africaine, Fête & Clameur des Tribunes";
      case 9:
        return "Transmettre & S'élever : Coucher de Soleil Océanique, Grue & Relais";
      case 10:
        return "Paddock & Budget : Executive Tech Lounge & Télémétrie Officielle";
      default:
        return "Atmosphère Karting International Bénin";
    }
  }

  private initAudio() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master bus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVol, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.musicVol, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // Ambience bus
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(this.ambienceVol, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);

      // SFX bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVol, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // --- CONTROLS ---

  public toggleSound(): boolean {
    this.initAudio();
    this.isMuted = !this.isMuted;

    if (this.ctx && this.masterGain) {
      const target = this.isMuted ? 0 : this.masterVol;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.15);
    }

    if (!this.isMuted) {
      this.isMusicPlaying = true;
      this.updateSlideAmbience(this.currentSlideNumber);
    } else {
      this.isMusicPlaying = false;
      this.stopContinuousSounds();
    }

    this.notify();
    return !this.isMuted;
  }

  public stopAll() {
    this.isMuted = true;
    this.isMusicPlaying = false;
    this.isPlayingRealisticFx = false;
    this.stopContinuousSounds();
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    this.notify();
  }

  public setMasterVolume(val: number) {
    this.masterVol = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
    }
    this.notify();
  }

  public setMusicVolume(val: number) {
    this.musicVol = Math.max(0, Math.min(1, val));
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.setValueAtTime(this.musicVol, this.ctx.currentTime);
    }
    this.notify();
  }

  public setAmbienceVolume(val: number) {
    this.ambienceVol = Math.max(0, Math.min(1, val));
    if (this.ctx && this.ambienceGain) {
      this.ambienceGain.gain.setValueAtTime(this.ambienceVol, this.ctx.currentTime);
    }
    this.notify();
  }

  public setSfxVolume(val: number) {
    this.sfxVol = Math.max(0, Math.min(1, val));
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.sfxVol, this.ctx.currentTime);
    }
    this.notify();
  }

  // --- COMPOSITION MUSICALE VARIÉE POUR CHACUNE DES 10 PAGES (APPROCHE A) ---

  public updateSlideAmbience(slideNumber: number) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;

    // Smooth fade-out of previous continuous music
    this.stopContinuousSounds();

    switch (slideNumber) {
      case 1:
        // SLIDE 01 : OUVERTURE CINÉMATIQUE MAJESTUEUSE & SOUFFLE OCÉANIQUE
        this.startSlide01OceanCinematic();
        break;

      case 2:
        // SLIDE 02 (RÊVER · OSER) : BALAFON CHALEUREUX & ROULEMENTS ORGANIQUES
        this.startSlide02BalafonMusic();
        break;

      case 3:
        // SLIDE 03 (JOUER · RENCONTRER) : SUSPENSE FEUTRÉ, BASSE & CRISTAL TOUR VITRÉE
        this.startSlide03SuspenseMusic();
        break;

      case 4:
        // SLIDE 04 (IMAGINER · DESSINER) : ARPÈGES NÉO-CLASSIQUES D'ARCHITECTE
        this.startSlide04ArchitectMinimalism();
        break;

      case 5:
        // SLIDE 05 (CONCEVOIR · BÂTIR) : PULSATION HORLOGÈRE TECHNO-TECHNIQUE
        this.startSlide05EngineeringGroove();
        break;

      case 6:
        // SLIDE 06 (S'ÉQUIPER · FRÉMIR) : DRONE SOURD, BATTEMENT DE CŒUR & PRÉ-GRILLE
        this.startSlide06PaddockTension();
        break;

      case 7:
        // SLIDE 07 (S'ENGAGER · SE DÉPASSER) : CADENCE DE COURSE RYTHMIQUE PLEIN GAZ
        this.startSlide07RaceScreamer();
        break;

      case 8:
        // SLIDE 08 (RASSEMBLER · VIBRER) : POLYRYTHMIE FESTIVE AFRICAINE & CLAMEUR
        this.startSlide08FestivePolyphony();
        break;

      case 9:
        // SLIDE 09 (TRANSMETTRE · S'ÉLEVER) : HARMONIE ÉTHÉRÉE COUCHER DE SOLEIL
        this.startSlide09SunsetElevation();
        break;

      case 10:
        // SLIDE 10 (PADDOCK · BUDGET OFFICIEL) : EXECUTIVE TECH LOUNGE & TÉLÉMÉTRIE
        this.startSlide10ExecutiveLounge();
        break;

      default:
        this.startSlide01OceanCinematic();
        break;
    }
  }

  // --- DÉCLENCHEURS DE SONS RÉALISTES POUR CHAQUE PAGE ---

  public playSlideSoundDesign(slideId: number) {
    this.initAudio();
    if (!this.ctx || !this.sfxGain) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    if (this.isMuted) {
      this.toggleSound();
    }

    this.isPlayingRealisticFx = true;
    this.notify();

    const now = this.ctx.currentTime;

    switch (slideId) {
      case 1:
        this.playSlide01TrailerArc(now);
        break;
      case 2:
        this.playSlide02ReverOser(now);
        break;
      case 3:
        this.playSlide03JouerRencontrer(now);
        break;
      case 4:
        this.playSlide04ImaginerDessiner(now);
        break;
      case 5:
        this.playSlide05ConcevoirBatir(now);
        break;
      case 6:
        this.playSlide06SEquiperFremir(now);
        break;
      case 7:
        this.playContinuousAccelerationSequence();
        break;
      case 8:
        this.playSlide08RassemblerVibrer(now);
        break;
      case 9:
        this.playSlide09TransmettreSElever(now);
        break;
      case 10:
        this.playSlide10BudgetTelemetry(now);
        break;
      default:
        this.playContinuousAccelerationSequence();
        break;
    }

    setTimeout(() => {
      this.isPlayingRealisticFx = false;
      this.notify();
    }, 6500);
  }

  /**
   * Déclenche un des deux effets sonores réalistes spécifiques à la page (superposé à l'ambiance)
   */
  public playSpecificFx(slideId: number, fxIndex: 1 | 2) {
    this.initAudio();
    if (!this.ctx || !this.sfxGain) return;
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    
    // Réactivation immédiate des bus audio et annulation de sourdine
    this.isMuted = false;
    const now = Math.max(this.ctx.currentTime, 0.05);
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterVol, now);
    }
    this.sfxGain.gain.cancelScheduledValues(now);
    this.sfxGain.gain.setValueAtTime(this.sfxVol, now);

    this.isPlayingRealisticFx = true;
    this.notify();

    switch (slideId) {
      case 1:
        if (fxIndex === 1) {
          // 1.1 Ressac atlantique & grand rouleau océanique (Ouidah)
          // Immense rouleau atlantique avec sub tellurique profond + résonance sweeping bandpass et embruns crépitants
          const sub = this.ctx.createOscillator();
          const subGain = this.ctx.createGain();
          sub.type = "sine";
          sub.frequency.setValueAtTime(36, now);
          sub.frequency.exponentialRampToValueAtTime(54, now + 1.1);
          sub.frequency.exponentialRampToValueAtTime(28, now + 2.7);
          subGain.gain.setValueAtTime(0.0001, now);
          subGain.gain.linearRampToValueAtTime(0.65, now + 1.0);
          subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.85);

          const breaker = this.createNoiseBufferNode(3.2);
          const bFilter = this.ctx.createBiquadFilter();
          bFilter.type = "bandpass";
          bFilter.frequency.setValueAtTime(160, now);
          bFilter.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
          bFilter.frequency.exponentialRampToValueAtTime(180, now + 2.8);
          bFilter.Q.setValueAtTime(3.0, now);
          const bGain = this.ctx.createGain();
          bGain.gain.setValueAtTime(0.0001, now);
          bGain.gain.linearRampToValueAtTime(0.68, now + 1.15);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.9);

          const spray = this.createNoiseBufferNode(2.8);
          const sFilter = this.ctx.createBiquadFilter();
          sFilter.type = "highpass";
          sFilter.frequency.setValueAtTime(2400, now + 0.8);
          const sGain = this.ctx.createGain();
          sGain.gain.setValueAtTime(0.0001, now + 0.8);
          sGain.gain.linearRampToValueAtTime(0.42, now + 1.25);
          sGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

          sub.connect(subGain);
          subGain.connect(this.sfxGain);
          breaker.connect(bFilter);
          bFilter.connect(bGain);
          bGain.connect(this.sfxGain);
          spray.connect(sFilter);
          sFilter.connect(sGain);
          sGain.connect(this.sfxGain);

          sub.start(now);
          sub.stop(now + 2.9);
          breaker.start(now);
          spray.start(now + 0.8);
        } else {
          // 1.2 Kart au loin : Écho rugissant du 2-temps à travers les cocoteraies (synthèse double oscillateur comme la Page 7)
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc1.type = "sawtooth";
          osc2.type = "sawtooth";

          // Rapport 1 puis 2 avec battement harmonique riche
          osc1.frequency.setValueAtTime(290, now);
          osc1.frequency.exponentialRampToValueAtTime(620, now + 0.95);
          osc1.frequency.setValueAtTime(430, now + 1.0);
          osc1.frequency.exponentialRampToValueAtTime(760, now + 2.2);

          osc2.frequency.setValueAtTime(294, now);
          osc2.frequency.exponentialRampToValueAtTime(627, now + 0.95);
          osc2.frequency.setValueAtTime(434, now + 1.0);
          osc2.frequency.exponentialRampToValueAtTime(767, now + 2.2);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1100, now);
          filter.frequency.linearRampToValueAtTime(2800, now + 1.5);
          filter.frequency.linearRampToValueAtTime(950, now + 2.2);
          filter.Q.setValueAtTime(3.5, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.58, now + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 2.35);
          osc2.stop(now + 2.35);
        }
        break;

      case 2:
        if (fxIndex === 1) {
          // 2.1 Façonnage du châssis en teck & tension de corde
          // Frappes authentiques de menuiserie sur bois dur d'Afrique (transitoire d'impact + corps acoustique boisé accordé)
          [0.05, 0.38, 0.72].forEach((t, i) => {
            const tap = this.createNoiseBufferNode(0.04);
            const tFilter = this.ctx!.createBiquadFilter();
            tFilter.type = "bandpass";
            tFilter.frequency.setValueAtTime(2400 + i * 300, now + t);
            tFilter.Q.setValueAtTime(4.0, now + t);
            const tGain = this.ctx!.createGain();
            tGain.gain.setValueAtTime(0.0001, now + t);
            tGain.gain.linearRampToValueAtTime(0.55, now + t + 0.004);
            tGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.035);
            tap.connect(tFilter);
            tFilter.connect(tGain);
            tGain.connect(this.sfxGain!);
            tap.start(now + t);

            const woodBody = this.ctx!.createOscillator();
            const wGain = this.ctx!.createGain();
            woodBody.type = "triangle";
            woodBody.frequency.setValueAtTime(260 + i * 65, now + t);
            woodBody.frequency.exponentialRampToValueAtTime(110, now + t + 0.12);
            wGain.gain.setValueAtTime(0.0001, now + t);
            wGain.gain.linearRampToValueAtTime(0.60, now + t + 0.008);
            wGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.16);
            woodBody.connect(wGain);
            wGain.connect(this.sfxGain!);
            woodBody.start(now + t);
            woodBody.stop(now + t + 0.18);
          });

          // Tension grinçante et étirement tactile du cordage de direction
          const rope = this.createNoiseBufferNode(0.7);
          const rFilter = this.ctx.createBiquadFilter();
          rFilter.type = "bandpass";
          rFilter.frequency.setValueAtTime(1600, now + 0.8);
          rFilter.Q.setValueAtTime(4.5, now + 0.8);
          const rGain = this.ctx.createGain();
          rGain.gain.setValueAtTime(0.0001, now + 0.8);
          rGain.gain.linearRampToValueAtTime(0.48, now + 0.88);
          rGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
          rope.connect(rFilter);
          rFilter.connect(rGain);
          rGain.connect(this.sfxGain);
          rope.start(now + 0.8);
        } else {
          // 2.2 Roulage du kart artisanal sur la terre rouge (remplace le synthé vocal par la propulsion mécanique réelle)
          // Les roulements à billes qui tournent et le châssis en bois qui vibre en prenant de la vitesse dans la cour
          const spinOsc = this.ctx.createOscillator();
          const spinFilter = this.ctx.createBiquadFilter();
          const spinGain = this.ctx.createGain();
          spinOsc.type = "sawtooth";
          spinOsc.frequency.setValueAtTime(220, now);
          spinOsc.frequency.exponentialRampToValueAtTime(680, now + 1.4);
          spinFilter.type = "bandpass";
          spinFilter.frequency.setValueAtTime(950, now);
          spinFilter.frequency.linearRampToValueAtTime(2200, now + 1.4);
          spinFilter.Q.setValueAtTime(3.8, now);
          spinGain.gain.setValueAtTime(0.0001, now);
          spinGain.gain.linearRampToValueAtTime(0.55, now + 0.25);
          spinGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
          spinOsc.connect(spinFilter);
          spinFilter.connect(spinGain);
          spinGain.connect(this.sfxGain);
          spinOsc.start(now);
          spinOsc.stop(now + 1.85);

          // Grain de latérite et crissement sur le sol rouge
          const dirt = this.createNoiseBufferNode(1.8);
          const dFilter = this.ctx.createBiquadFilter();
          dFilter.type = "bandpass";
          dFilter.frequency.setValueAtTime(1100, now);
          dFilter.frequency.linearRampToValueAtTime(1600, now + 0.8);
          dFilter.Q.setValueAtTime(2.4, now);
          const dGain = this.ctx.createGain();
          dGain.gain.setValueAtTime(0.0001, now);
          dGain.gain.linearRampToValueAtTime(0.50, now + 0.3);
          dGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.75);
          dirt.connect(dFilter);
          dFilter.connect(dGain);
          dGain.connect(this.sfxGain);
          dirt.start(now);

          // Battement sourd du châssis en bois qui sautille sur les aspérités
          [0.12, 0.35, 0.58, 0.85, 1.15].forEach((t) => {
            const bump = this.ctx!.createOscillator();
            const bGain = this.ctx!.createGain();
            bump.type = "triangle";
            bump.frequency.setValueAtTime(140, now + t);
            bump.frequency.exponentialRampToValueAtTime(55, now + t + 0.08);
            bGain.gain.setValueAtTime(0.0001, now + t);
            bGain.gain.linearRampToValueAtTime(0.45, now + t + 0.008);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.09);
            bump.connect(bGain);
            bGain.connect(this.sfxGain!);
            bump.start(now + t);
            bump.stop(now + t + 0.1);
          });
        }
        break;

      case 3:
        if (fxIndex === 1) {
          // 3.1 Roulements à billes métalliques à pleine vitesse
          // Vrombissement supersonique de billes d'acier chromé dans la latérite (multi-harmonique avec résonance haute précision)
          const bearingSpin1 = this.ctx.createOscillator();
          const bearingSpin2 = this.ctx.createOscillator();
          const bFilter = this.ctx.createBiquadFilter();
          const bGain = this.ctx.createGain();

          bearingSpin1.type = "sawtooth";
          bearingSpin2.type = "triangle";
          bearingSpin1.frequency.setValueAtTime(420, now);
          bearingSpin1.frequency.exponentialRampToValueAtTime(1150, now + 1.2);
          bearingSpin2.frequency.setValueAtTime(840, now);
          bearingSpin2.frequency.exponentialRampToValueAtTime(2300, now + 1.2);

          bFilter.type = "bandpass";
          bFilter.frequency.setValueAtTime(1500, now);
          bFilter.frequency.linearRampToValueAtTime(3200, now + 1.2);
          bFilter.Q.setValueAtTime(3.8, now);

          bGain.gain.setValueAtTime(0.0001, now);
          bGain.gain.linearRampToValueAtTime(0.55, now + 0.2);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);

          bearingSpin1.connect(bFilter);
          bearingSpin2.connect(bFilter);
          bFilter.connect(bGain);
          bGain.connect(this.sfxGain);

          bearingSpin1.start(now);
          bearingSpin2.start(now);
          bearingSpin1.stop(now + 1.75);
          bearingSpin2.stop(now + 1.75);

          // 12 impacts métalliques ultra-rapides en cascade
          [0.02, 0.08, 0.15, 0.23, 0.32, 0.42, 0.53, 0.65, 0.78, 0.92, 1.07, 1.23].forEach((t, i) => {
            const ball = this.ctx!.createOscillator();
            const bg = this.ctx!.createGain();
            ball.type = "sine";
            ball.frequency.setValueAtTime(1800 + (i % 4) * 440, now + t);
            bg.gain.setValueAtTime(0.0001, now + t);
            bg.gain.linearRampToValueAtTime(0.48, now + t + 0.006);
            bg.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.065);
            ball.connect(bg);
            bg.connect(this.sfxGain!);
            ball.start(now + t);
            ball.stop(now + t + 0.075);
          });
        } else {
          // 3.2 Glissade et dérapage contrôlé dans la poussière de latérite (remplace les applaudissements par le drift pur)
          // Dérapage sec sur la terre rouge : friction tactile de la poussière + freinage d'urgence
          const skid = this.createNoiseBufferNode(1.4);
          const sFilter = this.ctx.createBiquadFilter();
          sFilter.type = "bandpass";
          sFilter.frequency.setValueAtTime(700, now);
          sFilter.frequency.exponentialRampToValueAtTime(2400, now + 0.4);
          sFilter.frequency.exponentialRampToValueAtTime(500, now + 1.1);
          sFilter.Q.setValueAtTime(3.2, now);
          const sGain = this.ctx.createGain();
          sGain.gain.setValueAtTime(0.0001, now);
          sGain.gain.linearRampToValueAtTime(0.62, now + 0.15);
          sGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
          skid.connect(sFilter);
          sFilter.connect(sGain);
          sGain.connect(this.sfxGain);
          skid.start(now);

          // Gravillons rouges projetés contre le châssis en bois
          [0.10, 0.18, 0.28, 0.40, 0.55, 0.72].forEach((t, i) => {
            const grit = this.ctx!.createOscillator();
            const gGain = this.ctx!.createGain();
            grit.type = "triangle";
            grit.frequency.setValueAtTime(620 + (i % 3) * 260, now + t);
            grit.frequency.exponentialRampToValueAtTime(180, now + t + 0.04);
            gGain.gain.setValueAtTime(0.0001, now + t);
            gGain.gain.linearRampToValueAtTime(0.45, now + t + 0.005);
            gGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.05);
            grit.connect(gGain);
            gGain.connect(this.sfxGain!);
            grit.start(now + t);
            grit.stop(now + t + 0.06);
          });
        }
        break;

      case 4:
        if (fxIndex === 1) {
          // 4.1 Fusain & tracé d'architecte : Friction nette, tactile et rythmée du crayon graphite sur vélin
          [0.05, 0.42, 0.85].forEach((t, i) => {
            const stroke = this.createNoiseBufferNode(0.35);
            const sFilter = this.ctx!.createBiquadFilter();
            sFilter.type = "bandpass";
            sFilter.frequency.setValueAtTime(2100 + i * 360, now + t);
            sFilter.Q.setValueAtTime(3.8, now + t);
            const sGain = this.ctx!.createGain();
            sGain.gain.setValueAtTime(0.0001, now + t);
            sGain.gain.linearRampToValueAtTime(0.58, now + t + 0.02);
            sGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.30);

            // Petit clic sec du posé/levé de mine
            const tip = this.ctx!.createOscillator();
            const tGain = this.ctx!.createGain();
            tip.type = "triangle";
            tip.frequency.setValueAtTime(2800, now + t + 0.26);
            tGain.gain.setValueAtTime(0.0001, now + t + 0.26);
            tGain.gain.linearRampToValueAtTime(0.32, now + t + 0.27);
            tGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.31);

            stroke.connect(sFilter);
            sFilter.connect(sGain);
            sGain.connect(this.sfxGain!);
            tip.connect(tGain);
            tGain.connect(this.sfxGain!);

            stroke.start(now + t);
            tip.start(now + t + 0.26);
            tip.stop(now + t + 0.32);
          });
        } else {
          // 4.2 Compas de précision & déroulement de calque : Tintement pur d'instrument de précision et frôlement soyeux
          const chime = this.ctx.createOscillator();
          const cGain = this.ctx.createGain();
          chime.type = "sine";
          chime.frequency.setValueAtTime(2240, now);
          cGain.gain.setValueAtTime(0.0001, now);
          cGain.gain.linearRampToValueAtTime(0.58, now + 0.015);
          cGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
          chime.connect(cGain);
          cGain.connect(this.sfxGain);
          chime.start(now);
          chime.stop(now + 1.35);

          // Déroulement ample et net du rouleau de papier calque architectural
          const paper = this.createNoiseBufferNode(1.2);
          const pFilter = this.ctx.createBiquadFilter();
          pFilter.type = "bandpass";
          pFilter.frequency.setValueAtTime(1500, now + 0.12);
          pFilter.frequency.linearRampToValueAtTime(2900, now + 0.7);
          pFilter.Q.setValueAtTime(2.4, now + 0.12);
          const pGain = this.ctx.createGain();
          pGain.gain.setValueAtTime(0.0001, now + 0.12);
          pGain.gain.linearRampToValueAtTime(0.50, now + 0.42);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          paper.connect(pFilter);
          pFilter.connect(pGain);
          pGain.connect(this.sfxGain);
          paper.start(now + 0.12);
        }
        break;

      case 5:
        if (fxIndex === 1) {
          // 5.1 Compacteur bitume : Frappe tellurique hydraulique lourde 42Hz + grondement de compactage
          [0.05, 0.48, 0.92].forEach((t) => {
            const heavyThud = this.ctx!.createOscillator();
            const ironRattle = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            heavyThud.type = "triangle";
            heavyThud.frequency.setValueAtTime(46, now + t);
            heavyThud.frequency.exponentialRampToValueAtTime(26, now + t + 0.24);

            ironRattle.type = "sawtooth";
            ironRattle.frequency.setValueAtTime(170, now + t);
            ironRattle.frequency.exponentialRampToValueAtTime(65, now + t + 0.18);

            gain.gain.setValueAtTime(0.0001, now + t);
            gain.gain.linearRampToValueAtTime(0.68, now + t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.34);

            heavyThud.connect(gain);
            ironRattle.connect(gain);
            gain.connect(this.sfxGain!);

            heavyThud.start(now + t);
            ironRattle.start(now + t);
            heavyThud.stop(now + t + 0.36);
            ironRattle.stop(now + t + 0.36);
          });
        } else {
          // 5.2 Clé à chocs paddock : Rafale pneumatique CIK-FIA ultra-rapide (8 impacts secs) + détente d'air comprimé
          [0.03, 0.08, 0.13, 0.18, 0.23, 0.28, 0.33, 0.38].forEach((t) => {
            const hammer = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            hammer.type = "sawtooth";
            hammer.frequency.setValueAtTime(680, now + t);
            hammer.frequency.exponentialRampToValueAtTime(170, now + t + 0.035);

            gain.gain.setValueAtTime(0.0001, now + t);
            gain.gain.linearRampToValueAtTime(0.58, now + t + 0.006);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.045);

            hammer.connect(gain);
            gain.connect(this.sfxGain!);
            hammer.start(now + t);
            hammer.stop(now + t + 0.05);
          });

          // Pschitt pneumatique haute pression de fin de serrage
          const airBlow = this.createNoiseBufferNode(0.55);
          const aFilter = this.ctx.createBiquadFilter();
          aFilter.type = "highpass";
          aFilter.frequency.setValueAtTime(3400, now + 0.42);
          const aGain = this.ctx.createGain();
          aGain.gain.setValueAtTime(0.0001, now + 0.42);
          aGain.gain.linearRampToValueAtTime(0.52, now + 0.45);
          aGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
          airBlow.connect(aFilter);
          aFilter.connect(aGain);
          aGain.connect(this.sfxGain);
          airBlow.start(now + 0.42);
        }
        break;

      case 6:
        if (fxIndex === 1) {
          // 6.1 Battement de cœur & verrouillage visière : Tension pure de la pré-grille (sub-bass 48Hz + CLAC de visière CIK-FIA)
          [0.05, 0.28].forEach((t, i) => {
            const pulse = this.ctx!.createOscillator();
            const pGain = this.ctx!.createGain();
            pulse.type = "sine";
            pulse.frequency.setValueAtTime(i === 0 ? 54 : 44, now + t);
            pulse.frequency.exponentialRampToValueAtTime(28, now + t + 0.16);
            pGain.gain.setValueAtTime(0.0001, now + t);
            pGain.gain.linearRampToValueAtTime(0.70, now + t + 0.02);
            pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.22);
            pulse.connect(pGain);
            pGain.connect(this.sfxGain!);
            pulse.start(now + t);
            pulse.stop(now + t + 0.24);
          });

          // Enclenchement mécanique sec et hermétique de la visière du casque
          const visor = this.ctx.createOscillator();
          const vGain = this.ctx.createGain();
          visor.type = "triangle";
          visor.frequency.setValueAtTime(1750, now + 0.65);
          visor.frequency.exponentialRampToValueAtTime(280, now + 0.74);
          vGain.gain.setValueAtTime(0.0001, now + 0.65);
          vGain.gain.linearRampToValueAtTime(0.65, now + 0.67);
          vGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.82);
          visor.connect(vGain);
          vGain.connect(this.sfxGain);
          visor.start(now + 0.65);
          visor.stop(now + 0.85);
        } else {
          // 6.2 5 Feux de départ FIA & impulsion vert : Bips électroniques d'allumage des 5 feux rouges, pause insoutenable, et RUGISSEMENT DÉPART VERT
          [1, 2, 3, 4, 5].forEach((lightNum, i) => {
            const lightTime = now + i * 0.32;
            const beep = this.ctx!.createOscillator();
            const bGain = this.ctx!.createGain();
            beep.type = "triangle";
            beep.frequency.setValueAtTime(600 + lightNum * 70, lightTime);
            bGain.gain.setValueAtTime(0.0001, lightTime);
            bGain.gain.linearRampToValueAtTime(0.60, lightTime + 0.015);
            bGain.gain.exponentialRampToValueAtTime(0.0001, lightTime + 0.18);
            beep.connect(bGain);
            bGain.connect(this.sfxGain!);
            beep.start(lightTime);
            beep.stop(lightTime + 0.2);
          });

          // Extinction des feux & GO DÉPART VERT !
          const goTime = now + 5 * 0.32 + 0.35;
          const goTone = this.ctx.createOscillator();
          const goGain = this.ctx.createGain();
          goTone.type = "sine";
          goTone.frequency.setValueAtTime(1300, goTime);
          goGain.gain.setValueAtTime(0.0001, goTime);
          goGain.gain.linearRampToValueAtTime(0.65, goTime + 0.02);
          goGain.gain.exponentialRampToValueAtTime(0.0001, goTime + 0.85);
          goTone.connect(goGain);
          goGain.connect(this.sfxGain);
          goTone.start(goTime);
          goTone.stop(goTime + 0.9);

          // Rugissement surpuissant du kart qui bondit de la grille
          const launchRoar = this.ctx.createOscillator();
          const lrGain = this.ctx.createGain();
          launchRoar.type = "sawtooth";
          launchRoar.frequency.setValueAtTime(150, goTime);
          launchRoar.frequency.exponentialRampToValueAtTime(720, goTime + 0.9);
          lrGain.gain.setValueAtTime(0.0001, goTime);
          lrGain.gain.linearRampToValueAtTime(0.62, goTime + 0.1);
          lrGain.gain.exponentialRampToValueAtTime(0.0001, goTime + 1.1);
          launchRoar.connect(lrGain);
          lrGain.connect(this.sfxGain);
          launchRoar.start(goTime);
          launchRoar.stop(goTime + 1.15);
        }
        break;

      case 7:
        if (fxIndex === 1) {
          // 7.1 Moteur 2-temps 14 000 tr/min (accélération féroce & passage de rapport ultra-rapide - LE MODÈLE DE RÉFÉRENCE ABSOLU)
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc1.type = "sawtooth";
          osc2.type = "sawtooth";

          // Montée 1er rapport
          osc1.frequency.setValueAtTime(280, now);
          osc1.frequency.exponentialRampToValueAtTime(680, now + 0.85);
          // Passage 2nd rapport instantané
          osc1.frequency.setValueAtTime(460, now + 0.9);
          osc1.frequency.exponentialRampToValueAtTime(840, now + 2.1);

          osc2.frequency.setValueAtTime(284, now);
          osc2.frequency.exponentialRampToValueAtTime(686, now + 0.85);
          osc2.frequency.setValueAtTime(464, now + 0.9);
          osc2.frequency.exponentialRampToValueAtTime(846, now + 2.1);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1500, now);
          filter.frequency.linearRampToValueAtTime(3600, now + 2.1);
          filter.Q.setValueAtTime(3.5, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.55, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(this.sfxGain);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 2.25);
          osc2.stop(now + 2.25);
        } else {
          // 7.2 Doppler & vibreur FIA (passage rasoir à pleine vitesse + clac-clac du vibreur - LE MODÈLE DE RÉFÉRENCE ABSOLU)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(860, now);
          osc.frequency.exponentialRampToValueAtTime(190, now + 1.1);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.55, now + 0.35);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now);
          osc.stop(now + 1.4);

          // Clac-clac-clac sur les cannelures du vibreur
          [0.22, 0.29, 0.36, 0.43, 0.50, 0.57].forEach((t) => {
            const kerb = this.ctx!.createOscillator();
            const kGain = this.ctx!.createGain();
            kerb.type = "triangle";
            kerb.frequency.setValueAtTime(290, now + t);
            kGain.gain.setValueAtTime(0.0001, now + t);
            kGain.gain.linearRampToValueAtTime(0.42, now + t + 0.008);
            kGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.05);
            kerb.connect(kGain);
            kGain.connect(this.sfxGain!);
            kerb.start(now + t);
            kerb.stop(now + t + 0.06);
          });
        }
        break;

      case 8:
        if (fxIndex === 1) {
          // 8.1 Fanfare de victoire, clameur des tribunes & passage victorieux
          // Ovation immense du stade + sonnerie triomphale de cuivres + passage kart victorieux 2-temps
          const crowd = this.createNoiseBufferNode(3.0);
          const cFilter = this.ctx.createBiquadFilter();
          cFilter.type = "bandpass";
          cFilter.frequency.setValueAtTime(800, now);
          cFilter.frequency.linearRampToValueAtTime(1400, now + 1.2);
          cFilter.Q.setValueAtTime(1.8, now);
          const cGain = this.ctx.createGain();
          cGain.gain.setValueAtTime(0.0001, now);
          cGain.gain.linearRampToValueAtTime(0.62, now + 0.6);
          cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.85);

          // Fanfare triomphale de cuivres héraldiques (Do4 -> Mi4 -> Sol4 -> Do5)
          [
            { f: 261.63, t: 0.1 },
            { f: 329.63, t: 0.35 },
            { f: 392.00, t: 0.60 },
            { f: 523.25, t: 0.90 }
          ].forEach((note) => {
            const horn = this.ctx!.createOscillator();
            const hFilter = this.ctx!.createBiquadFilter();
            const hGain = this.ctx!.createGain();

            horn.type = "sawtooth";
            horn.frequency.setValueAtTime(note.f, now + note.t);

            hFilter.type = "lowpass";
            hFilter.frequency.setValueAtTime(note.f * 4.5, now + note.t);
            hFilter.Q.setValueAtTime(2.8, now + note.t);

            hGain.gain.setValueAtTime(0.0001, now + note.t);
            hGain.gain.linearRampToValueAtTime(0.52, now + note.t + 0.04);
            hGain.gain.exponentialRampToValueAtTime(0.0001, now + note.t + 1.25);

            horn.connect(hFilter);
            hFilter.connect(hGain);
            hGain.connect(this.sfxGain!);

            horn.start(now + note.t);
            horn.stop(now + note.t + 1.3);
          });

          // Rugissement du kart victorieux qui franchit la ligne d'arrivée
          const winKart = this.ctx.createOscillator();
          const wkGain = this.ctx.createGain();
          winKart.type = "sawtooth";
          winKart.frequency.setValueAtTime(750, now + 0.8);
          winKart.frequency.exponentialRampToValueAtTime(260, now + 2.2);
          wkGain.gain.setValueAtTime(0.0001, now + 0.8);
          wkGain.gain.linearRampToValueAtTime(0.50, now + 1.2);
          wkGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
          winKart.connect(wkGain);
          wkGain.connect(this.sfxGain);
          winKart.start(now + 0.8);
          winKart.stop(now + 2.45);

          crowd.connect(cFilter);
          cFilter.connect(cGain);
          cGain.connect(this.sfxGain);
          crowd.start(now);
        } else {
          // 8.2 Tambours & polyrythmie béninoise : Tambour d'aisselle Tama (pitch bend authentique) + cloche double Gankogui
          // 1. Frappes de cloche en fer traditionnelle Gankogui
          [0.05, 0.28, 0.52, 0.76, 1.00, 1.24].forEach((t, i) => {
            const bell = this.ctx!.createOscillator();
            const bGain = this.ctx!.createGain();
            bell.type = "triangle";
            bell.frequency.setValueAtTime(i % 2 === 0 ? 880 : 1320, now + t);
            bGain.gain.setValueAtTime(0.0001, now + t);
            bGain.gain.linearRampToValueAtTime(0.48, now + t + 0.006);
            bGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.09);
            bell.connect(bGain);
            bGain.connect(this.sfxGain!);
            bell.start(now + t);
            bell.stop(now + t + 0.1);
          });

          // 2. Frappes royales de tambour parlant avec pitch-bend vigoureux
          [0.08, 0.32, 0.58, 0.84, 1.10, 1.38].forEach((t, i) => {
            const drum = this.ctx!.createOscillator();
            const dGain = this.ctx!.createGain();
            drum.type = "sine";
            const basePitch = i % 2 === 0 ? 120 : 155;
            drum.frequency.setValueAtTime(basePitch, now + t);
            drum.frequency.exponentialRampToValueAtTime(basePitch * 1.85, now + t + 0.16);

            dGain.gain.setValueAtTime(0.0001, now + t);
            dGain.gain.linearRampToValueAtTime(0.68, now + t + 0.015);
            dGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.24);

            drum.connect(dGain);
            dGain.connect(this.sfxGain!);
            drum.start(now + t);
            drum.stop(now + t + 0.26);
          });
        }
        break;

      case 9:
        if (fxIndex === 1) {
          // 9.1 Coupure contact & cliquetis métal chaud : Décélération moteur 520Hz -> ralenti, coupure allumage nette & clics de contraction thermique
          const engine = this.ctx.createOscillator();
          const eFilter = this.ctx.createBiquadFilter();
          const eGain = this.ctx.createGain();

          engine.type = "sawtooth";
          engine.frequency.setValueAtTime(540, now);
          engine.frequency.exponentialRampToValueAtTime(95, now + 0.95);

          eFilter.type = "lowpass";
          eFilter.frequency.setValueAtTime(1400, now);
          eFilter.frequency.exponentialRampToValueAtTime(320, now + 0.95);

          eGain.gain.setValueAtTime(0.0001, now);
          eGain.gain.linearRampToValueAtTime(0.60, now + 0.04);
          eGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

          engine.connect(eFilter);
          eFilter.connect(eGain);
          eGain.connect(this.sfxGain);
          engine.start(now);
          engine.stop(now + 1.05);

          // Clics métalliques de refroidissement du pot d'échappement dans l'air marin
          [1.08, 1.38, 1.72, 2.08, 2.45, 2.80].forEach((t, i) => {
            const ping = this.ctx!.createOscillator();
            const pGain = this.ctx!.createGain();
            ping.type = "triangle";
            ping.frequency.setValueAtTime(2750 + (i % 3) * 420, now + t);
            pGain.gain.setValueAtTime(0.0001, now + t);
            pGain.gain.linearRampToValueAtTime(0.44, now + t + 0.006);
            pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.065);

            ping.connect(pGain);
            pGain.connect(this.sfxGain!);
            ping.start(now + t);
            ping.stop(now + t + 0.075);
          });
        } else {
          // 9.2 Vœu face à l'océan : Immense élévation cinématique crépusculaire (violoncelle profond 55Hz + accord Ré Majeur 9ème & brise dorée)
          const seaBreeze = this.createNoiseBufferNode(3.0);
          const sFilter = this.ctx.createBiquadFilter();
          sFilter.type = "lowpass";
          sFilter.frequency.setValueAtTime(650, now);
          const sGain = this.ctx.createGain();
          sGain.gain.setValueAtTime(0.0001, now);
          sGain.gain.linearRampToValueAtTime(0.48, now + 0.7);
          sGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.85);

          // Basse noble de violoncelle (55Hz Ré1)
          const bass = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          bass.type = "sawtooth";
          bass.frequency.setValueAtTime(55, now);
          bGain.gain.setValueAtTime(0.0001, now);
          bGain.gain.linearRampToValueAtTime(0.40, now + 0.4);
          bGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
          bass.connect(bGain);
          bGain.connect(this.sfxGain);
          bass.start(now);
          bass.stop(now + 2.85);

          // Accord crépusculaire doré noble (Ré Majeur 9ème : Ré3, Fa#3, La3, Do#4, Mi4)
          [146.83, 185.00, 220.00, 277.18, 329.63].forEach((freq) => {
            const pad = this.ctx!.createOscillator();
            const pGain = this.ctx!.createGain();
            pad.type = "sine";
            pad.frequency.setValueAtTime(freq, now + 0.1);
            pGain.gain.setValueAtTime(0.0001, now + 0.1);
            pGain.gain.linearRampToValueAtTime(0.28, now + 0.8);
            pGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

            pad.connect(pGain);
            pGain.connect(this.sfxGain!);
            pad.start(now + 0.1);
            pad.stop(now + 2.8);
          });

          seaBreeze.connect(sFilter);
          sFilter.connect(sGain);
          sGain.connect(this.sfxGain);
          seaBreeze.start(now);
        }
        break;

      case 10:
        if (fxIndex === 1) {
          // 10.1 Télémétrie en direct : Impulsions radar haute fréquence & balayages de flux data du paddock
          [0.04, 0.20, 0.38, 0.56, 0.74, 0.94].forEach((t, i) => {
            const ping1 = this.ctx!.createOscillator();
            const ping2 = this.ctx!.createOscillator();
            const pGain = this.ctx!.createGain();

            ping1.type = "sine";
            ping1.frequency.setValueAtTime(1480 + (i % 3) * 520, now + t);
            ping2.type = "triangle";
            ping2.frequency.setValueAtTime(2960 + (i % 3) * 1040, now + t);

            pGain.gain.setValueAtTime(0.0001, now + t);
            pGain.gain.linearRampToValueAtTime(0.52, now + t + 0.008);
            pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.08);

            ping1.connect(pGain);
            ping2.connect(pGain);
            pGain.connect(this.sfxGain!);

            ping1.start(now + t);
            ping2.start(now + t);
            ping1.stop(now + t + 0.09);
            ping2.stop(now + t + 0.09);
          });
        } else {
          // 10.2 Validation officielle & confirmation de prestige : Scellement acoustique officiel du projet
          const sealImpact = this.ctx.createOscillator();
          const siGain = this.ctx.createGain();
          sealImpact.type = "triangle";
          sealImpact.frequency.setValueAtTime(120, now);
          sealImpact.frequency.exponentialRampToValueAtTime(45, now + 0.12);
          siGain.gain.setValueAtTime(0.0001, now);
          siGain.gain.linearRampToValueAtTime(0.55, now + 0.01);
          siGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
          sealImpact.connect(siGain);
          siGain.connect(this.sfxGain);
          sealImpact.start(now);
          sealImpact.stop(now + 0.2);

          // Accord solennel de validation officielle (Do Majeur triomphant : Do4, Mi4, Sol4, Do5)
          [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
            const chime = this.ctx!.createOscillator();
            const cGain = this.ctx!.createGain();
            chime.type = "triangle";
            chime.frequency.setValueAtTime(freq, now + 0.2 + idx * 0.05);
            cGain.gain.setValueAtTime(0.0001, now + 0.2 + idx * 0.05);
            cGain.gain.linearRampToValueAtTime(0.48, now + 0.3 + idx * 0.05);
            cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            chime.connect(cGain);
            cGain.connect(this.sfxGain!);
            chime.start(now + 0.2 + idx * 0.05);
            chime.stop(now + 2.55);
          });
        }
        break;
    }

    setTimeout(() => {
      this.isPlayingRealisticFx = false;
      this.notify();
    }, 3200);
  }

  // =========================================================================
  // 10 COMPOSITIONS MUSICALES CONTINUES (PROCÉDURALES HAUTE FIDÉLITÉ)
  // =========================================================================

  /**
   * SLIDE 01 : Souffle de l'océan Atlantique & Thème trailer cinématique noble (Am9 -> Fmaj7 -> C)
   * Pulse rythmique basse continue pour une vraie propulsion dramatique
   */
  private startSlide01OceanCinematic() {
    this.startWindAmbience(220, 0.08);
    this.createDroneOscillator(55, 0.10, "triangle"); // A1 deep noble sub

    // Progression d'accords amples cinématiques
    const chords = [
      [220, 261.63, 329.63, 493.88], // Am9
      [174.61, 261.63, 329.63, 440],  // Fmaj7
      [196, 261.63, 329.63, 392],     // Cmaj
      [196, 246.94, 293.66, 440],     // Gsus2
    ];
    let chordIdx = 0;
    const playNextChord = () => {
      if (this.currentSlideNumber !== 1 || this.isMuted) return;
      this.crossfadeChord(chords[chordIdx], 3.8, 0.07);
      chordIdx = (chordIdx + 1) % chords.length;
    };
    playNextChord();
    const chordInterval = window.setInterval(playNextChord, 4000);
    this.activeIntervals.push(chordInterval);

    // Pulse rythmique cinématographique continu en La mineur (comme la Page 7)
    const bassNotes = [110, 110, 130.81, 110, 146.83, 110, 130.81, 98.00];
    let step = 0;
    const tickOceanBass = () => {
      if (this.currentSlideNumber !== 1 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = bassNotes[step % bassNotes.length];
      step++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(580, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const bassInterval = window.setInterval(tickOceanBass, 175);
    this.activeIntervals.push(bassInterval);
  }

  /**
   * SLIDE 02 : Mélodie au Balafon / Marimba africain chaleureux & groove percussif boisé
   * Rhythme entraînant, basse acoustique Ré Majeur et timbres boisés vivants
   */
  private startSlide02BalafonMusic() {
    this.createDroneOscillator(73.42, 0.08, "sine"); // D2
    this.startGentlePad([293.66, 369.99, 440], 0.05); // D, F#, A

    // Ligne de basse acoustique chaleureuse en Ré Majeur (cadence 175ms)
    const bassScale = [73.42, 73.42, 98.00, 73.42, 110.00, 73.42, 123.47, 98.00];
    let bStep = 0;
    const tickAfricanBass = () => {
      if (this.currentSlideNumber !== 2 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = bassScale[bStep % bassScale.length];
      bStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(580, now);
      filter.Q.setValueAtTime(2.8, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const bInterval = window.setInterval(tickAfricanBass, 175);
    this.activeIntervals.push(bInterval);

    // Balafon pentatonique riche avec double harmonique boisée
    const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33];
    const melody = [0, 2, 4, 3, 1, 3, 5, 4, 2, 1, 0, 2];
    let step = 0;
    const tickBalafon = () => {
      if (this.currentSlideNumber !== 2 || this.isMuted || !this.ctx || !this.musicGain) return;
      const noteFreq = scale[melody[step % melody.length]];
      step++;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(noteFreq, now);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(noteFreq * 2, now); // Octave harmonique boisée

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.musicGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.30);
      osc2.stop(now + 0.30);
    };
    const balafonInterval = window.setInterval(tickBalafon, 220);
    this.activeIntervals.push(balafonInterval);
  }

  /**
   * SLIDE 03 : Suspense cinématographique palpitant (style Hans Zimmer / Inception)
   * Pulsation tendue continue en Mi mineur, filtre passe-bas dynamique et cristal en suspension
   */
  private startSlide03SuspenseMusic() {
    this.createDroneOscillator(82.41, 0.10, "triangle"); // E2
    this.startGentlePad([164.81, 196.00, 246.94], 0.06); // E3, G3, B3

    // Teinte cristalline étincelante de la tour vitrée
    const shimmer = this.ctx?.createOscillator();
    const sGain = this.ctx?.createGain();
    if (this.ctx && this.musicGain && shimmer && sGain) {
      shimmer.type = "sine";
      shimmer.frequency.setValueAtTime(1318.51, this.ctx.currentTime); // E6
      sGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      shimmer.connect(sGain);
      sGain.connect(this.musicGain);
      shimmer.start();
      this.activeMusicOscs.push(shimmer);
      this.activeMusicGains.push(sGain);
    }

    // Basse de suspense continue à 175ms (cadence ultra-immersive comme Slide 7)
    const suspenseNotes = [82.41, 82.41, 98.00, 82.41, 110.00, 82.41, 98.00, 73.42];
    let step = 0;
    const tickSuspenseGroove = () => {
      if (this.currentSlideNumber !== 3 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = suspenseNotes[step % suspenseNotes.length];
      step++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450 + (step % 4) * 80, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.17);
    };
    const sInterval = window.setInterval(tickSuspenseGroove, 175);
    this.activeIntervals.push(sInterval);
  }

  /**
   * SLIDE 04 : Arpèges néo-classiques d'architecte (style Max Richter / Philip Glass)
   * Mouvement perpétuel inspirant, basse de violoncelle et cascade harmonique
   */
  private startSlide04ArchitectMinimalism() {
    this.createDroneOscillator(110, 0.07, "sine"); // A2

    // Basse de violoncelle en La mineur
    const celloNotes = [110, 110, 130.81, 110, 146.83, 110, 164.81, 130.81];
    let cStep = 0;
    const tickCello = () => {
      if (this.currentSlideNumber !== 4 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = celloNotes[cStep % celloNotes.length];
      cStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(540, now);
      filter.Q.setValueAtTime(2.6, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const celloInterval = window.setInterval(tickCello, 180);
    this.activeIntervals.push(celloInterval);

    // Arpèges fluides piano/cordes minimalistes continus
    const pattern = [220, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 261.63];
    let noteIdx = 0;
    const playMinimalistArp = () => {
      if (this.currentSlideNumber !== 4 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = pattern[noteIdx % pattern.length];
      noteIdx++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.24);
    };
    const arpInterval = window.setInterval(playMinimalistArp, 180);
    this.activeIntervals.push(arpInterval);
  }

  /**
   * SLIDE 05 : Groove techno-technique & pulsation d'ingénierie (style Tron / Daft Punk)
   * Basse synthétique percutante 130 BPM en Do mineur et clics d'horlogerie de pointe
   */
  private startSlide05EngineeringGroove() {
    this.createDroneOscillator(65.41, 0.09, "sawtooth"); // C2 lowpass
    this.startGentlePad([261.63, 311.13, 392, 466.16], 0.06); // Cm7

    // Basse synthétique d'ingénierie ultra-rythmée à 170ms (pleine dynamique)
    const synthBass = [65.41, 65.41, 77.78, 65.41, 87.31, 65.41, 98.00, 58.27];
    let sStep = 0;
    const tickEngBass = () => {
      if (this.currentSlideNumber !== 5 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = synthBass[sStep % synthBass.length];
      sStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(750, now);
      filter.Q.setValueAtTime(3.2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.16);
    };
    const engInterval = window.setInterval(tickEngBass, 170);
    this.activeIntervals.push(engInterval);

    // Clics de précision horlogère haute fréquence
    let beat = 0;
    const tickClockwork = () => {
      if (this.currentSlideNumber !== 5 || this.isMuted || !this.ctx || !this.musicGain) return;
      const now = this.ctx.currentTime;
      const click = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      click.type = beat % 4 === 0 ? "triangle" : "sine";
      click.frequency.setValueAtTime(beat % 4 === 0 ? 1400 : 900, now);
      click.frequency.exponentialRampToValueAtTime(250, now + 0.035);

      gain.gain.setValueAtTime(beat % 4 === 0 ? 0.07 : 0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      click.connect(gain);
      gain.connect(this.musicGain);
      click.start(now);
      click.stop(now + 0.05);
      beat++;
    };
    const clockInterval = window.setInterval(tickClockwork, 240);
    this.activeIntervals.push(clockInterval);
  }

  /**
   * SLIDE 06 : Tension maximale de pré-grille, battement sous le casque & montée d'adrénaline
   * Basse sous tension continue 175ms et double pulsation cardiaque
   */
  private startSlide06PaddockTension() {
    this.startDistantEngine(50, 0.06);
    this.startGentlePad([440, 554.37], 0.05); // Tension harmonique A4, C#5

    // Ligne de tension rythmée continue en La (comme Slide 7)
    const tensionNotes = [110, 110, 123.47, 110, 130.81, 110, 123.47, 98.00];
    let tStep = 0;
    const tickTensionBass = () => {
      if (this.currentSlideNumber !== 6 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = tensionNotes[tStep % tensionNotes.length];
      tStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, now);
      filter.Q.setValueAtTime(2.8, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.10, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.17);
    };
    const tInterval = window.setInterval(tickTensionBass, 175);
    this.activeIntervals.push(tInterval);

    // Battement de cœur viscéral sourd
    const tickHeartbeat = () => {
      if (this.currentSlideNumber !== 6 || this.isMuted || !this.ctx || !this.musicGain) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const g1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(56, now);
      osc1.frequency.exponentialRampToValueAtTime(32, now + 0.14);
      g1.gain.setValueAtTime(0.18, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc1.connect(g1);
      g1.connect(this.musicGain);
      osc1.start(now);
      osc1.stop(now + 0.18);

      const osc2 = this.ctx.createOscillator();
      const g2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(48, now + 0.18);
      osc2.frequency.exponentialRampToValueAtTime(28, now + 0.32);
      g2.gain.setValueAtTime(0.14, now + 0.18);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      osc2.connect(g2);
      g2.connect(this.musicGain);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.35);
    };
    const hInterval = window.setInterval(tickHeartbeat, 650);
    this.activeIntervals.push(hInterval);
  }

  /**
   * SLIDE 07 : Cadence de course survoltée & énergie mécanique plein gaz (RÉFÉRENCE ABSOLUE)
   */
  private startSlide07RaceScreamer() {
    // Fast rolling 16th-note bassline in F# minor
    const bassNotes = [92.5, 92.5, 110, 92.5, 123.47, 92.5, 110, 82.41];
    let step = 0;

    const tickRaceBass = () => {
      if (this.currentSlideNumber !== 7 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = bassNotes[step % bassNotes.length];
      step++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 0.18);
    };

    const interval = window.setInterval(tickRaceBass, 175);
    this.activeIntervals.push(interval);
  }

  /**
   * SLIDE 08 : Polyrythmie festive africaine, fête & clameur des tribunes
   * Percussions royales syncopées, basse festive en Sol Majeur et cuivres triomphants
   */
  private startSlide08FestivePolyphony() {
    this.startGentlePad([196, 246.94, 293.66, 392], 0.06); // Sol Majeur

    // Basse festive africaine continue à 175ms
    const festNotes = [98.00, 98.00, 123.47, 98.00, 146.83, 98.00, 130.81, 110.00];
    let fStep = 0;
    const tickFestBass = () => {
      if (this.currentSlideNumber !== 8 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = festNotes[fStep % festNotes.length];
      fStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(620, now);
      filter.Q.setValueAtTime(2.6, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const fBassInterval = window.setInterval(tickFestBass, 175);
    this.activeIntervals.push(fBassInterval);

    // Tambours béninois polyrythmiques syncopés
    const drumPitches = [120, 80, 145, 90, 120, 90, 160, 80];
    let dStep = 0;
    const tickAfricanDrum = () => {
      if (this.currentSlideNumber !== 8 || this.isMuted || !this.ctx || !this.musicGain) return;
      const pitch = drumPitches[dStep % drumPitches.length];
      dStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.16);
    };
    const drumInterval = window.setInterval(tickAfricanDrum, 210);
    this.activeIntervals.push(drumInterval);
  }

  /**
   * SLIDE 09 : Élévation émotionnelle, coucher de soleil doré sur l'océan & transmission
   * Basse de violoncelle noble, arpèges cinématiques et brise marine
   */
  private startSlide09SunsetElevation() {
    this.startWindAmbience(180, 0.07);

    // Progression d'accords d'élévation : Fa Maj7 -> Sol -> La min -> Mi min9
    const chords = [
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [196, 246.94, 293.66, 392],    // G
      [220, 261.63, 329.63, 440],    // Am
      [164.81, 246.94, 329.63, 392], // Em
    ];
    let cIdx = 0;
    const playSunsetProgression = () => {
      if (this.currentSlideNumber !== 9 || this.isMuted) return;
      this.crossfadeChord(chords[cIdx], 3.8, 0.08);
      cIdx = (cIdx + 1) % chords.length;
    };
    playSunsetProgression();
    const chordInterval = window.setInterval(playSunsetProgression, 4000);
    this.activeIntervals.push(chordInterval);

    // Ligne de violoncelle continue à 175ms (émouvante et entraînante comme Slide 7)
    const sunsetBass = [87.31, 87.31, 110.00, 87.31, 130.81, 87.31, 98.00, 110.00];
    let sStep = 0;
    const tickSunsetBass = () => {
      if (this.currentSlideNumber !== 9 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = sunsetBass[sStep % sunsetBass.length];
      sStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(580, now);
      filter.Q.setValueAtTime(2.6, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const sBassInterval = window.setInterval(tickSunsetBass, 175);
    this.activeIntervals.push(sBassInterval);
  }

  /**
   * SLIDE 10 : Executive Tech Lounge & Télémétrie officielle (Page Budget & Paddock)
   * Musique chic, moderne, feutrée reflétant le sérieux d'un appel d'offres de prestige
   */
  private startSlide10ExecutiveLounge() {
    this.createDroneOscillator(73.42, 0.08, "sine"); // D2 deep sub

    // Accords jazz-tech lounge feutrés (Dm9 -> G13 -> Cmaj9 -> Am7)
    const loungeChords = [
      [293.66, 349.23, 440, 523.25, 659.25], // Dm9
      [196, 246.94, 329.63, 440],            // G13
      [261.63, 329.63, 392, 493.88],         // Cmaj9
      [220, 261.63, 329.63, 440],            // Am7
    ];
    let lIdx = 0;
    const playLoungeChords = () => {
      if (this.currentSlideNumber !== 10 || this.isMuted) return;
      this.crossfadeChord(loungeChords[lIdx], 3.8, 0.07);
      lIdx = (lIdx + 1) % loungeChords.length;
    };
    playLoungeChords();
    const interval1 = window.setInterval(playLoungeChords, 4000);
    this.activeIntervals.push(interval1);

    // Pulse Downtempo Tech en Ré mineur à 175ms (prestige et rigueur)
    const execBass = [73.42, 73.42, 87.31, 73.42, 110.00, 73.42, 98.00, 110.00];
    let eStep = 0;
    const tickExecBass = () => {
      if (this.currentSlideNumber !== 10 || this.isMuted || !this.ctx || !this.musicGain) return;
      const freq = execBass[eStep % execBass.length];
      eStep++;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(560, now);
      filter.Q.setValueAtTime(2.6, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 0.18);
    };
    const eInterval = window.setInterval(tickExecBass, 175);
    this.activeIntervals.push(eInterval);

    // Bip télémétrique feutré de haute technologie
    let tBeat = 0;
    const tickTelemetry = () => {
      if (this.currentSlideNumber !== 10 || this.isMuted || !this.ctx || !this.musicGain) return;
      tBeat++;
      if (tBeat % 3 !== 0) return;

      const now = this.ctx.currentTime;
      const blip = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      blip.type = "sine";
      blip.frequency.setValueAtTime(1760 + (tBeat % 2) * 220, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      blip.connect(gain);
      gain.connect(this.musicGain);
      blip.start(now);
      blip.stop(now + 0.09);
    };
    const tInterval = window.setInterval(tickTelemetry, 320);
    this.activeIntervals.push(tInterval);
  }

  // =========================================================================
  // SONS RÉALISTES CINÉMATOGRAPHIQUES DÉDIÉS
  // =========================================================================

  private playSlide01TrailerArc(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Souffle océanique ample
    const breath = this.createNoiseBufferNode(1.4);
    const bFilter = this.ctx.createBiquadFilter();
    bFilter.type = "bandpass";
    bFilter.frequency.setValueAtTime(380, now);
    const bGain = this.ctx.createGain();
    bGain.gain.setValueAtTime(0.001, now);
    bGain.gain.linearRampToValueAtTime(0.12, now + 0.6);
    bGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    breath.connect(bFilter);
    bFilter.connect(bGain);
    bGain.connect(this.sfxGain);
    breath.start(now);

    // 2. Grondement de kart lointain à 1.4s
    const rumble = this.ctx.createOscillator();
    const rGain = this.ctx.createGain();
    rumble.type = "sawtooth";
    rumble.frequency.setValueAtTime(60, now + 1.4);
    rumble.frequency.exponentialRampToValueAtTime(160, now + 2.8);
    rGain.gain.setValueAtTime(0.001, now + 1.4);
    rGain.gain.linearRampToValueAtTime(0.16, now + 2.2);
    rGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    rumble.connect(rGain);
    rGain.connect(this.sfxGain);
    rumble.start(now + 1.4);
    rumble.stop(now + 3.3);

    // 3. Montée en puissance
    setTimeout(() => {
      this.playContinuousAccelerationSequence();
    }, 3200);
  }

  private playSlide02ReverOser(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Bruits de bois artisanal assemblé avec ficelle
    [0.1, 0.35, 0.65, 0.95].forEach((t, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(380 + i * 90, now + t);
      osc.frequency.exponentialRampToValueAtTime(110, now + t + 0.08);
      gain.gain.setValueAtTime(0.16, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.09);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + t);
      osc.stop(now + t + 0.1);
    });

    // Sifflement des roues sur la terre rouge
    const whistle = this.ctx.createOscillator();
    const wGain = this.ctx.createGain();
    whistle.type = "sawtooth";
    whistle.frequency.setValueAtTime(260, now + 1.2);
    whistle.frequency.exponentialRampToValueAtTime(740, now + 2.4);
    const wFilter = this.ctx.createBiquadFilter();
    wFilter.type = "bandpass";
    wFilter.frequency.setValueAtTime(1200, now + 1.2);
    wFilter.frequency.linearRampToValueAtTime(2200, now + 2.4);
    wFilter.Q.setValueAtTime(3.5, now + 1.2);
    wGain.gain.setValueAtTime(0.001, now + 1.2);
    wGain.gain.linearRampToValueAtTime(0.48, now + 1.7);
    wGain.gain.exponentialRampToValueAtTime(0.001, now + 2.7);
    whistle.connect(wFilter);
    wFilter.connect(wGain);
    wGain.connect(this.sfxGain);
    whistle.start(now + 1.2);
    whistle.stop(now + 2.8);

    // Vibration du châssis en bois qui prend de la vitesse sur la terre rouge
    const woodRoll = this.ctx.createOscillator();
    const wrGain = this.ctx.createGain();
    woodRoll.type = "triangle";
    woodRoll.frequency.setValueAtTime(160, now + 1.8);
    woodRoll.frequency.exponentialRampToValueAtTime(340, now + 3.2);
    wrGain.gain.setValueAtTime(0.001, now + 1.8);
    wrGain.gain.linearRampToValueAtTime(0.42, now + 2.4);
    wrGain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);
    woodRoll.connect(wrGain);
    wrGain.connect(this.sfxGain);
    woodRoll.start(now + 1.8);
    woodRoll.stop(now + 3.7);
  }

  private playSlide03JouerRencontrer(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Dévalement à grande vitesse du kart en bois sur la pente de latérite
    [0.1, 0.25, 0.42, 0.62, 0.85, 1.10].forEach((t, i) => {
      const click = this.ctx!.createOscillator();
      const cGain = this.ctx!.createGain();
      click.type = "sine";
      click.frequency.setValueAtTime(1200 + i * 220, now + t);
      click.frequency.exponentialRampToValueAtTime(450, now + t + 0.06);
      cGain.gain.setValueAtTime(0.45, now + t);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.07);
      click.connect(cGain);
      cGain.connect(this.sfxGain!);
      click.start(now + t);
      click.stop(now + t + 0.08);
    });

    // Rotation supersonique des roulements à billes
    const bearingSpin = this.ctx.createOscillator();
    const bFilter = this.ctx.createBiquadFilter();
    const bGain = this.ctx.createGain();
    bearingSpin.type = "sawtooth";
    bearingSpin.frequency.setValueAtTime(380, now + 0.3);
    bearingSpin.frequency.exponentialRampToValueAtTime(980, now + 1.8);
    bFilter.type = "bandpass";
    bFilter.frequency.setValueAtTime(1600, now + 0.3);
    bFilter.Q.setValueAtTime(3.2, now + 0.3);
    bGain.gain.setValueAtTime(0.001, now + 0.3);
    bGain.gain.linearRampToValueAtTime(0.50, now + 1.0);
    bGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);
    bearingSpin.connect(bFilter);
    bFilter.connect(bGain);
    bGain.connect(this.sfxGain);
    bearingSpin.start(now + 0.3);
    bearingSpin.stop(now + 2.5);

    // Glissade et dérapage sec dans la poussière de latérite à 1.9s
    const drift = this.createNoiseBufferNode(1.5);
    const dFilter = this.ctx.createBiquadFilter();
    dFilter.type = "bandpass";
    dFilter.frequency.setValueAtTime(950, now + 1.9);
    dFilter.frequency.exponentialRampToValueAtTime(2600, now + 2.3);
    dFilter.frequency.exponentialRampToValueAtTime(600, now + 3.2);
    dFilter.Q.setValueAtTime(3.2, now + 1.9);
    const dGain = this.ctx.createGain();
    dGain.gain.setValueAtTime(0.001, now + 1.9);
    dGain.gain.linearRampToValueAtTime(0.58, now + 2.2);
    dGain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);
    drift.connect(dFilter);
    dFilter.connect(dGain);
    dGain.connect(this.sfxGain);
    drift.start(now + 1.9);
  }

  private playSlide04ImaginerDessiner(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Crayon graphite montant en fréquence comme un régime moteur
    const pencil = this.createNoiseBufferNode(2.5);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(2600, now + 1.8);
    filter.frequency.exponentialRampToValueAtTime(1000, now + 2.4);
    const pGain = this.ctx.createGain();
    pGain.gain.setValueAtTime(0.001, now);
    pGain.gain.linearRampToValueAtTime(0.15, now + 0.8);
    pGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    pencil.connect(filter);
    filter.connect(pGain);
    pGain.connect(this.sfxGain);
    pencil.start(now);

    // Accords calmes d'inspiration
    [220, 277, 330, 440].forEach((freq) => {
      const chord = this.ctx!.createOscillator();
      const cGain = this.ctx!.createGain();
      chord.type = "sine";
      chord.frequency.setValueAtTime(freq, now + 0.2);
      cGain.gain.setValueAtTime(0.001, now + 0.2);
      cGain.gain.linearRampToValueAtTime(0.05, now + 1.0);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
      chord.connect(cGain);
      cGain.connect(this.sfxGain!);
      chord.start(now + 0.2);
      chord.stop(now + 3.2);
    });
  }

  private playSlide05ConcevoirBatir(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Clics et engrenages d'horlogerie de précision
    [0.1, 0.35, 0.6, 0.85, 1.1, 1.35].forEach((t, i) => {
      const click = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      click.type = "triangle";
      click.frequency.setValueAtTime(850 - i * 60, now + t);
      gain.gain.setValueAtTime(0.1, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.05);
      click.connect(gain);
      gain.connect(this.sfxGain!);
      click.start(now + t);
      click.stop(now + t + 0.06);
    });

    // 2. Kart miniature sur le diorama
    const toy = this.ctx.createOscillator();
    const tGain = this.ctx.createGain();
    toy.type = "sawtooth";
    toy.frequency.setValueAtTime(110, now + 1.5);
    toy.frequency.exponentialRampToValueAtTime(180, now + 2.2);
    tGain.gain.setValueAtTime(0.001, now + 1.5);
    tGain.gain.linearRampToValueAtTime(0.08, now + 1.9);
    toy.connect(tGain);
    tGain.connect(this.sfxGain);
    toy.start(now + 1.5);
    toy.stop(now + 2.3);

    // 3. Métamorphose spectaculaire en moteur réel
    const engine = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const eGain = this.ctx.createGain();
    engine.type = "sawtooth";
    engine.frequency.setValueAtTime(65, now + 2.4);
    engine.frequency.exponentialRampToValueAtTime(240, now + 3.8);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now + 2.4);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 3.8);
    eGain.gain.setValueAtTime(0.01, now + 2.4);
    eGain.gain.linearRampToValueAtTime(0.25, now + 3.4);
    eGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
    engine.connect(filter);
    filter.connect(eGain);
    eGain.connect(this.sfxGain);
    engine.start(now + 2.4);
    engine.stop(now + 4.6);
  }

  private playSlide06SEquiperFremir(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Deux battements de cœur puissants
    [0.1, 0.8].forEach((t) => {
      const hb = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      hb.type = "sine";
      hb.frequency.setValueAtTime(75, now + t);
      hb.frequency.exponentialRampToValueAtTime(35, now + t + 0.12);
      gain.gain.setValueAtTime(0.22, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.18);
      hb.connect(gain);
      gain.connect(this.sfxGain!);
      hb.start(now + t);
      hb.stop(now + t + 0.2);
    });

    // 2. Claquement sec de la visière du casque à 1.4s
    const visor = this.ctx.createOscillator();
    const vGain = this.ctx.createGain();
    visor.type = "triangle";
    visor.frequency.setValueAtTime(1300, now + 1.4);
    visor.frequency.exponentialRampToValueAtTime(220, now + 1.48);
    vGain.gain.setValueAtTime(0.2, now + 1.4);
    vGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    visor.connect(vGain);
    vGain.connect(this.sfxGain);
    visor.start(now + 1.4);
    visor.stop(now + 1.52);

    // 3. Deux coups d'accélérateur francs
    [
      { t: 1.8, dur: 0.45, startF: 90, endF: 230 },
      { t: 2.6, dur: 0.65, startF: 95, endF: 310 },
    ].forEach((b) => {
      const rev = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      rev.type = "sawtooth";
      rev.frequency.setValueAtTime(b.startF, now + b.t);
      rev.frequency.exponentialRampToValueAtTime(b.endF, now + b.t + b.dur * 0.7);
      rev.frequency.exponentialRampToValueAtTime(b.startF, now + b.t + b.dur);
      gain.gain.setValueAtTime(0.01, now + b.t);
      gain.gain.linearRampToValueAtTime(0.22, now + b.t + b.dur * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + b.t + b.dur);
      rev.connect(gain);
      gain.connect(this.sfxGain!);
      rev.start(now + b.t);
      rev.stop(now + b.t + b.dur + 0.05);
    });

    // 4. Séquence des 5 feux rouges FIA
    [1, 2, 3, 4, 5].forEach((lightNum, i) => {
      const lightTime = now + 3.6 + i * 0.7;
      const beep = this.ctx!.createOscillator();
      const bGain = this.ctx!.createGain();
      beep.type = "triangle";
      beep.frequency.setValueAtTime(700 + lightNum * 60, lightTime);
      bGain.gain.setValueAtTime(0.22, lightTime);
      bGain.gain.exponentialRampToValueAtTime(0.001, lightTime + 0.16);
      beep.connect(bGain);
      bGain.connect(this.sfxGain!);
      beep.start(lightTime);
      beep.stop(lightTime + 0.18);
    });
  }

  private playSlide08RassemblerVibrer(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Percussions amples de célébration
    [0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].forEach((t, i) => {
      const drum = this.ctx!.createOscillator();
      const dGain = this.ctx!.createGain();
      drum.type = "sine";
      const f = i % 2 === 0 ? 115 : 85;
      drum.frequency.setValueAtTime(f, now + t);
      drum.frequency.exponentialRampToValueAtTime(35, now + t + 0.14);
      dGain.gain.setValueAtTime(0.2, now + t);
      dGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.16);
      drum.connect(dGain);
      dGain.connect(this.sfxGain!);
      drum.start(now + t);
      drum.stop(now + t + 0.18);
    });

    // 2. Basse tellurique qui fait trembler les barrières (36 Hz)
    const sub = this.ctx.createOscillator();
    const sGain = this.ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(36, now);
    sGain.gain.setValueAtTime(0.01, now);
    sGain.gain.linearRampToValueAtTime(0.25, now + 1.2);
    sGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
    sub.connect(sGain);
    sGain.connect(this.sfxGain);
    sub.start(now);
    sub.stop(now + 3.2);

    // 3. Passage Doppler en arrière-plan
    this.playDopplerPassBy();
  }

  private playSlide09TransmettreSElever(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Moteur qui rentre au stand et coupe le contact
    const engine = this.ctx.createOscillator();
    const eGain = this.ctx.createGain();
    engine.type = "sawtooth";
    engine.frequency.setValueAtTime(140, now);
    engine.frequency.exponentialRampToValueAtTime(65, now + 1.5);
    engine.frequency.setValueAtTime(45, now + 1.8);
    eGain.gain.setValueAtTime(0.16, now);
    eGain.gain.linearRampToValueAtTime(0.08, now + 1.5);
    eGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
    engine.connect(eGain);
    eGain.connect(this.sfxGain);
    engine.start(now);
    engine.stop(now + 2.05);

    // 2. Nappe aérienne ascendante (montée de grue au coucher de soleil)
    [261, 329, 392, 523].forEach((f) => {
      const ethereal = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      ethereal.type = "sine";
      ethereal.frequency.setValueAtTime(f, now + 2.0);
      ethereal.frequency.exponentialRampToValueAtTime(f * 1.05, now + 4.0);
      gain.gain.setValueAtTime(0.001, now + 2.0);
      gain.gain.linearRampToValueAtTime(0.07, now + 3.0);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);
      ethereal.connect(gain);
      gain.connect(this.sfxGain!);
      ethereal.start(now + 2.0);
      ethereal.stop(now + 5.0);
    });

    // 3. Cliquetis thermiques de refroidissement du pot d'échappement dans l'air marin
    [3.8, 4.2, 4.65, 5.1].forEach((t, i) => {
      const ping = this.ctx!.createOscillator();
      const pGain = this.ctx!.createGain();
      ping.type = "triangle";
      ping.frequency.setValueAtTime(2600 + (i % 2) * 500, now + t);
      pGain.gain.setValueAtTime(0.001, now + t);
      pGain.gain.linearRampToValueAtTime(0.35, now + t + 0.005);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.07);
      ping.connect(pGain);
      pGain.connect(this.sfxGain!);
      ping.start(now + t);
      ping.stop(now + t + 0.08);
    });
  }

  /**
   * SLIDE 10 : Design sonore réaliste Paddock & Télémétrie Officielle
   */
  private playSlide10BudgetTelemetry(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Télémétrie électronique officielle FIA (bips de synchronisation des temps au tour)
    [0.1, 0.4, 0.7, 1.2, 1.5, 2.0].forEach((t, i) => {
      const blip = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      blip.type = "sine";
      blip.frequency.setValueAtTime(1200 + (i % 3) * 300, now + t);
      gain.gain.setValueAtTime(0.08, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);
      blip.connect(gain);
      gain.connect(this.sfxGain!);
      blip.start(now + t);
      blip.stop(now + t + 0.09);
    });

    // 2. Chuchotement feutré de paddock & ambiance lounge VIP
    const loungePad = this.ctx.createOscillator();
    const lGain = this.ctx.createGain();
    loungePad.type = "sine";
    loungePad.frequency.setValueAtTime(220, now + 0.5);
    loungePad.frequency.linearRampToValueAtTime(261.63, now + 2.5);
    lGain.gain.setValueAtTime(0.001, now + 0.5);
    lGain.gain.linearRampToValueAtTime(0.06, now + 1.8);
    lGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);
    loungePad.connect(lGain);
    lGain.connect(this.sfxGain);
    loungePad.start(now + 0.5);
    loungePad.stop(now + 4.0);

    // 3. Validation sonore officielle (accord noble de confirmation du budget)
    [329.63, 392, 493.88, 587.33].forEach((f, idx) => {
      const conf = this.ctx!.createOscillator();
      const cGain = this.ctx!.createGain();
      conf.type = "triangle";
      conf.frequency.setValueAtTime(f, now + 2.2 + idx * 0.06);
      cGain.gain.setValueAtTime(0.001, now + 2.2 + idx * 0.06);
      cGain.gain.linearRampToValueAtTime(0.06, now + 2.4);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + 4.2);
      conf.connect(cGain);
      cGain.connect(this.sfxGain!);
      conf.start(now + 2.2 + idx * 0.06);
      conf.stop(now + 4.5);
    });
  }

  // =========================================================================
  // MÉTHODES UTILITAIRES ET EFFETS PARTAGÉS
  // =========================================================================

  public playContinuousAccelerationSequence() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sawtooth";
      sub.type = "triangle";
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);

      // Rapport 1
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 1.1);
      sub.frequency.setValueAtTime(37, now);
      sub.frequency.exponentialRampToValueAtTime(90, now + 1.1);
      filter.frequency.exponentialRampToValueAtTime(900, now + 1.1);

      // Rapport 2
      osc.frequency.setValueAtTime(110, now + 1.25);
      sub.frequency.setValueAtTime(55, now + 1.25);
      osc.frequency.exponentialRampToValueAtTime(260, now + 2.7);
      sub.frequency.exponentialRampToValueAtTime(130, now + 2.7);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 2.7);

      // Rapport 3
      osc.frequency.setValueAtTime(170, now + 2.85);
      sub.frequency.setValueAtTime(85, now + 2.85);
      osc.frequency.exponentialRampToValueAtTime(360, now + 4.5);
      sub.frequency.exponentialRampToValueAtTime(180, now + 4.5);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 4.5);

      // Rapport 4 (pleine vitesse)
      osc.frequency.setValueAtTime(250, now + 4.6);
      osc.frequency.exponentialRampToValueAtTime(440, now + 6.2);
      sub.frequency.setValueAtTime(125, now + 4.6);
      sub.frequency.exponentialRampToValueAtTime(220, now + 6.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.8);
      gain.gain.setValueAtTime(0.18, now + 1.15);
      gain.gain.linearRampToValueAtTime(0.28, now + 2.4);
      gain.gain.setValueAtTime(0.20, now + 2.75);
      gain.gain.linearRampToValueAtTime(0.32, now + 4.4);
      gain.gain.linearRampToValueAtTime(0.35, now + 5.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 6.8);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 6.9);
      sub.stop(now + 6.9);
    } catch {
      // Audio fallback
    }
  }

  public playDopplerPassBy() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.9);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Ignore
    }
  }

  public playCountdownStep(stepIndex: number) {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(580 + stepIndex * 60, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  public playGreenLightLaunch() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(1200, now);
      bellGain.gain.setValueAtTime(0.35, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      bell.connect(bellGain);
      bellGain.connect(this.sfxGain);
      bell.start(now);
      bell.stop(now + 0.85);
    } catch {
      // Ignore
    }
  }

  public updateSectionSound(sectionId: string) {
    this.currentSection = sectionId;
    this.notify();
  }

  private startGentlePad(freqs: number[], vol = 0.07) {
    if (!this.ctx || !this.musicGain) return;
    try {
      freqs.forEach((f) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        gain.gain.setValueAtTime(vol / freqs.length, this.ctx!.currentTime);
        osc.connect(gain);
        gain.connect(this.musicGain!);
        osc.start();
        this.activeMusicOscs.push(osc);
        this.activeMusicGains.push(gain);
      });
    } catch {
      // Ignore
    }
  }

  private createDroneOscillator(freq: number, vol = 0.08, type: OscillatorType = "sine") {
    if (!this.ctx || !this.musicGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start();
      this.activeMusicOscs.push(osc);
      this.activeMusicGains.push(gain);
    } catch {
      // Ignore
    }
  }

  private crossfadeChord(freqs: number[], duration = 3.8, vol = 0.08) {
    if (!this.ctx || !this.musicGain) return;
    try {
      const now = this.ctx.currentTime;
      freqs.forEach((f) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(vol / freqs.length, now + 1.2);
        gain.gain.setValueAtTime(vol / freqs.length, now + duration - 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.musicGain!);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    } catch {
      // Ignore
    }
  }

  private startDistantEngine(freq = 110, volume = 0.04) {
    if (!this.ctx || !this.ambienceGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(240, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceGain);
      osc.start();
      this.activeAmbienceNodes.push(osc);
    } catch {
      // Ignore
    }
  }

  private startWindAmbience(cutoff = 220, gainVal = 0.06) {
    if (!this.ctx || !this.ambienceGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 1.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(cutoff, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceGain);

      noise.start();
      this.activeAmbienceNodes.push(noise);
    } catch {
      // Ignore
    }
  }

  private createNoiseBufferNode(durationSeconds: number): AudioBufferSourceNode {
    const bufferSize = Math.max(1, Math.floor((this.ctx?.sampleRate || 44100) * durationSeconds));
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = this.ctx!.createBufferSource();
    whiteNoise.buffer = buffer;
    return whiteNoise;
  }

  private stopContinuousSounds() {
    this.activeIntervals.forEach((id) => clearInterval(id));
    this.activeIntervals = [];

    this.activeMusicOscs.forEach((o) => {
      try {
        o.stop();
      } catch {
        // Ignore
      }
    });
    this.activeMusicOscs = [];
    this.activeMusicGains = [];

    this.activeAmbienceNodes.forEach((node) => {
      try {
        (node as AudioScheduledSourceNode).stop();
      } catch {
        // Ignore
      }
    });
    this.activeAmbienceNodes = [];
  }
}

export const audioSystem = new CinematicAudioSystem();
