"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";

const AboutSection1 = ({ showText = true, animateIn }) => {
  const textRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);

  // Always hide text on mount, so animation always runs when section is shown
  useLayoutEffect(() => {
    if (textRef.current && subRef.current && descRef.current) {
      gsap.set([textRef.current, subRef.current, descRef.current], {
        opacity: 0,
        y: 40,
      });
    }
  }, []);

  // Animate text in when showText && animateIn
  useEffect(() => {
    if (!textRef.current || !subRef.current || !descRef.current) return;
    if (showText && animateIn) {
      gsap.to([textRef.current, subRef.current, descRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    } else if (!showText) {
      gsap.set([textRef.current, subRef.current, descRef.current], {
        opacity: 0,
        y: 40,
      });
    }
  }, [showText, animateIn]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-quantum-blue overflow-hidden px-4 relative">
      <h1
        ref={textRef}
        className="quantum-section-text relative z-[150] text-quantum-white text-5xl font-bold text-center mb-6"
      >
        About Quantum Sector
      </h1>
      <h2
        ref={subRef}
        className="quantum-section-text relative z-[150] text-quantum-white text-2xl font-semibold text-center mb-4"
      >
        Pioneering Digital Innovation
      </h2>
      <p
        ref={descRef}
        className="quantum-section-text relative z-[150] text-quantum-white text-xl text-center max-w-2xl"
      >
        Founded with a vision to bridge the gap between cutting-edge technology
        and creative excellence, Quantum Sector has been at the forefront of
        digital transformation since our inception. We believe in the power of
        innovation to solve complex challenges and create meaningful
        experiences.
      </p>
    </div>
  );
};

export default AboutSection1;
