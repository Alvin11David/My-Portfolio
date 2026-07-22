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
      <div className="flex items-center justify-center gap-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="splash-line"
            style={{
              width: "1.5px",
              height: "160px",
              backgroundColor: "white",
              borderRadius: "1px",
              animation: `splashGrow 1.2s ease-in-out ${i * 0.2}s infinite`,
              transformOrigin: "top center",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashGrow {
          0%, 100% { opacity: 0.3; transform: scaleY(0.4); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
