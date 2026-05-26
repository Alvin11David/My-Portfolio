import React from "react";

type Props = {
  className?: string;
  invert?: boolean;
};

const CloudWave: React.FC<Props> = ({ className = "", invert = false }) => {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden>
      <svg
        className="block w-full h-40 sm:h-48 md:h-56 lg:h-64 wave-animate"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(174,255,240,0.12)" />
            <stop offset="50%" stopColor="rgba(174,255,240,0.08)" />
            <stop offset="100%" stopColor="rgba(174,255,240,0.06)" />
          </linearGradient>
        </defs>

        <path
          fill="url(#waveGrad)"
          d={invert ? "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,96C672,96,768,128,864,160C960,192,1056,224,1152,234.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" : "M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,197.3C672,171,768,149,864,138.7C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"}
        />
      </svg>
    </div>
  );
};

export default CloudWave;
