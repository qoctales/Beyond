import React from 'react';

interface AiRobotCameraIconProps {
  className?: string;
}

export const AiRobotCameraIcon: React.FC<AiRobotCameraIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Robot Camera Body / Broadcast Lens with Robotic Sensors */}
      <rect x="2" y="5" width="13" height="14" rx="3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Camera Cine Lens Objective with Robotic Sensor Ring */}
      <circle cx="8.5" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="12" r="1.3" fill="currentColor" />
      {/* Upper AI Sensor / Robot Eye */}
      <circle cx="5" cy="8" r="0.8" fill="currentColor" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
      {/* Forward Robotic Cinema Mount / Viewfinder Funnel */}
      <path d="M15 9.5L21 6.5V17.5L15 14.5V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Top Robotic Antenna / Signal Emitter */}
      <line x1="8.5" y1="2" x2="8.5" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="1.8" r="1" fill="#ff1e00" />
    </svg>
  );
};
