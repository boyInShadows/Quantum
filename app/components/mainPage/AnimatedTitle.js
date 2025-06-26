"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedTitle = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll(".animated-letter");
    gsap.from(letters, {
      opacity: 0,
      x: -40,
      rotation: 0,
      scale: 1,
      ease: "power3.out",
      stagger: {
        each: 0.03,
        from: "random",
      },
      duration: 1.1,
    });
  }, [text]);

  // Split text into lines for custom line breaks
  const lines = text.split("|");

  return (
    <h1
      ref={containerRef}
      className="text-h4 md:text-h3 font-earthOrbiter mb-6 leading-tight text-center"
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {[...line].map((char, charIdx) => (
            <span key={charIdx} className="animated-letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedTitle;
