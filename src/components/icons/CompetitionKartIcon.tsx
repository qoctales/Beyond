import React from 'react';

export interface CompetitionKartIconProps {
  className?: string;
}

export const CompetitionKartIcon: React.FC<CompetitionKartIconProps> = ({ className = "w-6 h-5" }) => (
  <svg 
    viewBox="0 0 54 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pneus avant */}
    <rect x="2" y="3" width="8" height="9" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1" />
    <circle cx="6" cy="7.5" r="1.5" fill="#ffffff" />
    <rect x="2" y="24" width="8" height="9" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1" />
    <circle cx="6" cy="28.5" r="1.5" fill="#ffffff" />

    {/* Pare-chocs avant aérodynamique */}
    <path d="M1 9h3v18H1" stroke="#ff1e00" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="8" y="11" width="3" height="14" fill="#2d313f" />

    {/* Pontons latéraux et carrosserie de compétition */}
    <rect x="10" y="8" width="28" height="20" rx="3" fill="#0d0e15" stroke="#ff1e00" strokeWidth="1.2" />
    
    <path d="M12 12h24v12H12z" fill="#ff1e00" fillOpacity="0.2" />
    <path d="M14 14l6 8M20 14l-6 8" stroke="#ff1e00" strokeWidth="0.8" strokeOpacity="0.5" />

    {/* Pneus arrière compétition ultra-larges */}
    <rect x="42" y="1" width="10" height="12" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1.2" />
    <circle cx="47" cy="7" r="2" fill="#ffffff" />
    <rect x="42" y="23" width="10" height="12" rx="2" fill="#14161f" stroke="#ff1e00" strokeWidth="1.2" />
    <circle cx="47" cy="29" r="2" fill="#ffffff" />

    {/* Pare-chocs arrière */}
    <rect x="36" y="7" width="5" height="22" rx="1" fill="#1c1f2e" stroke="#ffffff" strokeWidth="0.8" />

    {/* Baquet & Poste de pilotage */}
    <ellipse cx="26" cy="18" rx="5" ry="6" fill="#1c1f2e" stroke="#ff1e00" strokeWidth="1" />
    <circle cx="26" cy="18" r="2.5" fill="#ffffff" />

    {/* Volant de course ergonomique */}
    <ellipse cx="29" cy="18" rx="2.5" ry="4" fill="none" stroke="#ffffff" strokeWidth="1.2" />
    <line x1="26.5" y1="18" x2="29" y2="18" stroke="#ffffff" strokeWidth="1.2" />

    {/* Aileron & Échappement */}
    <path d="M38 10h12v16H38" stroke="#ff1e00" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    <rect x="48" y="8" width="2.5" height="20" rx="1" fill="#ff1e00" />
    
    <circle cx="26" cy="18" r="1" fill="#ff1e00" />
  </svg>
);
