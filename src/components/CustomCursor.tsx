import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device safely inside useEffect (avoids SSR crash)
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove, isTouch]);

  // Fixed: added [] dependency array to prevent duplicate listeners on every render
  useEffect(() => {
    if (isTouch) return;

    const handleOver = () => setHovering(true);
    const handleOut = () => setHovering(false);

    const interactives = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleOver);
      el.addEventListener("mouseleave", handleOut);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleOver);
        el.removeEventListener("mouseleave", handleOut);
      });
    };
  }, [isTouch]); // runs once on mount (and if isTouch changes)

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full bg-primary"
        animate={{
          x: pos.x - (hovering ? 3 : 5),
          y: pos.y - (hovering ? 3 : 5),
          width: hovering ? 6 : 10,
          height: hovering ? 6 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none rounded-full border-2 border-primary/40"
        animate={{
          x: pos.x - (hovering ? 24 : 20),
          y: pos.y - (hovering ? 24 : 20),
          width: hovering ? 48 : 40,
          height: hovering ? 48 : 40,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;