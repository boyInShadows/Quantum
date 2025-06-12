"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";

const Section1 = ({
  showText = true,
  overlayPhase,
  overlayColor,
  animateIn,
}) => {
  const textRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const overlayRef = useRef(null);

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

  // Animate overlay
  useEffect(() => {
    if (!overlayRef.current) return;
    if (!overlayPhase || overlayPhase === "idle") {
      gsap.set(overlayRef.current, { x: "100vw" });
      return;
    }
    if (overlayPhase === "in") {
      gsap.to(overlayRef.current, {
        x: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });
    } else if (overlayPhase === "covered") {
      // keep overlay in place
      gsap.set(overlayRef.current, { x: 0 });
    } else if (overlayPhase === "out") {
      gsap.to(overlayRef.current, {
        x: "-100vw",
        duration: 0.7,
        ease: "power2.inOut",
      });
    }
  }, [overlayPhase]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-quantum-blue overflow-hidden px-4 relative">
      {/* Per-section overlay */}
      <div
        ref={overlayRef}
        className={`absolute top-0 left-0 w-full h-full z-10 ${overlayColor}`}
        style={{ pointerEvents: "none" }}
      />
      <h1
        ref={textRef}
        className="quantum-section-text z-100 text-quantum-white text-5xl font-bold text-center mb-6"
      >
        Crafting Digital Excellence
      </h1>
      <h2
        ref={subRef}
        className="quantum-section-text z-100 text-quantum-white text-2xl font-semibold text-center mb-4"
      >
        Welcome to Quantum Sector
      </h2>
      <p
        ref={descRef}
        className="quantum-section-text z-100 text-quantum-white text-xl text-center max-w-2xl"
      >
        Quantum Sector transforms complex challenges into elegant, scalable
        websites. We combine cutting-edge tech and creative design to deliver
        digital experiences that inspire and perform—every time.
      </p>
    </div>
  );
};

export default Section1;
