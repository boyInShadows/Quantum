"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Section5 = ({ showText = true }) => {
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
      className="h-screen w-full flex flex-col items-center justify-center bg-quantum-navy overflow-hidden px-4"
    >
      {showText && (
        <>
          <h1
            ref={textRef}
            className="quantum-section-text z-20 text-quantum-white text-5xl font-bold text-center mb-6"
          >
            Strategy & Insights
          </h1>
          <p
            ref={descRef}
            className="quantum-section-text z-20 text-quantum-white text-xl text-center max-w-2xl"
          >
            Data‑driven design meets quantum‑inspired innovation. We analyze
            user behavior and market trends to shape solutions that work now and
            grow with you—making your site both intuitive and future-ready.
          </p>
        </>
      )}
    </div>
  );
};

export default Section5;
