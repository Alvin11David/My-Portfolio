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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-50 px-0 pointer-events-none">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-line bg-white"
            style={{
              height: "1.5px",
              width: "100%",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
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
              width: "1.5px",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        ))}
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
    </div>
  );
};

export default SplashScreen;
