import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle, FileText, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PROPOSAL_DATA } from '../data/proposalData';
import { generateProposalPdf } from '../utils/pdfGenerator';
import { sound } from '../utils/audio';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playUiClick();
    window.print();
  };

  const handleDownload = () => {
    sound.playUiClick();
    try {
      generateProposalPdf();
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11131a] rounded-2xl border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="p-4 bg-[#0a0b0e] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ff3b1d]/20 text-[#ff3b1d]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#ff3b1d] uppercase font-bold tracking-wider">
                DOCUMENT CONTRACTUEL OFFICIEL
              </div>
              <h3 className="font-display font-bold text-base text-white">
                AFRIKAFUN — PROPOSITION TECHNIQUE &amp; FINANCIÈRE
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Imprimer le document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimer</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-mono font-medium text-white bg-[#ff3b1d] hover:bg-[#e03014] rounded flex items-center gap-1.5 transition-colors shadow-lg shadow-[#ff3b1d]/20"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? "Document généré !" : "Télécharger PDF"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable PDF Content (Document exact matching the 14 pages of PDF) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 text-neutral-200 font-sans text-sm leading-relaxed bg-[#0d0f15]">
          {/* Cover Header */}
          <div className="border-b border-white/15 pb-8 text-center sm:text-left">
            <div className="text-xs font-mono text-[#ff3b1d] uppercase font-bold tracking-widest mb-1">
              {PROPOSAL_DATA.header.agency}
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white uppercase">
              {PROPOSAL_DATA.header.title}
            </h1>
            <div className="text-lg sm:text-xl font-display text-white/80 font-semibold mt-1">
              {PROPOSAL_DATA.header.subtitle}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white/4 border border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">PROJET :</span>
                <span className="text-white font-bold">{PROPOSAL_DATA.header.project}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">CLIENT :</span>
                <span className="text-white font-bold">{PROPOSAL_DATA.header.client}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">FORMAT :</span>
                <span className="text-white font-bold">{PROPOSAL_DATA.header.format}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">DURÉE CIBLE :</span>
                <span className="text-white font-bold">{PROPOSAL_DATA.header.targetDuration}</span>
              </div>
            </div>
          </div>

          {/* 01 > NOTRE VISION */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-black text-white uppercase text-[#ff3b1d]">
              01 &gt; NOTRE VISION
            </h2>
            <p>{PROPOSAL_DATA.vision.context}</p>
            <p className="font-bold text-white uppercase tracking-wide">
              {PROPOSAL_DATA.vision.headline}
            </p>
            <p>{PROPOSAL_DATA.vision.coreArgument}</p>
          </div>

          {/* 02 > LE CONCEPT CRÉATIF */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-black text-white uppercase text-[#ff3b1d]">
              02 &gt; LE CONCEPT CRÉATIF « ENTER THE RACE »
            </h2>
            <p>
              Avant de découvrir le karting, le spectateur doit avoir envie d'y entrer. Le film commencera dans le silence et la tension de la préparation d'une course. Un pilote. Un casque. Une main sur le volant. Un moteur qui démarre. Une roue. Un feu. Puis la découverte progressive du futur complexe.
            </p>
            <p className="font-mono text-xs text-[#ff3b1d] font-bold">
              ÉMOTION &gt; ARCHITECTURE &gt; TECHNOLOGIE &gt; EXPÉRIENCE &gt; VITESSE &gt; COMPÉTITION
            </p>
          </div>

          {/* 05 > SCÉNARIO (8 SÉQUENCES) */}
          <div className="space-y-4">
            <h2 className="text-lg font-display font-black text-white uppercase text-[#ff3b1d]">
              05 &gt; PROPOSITION DE SCÉNARIO DÉTAILLÉ
            </h2>
            <div className="space-y-3">
              {PROPOSAL_DATA.filmSequences.map((seq) => (
                <div key={seq.number} className="p-3.5 rounded-lg bg-black/40 border border-white/8 text-xs">
                  <div className="flex items-center justify-between font-mono text-[#ff3b1d] font-bold mb-1">
                    <span>{seq.number} — {seq.title}</span>
                    <span>{seq.timecode}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{seq.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11 > PLANNING PRÉVISIONNEL */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-black text-white uppercase text-[#ff3b1d]">
              11 &gt; PLANNING PRÉVISIONNEL (DURÉE GLOBALE : 6 À 8 SEMAINES)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {PROPOSAL_DATA.planning.map((p) => (
                <div key={p.week} className="p-3 rounded bg-white/4 border border-white/5">
                  <span className="text-[#ff3b1d] font-bold block">{p.week} : {p.title}</span>
                  <p className="text-neutral-400 mt-1 font-sans">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 12 > PROPOSITION FINANCIÈRE */}
          <div className="space-y-3">
            <h2 className="text-lg font-display font-black text-white uppercase text-[#ff3b1d]">
              12 &gt; PROPOSITION FINANCIÈRE DÉTAILLÉE
            </h2>
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400">
                  <th className="py-2 text-left">PRESTATION</th>
                  <th className="py-2 text-right">MONTANT HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PROPOSAL_DATA.financialBudget.map((b) => (
                  <tr key={b.id}>
                    <td className="py-2 text-white">{b.prestation}</td>
                    <td className="py-2 text-right text-neutral-300">{b.montantFormatted}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-white/20 font-bold text-sm text-white">
                  <td className="py-3 text-[#ff3b1d]">TOTAL PROPOSITION BASE</td>
                  <td className="py-3 text-right text-[#ff3b1d]">{PROPOSAL_DATA.totalBaseHTFormatted}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 10 & 13 > OPTION DIGITAL & MODALITÉS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 rounded-xl bg-white/4 border border-white/8 space-y-2">
              <h3 className="font-mono font-bold text-white text-[#ff3b1d] uppercase">
                10 &gt; OPTION DIGITAL : 1 500 000 FCFA HT
              </h3>
              <p className="text-neutral-300">
                1 teaser de 30 secondes · 3 vidéos verticales 9:16 de 15 secondes · 3 déclinaisons courtes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/4 border border-white/8 space-y-2">
              <h3 className="font-mono font-bold text-white text-[#ff3b1d] uppercase">
                13 &gt; MODALITÉS DE RÈGLEMENT
              </h3>
              <p className="font-mono text-neutral-300">
                40% à la commande · 40% validation storyboard · 20% livraison master final.
              </p>
            </div>
          </div>

          {/* 16 > CONCLUSION */}
          <div className="p-6 rounded-xl bg-black/60 border border-white/15 text-center space-y-3">
            <div className="font-display font-medium text-lg text-white">
              « Un bâtiment peut être montré. Une piste peut être représentée. Mais une expérience doit être racontée. »
            </div>
            <div className="font-display font-black text-2xl text-[#ff3b1d] uppercase tracking-widest">
              ENTER THE RACE.
            </div>
            <div className="text-xs font-mono text-neutral-400">
              AFRIKAFUN Production — Fait pour Koffi &amp; Diabaté
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
