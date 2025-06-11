"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Section1 = ({ showText = true }) => {
  const textRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);

  useLayoutEffect(() => {
    if (!textRef.current || !subRef.current || !descRef.current) return;
    gsap.from([textRef.current, subRef.current, descRef.current], {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-quantum-blue overflow-hidden px-4">
      {showText && (
        <>
          <h1
            ref={textRef}
            className="quantum-section-text z-20 text-quantum-white text-5xl font-bold text-center mb-6"
          >
            Crafting Digital Excellence
          </h1>
          <h2
            ref={subRef}
            className="quantum-section-text z-20 text-quantum-white text-2xl font-semibold text-center mb-4"
          >
            Welcome to Quantum Sector
          </h2>
          <p
            ref={descRef}
            className="quantum-section-text z-20 text-quantum-white text-xl text-center max-w-2xl"
          >
            Quantum Sector transforms complex challenges into elegant, scalable
            websites. We combine cutting-edge tech and creative design to
            deliver digital experiences that inspire and perform—every time.
          </p>
        </>
      )}
    </div>
  );
};

export default Section1;
