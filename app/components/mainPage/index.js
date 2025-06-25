"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import gsap from "gsap";
import Header from "../header";
import AnimatedTitle from "./AnimatedTitle";

const sections = [
  {
    id: "section-1",
    color: "#2D9CDB", // quantum-blue
    gradient:
      "linear-gradient(90.4deg, rgba(0,0,0,1) 10%, rgba(183,72,248,1) 101%)",
    overlayGradient:
      "linear-gradient(-90.4deg, rgba(0,0,0,1) 10%, rgba(183,72,248,1) 101%)",
    title: "Beyond the Event Horizon: Build the Future",
    subtitle: "Welcome to Quantum Sector",
    description:
      "Event Horizon Tech isn't just a platform—it's a gravitational pull for innovation. From first line of code to global scale, we're your co-pilot.",
  },
  {
    id: "section-2",
    color: "#9B51E0", // quantum-purple
    gradient:
      "linear-gradient(86.4deg, rgba(0,0,0,1) 11.7%, rgba(94,85,247,1) 115.6%)",
    overlayGradient:
      "linear-gradient(-86.4deg, rgba(0,0,0,1) 11.7%, rgba(94,85,247,1) 115.6%)",
    title: "Lightning-Fast Performance",
    subtitle: "",
    description:
      "Blazing‑fast loading, silky‑smooth interactions. Our performance‑first approach—via code optimization, responsive frameworks, and lightweight animations—ensures your users get the best experience, no matter the device.",
  },
  {
    id: "section-3",
    color: "#FF4D8D", // quantum-pink
    gradient:
      "linear-gradient(88.4deg, rgba(29,29,29,1) 10.8%, rgba(94,224,253,1) 103.8%)",
    overlayGradient:
      "linear-gradient(-88.4deg, rgba(29,29,29,1) 10.8%, rgba(94,224,253,1) 103.8%)",
    title: "Creative Web Experiences",
    subtitle: "",
    description:
      "We blend artistic vision with technical precision. From immersive animations to intuitive UI/UX, we create captivating environments that engage users and leave a lasting impact—a hallmark of modern, memorable web design.",
  },
  {
    id: "section-4",
    color: "#27AE60", // quantum-green
    gradient:
      "linear-gradient(92.4deg, rgba(0,0,0,1) 10.2%, rgba(16,243,192,1) 102.6%)",
    overlayGradient:
      "linear-gradient(-92.4deg, rgba(0,0,0,1) 10.2%, rgba(16,243,192,1) 102.6%)",
    title: "Modern Web Development",
    subtitle: "",
    description:
      "Built for today—and ready for tomorrow. We leverage the latest ecosystems (React, Next.js, Tailwind, GSAP) and best practices (component-first architecture, scalable design systems, performance testing) to ensure your web presence evolves with your business.",
  },
];

const MainPage = () => {
  const overlayRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const bgRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [targetSection, setTargetSection] = useState(null);
  const [overlayGradient, setOverlayGradient] = useState(
    sections[0].overlayGradient
  );

  // Initialize first section properly
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);

      // Set initial opacity for all text blocks - only current section visible
      textRefs.forEach((ref, index) => {
        gsap.set(ref.current, { opacity: index === 0 ? 1 : 0 });
      });

      // Set initial opacity for all background sections - only current section visible
      bgRefs.forEach((ref, index) => {
        gsap.set(ref.current, { opacity: index === 0 ? 1 : 0 });
      });
    }
  }, [isInitialized, textRefs, bgRefs]);

  // Scroll-jacked animation function
  const animateToSection = useCallback(
    (nextSection) => {
      if (isAnimating || nextSection === currentSection) return;

      setIsAnimating(true);
      setOverlayGradient(sections[nextSection].overlayGradient);
      const targetColor = sections[nextSection].color;
      const currentTextRef = textRefs[currentSection];
      const nextTextRef = textRefs[nextSection];

      // Master GSAP timeline for the entire transition
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          setCurrentSection(nextSection);
        },
      });

      // Pre-animation cleanup - immediately hide all backgrounds except current
      tl.set(bgRefs, (el, i) => {
        gsap.set(el, { opacity: i === currentSection ? 1 : 0 });
      });

      // 1. Prepare overlay and show it (set to target section's background gradient)
      tl.set(overlayRef.current, {
        x: "100%",
        display: "block",
        backgroundImage: sections[nextSection].gradient,
      });

      // Force browser to reflow overlay layer BEFORE continuing animation
      tl.add(() => overlayRef.current?.offsetHeight, "+=0.01");

      // 2. Slide overlay in from right (covers entire screen)
      tl.to(overlayRef.current, {
        x: "0%",
        duration: 0.6,
        ease: "power2.inOut",
      });

      // 3. Fade out current text block
      tl.to(currentTextRef.current, { opacity: 0, duration: 0.3 });

      // 4. Switch background and slide overlay out simultaneously
      tl.add(() => {
        // Immediately set new background to visible, all others to 0
        gsap.set(bgRefs, (el, i) => {
          gsap.set(el, { opacity: i === nextSection ? 1 : 0 });
        });
      });

      // 5. Slide overlay out to left (reveals new content)
      tl.to(
        overlayRef.current,
        {
          x: "-100%",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.01"
      ); // Start immediately after background switch

      // 6. Hide overlay
      tl.set(overlayRef.current, { display: "none" });

      // 7. Fade in next text block
      tl.to(nextTextRef.current, { opacity: 1, duration: 0.4 });
    },
    [currentSection, isAnimating, textRefs, bgRefs]
  );

  // Scroll hijacking
  useEffect(() => {
    let scrollTimeout;
    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isAnimating || isScrolling) return;

      isScrolling = true;
      clearTimeout(scrollTimeout);

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection =
        (currentSection + direction + sections.length) % sections.length;

      animateToSection(nextSection);

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const handleKeyDown = (e) => {
      if (isAnimating) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const nextSection = (currentSection + 1) % sections.length;
        animateToSection(nextSection);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prevSection =
          (currentSection - 1 + sections.length) % sections.length;
        animateToSection(prevSection);
      }
    };

    // Add event listeners
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isAnimating, animateToSection]);

  const handleNavigation = (direction) => {
    if (isAnimating) return;
    const targetSection =
      (currentSection + direction + sections.length) % sections.length;
    animateToSection(targetSection);
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Fixed Header */}
      <Header />

      {/* Fixed overlay that covers entire screen during transitions */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none"
        style={{
          display: "none",
          willChange: "transform",
          backgroundImage: overlayGradient,
        }}
      />

      {/* Background sections with individual refs */}
      {sections.map((section, i) => (
        <div
          key={i}
          ref={bgRefs[i]}
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: section.gradient,
            opacity: i === currentSection ? 1 : 0,
            zIndex: 10 + i,
            willChange: "transform",
          }}
        />
      ))}

      {/* Separate fixed text blocks - render all, but only current is visible/selectable */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          ref={textRefs[index]}
          className={`fixed top-0 left-0 w-full h-full z-[150] flex items-center justify-center text-white ${
            index === currentSection
              ? "pointer-events-auto"
              : "pointer-events-none"
          }`}
          style={{
            willChange: "transform",
            opacity: index === currentSection ? 1 : 0,
          }}
        >
          {index === 0 ? (
            <div className="flex justify-around ">
              <div className="text-center max-w-4xl px-4 pt-20 mx-auto bg-black/30 rounded-2xl shadow-lg backdrop-blur-md  p-8">
                <AnimatedTitle text={sections[0].title} />
                {sections[0].subtitle && (
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    {sections[0].subtitle}
                  </h2>
                )}
                <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                  {sections[0].description}
                </p>
              </div>
              <div>
                <p>hi</p>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-4xl px-4 pt-20">
              <h1 className="text-5xl md:text-6xl font-earthOrbiter mb-6 leading-tight">
                {sections[index].title}
              </h1>
              {sections[index].subtitle && (
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                  {sections[index].subtitle}
                </h2>
              )}
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                {sections[index].description}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Navigation controls */}
      <div className="fixed z-[200] right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          <button
            onClick={() => handleNavigation(-1)}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full
                       transition-all duration-300 hover:scale-110 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronUp size={24} />
          </button>
          <button
            onClick={() => handleNavigation(1)}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full
                       transition-all duration-300 hover:scale-110 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronDown size={24} />
          </button>
        </div>
      </div>

      {/* Section indicator */}
      <div className="fixed z-[200] left-6 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col gap-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
