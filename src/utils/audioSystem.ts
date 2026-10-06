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
  private masterVol = 0.90;
  private musicVol = 0.22;
  private ambienceVol = 0.18;
  private sfxVol = 0.92;

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

  // Real recorded cuts audio players
  private currentAmbianceAudio: HTMLAudioElement | null = null;
  private currentFxAudio: HTMLAudioElement | null = null;

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

    if (this.currentFxAudio) {
      try {
        this.currentFxAudio.pause();
        this.currentFxAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentFxAudio = null;
    }

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    this.notify();
  }

  public setMasterVolume(val: number) {
    this.masterVol = Math.max(0, Math.min(1, val));
    if (this.currentAmbianceAudio) {
      this.currentAmbianceAudio.volume = Math.min(1, this.ambienceVol * this.masterVol);
    }
    if (this.currentFxAudio) {
      this.currentFxAudio.volume = Math.min(1, this.sfxVol * this.masterVol);
    }
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

    // Arrêt doux de la musique précédente
    this.stopContinuousSounds();

    // Lance la composition d'ambiance procédurale douce, lancinante et tranquille demandée
    this.playProceduralAmbience(slideNumber);
  }

  private playProceduralAmbience(slideNumber: number) {
    this.initAudio();
    if (!this.ctx) return;

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
   * Chants d'enfants & mélodie innocente (inspiré des voix d'enfants enregistrées)
   */
  private playChildrenVocalMelody(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const notes = [
      { f: 440, t: 0.05, d: 0.38 },
      { f: 523.25, t: 0.45, d: 0.42 },
      { f: 587.33, t: 0.90, d: 0.40 },
      { f: 523.25, t: 1.35, d: 0.35 },
      { f: 440, t: 1.75, d: 0.65 },
      { f: 392, t: 2.45, d: 0.85 }
    ];

    notes.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const formant1 = this.ctx!.createBiquadFilter();
      const formant2 = this.ctx!.createBiquadFilter();
      const gain = this.ctx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, now + note.t);
      osc.frequency.linearRampToValueAtTime(note.f + 4, now + note.t + note.d * 0.5);
      osc.frequency.linearRampToValueAtTime(note.f, now + note.t + note.d);

      formant1.type = "bandpass";
      formant1.frequency.setValueAtTime(800, now + note.t);
      formant1.Q.setValueAtTime(3.2, now + note.t);

      formant2.type = "bandpass";
      formant2.frequency.setValueAtTime(2200, now + note.t);
      formant2.Q.setValueAtTime(3.5, now + note.t);

      gain.gain.setValueAtTime(0.0001, now + note.t);
      gain.gain.linearRampToValueAtTime(0.38, now + note.t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.t + note.d);

      osc.connect(formant1);
      osc.connect(formant2);
      formant1.connect(gain);
      formant2.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.05);
    });
  }

  /**
   * Survol de drone cinématique (moteurs brushless multi-rotors + sifflement d'hélice aérien)
   */
  private playDroneFlightSwoosh(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const rotor1 = this.ctx.createOscillator();
    const rotor2 = this.ctx.createOscillator();
    const airSwirl = this.createNoiseBufferNode(2.8);
    const filter = this.ctx.createBiquadFilter();
    const airFilter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const airGain = this.ctx.createGain();

    rotor1.type = "sawtooth";
    rotor2.type = "triangle";

    rotor1.frequency.setValueAtTime(185, now);
    rotor1.frequency.exponentialRampToValueAtTime(295, now + 1.2);
    rotor1.frequency.exponentialRampToValueAtTime(230, now + 2.7);

    rotor2.frequency.setValueAtTime(370, now);
    rotor2.frequency.exponentialRampToValueAtTime(590, now + 1.2);
    rotor2.frequency.exponentialRampToValueAtTime(460, now + 2.7);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.linearRampToValueAtTime(1800, now + 1.2);
    filter.frequency.linearRampToValueAtTime(800, now + 2.7);
    filter.Q.setValueAtTime(4.2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.48, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    airFilter.type = "bandpass";
    airFilter.frequency.setValueAtTime(1400, now);
    airFilter.frequency.linearRampToValueAtTime(3400, now + 1.2);
    airFilter.frequency.linearRampToValueAtTime(1200, now + 2.7);
    airFilter.Q.setValueAtTime(2.2, now);

    airGain.gain.setValueAtTime(0.0001, now);
    airGain.gain.linearRampToValueAtTime(0.35, now + 1.0);
    airGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.75);

    rotor1.connect(filter);
    rotor2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    airSwirl.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(this.sfxGain);

    rotor1.start(now);
    rotor2.start(now);
    airSwirl.start(now);
    rotor1.stop(now + 2.85);
    rotor2.stop(now + 2.85);
  }

  /**
   * Dessin et écriture d'architecte : crissement de crayon graphite sur papier vellum
   */
  private playPencilOnVellumSketch(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    [0.05, 0.42, 0.88, 1.35].forEach((t, i) => {
      const stroke = this.createNoiseBufferNode(0.32);
      const sFilter = this.ctx!.createBiquadFilter();
      sFilter.type = "bandpass";
      sFilter.frequency.setValueAtTime(1900 + i * 320, now + t);
      sFilter.Q.setValueAtTime(4.2, now + t);
      const sGain = this.ctx!.createGain();
      sGain.gain.setValueAtTime(0.0001, now + t);
      sGain.gain.linearRampToValueAtTime(0.55, now + t + 0.02);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.28);

      const tip = this.ctx!.createOscillator();
      const tGain = this.ctx!.createGain();
      tip.type = "triangle";
      tip.frequency.setValueAtTime(2600 + (i % 2) * 400, now + t + 0.24);
      tGain.gain.setValueAtTime(0.0001, now + t + 0.24);
      tGain.gain.linearRampToValueAtTime(0.28, now + t + 0.25);
      tGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.29);

      stroke.connect(sFilter);
      sFilter.connect(sGain);
      sGain.connect(this.sfxGain!);
      tip.connect(tGain);
      tGain.connect(this.sfxGain!);

      stroke.start(now + t);
      tip.start(now + t + 0.24);
      tip.stop(now + t + 0.30);
    });
  }

  /**
   * Respiration concentrée sous le casque & démarreur moteur 2-temps
   */
  private playHelmetBreathingAndStarter(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const breathIn = this.createNoiseBufferNode(0.85);
    const inFilter = this.ctx.createBiquadFilter();
    inFilter.type = "bandpass";
    inFilter.frequency.setValueAtTime(850, now);
    inFilter.Q.setValueAtTime(2.2, now);
    const inGain = this.ctx.createGain();
    inGain.gain.setValueAtTime(0.0001, now);
    inGain.gain.linearRampToValueAtTime(0.45, now + 0.4);
    inGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    breathIn.connect(inFilter);
    inFilter.connect(inGain);
    inGain.connect(this.sfxGain);
    breathIn.start(now);

    [0.15, 0.45, 0.95].forEach((t) => {
      const pulse = this.ctx!.createOscillator();
      const pGain = this.ctx!.createGain();
      pulse.type = "sine";
      pulse.frequency.setValueAtTime(50, now + t);
      pulse.frequency.exponentialRampToValueAtTime(28, now + t + 0.18);
      pGain.gain.setValueAtTime(0.0001, now + t);
      pGain.gain.linearRampToValueAtTime(0.65, now + t + 0.02);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.22);
      pulse.connect(pGain);
      pGain.connect(this.sfxGain!);
      pulse.start(now + t);
      pulse.stop(now + t + 0.24);
    });

    const visor = this.ctx.createOscillator();
    const vGain = this.ctx.createGain();
    visor.type = "triangle";
    visor.frequency.setValueAtTime(1600, now + 1.1);
    visor.frequency.exponentialRampToValueAtTime(260, now + 1.2);
    vGain.gain.setValueAtTime(0.0001, now + 1.1);
    vGain.gain.linearRampToValueAtTime(0.60, now + 1.12);
    vGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
    visor.connect(vGain);
    vGain.connect(this.sfxGain);
    visor.start(now + 1.1);
    visor.stop(now + 1.28);

    const starterTime = now + 1.35;
    [0.0, 0.08, 0.16, 0.24].forEach((t) => {
      const crank = this.ctx!.createOscillator();
      const cGain = this.ctx!.createGain();
      crank.type = "sawtooth";
      crank.frequency.setValueAtTime(180, starterTime + t);
      cGain.gain.setValueAtTime(0.0001, starterTime + t);
      cGain.gain.linearRampToValueAtTime(0.50, starterTime + t + 0.015);
      cGain.gain.exponentialRampToValueAtTime(0.0001, starterTime + t + 0.07);
      crank.connect(cGain);
      cGain.connect(this.sfxGain!);
      crank.start(starterTime + t);
      crank.stop(starterTime + t + 0.08);
    });

    const idleTime = starterTime + 0.35;
    const idle = this.ctx.createOscillator();
    const iGain = this.ctx.createGain();
    idle.type = "sawtooth";
    idle.frequency.setValueAtTime(220, idleTime);
    idle.frequency.exponentialRampToValueAtTime(380, idleTime + 0.4);
    idle.frequency.exponentialRampToValueAtTime(240, idleTime + 1.2);
    iGain.gain.setValueAtTime(0.0001, idleTime);
    iGain.gain.linearRampToValueAtTime(0.52, idleTime + 0.1);
    iGain.gain.exponentialRampToValueAtTime(0.0001, idleTime + 1.3);
    idle.connect(iGain);
    iGain.connect(this.sfxGain);
    idle.start(idleTime);
    idle.stop(idleTime + 1.35);
  }

  /**
   * Clameur de la foule en liesse & sifflet de course
   */
  private playCrowdCheeringAndWhistle(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const crowd = this.createNoiseBufferNode(2.9);
    const cFilter = this.ctx.createBiquadFilter();
    cFilter.type = "bandpass";
    cFilter.frequency.setValueAtTime(950, now);
    cFilter.frequency.linearRampToValueAtTime(1800, now + 0.8);
    cFilter.frequency.linearRampToValueAtTime(850, now + 2.7);
    cFilter.Q.setValueAtTime(1.8, now);
    const cGain = this.ctx.createGain();
    cGain.gain.setValueAtTime(0.0001, now);
    cGain.gain.linearRampToValueAtTime(0.65, now + 0.4);
    cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.85);

    crowd.connect(cFilter);
    cFilter.connect(cGain);
    cGain.connect(this.sfxGain);
    crowd.start(now);

    const whistleTime = now + 0.25;
    const w1 = this.ctx.createOscillator();
    const w2 = this.ctx.createOscillator();
    const wGain = this.ctx.createGain();
    w1.type = "sine";
    w2.type = "sine";
    w1.frequency.setValueAtTime(2850, whistleTime);
    w2.frequency.setValueAtTime(2960, whistleTime);
    wGain.gain.setValueAtTime(0.0001, whistleTime);
    wGain.gain.linearRampToValueAtTime(0.48, whistleTime + 0.04);
    wGain.gain.exponentialRampToValueAtTime(0.0001, whistleTime + 0.75);

    w1.connect(wGain);
    w2.connect(wGain);
    wGain.connect(this.sfxGain);
    w1.start(whistleTime);
    w2.start(whistleTime);
    w1.stop(whistleTime + 0.8);
    w2.stop(whistleTime + 0.8);
  }

  /**
    * Déclenche un des deux effets sonores réalistes spécifiques à la page (superposé à l'ambiance)
    */
  public playSpecificFx(slideId: number, fxIndex: 1 | 2) {
    this.isMuted = false;
    this.isPlayingRealisticFx = true;
    this.notify();

    if (this.currentFxAudio) {
      try {
        this.currentFxAudio.pause();
        this.currentFxAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentFxAudio = null;
    }

    // 1. Play real audio cut from uploaded audio files
    try {
      const cutUrl = `/audio/cuts/slide${slideId}_fx${fxIndex}.mp3`;
      const fxAudio = new Audio(cutUrl);
      fxAudio.volume = Math.min(1, this.sfxVol * this.masterVol);
      fxAudio.onended = () => {
        this.isPlayingRealisticFx = false;
        this.notify();
      };
      const p = fxAudio.play();
      if (p) {
        p.then(() => {
          this.currentFxAudio = fxAudio;
        }).catch(() => {
          this.playProceduralSpecificFx(slideId, fxIndex);
        });
      } else {
        this.currentFxAudio = fxAudio;
      }
      return;
    } catch {
      // Fallback
    }

    this.playProceduralSpecificFx(slideId, fxIndex);
  }

  private playProceduralSpecificFx(slideId: number, fxIndex: 1 | 2) {
    this.initAudio();
    if (!this.ctx || !this.sfxGain) return;
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    
    // Réactivation immédiate des bus audio et annulation de sourdine
    const now = Math.max(this.ctx.currentTime, 0.05);
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterVol, now);
    }
    this.sfxGain.gain.cancelScheduledValues(now);
    this.sfxGain.gain.setValueAtTime(this.sfxVol, now);

    switch (slideId) {
      case 1:
        if (fxIndex === 1) {
          // 1.1 Sons de rallye & karting : Moteur 2-temps survolté plein gaz & passage Doppler
          this.playRallyKartEngine(now, true);
        } else {
          // 1.2 Bolide de rallye / voiture de course en accélération franche avec passage de vitesse
          this.playRallyCarAcceleration(now);
        }
        break;

      case 2:
        if (fxIndex === 1) {
          // 2.1 Chants d'enfants & oiseaux qui chantent dans la cour et la nature
          this.playBirdSongAndKids(now);
        } else {
          // 2.2 Un peu de rallye au loin qui fait rêver (grondement sourd feutré de kart dans la plaine)
          this.playDistantRallyRumble(now);
        }
        break;

      case 3:
        if (fxIndex === 1) {
          // 3.1 Dans la ville : Klaxons et circulation urbaine
          this.playCityHornsAndTraffic(now);
        } else {
          // 3.2 Bruit urbain, passage des voitures & dynamisme de Cotonou
          this.playCityUrbanAmbience(now);
        }
        break;

      case 4:
        if (fxIndex === 1) {
          // 4.1 Écriture : Tracé au crayon graphite sur papier calque / table de dessin
          this.playPencilWriting(now);
        } else {
          // 4.2 Taper sur l'ordinateur : Clavier rythmé & bips informatiques de station CAO
          this.playKeyboardAndComputer(now);
        }
        break;

      case 5:
        if (fxIndex === 1) {
          // 5.1 Test de la maquette : Bolides de rallye & passages de karting en essai sur piste
          this.playPrototypeTesting(now);
        } else {
          // 5.2 Complexe & ateliers : Bruits de karting et d'ingénierie en plein préparatifs
          this.playComplexKartPaddock(now);
        }
        break;

      case 6:
        if (fxIndex === 1) {
          // 6.1 Le Lion emblématique & rugissements puissants des moteurs
          this.playLionRoarAndEngine(now);
        } else {
          // 6.2 Courses, freinages violents et montées en régime féroces sur la pré-grille
          this.playPreGridBraking(now);
        }
        break;

      case 7:
        if (fxIndex === 1) {
          // 7.1 Gros freinage crissant sur l'asphalte et claquements secs sur le vibreur
          this.playHardBrakeScreech(now);
        } else {
          // 7.2 Accélération foudroyante & survol ultra-rapide de drone FPV
          this.playKartAccelerationAndDrone(now);
        }
        break;

      case 8:
        if (fxIndex === 1) {
          // 8.1 Ambiance tranquille : Les gens qui crient, clameur de la foule chaleureuse
          this.playCrowdCheerRelaxed(now);
        } else {
          // 8.2 Au loin le bruit du circuit de karting en écho feutré
          this.playDistantCircuitEcho(now);
        }
        break;

      case 9:
        if (fxIndex === 1) {
          // 9.1 La foule & salves d'applaudissements nourris
          this.playCrowdApplause(now);
        } else {
          // 9.2 Le rallye sous les acclamations et applaudissements de la foule
          this.playRallyWithApplause(now);
        }
        break;

      case 10:
        if (fxIndex === 1) {
          // 10.1 Paddock officiel : Un peu de rallye feutré au ralenti dans les stands
          this.playQuietPaddockKart(now);
        } else {
          // 10.2 Ambiance paddock feutrée & signaux de chronométrage officiel
          this.playPaddockTelemetryOfficial(now);
        }
        break;
    }

    setTimeout(() => {
      this.isPlayingRealisticFx = false;
      this.notify();
    }, 3200);
  }

  // --- NOUVEAUX GÉNÉRATEURS SONORES PROCÉDURAUX RÉALISTES POUR CHAQUE PAGE ---

  /** 1.1 Son de rallye & karting 2-temps plein gaz */
  private playRallyKartEngine(now: number, isKart: boolean = true) {
    if (!this.ctx || !this.sfxGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    const baseFreq = isKart ? 280 : 210;
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 1.2);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 2.0);

    osc2.frequency.setValueAtTime(baseFreq * 1.02, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.85, now + 1.2);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.42, now + 2.0);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.linearRampToValueAtTime(3800, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 2.1);
    filter.Q.setValueAtTime(3.2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.65, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.25);
    osc2.stop(now + 2.25);
  }

  /** 1.2 Bolide de rallye / voiture de course en accélération franche */
  private playRallyCarAcceleration(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const sub = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    sub.type = "triangle";

    // Rapport 1
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.9);
    // Coupure passage rapport 2
    osc.frequency.setValueAtTime(240, now + 0.96);
    osc.frequency.exponentialRampToValueAtTime(520, now + 2.1);

    sub.frequency.setValueAtTime(70, now);
    sub.frequency.exponentialRampToValueAtTime(180, now + 0.9);
    sub.frequency.setValueAtTime(120, now + 0.96);
    sub.frequency.exponentialRampToValueAtTime(260, now + 2.1);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(2800, now + 2.1);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.68, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.25);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    sub.start(now);
    osc.stop(now + 2.3);
    sub.stop(now + 2.3);
  }

  /** 2.1 Chants d'enfants & oiseaux qui chantent */
  private playBirdSongAndKids(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Gazouillis d'oiseaux cristallins
    [
      { f1: 2600, f2: 3400, t: 0.05, d: 0.12 },
      { f1: 3100, f2: 2400, t: 0.22, d: 0.15 },
      { f1: 2800, f2: 3600, t: 0.55, d: 0.14 },
      { f1: 3500, f2: 2900, t: 0.75, d: 0.12 },
      { f1: 2700, f2: 3300, t: 1.10, d: 0.16 },
    ].forEach((bird) => {
      const bOsc = this.ctx!.createOscillator();
      const bGain = this.ctx!.createGain();
      bOsc.type = "sine";
      bOsc.frequency.setValueAtTime(bird.f1, now + bird.t);
      bOsc.frequency.exponentialRampToValueAtTime(bird.f2, now + bird.t + bird.d);
      bGain.gain.setValueAtTime(0.0001, now + bird.t);
      bGain.gain.linearRampToValueAtTime(0.22, now + bird.t + 0.02);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + bird.t + bird.d);
      bOsc.connect(bGain);
      bGain.connect(this.sfxGain!);
      bOsc.start(now + bird.t);
      bOsc.stop(now + bird.t + bird.d + 0.02);
    });

    // Chants d'enfants mélodieux
    this.playChildrenVocalMelody(now + 0.3);
  }

  /** 2.2 Un peu de rallye au loin qui fait rêver */
  private playDistantRallyRumble(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 1.5);
    osc.frequency.exponentialRampToValueAtTime(140, now + 2.5);

    // Filtre passe-bas très sourd pour sonner lointain et feutré
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(2.0, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 2.65);
  }

  /** 3.1 Dans la ville : Klaxons et circulation urbaine */
  private playCityHornsAndTraffic(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Double coup de klaxon urbain (La4 440Hz + Do#5 554Hz)
    [0.1, 0.45].forEach((t) => {
      const h1 = this.ctx!.createOscillator();
      const h2 = this.ctx!.createOscillator();
      const hGain = this.ctx!.createGain();

      h1.type = "sawtooth";
      h2.type = "sawtooth";
      h1.frequency.setValueAtTime(440, now + t);
      h2.frequency.setValueAtTime(554, now + t);

      hGain.gain.setValueAtTime(0.0001, now + t);
      hGain.gain.linearRampToValueAtTime(0.48, now + t + 0.015);
      hGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.22);

      h1.connect(hGain);
      h2.connect(hGain);
      hGain.connect(this.sfxGain!);

      h1.start(now + t);
      h2.start(now + t);
      h1.stop(now + t + 0.24);
      h2.stop(now + t + 0.24);
    });

    // Passage de voiture citadine
    const car = this.ctx.createOscillator();
    const cFilter = this.ctx.createBiquadFilter();
    const cGain = this.ctx.createGain();
    car.type = "triangle";
    car.frequency.setValueAtTime(180, now + 0.6);
    car.frequency.exponentialRampToValueAtTime(90, now + 2.2);
    cFilter.type = "lowpass";
    cFilter.frequency.setValueAtTime(600, now + 0.6);
    cGain.gain.setValueAtTime(0.0001, now + 0.6);
    cGain.gain.linearRampToValueAtTime(0.38, now + 1.2);
    cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);
    car.connect(cFilter);
    cFilter.connect(cGain);
    cGain.connect(this.sfxGain);
    car.start(now + 0.6);
    car.stop(now + 2.35);
  }

  /** 3.2 Bruit urbain, passage des voitures & dynamisme de Cotonou */
  private playCityUrbanAmbience(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const traffic = this.createNoiseBufferNode(2.5);
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(1100, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(400, now + 2.4);
    filter.Q.setValueAtTime(1.8, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.50, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.45);

    traffic.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    traffic.start(now);
  }

  /** 4.1 Écriture : Tracé au crayon graphite sur papier calque */
  private playPencilWriting(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    [0.05, 0.40, 0.78, 1.15].forEach((t, i) => {
      const stroke = this.createNoiseBufferNode(0.32);
      const sFilter = this.ctx!.createBiquadFilter();
      sFilter.type = "bandpass";
      sFilter.frequency.setValueAtTime(2200 + i * 320, now + t);
      sFilter.Q.setValueAtTime(3.6, now + t);
      const sGain = this.ctx!.createGain();
      sGain.gain.setValueAtTime(0.0001, now + t);
      sGain.gain.linearRampToValueAtTime(0.55, now + t + 0.02);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.28);

      stroke.connect(sFilter);
      sFilter.connect(sGain);
      sGain.connect(this.sfxGain!);
      stroke.start(now + t);
    });
  }

  /** 4.2 Taper sur l'ordinateur & bruits d'ordinateur */
  private playKeyboardAndComputer(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Touches de clavier mécanique (rafale rapide)
    [0.05, 0.15, 0.28, 0.42, 0.52, 0.68, 0.82, 0.95, 1.12, 1.25].forEach((t) => {
      const key = this.ctx!.createOscillator();
      const kGain = this.ctx!.createGain();
      key.type = "triangle";
      key.frequency.setValueAtTime(1600 + Math.random() * 800, now + t);
      kGain.gain.setValueAtTime(0.0001, now + t);
      kGain.gain.linearRampToValueAtTime(0.35, now + t + 0.004);
      kGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.04);
      key.connect(kGain);
      kGain.connect(this.sfxGain!);
      key.start(now + t);
      key.stop(now + t + 0.045);
    });

    // Bip d'ordinateur / calcul DAO
    const beep = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    beep.type = "sine";
    beep.frequency.setValueAtTime(1174.66, now + 1.4); // D6
    bGain.gain.setValueAtTime(0.0001, now + 1.4);
    bGain.gain.linearRampToValueAtTime(0.25, now + 1.41);
    bGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
    beep.connect(bGain);
    bGain.connect(this.sfxGain);
    beep.start(now + 1.4);
    beep.stop(now + 1.75);
  }

  /** 5.1 Test de la maquette : Bolides de rallye & passages de karting en essai */
  private playPrototypeTesting(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    this.playRallyKartEngine(now, true);
    // Vibreur d'essai dynamique
    [0.6, 0.68, 0.76, 0.84].forEach((t) => {
      const kerb = this.ctx!.createOscillator();
      const kGain = this.ctx!.createGain();
      kerb.type = "triangle";
      kerb.frequency.setValueAtTime(260, now + t);
      kGain.gain.setValueAtTime(0.0001, now + t);
      kGain.gain.linearRampToValueAtTime(0.38, now + t + 0.008);
      kGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.05);
      kerb.connect(kGain);
      kGain.connect(this.sfxGain!);
      kerb.start(now + t);
      kerb.stop(now + t + 0.06);
    });
  }

  /** 5.2 Complexe & ateliers : Bruits de karting et d'ingénierie */
  private playComplexKartPaddock(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Clé à chocs et serrage atelier
    [0.05, 0.12, 0.19, 0.26, 0.33].forEach((t) => {
      const hammer = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      hammer.type = "sawtooth";
      hammer.frequency.setValueAtTime(720, now + t);
      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.linearRampToValueAtTime(0.45, now + t + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.04);
      hammer.connect(gain);
      gain.connect(this.sfxGain!);
      hammer.start(now + t);
      hammer.stop(now + t + 0.045);
    });
    // Kart en réglage moteur
    this.playRallyKartEngine(now + 0.45, true);
  }

  /** 6.1 Le Lion emblématique & rugissements puissants des moteurs */
  private playLionRoarAndEngine(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // 1. Grondement noble du lion (sub 60Hz + harmonique féline gutturale)
    const sub = this.ctx.createOscillator();
    const growl = this.ctx.createOscillator();
    const lionGain = this.ctx.createGain();

    sub.type = "triangle";
    sub.frequency.setValueAtTime(55, now);
    sub.frequency.exponentialRampToValueAtTime(42, now + 1.8);

    growl.type = "sawtooth";
    growl.frequency.setValueAtTime(95, now);
    growl.frequency.exponentialRampToValueAtTime(70, now + 1.8);

    lionGain.gain.setValueAtTime(0.0001, now);
    lionGain.gain.linearRampToValueAtTime(0.70, now + 0.4);
    lionGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    sub.connect(lionGain);
    growl.connect(lionGain);
    lionGain.connect(this.sfxGain);

    sub.start(now);
    growl.start(now);
    sub.stop(now + 2.1);
    growl.stop(now + 2.1);

    // 2. Superposition du rugissement de moteur de course
    this.playRallyCarAcceleration(now + 0.2);
  }

  /** 6.2 Pré-grille, courses, freinages violents et montées en régime */
  private playPreGridBraking(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    this.playHardBrakeScreech(now);
    this.playRallyKartEngine(now + 0.6, true);
  }

  /** 7.1 Gros freinage crissant sur l'asphalte et claquements secs sur le vibreur */
  private playHardBrakeScreech(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const screech = this.createNoiseBufferNode(1.3);
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 1.1);
    filter.Q.setValueAtTime(4.2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.68, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

    screech.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    screech.start(now);

    // Clac-clac sur les cannelures du vibreur
    [0.15, 0.24, 0.33, 0.42, 0.51, 0.60].forEach((t) => {
      const kerb = this.ctx!.createOscillator();
      const kGain = this.ctx!.createGain();
      kerb.type = "triangle";
      kerb.frequency.setValueAtTime(310, now + t);
      kGain.gain.setValueAtTime(0.0001, now + t);
      kGain.gain.linearRampToValueAtTime(0.45, now + t + 0.008);
      kGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.06);
      kerb.connect(kGain);
      kGain.connect(this.sfxGain!);
      kerb.start(now + t);
      kerb.stop(now + t + 0.07);
    });
  }

  /** 7.2 Accélération foudroyante & survol ultra-rapide de drone FPV */
  private playKartAccelerationAndDrone(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Accélération kart plein gaz
    this.playRallyKartEngine(now, true);
    // Drone FPV survol
    this.playDroneFlightSwoosh(now + 0.2);
  }

  /** 8.1 Ambiance tranquille : Les gens qui crient, clameur de la foule chaleureuse */
  private playCrowdCheerRelaxed(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const crowd = this.createNoiseBufferNode(2.6);
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.linearRampToValueAtTime(1300, now + 1.2);
    filter.Q.setValueAtTime(1.6, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.55, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    crowd.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    crowd.start(now);
  }

  /** 8.2 Au loin le bruit du circuit de karting en écho feutré */
  private playDistantCircuitEcho(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    this.playDistantRallyRumble(now);
  }

  /** 9.1 La foule & salves d'applaudissements nourris */
  private playCrowdApplause(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const applause = this.createNoiseBufferNode(2.8);
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(1.2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.68, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

    applause.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    applause.start(now);
  }

  /** 9.2 Le rallye sous les acclamations et applaudissements de la foule */
  private playRallyWithApplause(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    this.playCrowdApplause(now);
    this.playRallyKartEngine(now + 0.3, false);
  }

  /** 10.1 Paddock officiel : Un peu de rallye feutré au ralenti dans les stands */
  private playQuietPaddockKart(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    // Moteur au ralenti doux (stands / paddock)
    osc.frequency.setValueAtTime(85, now);
    osc.frequency.linearRampToValueAtTime(110, now + 1.2);
    osc.frequency.linearRampToValueAtTime(80, now + 2.2);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, now);
    filter.Q.setValueAtTime(1.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 2.35);
  }

  /** 10.2 Ambiance paddock feutrée & signaux de chronométrage officiel */
  private playPaddockTelemetryOfficial(now: number) {
    if (!this.ctx || !this.sfxGain) return;
    // Bips de chronométrage officiel de haute précision
    [0.1, 0.35, 0.60].forEach((t, i) => {
      const ping = this.ctx!.createOscillator();
      const pGain = this.ctx!.createGain();
      ping.type = "sine";
      ping.frequency.setValueAtTime(1760 + i * 220, now + t);
      pGain.gain.setValueAtTime(0.0001, now + t);
      pGain.gain.linearRampToValueAtTime(0.38, now + t + 0.008);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.12);
      ping.connect(pGain);
      pGain.connect(this.sfxGain!);
      ping.start(now + t);
      ping.stop(now + t + 0.13);
    });

    // Chime officiel
    const chime = this.ctx.createOscillator();
    const cGain = this.ctx.createGain();
    chime.type = "triangle";
    chime.frequency.setValueAtTime(1046.5, now + 0.9); // C6
    cGain.gain.setValueAtTime(0.0001, now + 0.9);
    cGain.gain.linearRampToValueAtTime(0.42, now + 0.92);
    cGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
    chime.connect(cGain);
    cGain.connect(this.sfxGain);
    chime.start(now + 0.9);
    chime.stop(now + 2.25);
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
    if (this.currentAmbianceAudio) {
      try {
        this.currentAmbianceAudio.pause();
        this.currentAmbianceAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAmbianceAudio = null;
    }

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
