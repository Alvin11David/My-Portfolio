import { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xl bg-background/60 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        width="2"
        height="120"
        viewBox="0 0 2 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      >
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="1"
            y1={i * 32 + 4}
            x2="1"
            y2={i * 32 + 28}
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              animation: `splashPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
              transformOrigin: `1px ${i * 32 + 16}px`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes splashPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
