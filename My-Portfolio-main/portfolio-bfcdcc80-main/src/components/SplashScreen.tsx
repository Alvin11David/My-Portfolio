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
      <div className="relative flex items-center justify-center gap-4">
        {[0, 1, 2, 3].map((i) => (
          <svg
            key={i}
            width="12"
            height="80"
            viewBox="0 0 12 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            <rect
              x="0.75"
              y="0.75"
              width="10.5"
              height="78.5"
              rx="5.25"
              stroke="white"
              strokeWidth="1.5"
              className="splash-bar"
              style={{
                animation: `splashPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          </svg>
        ))}
      </div>

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
