//src/components/PageLoader.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline font-display font-bold text-6xl"
          >
            <span className="text-primary">K</span>
          </motion.div>

          <div className="w-32 h-0.5 bg-secondary mt-6 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-amber rounded-full"
              style={{ animation: "loader-progress 1.5s ease-out forwards" }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground font-mono text-xs tracking-[0.3em] uppercase mt-4"
          >
            Loading
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
