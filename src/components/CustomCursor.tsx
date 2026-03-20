import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [isTouch, setIsTouch]   = useState(false);

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

  useEffect(() => {
    if (isTouch) return;
    const over = () => setHovering(true);
    const out  = () => setHovering(false);
    const els  = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    els.forEach((el) => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    return () => els.forEach((el) => { el.removeEventListener("mouseenter", over); el.removeEventListener("mouseleave", out); });
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full"
        animate={{
          x: pos.x - (hovering ? 4 : 5),
          y: pos.y - (hovering ? 4 : 5),
          width:  hovering ? 8  : 10,
          height: hovering ? 8  : 10,
          opacity: visible ? 1 : 0,
        }}
        style={{
          background: "linear-gradient(135deg, hsl(38,95%,65%), hsl(16,88%,62%))",
          boxShadow: "0 0 8px hsl(38 95% 58% / 0.6)",
        }}
        transition={{ type: "spring", stiffness: 600, damping: 28, mass: 0.4 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none rounded-full"
        animate={{
          x: pos.x - (hovering ? 22 : 18),
          y: pos.y - (hovering ? 22 : 18),
          width:  hovering ? 44 : 36,
          height: hovering ? 44 : 36,
          opacity: visible ? 0.7 : 0,
        }}
        style={{
          border: "1.5px solid hsl(38 95% 58% / 0.45)",
          mixBlendMode: "normal",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 }}
      />
    </>
  );
};

export default CustomCursor;