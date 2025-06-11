"use client";

import React, { useEffect, useRef, useState } from "react";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Section5 from "./section5";
import { ChevronUp, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("nurtureEase", "M0,0 C0.2,0 0.1,1 1,1");

const sectionComponents = [Section1, Section2, Section3, Section4, Section5];

const MainPage = () => {
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [prevSection, setPrevSection] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [overlayPhase, setOverlayPhase] = useState("idle"); // 'idle', 'in', 'covered', 'out'
  const sectionOverlayColors = [
    "bg-quantum-blue",
    "bg-quantum-purple",
    "bg-quantum-pink",
    "bg-quantum-green",
    "bg-quantum-navy",
  ];

  // Helper to get all text elements in a section
  const getTextElements = (sectionIdx) => {
    if (!containerRef.current) return [];
    const section = containerRef.current.children[sectionIdx];
    if (!section) return [];
    return Array.from(section.querySelectorAll(".quantum-section-text"));
  };

  const handleScroll = (direction) => {
    if (isScrolling || transitioning) return;
    setIsScrolling(true);
    let _nextSection;
    if (direction === "next") {
      _nextSection = (currentSection + 1) % 5;
    } else {
      _nextSection = (currentSection - 1 + 5) % 5;
    }
    if (_nextSection === currentSection) {
      setIsScrolling(false);
      return;
    }

    setTransitioning(true);
    setPrevSection(currentSection);
    setNextSection(_nextSection);
    setOverlayPhase("in");

    // Set overlay color for the next section
    const overlay = overlayRef.current;
    sectionOverlayColors.forEach((c) => overlay.classList.remove(c));
    overlay.classList.add(sectionOverlayColors[_nextSection]);

    setTimeout(() => {
      const prevTextEls = getTextElements(currentSection);
      const nextTextEls = getTextElements(_nextSection);
      if (!overlayRef.current || !containerRef.current) {
        setIsScrolling(false);
        setTransitioning(false);
        setPrevSection(null);
        setNextSection(null);
        setOverlayPhase("idle");
        return;
      }

      // Overlay animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSection(_nextSection);
          setPrevSection(null);
          setNextSection(null);
          setTransitioning(false);
          setOverlayPhase("idle");
          setIsScrolling(false);
        },
      });

      // Start overlay off-screen right, above content
      gsap.set(overlayRef.current, {
        x: "100vw",
        display: "block",
        zIndex: 50,
      });

      if (prevTextEls.length) gsap.set(prevTextEls, { opacity: 1 });
      if (nextTextEls.length) gsap.set(nextTextEls, { opacity: 0 });

      // Slide overlay in (above content)
      tl.to(overlayRef.current, {
        x: 0,
        duration: 0.8,
        ease: "nurtureEase",
        onComplete: () => setOverlayPhase("covered"),
      });

      // Fade out prev text after overlay is fully in
      if (prevTextEls.length) {
        tl.to(prevTextEls, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      // Switch section while overlay is fully in
      tl.add(() => {
        setCurrentSection(_nextSection);
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            x: `-${_nextSection * 100}vw`,
            duration: 0,
          });
        }
        setOverlayPhase("out");
      });

      // Fade in next text as overlay slides out
      if (nextTextEls.length) {
        tl.to(
          nextTextEls,
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          "+=0.1"
        );
      }

      // Slide overlay out to left (above content)
      tl.to(
        overlayRef.current,
        {
          x: "-100vw",
          duration: 0.8,
          ease: "nurtureEase",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" });
          },
        },
        "<"
      );
    }, 0);
  };

  useEffect(() => {
    let scrollTimeout;
    let currentScrollTrigger;
    currentScrollTrigger = ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => handleScroll("next"),
      onEnterBack: () => handleScroll("prev"),
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true,
    });
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      if (e.deltaY > 0) {
        handleScroll("next");
      } else {
        handleScroll("prev");
      }
    };
    mainRef.current.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (currentScrollTrigger) currentScrollTrigger.kill();
      if (mainRef.current) {
        mainRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSection, isScrolling]);

  return (
    <main ref={mainRef} className="h-screen w-full overflow-hidden relative">
      {/* Overlay Layer */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none"
        style={{ display: "none", pointerEvents: "none" }}
      />
      <div
        ref={containerRef}
        className="fixed top-0 left-0 h-screen w-screen flex transition-transform duration-1200"
        style={{ zIndex: 10 }}
      >
        {sectionComponents.map((Section, idx) => {
          let showText = false;
          if (!transitioning && idx === currentSection) showText = true;
          if (
            transitioning &&
            idx === prevSection &&
            overlayPhase !== "covered"
          )
            showText = true;
          if (transitioning && idx === nextSection && overlayPhase === "out")
            showText = true;
          return (
            <div
              key={idx}
              className="h-full w-screen flex-shrink-0 transform-gpu relative"
            >
              {(idx === currentSection ||
                idx === prevSection ||
                idx === nextSection) && <Section showText={showText} />}
            </div>
          );
        })}
      </div>
      {/* Navigation Arrows */}
      <div className="absolute inset-0 pointer-events-none z-50 flex flex-col items-end justify-center">
        <div className="flex flex-col gap-2 mr-8 pointer-events-auto">
          <button
            onClick={() => handleScroll("prev")}
            className="bg-quantum-navy/80 hover:bg-quantum-navy text-quantum-white p-3 rounded-full
                       transition-all duration-300 backdrop-blur-sm
                       hover:scale-110 active:scale-95"
          >
            <ChevronUp size={32} />
          </button>
          <button
            onClick={() => handleScroll("next")}
            className="bg-quantum-navy/80 hover:bg-quantum-navy text-quantum-white p-3 rounded-full
                       transition-all duration-300 backdrop-blur-sm
                       hover:scale-110 active:scale-95"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
