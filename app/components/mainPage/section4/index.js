"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section4 = ({
  showText = true,
  overlayPhase,
  overlayColor,
  animateIn,
}) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current || !descRef.current) return;
    gsap.from([textRef.current, descRef.current], {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, []);

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
      gsap.set(overlayRef.current, { x: 0 });
    } else if (overlayPhase === "out") {
      gsap.to(overlayRef.current, {
        x: "-100vw",
        duration: 0.7,
        ease: "power2.inOut",
      });
    }
  }, [overlayPhase]);

  // Instantly show text on initial load (no animation)
  useLayoutEffect(() => {
    if (!animateIn && showText && textRef.current && descRef.current) {
      gsap.set([textRef.current, descRef.current], {
        opacity: 1,
        y: 0,
      });
    }
  }, [animateIn, showText]);

  // Animate text only if animateIn is true
  useEffect(() => {
    if (!textRef.current || !descRef.current) return;
    if (showText && animateIn) {
      gsap.fromTo(
        [textRef.current, descRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else if (!showText) {
      gsap.to([textRef.current, descRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [showText, animateIn]);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center bg-quantum-green overflow-hidden px-4 relative"
    >
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
        Modern Web Development
      </h1>
      <p
        ref={descRef}
        className="quantum-section-text z-100 text-quantum-white text-xl text-center max-w-2xl"
      >
        Built for today—and ready for tomorrow. We leverage the latest
        ecosystems (React, Next.js, Tailwind, GSAP) and best practices
        (component-first architecture, scalable design systems, performance
        testing) to ensure your web presence evolves with your business.
      </p>
    </div>
  );
};

export default Section4;
