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
      <div className="flex h-full w-full items-stretch justify-center gap-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-full bg-white"
            style={{
              width: "1.5px",
              animation: `splashFade 1.2s ease-in-out ${i * 0.2}s infinite`,
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
