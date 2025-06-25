"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedTitle = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll(".animated-letter");
    gsap.from(letters, {
      opacity: 0,
      y: 40,
      rotation: () => gsap.utils.random(-15, 15),
      scale: () => gsap.utils.random(0.8, 1.2),
      ease: "back.out(1.7)",
      stagger: {
        each: 0.03,
        from: "random",
      },
      duration: 1.2,
    });
  }, []);

  return (
    <h1
      ref={containerRef}
      className="text-5xl md:text-6xl font-earthOrbiter mb-6 leading-tight flex flex-wrap justify-center gap-x-2"
    >
      {text.split("").map((char, i) => (
        <span key={i} className="animated-letter inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedTitle;
