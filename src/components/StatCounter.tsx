//components/StatCounter.tsx

import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

const StatCounter = ({ end, suffix = "+", label }: StatCounterProps) => {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-extrabold text-2xl bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(38,95%,65%), hsl(16,88%,62%))",
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-mono text-[10px] mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCounter;