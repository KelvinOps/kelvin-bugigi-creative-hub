//components/PageLoader.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "hsl(222 28% 8%)" }}
        >
          {/* Background radial */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(38 80% 45% / 0.08), transparent 70%)",
            }}
          />

          {/* Animated ring */}
          <div className="relative mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Outer spinning ring */}
              <svg
                width="80" height="80" viewBox="0 0 80 80"
                className="spin-slow absolute -inset-4"
                style={{ animation: "spin-slow 3s linear infinite" }}
              >
                <circle
                  cx="44" cy="44" r="38"
                  fill="none"
                  stroke="url(#loader-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="60 180"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(38, 95%, 58%)" />
                    <stop offset="100%" stopColor="hsl(16, 88%, 60%)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center logo */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-3xl text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                  boxShadow: "0 0 30px hsl(38 95% 58% / 0.3)",
                }}
              >
                K
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div
            className="w-40 h-0.5 rounded-full overflow-hidden mb-4"
            style={{ background: "hsl(224 18% 20%)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(38,95%,58%), hsl(16,88%,60%))",
                animation: "loader-progress 1.8s ease-out forwards",
              }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: "hsl(38 95% 58% / 0.6)" }}
          >
            Loading
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;