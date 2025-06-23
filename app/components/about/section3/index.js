"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";

const AboutSection3 = ({ showText = true, animateIn }) => {
  const textRef = useRef(null);
  const descRef = useRef(null);

  // Always hide text on mount, so animation always runs when section is shown
  useLayoutEffect(() => {
    if (textRef.current && descRef.current) {
      gsap.set([textRef.current, descRef.current], {
        opacity: 0,
        y: 40,
      });
    }
  }, []);

  // Animate text in when showText && animateIn
  useEffect(() => {
    if (!textRef.current || !descRef.current) return;
    if (showText && animateIn) {
      gsap.to([textRef.current, descRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    } else if (!showText) {
      gsap.set([textRef.current, descRef.current], {
        opacity: 0,
        y: 40,
      });
    }
  }, [showText, animateIn]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-quantum-pink overflow-hidden px-4 relative">
      <h1
        ref={textRef}
        className="quantum-section-text relative z-[150] text-quantum-white text-5xl font-bold text-center mb-6"
      >
        Our Values
      </h1>
      <p
        ref={descRef}
        className="quantum-section-text relative z-[150] text-quantum-white text-xl text-center max-w-2xl"
      >
        Innovation, excellence, and collaboration drive everything we do. We
        believe in pushing boundaries while maintaining the highest standards of
        quality. Our team of passionate developers and designers work together
        to create solutions that not only meet but exceed expectations,
        delivering value that lasts.
      </p>
    </div>
  );
};

export default AboutSection3;
