import React from 'react';

export interface BeninFlagIconProps {
  className?: string;
}

export const BeninFlagIcon: React.FC<BeninFlagIconProps> = ({ className = "w-6 h-4" }) => (
  <svg 
    viewBox="0 0 30 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 rounded-sm overflow-hidden shadow-sm border border-black/10 ${className}`}
  >
    {/* Bande verte verticale à gauche (2/5ème de la largeur) */}
    <rect x="0" y="0" width="12" height="20" fill="#008751" />
    {/* Bande jaune horizontale en haut à droite */}
    <rect x="12" y="0" width="18" height="10" fill="#FCD116" />
    {/* Bande rouge horizontale en bas à droite */}
    <rect x="12" y="10" width="18" height="10" fill="#E8112D" />
  </svg>
);
