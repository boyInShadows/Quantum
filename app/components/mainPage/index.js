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

  // Initialize first section properly
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);

      // Set initial state for all text blocks
      textRefs.forEach((ref, index) => {
        if (ref.current) {
          if (index === 0) {
            // First section: animate in
            gsap.set(ref.current, {
              opacity: 0,
              y: 50,
              scale: 0.95,
              rotationX: 15,
            });
            // Animate first section in
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
              delay: 0.3,
            });
          } else {
            // Other sections: hidden and positioned off-screen
            gsap.set(ref.current, {
              opacity: 0,
              y: 100,
              scale: 0.9,
              rotationX: 20,
              pointerEvents: "none",
            });
          }
        }
      });

      // Set initial opacity for all background sections
      bgRefs.forEach((ref, index) => {
        gsap.set(ref.current, { opacity: index === 0 ? 1 : 0 });
      });
    }
  }, [isInitialized, textRefs, bgRefs]);

  // Debug: Log when currentSection changes
  useEffect(() => {
    console.log("🔄 Current section changed to:", currentSection);
  }, [currentSection]);

  // Enhanced text animation function
  const animateTextIn = (textRef) => {
    if (!textRef.current) return;

    const tl = gsap.timeline();

    // Reset to starting position
    gsap.set(textRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      rotationX: 15,
    });

    // Animate in with staggered children
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Animate children with stagger
    const children = textRef.current.querySelectorAll("h1, h2, p, div");
    tl.to(
      children,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.6"
    );

    return tl;
  };

  const animateTextOut = (textRef) => {
    if (!textRef.current) return;

    const tl = gsap.timeline();

    // Animate children out first
    const children = textRef.current.querySelectorAll("h1, h2, p, div");
    tl.to(children, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    });

    // Then animate the container out
    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: -50,
        scale: 0.95,
        rotationX: -15,
        duration: 0.6,
        ease: "power2.in",
      },
      "-=0.2"
    );

    return tl;
  };

  // Scroll-jacked animation function
  const animateToSection = useCallback(
    async (nextSection) => {
      if (isAnimating || nextSection === currentSection) return;
      console.log(
        "🎯 ANIMATION START: From section",
        currentSection,
        "to",
        nextSection
      );
      console.log(
        "🎯 CURRENT SECTION GRADIENT:",
        sections[currentSection].gradient
      );
      console.log("🎯 NEXT SECTION GRADIENT:", sections[nextSection].gradient);
      setIsAnimating(true);

      const currentTextRef = textRefs[currentSection];
      const nextTextRef = textRefs[nextSection];

      // 1. Set overlay to next section's gradient, off-screen right
      console.log("🎯 STEP 1: Setting overlay initial state");
      gsap.set(overlayRef.current, {
        x: "100%",
        display: "block",
        backgroundImage: sections[nextSection].overlayGradient,
      });
      console.log("🎯 OVERLAY SET TO:", sections[nextSection].overlayGradient);

      // 2. Slide overlay in
      console.log("🎯 STEP 2: Starting overlay slide in");
      await gsap.to(overlayRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 3. Overlay slide in completed - NOW switch background opacity
      console.log("🎯 STEP 3: Overlay slide in completed");
      const overlayGradientAfterSlideIn = getComputedStyle(
        overlayRef.current
      ).background;
      console.log(
        `🎯 OVERLAY GRADIENT AFTER SLIDE IN: ${overlayGradientAfterSlideIn}`
      );

      // 4. Switch background opacity DURING overlay slide-in (not after)
      console.log("🎯 STEP 4: Switching background opacity");

      // Use direct DOM manipulation instead of GSAP for opacity
      if (bgRefs[currentSection].current) {
        bgRefs[currentSection].current.style.opacity = "0";
      }
      if (bgRefs[nextSection].current) {
        bgRefs[nextSection].current.style.opacity = "1";
      }

      // Log all background gradients after the switch
      console.log("🎯 BACKGROUND GRADIENTS AFTER SWITCH:");
      bgRefs.forEach((ref, index) => {
        if (ref.current) {
          const gradient = getComputedStyle(ref.current).background;
          const opacity = getComputedStyle(ref.current).opacity;
          console.log(
            `  Background ${index}: gradient = ${gradient}, opacity = ${opacity}`
          );
        }
      });

      // 5. Start text animations
      console.log("🎯 STEP 5: Starting text animations");

      // Animate current text out
      if (currentTextRef.current) {
        await animateTextOut(currentTextRef);
      }

      // Animate next text in
      if (nextTextRef.current) {
        await animateTextIn(nextTextRef);
      }

      // 6. Text animations completed
      console.log("🎯 STEP 6: Text animations completed");

      // 7. Before overlay slide out
      console.log("🎯 STEP 7: Before overlay slide out");
      const overlayGradientBeforeSlideOut = getComputedStyle(
        overlayRef.current
      ).background;
      console.log(
        `🎯 OVERLAY GRADIENT BEFORE SLIDE OUT: ${overlayGradientBeforeSlideOut}`
      );

      // Log all background gradients before slide out
      console.log("🎯 BACKGROUND GRADIENTS BEFORE SLIDE OUT:");
      bgRefs.forEach((ref, index) => {
        if (ref.current) {
          const gradient = getComputedStyle(ref.current).background;
          const opacity = getComputedStyle(ref.current).opacity;
          console.log(
            `  Background ${index}: gradient = ${gradient}, opacity = ${opacity}`
          );
        }
      });

      // 8. Start overlay slide out
      console.log("🎯 STEP 8: Starting overlay slide out");
      await gsap.to(overlayRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 9. Overlay slide out completed
      console.log("🎯 STEP 9: Overlay slide out completed");
      const finalOverlayGradient = getComputedStyle(
        overlayRef.current
      ).background;
      console.log(`🎯 FINAL OVERLAY GRADIENT: ${finalOverlayGradient}`);

      // Check what gradient is visible behind the overlay
      console.log("🎯 VISIBLE BACKGROUND AFTER SLIDE OUT:");
      bgRefs.forEach((ref, index) => {
        if (ref.current) {
          const gradient = getComputedStyle(ref.current).background;
          const opacity = getComputedStyle(ref.current).opacity;
          const visibility = getComputedStyle(ref.current).visibility;
          console.log(
            `  Background ${index}: gradient = ${gradient}, opacity = ${opacity}, visibility = ${visibility}`
          );
        }
      });

      // Reset overlay for next transition
      gsap.set(overlayRef.current, {
        display: "none",
        x: "100%",
      });

      // 10. Update current section
      setCurrentSection(nextSection);
      console.log("🎯 ANIMATION COMPLETED");

      setIsAnimating(false);
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
        className="fixed top-0 left-0 w-full h-full z-[120] pointer-events-none"
        style={{
          display: "none",
          willChange: "transform",
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
          }}
        >
          {index === 0 ? (
            <div className="flex justify-around ">
              <div className="text-center max-w-4xl px-4 pt-20 mx-auto bg-black/30 rounded-2xl shadow-lg backdrop-blur-md  p-8">
                <AnimatedTitle text={sections[0].title} />
                {sections[0].subtitle && (
                  <h2
                    className="text-h3 font-semibold mb-6"
                    style={{ opacity: 1, transform: "translateY(20px)" }}
                  >
                    {sections[0].subtitle}
                  </h2>
                )}
                <p
                  className="text-lead leading-relaxed max-w-3xl mx-auto"
                  style={{ opacity: 1, transform: "translateY(20px)" }}
                >
                  {sections[0].description}
                </p>
              </div>
              <div>
                <p>hi</p>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-4xl px-4 pt-20">
              <h1
                className="text-display-xl font-earthOrbiter mb-6 leading-tight"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                {sections[index].title}
              </h1>
              {sections[index].subtitle && (
                <h2
                  className="text-h3 font-semibold mb-6"
                  style={{ opacity: 0, transform: "translateY(20px)" }}
                >
                  {sections[index].subtitle}
                </h2>
              )}
              <p
                className="text-lead leading-relaxed max-w-3xl mx-auto"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
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
