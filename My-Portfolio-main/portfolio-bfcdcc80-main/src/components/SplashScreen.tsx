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
      <div className="flex h-full w-full items-stretch justify-center gap-16">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-full bg-white"
            style={{
              width: "1.5px",
              boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
