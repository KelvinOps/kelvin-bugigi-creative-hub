import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [hovering, setHovering]   = useState(false);
  const [clicking, setClicking]   = useState(false);
  const [visible, setVisible]     = useState(false);
  const [isTouch, setIsTouch]     = useState(false);
  const [trailDots, setTrailDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.4 };
  const ringConfig   = { stiffness: 150, damping: 20, mass: 0.9 };

  const dotX  = useSpring(cursorX, springConfig);
  const dotY  = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setVisible(true);

    // Trail dots
    const id = ++trailIdRef.current;
    setTrailDots(prev => [...prev.slice(-6), { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setTrailDots(prev => prev.filter(d => d.id !== id));
    }, 600);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isTouch) return;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", () => setClicking(true));
    window.addEventListener("mouseup", () => setClicking(false));
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [onMove, isTouch]);

  useEffect(() => {
    if (isTouch) return;
    const over = () => setHovering(true);
    const out  = () => setHovering(false);
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, input, textarea, select, [role='button'], [data-cursor='hover']");
      els.forEach(el => {
        el.addEventListener("mouseenter", over);
        el.addEventListener("mouseleave", out);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const els = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    els.forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => {
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Trail dots */}
      {trailDots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[96]"
          style={{
            width: 4,
            height: 4,
            x: dot.x - 2,
            y: dot.y - 2,
            background: `hsl(38 95% 58% / ${(i + 1) / trailDots.length * 0.4})`,
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 6 : hovering ? 8 : 10,
          height: clicking ? 6 : hovering ? 8 : 10,
          background: "linear-gradient(135deg, hsl(38,95%,65%), hsl(16,88%,62%))",
          boxShadow: hovering ? "0 0 16px hsl(38 95% 58% / 0.8)" : "0 0 8px hsl(38 95% 58% / 0.5)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: clicking ? 28 : hovering ? 48 : 36,
          height: clicking ? 28 : hovering ? 48 : 36,
          border: hovering ? "1.5px solid hsl(38 95% 58% / 0.6)" : "1.5px solid hsl(38 95% 58% / 0.35)",
          opacity: visible ? hovering ? 1 : 0.6 : 0,
          background: hovering ? "hsl(38 95% 58% / 0.05)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;