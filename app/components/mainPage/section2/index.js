"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section2 = ({ showText = true }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);

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

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center bg-quantum-purple overflow-hidden px-4"
    >
      {showText && (
        <>
          <h1
            ref={textRef}
            className="quantum-section-text z-20 text-quantum-white text-5xl font-bold text-center mb-6"
          >
            Lightning-Fast Performance
          </h1>
          <p
            ref={descRef}
            className="quantum-section-text z-20 text-quantum-white text-xl text-center max-w-2xl"
          >
            Blazing‑fast loading, silky‑smooth interactions. Our
            performance‑first approach—via code optimization, responsive
            frameworks, and lightweight animations—ensures your users get the
            best experience, no matter the device.
          </p>
        </>
      )}
    </div>
  );
};

export default Section2;
