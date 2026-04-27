//src/ScrollProgress.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[51]"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, hsl(38,95%,58%), hsl(16,88%,60%), hsl(38,95%,58%))",
        boxShadow: "0 0 8px hsl(38 95% 58% / 0.5)",
      }}
    />
  );
};

export default ScrollProgress;