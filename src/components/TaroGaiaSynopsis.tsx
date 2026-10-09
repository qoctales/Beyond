import React from 'react';
import { 
  Clapperboard, 
  Users, 
  ChevronRight,
  Tv
} from 'lucide-react';
import { sound } from '../utils/audio';

export interface SeriesEpisode {
  episodeNumber: number;
  standNumber: string;
  title: string;
  arc: string;
  duration: string;
  synopsis: string;
  taroFocus: string;
  gaiaFocus: string;
}

export const SERIES_EPISODES: SeriesEpisode[] = [
  {
    episodeNumber: 1,
    standNumber: "01",
    title: "Le Rêve en Piste — L'Origine",
    arc: "Prologue & Vision",
    duration: "2 min 45",
    synopsis: "Dans les rues de Cotonou, Taro contemple la terre rouge et dessine un circuit imaginaire. Au même moment, Gaïa, jeune conceptrice fascinée par la vitesse, esquisse une arène internationale où les pilotes du continent pourront s'affronter.",
    taroFocus: "L'étincelle brute et l'amour inné du karting.",
    gaiaFocus: "La vision architecturale alliée à la passion du pilotage."
  },
  {
    episodeNumber: 2,
    standNumber: "02",
    title: "Rêver & Oser — Le Premier Châssis",
    arc: "Création & Audace",
    duration: "2 min 15",
    synopsis: "Taro assemble son bolide artisanal avec des planches de bois et des roulements usagés. Il n'attend pas qu'on lui donne sa chance, il la forge lui-même.",
    taroFocus: "L'ingéniosité artisanale et le courage d'agir.",
    gaiaFocus: "L'observation attentive des talents de la jeunesse béninoise."
  },
  {
    episodeNumber: 3,
    standNumber: "03",
    title: "Jouer & Rencontrer — Le Regard Croisé",
    arc: "Rencontre des Destins",
    duration: "2 min 30",
    synopsis: "La course de Taro s'arrête devant une tour vitrée. En haut, Gaïa lève les yeux de ses plans. Deux regards se croisent : le rêve de l'enfant réveille la passion de la pilote.",
    taroFocus: "Le sentiment d'être compris par une figure inspirante.",
    gaiaFocus: "Le déclic : s'engager corps et âme pour bâtir ce circuit."
  },
  {
    episodeNumber: 4,
    standNumber: "04",
    title: "Imaginer & Dessiner — L'Esquisse",
    arc: "Conception & Tracé",
    duration: "3 min 00",
    synopsis: "Gaïa ouvre son carnet. Les courbes tracées dans la poussière deviennent des paraboles parfaites et des lignes droites conformes aux normes internationales CIK-FIA.",
    taroFocus: "La découverte des règles du sport automobile.",
    gaiaFocus: "L'intégration du flow de course : chaque virage pensé comme une émotion."
  },
  {
    episodeNumber: 5,
    standNumber: "05",
    title: "Concevoir & Bâtir — L'Arène Émergée",
    arc: "Ingénierie & 3D",
    duration: "2 min 40",
    synopsis: "Sur la maquette, Gaïa pose un mini-kart rouge. La maquette s'anime en 3D : le complexe international de Ouidah/Cotonou s'élève de nuit, tout en lumières.",
    taroFocus: "Son rêve existe désormais sous ses yeux.",
    gaiaFocus: "La maîtrise technique et la négociation avec les bâtisseurs."
  },
  {
    episodeNumber: 6,
    standNumber: "06",
    title: "S'équiper & Frémir — La Grille de Départ",
    arc: "Tension du Départ",
    duration: "2 min 20",
    synopsis: "Dans les paddocks, les combinaisons sont enfilées. Taro ajuste son casque blanc ; à ses côtés, Gaïa enfile son casque. Amazone moderne, elle prend le volant elle aussi.",
    taroFocus: "La concentration rituelle avant la course.",
    gaiaFocus: "L'adrénaline pure : conceptrice sur plan, pilote sur la piste."
  },
  {
    episodeNumber: 7,
    standNumber: "07",
    title: "S'engager & Se Dépasser — Le Grand Duel",
    arc: "Apogée de la Course",
    duration: "3 min 15",
    synopsis: "Extinction des feux ! Taro et Gaïa se livrent un duel roue dans roue à pleine vitesse sur les vibreurs aux couleurs nationales. Freinage tardif et respect mutuel.",
    taroFocus: "L'audace tactique de dépasser sa mentor.",
    gaiaFocus: "La fierté d'être poussée au sommet par le prodige qu'elle a guidé."
  },
  {
    episodeNumber: 8,
    standNumber: "08",
    title: "Rassembler & Vibrer — La Fête Populaire",
    arc: "Impact & Ferveur",
    duration: "2 min 50",
    synopsis: "Le complexe prend vie dans une liesse populaire spectaculaire. Familles et passionnés célèbrent l'avènement d'un Bénin conquérant et festif.",
    taroFocus: "L'accueil triomphal des siens et la fierté de ses origines.",
    gaiaFocus: "La validation publique : son arène devient le cœur de la jeunesse."
  },
  {
    episodeNumber: 9,
    standNumber: "09",
    title: "Transmettre & S'élever — L'Arrivée & Le Flambeau",
    arc: "Transmission & Avenir",
    duration: "3 min 10",
    synopsis: "Sur le podium face à l'océan, Gaïa et Taro échangent leurs casques. Ce premier circuit n'est que le tremplin d'une nouvelle génération prête à briller sur les circuits du monde.",
    taroFocus: "La promesse de porter haut les couleurs du Bénin.",
    gaiaFocus: "La transmission accomplie : l'arène est prête pour la réalité."
  }
];

interface TaroGaiaSynopsisProps {
  onSelectStand?: (standIndex: number) => void;
}

export const TaroGaiaSynopsis: React.FC<TaroGaiaSynopsisProps> = ({ onSelectStand }) => {
  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* 1. HERO ENTÊTE TARO & GAÏA — ÉPURÉ ET LISIBLE */}
      <div className="rounded-2xl bg-[#0b0d13] border border-white/15 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-[#ff1e00] text-white font-mono text-xs font-bold uppercase tracking-wider">
              WEB-SÉRIE &amp; BD NUMÉRIQUE
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
              9 ÉPISODES
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
            <Tv className="w-3.5 h-3.5 text-[#ff1e00]" />
            <span>Format court 2-3 min · IA &amp; 3D</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Go Beyond
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
            DU RÊVE D’UN ENFANT À L’ÉMERGENCE DU PREMIER KARTING INTERNATIONAL DU BÉNIN
          </p>
        </div>

        {/* Synopsis & Personnages simplifiés */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
          <div className="lg:col-span-8 space-y-3 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <p>
              <strong className="text-white font-semibold">Go Beyond</strong> est une web-série en bande dessinée numérique animée, conçue pour préfigurer le chantier du premier karting international du Bénin.
            </p>
            <p>
              L'histoire réunit deux destins guidés par la vitesse : <strong className="text-white font-semibold">Taro</strong>, jeune garçon de Cotonou qui fabrique son premier bolide en bois sur la terre ocre, et <strong className="text-white font-semibold">Gaïa</strong>, conceptrice-architecte et pilote intrépide — véritable amazone des temps modernes — résolue à doter son pays d'une infrastructure de rang mondial.
            </p>
            <p className="text-neutral-400">
              En suivant leurs péripéties jusqu'à l'inauguration de la piste, la série suscite un fort engouement populaire avant même la construction physique du complexe.
            </p>
          </div>

          {/* Fiche Personnages */}
          <div className="lg:col-span-4 bg-black/40 rounded-xl border border-white/10 p-3.5 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Users className="w-3.5 h-3.5 text-[#ff1e00]" />
              <span className="font-mono text-[11px] text-white font-bold uppercase tracking-wider">
                LES DEUX PERSONNAGES
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white font-display uppercase block">Taro</span>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  L'étincelle brute et la persévérance. Il forge son premier bolide de ses mains et trace son destin.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white font-display uppercase block">Gaïa</span>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  L'amazone moderne : conceptrice inspirée et pilote d'élite. Elle dessine la piste et la défie au volant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LES 9 ÉPISODES — GRILLE ÉPURÉE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-[#ff1e00]" />
            <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
              Les 9 Épisodes de la Web-Série
            </h2>
          </div>
          <span className="font-mono text-[11px] text-neutral-400">
            1 Épisode par Stand du Circuit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SERIES_EPISODES.map((ep) => (
            <div 
              key={ep.episodeNumber}
              className="p-4 rounded-xl bg-[#0b0d13] border border-white/10 hover:border-[#ff1e00]/50 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#ff1e00] text-white flex items-center justify-center font-mono font-bold text-xs">
                      {ep.standNumber}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                      Épisode {ep.episodeNumber}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                    {ep.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#ff1e00] transition-colors leading-snug">
                  {ep.title}
                </h3>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-4">
                  {ep.synopsis}
                </p>
              </div>

              {onSelectStand && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playUiClick();
                    onSelectStand(ep.episodeNumber - 1);
                  }}
                  className="w-full pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer group-hover:text-[#ff1e00]"
                >
                  <span>Voir le Stand {ep.standNumber}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
