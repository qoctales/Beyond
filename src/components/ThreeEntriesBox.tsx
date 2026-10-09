import React from 'react';
import { CompetitionKartIcon } from './icons/CompetitionKartIcon';
import { AiRobotCameraIcon } from './icons/AiRobotCameraIcon';
import { BeninFlagIcon } from './icons/BeninFlagIcon';

interface ThreeEntriesBoxProps {
  synopsisKarting?: string;
  synopsisAaa?: string;
  sensBenin?: string;
  // Compatibilité
  imageText?: string;
  sensText?: string;
  notreForceTitle?: string;
  notreForceText?: string;
  className?: string;
}

export const ThreeEntriesBox: React.FC<ThreeEntriesBoxProps> = ({
  synopsisKarting,
  synopsisAaa,
  sensBenin,
  imageText,
  sensText,
  notreForceText,
  className = ""
}) => {
  const kartingContent = synopsisKarting || imageText;
  const aaaContent = synopsisAaa || sensText;
  const sensContent = sensBenin || notreForceText;

  return (
    <div className={`rounded-2xl bg-white text-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
        
        {/* 1. KARTING BÉNIN */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ff1e00]/10 flex items-center justify-center shrink-0">
              <CompetitionKartIcon className="w-5 h-3.5" />
            </div>
            <span className="font-mono text-[11px] text-[#ff1e00] font-black uppercase tracking-wider block">
              KARTING BÉNIN
            </span>
          </div>
          <p className="text-neutral-700 leading-relaxed font-normal">
            {kartingContent}
          </p>
          <div className="h-0.5 w-8 bg-[#ff1e00] mt-2" />
        </div>

        {/* 2. AAA */}
        <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <AiRobotCameraIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-[11px] text-neutral-900 font-black uppercase tracking-wider block">
              AAA
            </span>
          </div>
          <p className="text-neutral-700 leading-relaxed font-normal">
            {aaaContent}
          </p>
          <div className="h-0.5 w-8 bg-neutral-900 mt-2" />
        </div>

        {/* 3. LE SENS (CE QUE LE BÉNIN GAGNE) */}
        <div className="space-y-2.5 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
              <BeninFlagIcon className="w-5 h-3.5" />
            </div>
            <span className="font-mono text-[11px] text-[#ff1e00] font-black uppercase tracking-wider block">
              LE SENS
            </span>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-tight">
              Ce que le Bénin gagne
            </div>
            <p className="text-neutral-700 leading-relaxed font-normal">
              {sensContent}
            </p>
          </div>
          <div className="h-0.5 w-8 bg-[#ff1e00] mt-2" />
        </div>

      </div>
    </div>
  );
};
