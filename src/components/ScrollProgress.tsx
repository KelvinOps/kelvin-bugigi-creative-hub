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
      className="fixed top-0 left-0 h-0.5 bg-gradient-amber z-[51]"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ScrollProgress;
