//src/components/TypewriterEffects.tsx

import { useState, useEffect } from "react";

const roles = [
  "Software Developer",
  "Graphic Designer",
  "Fine Artist",
  "Vocational Trainer",
];

const TypewriterEffect = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="typewriter-cursor pr-1 text-primary">
      {roles[roleIndex].substring(0, charIndex)}
    </span>
  );
};

export default TypewriterEffect;
