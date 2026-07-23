import { useState } from "react";
import logoImage from "@/assets/images/video/alvin_logo.png";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  const handleAnimationEnd = () => {
    setVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xl bg-background/60 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-0 pointer-events-none overflow-hidden" style={{ gap: "12.5rem" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-line bg-white"
            style={{
              height: "1px",
              width: "50%",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
              animation: "lineMoveRight 2s linear infinite",
            }}
          />
        ))}
      </div>
      <div className="flex h-full w-full items-stretch justify-center gap-60">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="v-line bg-white"
            style={{
              width: "1px",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={logoImage}
          alt="Logo"
          onAnimationEnd={handleAnimationEnd}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[200px] object-cover"
          style={{
            animation: "logoFadeIn 5s ease-in-out forwards",
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "calc(50% - 100px)", left: "calc(50% - 120px)" },
          { top: "calc(50% - 100px)", left: "calc(50% + 120px)" },
          { top: "calc(50% + 100px)", left: "calc(50% - 120px)" },
          { top: "calc(50% + 100px)", left: "calc(50% + 120px)" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              top: pos.top,
              left: pos.left,
              width: "8px",
              height: "8px",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes lineMoveRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
