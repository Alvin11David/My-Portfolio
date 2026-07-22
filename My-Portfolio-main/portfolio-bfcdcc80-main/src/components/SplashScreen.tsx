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
            className="bg-white"
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
            className="relative h-full bg-white"
            style={{
              width: "1.5px",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{ width: "8px", height: "8px", boxShadow: "0 0 8px rgba(255,255,255,0.6)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
