import React from 'react';
import { Film, Compass, Diamond } from 'lucide-react';

interface ThreeEntriesBoxProps {
  imageText?: string;
  sensText?: string;
  notreForceTitle?: string;
  notreForceText?: string;
  className?: string;
}

export const ThreeEntriesBox: React.FC<ThreeEntriesBoxProps> = ({
  imageText,
  sensText,
  notreForceTitle,
  notreForceText,
  className = ""
}) => {
  const renderFormattedText = (text?: string) => {
    if (!text) return null;
    if (text.includes('*')) {
      const parts = text.split(/(\*[^*]+\*)/g);
      return (
        <>
          {parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={i} className="italic font-medium text-neutral-900">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </>
      );
    }
    return text;
  };

  return (
    <div className={`rounded-2xl bg-white text-neutral-900 p-6 sm:p-8 shadow-2xl border border-neutral-200 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
        {/* 1. À L'IMAGE */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center">
              <Film className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-[11px] text-[#ff1e00] font-bold uppercase tracking-wider block">
              À L'IMAGE
            </span>
          </div>
          <p className="text-neutral-700 leading-relaxed font-light">
            {renderFormattedText(imageText)}
          </p>
          <div className="h-0.5 w-8 bg-[#ff1e00] mt-2" />
        </div>

        {/* 2. LE SENS */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-[11px] text-[#ff1e00] font-bold uppercase tracking-wider block">
              LE SENS
            </span>
          </div>
          <p className="text-neutral-700 leading-relaxed font-light">
            {renderFormattedText(sensText)}
          </p>
          <div className="h-0.5 w-8 bg-[#ff1e00] mt-2" />
        </div>

        {/* 3. NOTRE FORCE */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#ff1e00]/10 text-[#ff1e00] flex items-center justify-center">
              <Diamond className="w-3.5 h-3.5 fill-[#ff1e00]/20" />
            </div>
            <span className="font-mono text-[11px] text-[#ff1e00] font-bold uppercase tracking-wider block">
              NOTRE FORCE
            </span>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900 text-xs sm:text-[13px] tracking-tight">
              {notreForceTitle}
            </div>
            <p className="text-neutral-700 leading-relaxed font-light">
              {renderFormattedText(notreForceText)}
            </p>
          </div>
          <div className="h-0.5 w-8 bg-[#ff1e00] mt-2" />
        </div>
      </div>
    </div>
  );
};
