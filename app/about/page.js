"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

const sections = [
  {
    color: "#2D9CDB",
    text: "About Quantum Sector",
    subtitle: "Pioneering Digital Innovation",
    description:
      "Founded with a vision to bridge the gap between cutting-edge technology and creative excellence, Quantum Sector has been at the forefront of digital transformation since our inception. We believe in the power of innovation to solve complex challenges and create meaningful experiences.",
  },
  {
    color: "#9B51E0",
    text: "Our Mission",
    subtitle: "",
    description:
      "To empower businesses and individuals with exceptional digital experiences that not only meet today's needs but anticipate tomorrow's challenges. We combine technical expertise with creative vision to deliver solutions that are both beautiful and functional, ensuring our clients stay ahead in an ever-evolving digital landscape.",
  },
  {
    color: "#FF4D8D",
    text: "Our Values",
    subtitle: "",
    description:
      "Innovation, excellence, and collaboration drive everything we do. We believe in pushing boundaries while maintaining the highest standards of quality. Our team of passionate developers and designers work together to create solutions that not only meet but exceed expectations, delivering value that lasts.",
  },
];

export default function AboutPage() {
  const overlayRef = useRef(null);
  const textRefs = [useRef(null), useRef(null), useRef(null)];
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Scroll-jacked animation function
  const animateToSection = useCallback(
    (targetSection) => {
      if (isAnimating || targetSection === currentSection) return;

      setIsAnimating(true);
      const targetColor = sections[targetSection].color;
      const currentTextRef = textRefs[currentSection];
      const nextTextRef = textRefs[targetSection];

      // Master GSAP timeline for the entire transition
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // 1. Prepare overlay and show it
      tl.set(overlayRef.current, {
        x: "100%",
        display: "block",
        backgroundColor: targetColor,
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

      // 4. Switch content (now text is invisible)
      tl.add(() => {
        setCurrentSection(targetSection);
      });

      // 5. Slide overlay out to left (reveals new content)
      tl.to(overlayRef.current, {
        x: "-100%",
        duration: 0.6,
        ease: "power2.inOut",
      });

      // 6. Hide overlay
      tl.set(overlayRef.current, { display: "none" });

      // 7. Fade in next text block
      tl.to(nextTextRef.current, { opacity: 1, duration: 0.4 });
    },
    [currentSection, isAnimating, textRefs]
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

  // Initialize first section
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      // Set initial opacity for all text blocks
      textRefs.forEach((ref, index) => {
        gsap.set(ref.current, { opacity: index === 0 ? 1 : 0 });
      });
    }
  }, [isInitialized, textRefs]);

  const handleNavigation = (direction) => {
    if (isAnimating) return;
    const targetSection =
      (currentSection + direction + sections.length) % sections.length;
    animateToSection(targetSection);
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Fixed overlay that covers entire screen during transitions */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none"
        style={{ display: "none", willChange: "transform" }}
      />

      {/* Background sections */}
      <div className="absolute inset-0">
        {sections.map((section, i) => (
          <div
            key={i}
            className="absolute inset-0 h-full w-full transition-opacity duration-500"
            style={{
              backgroundColor: section.color,
              opacity: i === currentSection ? 1 : 0,
              zIndex: 10 + i,
            }}
          />
        ))}
      </div>

      {/* Separate fixed text blocks - one per section */}
      {sections.map((section, index) => (
        <div
          key={index}
          ref={textRefs[index]}
          className="fixed top-0 left-0 w-full h-full z-[150] flex items-center justify-center text-white pointer-events-none"
          style={{ willChange: "transform" }}
        >
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {section.text}
            </h1>
            {section.subtitle && (
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                {section.subtitle}
              </h2>
            )}
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              {section.description}
            </p>
          </div>
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
            ↑
          </button>
          <button
            onClick={() => handleNavigation(1)}
            disabled={isAnimating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full
                       transition-all duration-300 hover:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↓
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
}
