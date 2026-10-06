import React from 'react';
import { FileText, Play, ArrowUp, Send, Check } from 'lucide-react';
import { PROPOSAL_DATA } from '../data/proposalData';
import { STORY_ASSETS } from '../data/storyAssets';

interface ConclusionSectionProps {
  onOpenPdf: () => void;
  onOpenTeaser: () => void;
  onOpenContact: () => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  onOpenPdf,
  onOpenTeaser,
  onOpenContact,
}) => {
  const asset = STORY_ASSETS.circuitMasterNight;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="conclusion" className="relative py-32 bg-[#06070a] border-t border-white/10 overflow-hidden">
      {/* Background visual with rich dark scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={asset.src}
          alt={asset.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.35] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/70 to-[#06070a]/90" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Section Kicker */}
        <div className="text-xs font-mono tracking-widest text-[#ff3b1d] uppercase mb-8 font-semibold">
          16 / CONCLUSION &amp; PASSAGE À L'ACTION
        </div>

        {/* The Core Philosophic Quote */}
        <div className="max-w-4xl mb-10">
          <p className="text-2xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight">
            « Un bâtiment peut être montré. <br />
            Une piste peut être représentée. <br />
            <span className="text-[#ff3b1d] font-bold">Mais une expérience doit être racontée. »</span>
          </p>
        </div>

        <p className="max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-12">
          AFRIKAFUN propose de transformer le futur karting en une expérience audiovisuelle immersive, spectaculaire et réaliste. 
          Un film conçu non pas pour montrer uniquement ce que sera le site, mais pour faire ressentir ce que l'on vivra lorsqu'il ouvrira ses portes.
        </p>

        {/* Grand Signature */}
        <div className="text-4xl sm:text-7xl font-display font-black tracking-widest text-white uppercase mb-12">
          ENTER THE RACE.
        </div>

        {/* 2 Primary CTAs from Prompt + Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            type="button"
            onClick={onOpenPdf}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#ff3b1d] hover:bg-[#e03014] text-white font-display font-bold text-sm uppercase tracking-wider shadow-2xl shadow-[#ff3b1d]/30 transition-all hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>TÉLÉCHARGER LA PROPOSITION PDF</span>
          </button>

          <button
            type="button"
            onClick={onOpenTeaser}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-sm uppercase tracking-wider border border-white/20 transition-all backdrop-blur-md"
          >
            <Play className="w-4 h-4 fill-current text-[#ff3b1d]" />
            <span>VOIR LE TEASER 30"</span>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACTER AFRIKAFUN</span>
          </button>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>RETOURNER AU DÉBUT DU FILM</span>
        </button>

        {/* Quiet Professional Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            AFRIKAFUN PRODUCTION © 2026 · PROPOSITION TECHNIQUE &amp; FINANCIÈRE
          </div>
          <div>
            CLIENT : KOFFI &amp; DIABATÉ · PROJET KARTING BÉNIN
          </div>
        </footer>
      </div>
    </section>
  );
};
