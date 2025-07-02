"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Animation
import gsap from "gsap";

// Components
import Header from "../header";
import Footer from "../footer";
import AnimatedTitle from "./AnimatedTitle";

// Icons
import {
  IconChevronUp,
  IconChevronDown,
  IconCircleFilled,
} from "@tabler/icons-react";

// Images
import Earth from "@/public/Images/orbit.png";
import CodeSvg from "@/public/images/code.svg";
import Img1 from "@/public/images/section2/1.jpg";
import Img2 from "@/public/images/section2/2.jpg";
import Img3 from "@/public/images/section2/3.jpg";
import Img4 from "@/public/images/section2/4.jpg";
import Img5 from "@/public/images/section2/5.jpg";

const sections = [
  {
    id: "section-1",
    color: "#2D9CDB", // quantum-blue
    gradient:
      "linear-gradient(90.4deg, rgba(0,0,0,1) 10%, rgba(183,72,248,1) 101%)",
    overlayGradient:
      "linear-gradient(-90.4deg, rgba(0,0,0,1) 10%, rgba(183,72,248,1) 101%)",
    title: "The Event Horizon: Build the Future",
    subtitle:
      "Event Horizon Tech is your gateway to turning bold ideas into scalable applications and startups. We provide the tools, frameworks, and expertise to help innovators cross the threshold from concept to reality",
    description:
      "Whether you're a solo developer or a growing team, our platform accelerates your journey into the future of technology.",
  },
  {
    id: "section-2",
    color: "#9B51E0", // quantum-purple
    gradient:
      "linear-gradient(86.4deg, rgba(0,0,0,1) 11.7%, rgba(94,85,247,1) 115.6%)",
    overlayGradient:
      "linear-gradient(-86.4deg, rgba(0,0,0,1) 11.7%, rgba(94,85,247,1) 115.6%)",
    title: "prjoect that define the futuer",
    subtitle:
      "From AI-driven applications to scalable SaaS platforms, Event Horizon Tech provides cutting-edge solutions tailored for tomorrow's startups.",
    description:
      "Explore our core features, case studies, and success stories to see how we help visionaries bring their ideas to life.",
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
  const textBlockRef = useRef(null);

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

  useEffect(() => {
    if (currentSection === 0 && textBlockRef.current) {
      gsap.set(textBlockRef.current.children, { y: 60, opacity: 0 });
      gsap.to(textBlockRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        stagger: 0.2,
      });
    }
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
      setIsAnimating(true);

      const currentTextRef = textRefs[currentSection];
      const nextTextRef = textRefs[nextSection];

      // 1. Set overlay to next section's gradient, off-screen right
      gsap.set(overlayRef.current, {
        x: "100%",
        display: "block",
        backgroundImage: sections[nextSection].overlayGradient,
      });

      // 2. Slide overlay in
      await gsap.to(overlayRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 3. Overlay slide in completed - NOW switch background opacity
      // 4. Switch background opacity DURING overlay slide-in (not after)

      // Use direct DOM manipulation instead of GSAP for opacity
      if (bgRefs[currentSection].current) {
        bgRefs[currentSection].current.style.opacity = "0";
      }
      if (bgRefs[nextSection].current) {
        bgRefs[nextSection].current.style.opacity = "1";
      }

      // 5. Start text animations

      // Animate current text out
      if (currentTextRef.current) {
        await animateTextOut(currentTextRef);
      }

      // Animate next text in
      if (nextTextRef.current) {
        await animateTextIn(nextTextRef);
      }

      // 6. Text animations completed

      // 7. Before overlay slide out

      // 8. Start overlay slide out
      await gsap.to(overlayRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      // 9. Overlay slide out completed

      // Reset overlay for next transition
      gsap.set(overlayRef.current, {
        display: "none",
        x: "100%",
      });

      // 10. Update current section
      setCurrentSection(nextSection);

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

      {/* Only render the current section's content */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[150] flex items-center text-white"
        style={{ willChange: "transform" }}
      >
        {currentSection === 0 && (
          // Section 1 JSX
          <div className="relative w-full h-full">
            <div
              className="
      absolute
      left-[15vw]
      top-1/2
      -translate-y-1/2
      flex flex-col items-center justify-between
      h-[85vh]
      z-10
    "
            >
              {["AHEAD", "beyond", "JOURNEY", "THE"].map((word, i) => {
                if (word === "beyond") {
                  return (
                    <>
                      <span
                        key={word}
                        className="text-[4rem] font-earthOrbiter my-0 ml-[-2rem] mt-[-10rem] mb-[-10rem]"
                        style={{
                          writingMode: "unset",
                          transform: "none",
                        }}
                      >
                        {`BEY`}
                        <span className="text-[#9217ae]">o</span>
                        {`ND`}
                      </span>
                      <div className="absolute bottom-[20vh] z-100">
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient
                              id="iconGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="10%" stopColor="rgba(0,0,0,1)" />
                              <stop
                                offset="101%"
                                stopColor="rgba(183,72,248,1)"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                        <IconCircleFilled
                          size={24}
                          style={{
                            fill: "url(#iconGradient)",
                          }}
                        />
                      </div>

                      {/* Center and Right Circles */}
                      <div className="absolute top-[20vh] left-[20vw] z-100">
                        <IconCircleFilled
                          size={24}
                          style={{ fill: "url(#iconGradient)", opacity: 0.6 }}
                        />
                      </div>

                      <div className="absolute top-[10vh] left-[60vw] z-100">
                        <IconCircleFilled
                          size={24}
                          style={{ fill: "url(#iconGradient)", opacity: 0.8 }}
                        />
                      </div>

                      <div className="absolute top-[70vh] left-[55vw] z-100">
                        <IconCircleFilled
                          size={24}
                          style={{ fill: "url(#iconGradient)", opacity: 0.4 }}
                        />
                      </div>

                      <div className="absolute top-[40vh] left-[65vw] z-100">
                        <IconCircleFilled
                          size={24}
                          style={{ fill: "url(#iconGradient)", opacity: 0.7 }}
                        />
                      </div>

                      <div className="absolute top-[60vh] left-[72vw] z-100">
                        <IconCircleFilled
                          size={24}
                          style={{ fill: "url(#iconGradient)", opacity: 0.5 }}
                        />
                      </div>
                    </>
                  );
                }
                return (
                  <span
                    key={word}
                    className="text-[3.5rem] opacity-50"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
            <div
              ref={textBlockRef}
              className="flex flex-col justify-between gap-y-6 absolute left-[24vw] top-[38vh] z-10"
            >
              <p className="max-w-3xl text-[1.5rem] font-bold">
                {sections[0].title}
              </p>
              <p className="max-w-3xl text-[1.25rem]">{sections[0].subtitle}</p>
              <p className="max-w-3xl text-[1.25rem]">
                {sections[0].description}
              </p>
            </div>
            {/* <div className="flex justify-center items-center"> */}
            {/* center */}
            <div className="absolute inset-0 flex left-[22.5vw] top-[5vw] pointer-events-none z-0">
              <div
                className="relative animate-spin"
                style={{
                  animationDuration: "20s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  width: "fit-content",
                  height: "fit-content",
                }}
              >
                {/* Earth */}
                <Image
                  src={Earth}
                  alt="Earth"
                  width={1300}
                  height={1300}
                  className="object-contain rounded-full"
                  priority
                />
                {/* SVG star sparkles as city lights */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "32%", left: "44%", animationDelay: "0s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-1"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-1)"
                    fillOpacity="0.8"
                  />
                </svg>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "60%", left: "55%", animationDelay: "0.3s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-2"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-2)"
                    fillOpacity="0.7"
                  />
                </svg>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "40%", left: "60%", animationDelay: "0.6s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-3"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-3)"
                    fillOpacity="0.9"
                  />
                </svg>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "70%", left: "30%", animationDelay: "0.9s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-4"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-4)"
                    fillOpacity="0.7"
                  />
                </svg>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "50%", left: "70%", animationDelay: "1.2s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-5"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-5)"
                    fillOpacity="0.9"
                  />
                </svg>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "20%", left: "60%", animationDelay: "1.5s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-6"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-6)"
                    fillOpacity="0.7"
                  />
                </svg>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "65%", left: "38%", animationDelay: "1.8s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-7"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-7)"
                    fillOpacity="0.8"
                  />
                </svg>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "55%", left: "48%", animationDelay: "2.1s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-8"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-8)"
                    fillOpacity="0.7"
                  />
                </svg>
                {/* Additional stars for doubling */}
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "25%", left: "35%", animationDelay: "0.15s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-9"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-9)"
                    fillOpacity="0.7"
                  />
                </svg>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "75%", left: "60%", animationDelay: "0.45s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-10"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-10)"
                    fillOpacity="0.8"
                  />
                </svg>

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute z-30 star-wiggle"
                  style={{ top: "80%", left: "50%", animationDelay: "1.05s" }}
                >
                  <defs>
                    <linearGradient
                      id="star-gradient-12"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="url(#star-gradient-12)"
                    fillOpacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <div>
              <Image
                src={CodeSvg}
                alt="Earth"
                width={450}
                height={450}
                className=" object-contain absolute top-[50vh] right-[2.5vw]  -translate-y-1/2"
                priority
              />
            </div>
            {/* </div> */}
          </div>
        )}
        {currentSection === 1 && (
          // Section 2 JSX
          <div>
            <div className="flex w-full h-full pl-[10rem] mb-[5rem]">
              {/* Left: 1/3 */}
              <div className="flex items-center justify-center basis-2/5 max-w-2/5 h-full">
                <div className="relative w-[350px] h-[350px] md:w-[420px] md:h-[420px]">
                  {/* Gradient border right */}
                  <div
                    className="absolute top-0 right-0 h-full w-[1px] z-20"
                    style={{
                      background:
                        "linear-gradient(180deg, #b748f8 0%, #5e55f7 50%, #5ee0fd 100%)",
                    }}
                  />

                  {/* Main (largest) image */}
                  <Image
                    src={Img4}
                    alt="Main"
                    className="absolute top-[-5%] left-[50%] -translate-x-1/2 w-[220px] h-[400px] rounded-2xl object-cover shadow-lg z-10"
                  />
                  {/* Top left small image */}
                  <Image
                    src={Img2}
                    alt="Top Left"
                    className="absolute top-[30%] left-[-15%] w-[130px] h-[130px] rounded-xl object-cover shadow-md"
                  />
                  {/* Bottom left image */}
                  <Image
                    src={Img3}
                    alt="Bottom Left"
                    className="absolute bottom-[-10%] left-[-5%] w-[150px] h-[150px] rounded-xl object-cover shadow-md"
                  />
                  {/* Bottom center small image */}
                  <Image
                    src={Img1}
                    alt="Bottom Center"
                    className="absolute bottom-[-10%] left-[40%] -translate-x-1/2 w-[60px] h-[60px] rounded-lg object-cover shadow"
                  />
                  {/* Bottom right image */}
                  <Image
                    src={Img5}
                    alt="Bottom Right"
                    className="absolute bottom-[0%] right-[5%] w-[190px] h-[190px] rounded-2xl object-cover shadow-lg z-20"
                  />
                </div>
              </div>
              {/* Right: 2/3 */}
              <div className="flex flex-col justify-center gap-y-6 basis-3/5 max-w-3/5 h-full ">
                <button
                  className="max-w-[20%] rounded-[1rem] font-earthOrbiter "
                  style={{
                    background:
                      "linear-gradient(90.4deg, rgba(94,85,247,1) 10%, rgba(183,72,248,1) 101%)",
                  }}
                >
                  tab me
                </button>
                <p className="max-w-[50%] text-h3 font-earthOrbiter font-bold">
                  {sections[1].title}
                </p>
                <p className="max-w-[80%] text-body-body">
                  {sections[1].subtitle}
                </p>
                <p className="max-w-[80%] text-body-body">
                  {sections[1].description}
                </p>
                <button
                  className="max-w-[20%] h-[3rem] rounded-[1.5rem]  mt-[5rem]"
                  style={{
                    background:
                      "linear-gradient(90.4deg, rgba(94,85,247,1) 10%, rgba(183,72,248,1) 101%)",
                  }}
                >
                  More Info
                </button>
              </div>
            </div>
            <div className="flex justify-end items-start gap-x-6 mb-[-10rem] mr-[-15rem]">
              <div
                className="relative w-[7rem] h-[5rem] rounded-[1rem] text-center flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #000000, #200687)",
                }}
              >
                <Image
                  src={Img1}
                  alt="1"
                  width={50}
                  height={50}
                  className="absolute left-[25%] top-[-35%] rounded-[50rem] w-[50px] h-[50px]"
                />
                <p className="text-body-xs">IDEA</p>
                <p className="font-earthOrbiter opacity-25">0.1</p>
              </div>
              <div
                className="relative w-[7rem] h-[5rem] rounded-[1rem] text-center flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #000000, #200687)",
                }}
              >
                <Image
                  src={Img1}
                  alt="1"
                  width={50}
                  height={50}
                  className="absolute left-[25%] top-[-35%] rounded-[50rem] w-[50px] h-[50px]"
                />
                <p className="text-body-xs">DEVELOP</p>
                <p className="font-earthOrbiter opacity-25">0.2</p>
              </div>
              <div
                className="relative w-[7rem] h-[5rem] rounded-[1rem] text-center flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #000000, #200687)",
                }}
              >
                <Image
                  src={Img1}
                  alt="1"
                  width={50}
                  height={50}
                  className="absolute left-[25%] top-[-35%] rounded-[50rem] w-[50px] h-[50px]"
                />
                <p className="text-body-xs">LUNCH</p>
                <p className="font-earthOrbiter opacity-25">0.3</p>
              </div>
              <div
                className="relative w-[7rem] h-[5rem] rounded-[1rem] text-center flex flex-col items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #000000, #200687)",
                }}
              >
                <Image
                  src={Img1}
                  alt="1"
                  width={50}
                  height={50}
                  className="absolute left-[25%] top-[-35%] rounded-[50rem] w-[50px] h-[50px]"
                />
                <p className="text-body-xs">MAINTENANCE</p>
                <p className="font-earthOrbiter opacity-25">0.4</p>
              </div>
            </div>
          </div>
        )}
        {currentSection === 2 && (
          // Section 3 JSX
          <div>
            <h1
              className="text-display-xl font-earthOrbiter mb-6 leading-tight"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {sections[2].title}
            </h1>
            {sections[2].subtitle && (
              <h2
                className="text-h3 font-semibold mb-6"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                {sections[2].subtitle}
              </h2>
            )}
            <p
              className="text-lead leading-relaxed max-w-3xl mx-auto"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {sections[2].description}
            </p>
          </div>
        )}
        {currentSection === 3 && (
          // Section 4 JSX
          <div>
            <h1
              className="text-display-xl font-earthOrbiter mb-6 leading-tight"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {sections[3].title}
            </h1>
            {sections[3].subtitle && (
              <h2
                className="text-h3 font-semibold mb-6"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                {sections[3].subtitle}
              </h2>
            )}
            <p
              className="text-lead leading-relaxed max-w-3xl mx-auto"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {sections[3].description}
            </p>
          </div>
        )}
      </div>
      {/* End of section rendering */}

      {/* Navigation controls */}
      <div className="fixed z-[200] right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="flex flex-col gap-3 pointer-events-auto">
          <button
            onClick={() => handleNavigation(-1)}
            disabled={isAnimating}
            className=" backdrop-blur-sm text-white p-4 rounded-full
                       transition-all duration-300 hover:scale-110 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronUp size={44} />
          </button>
          <button
            onClick={() => handleNavigation(1)}
            disabled={isAnimating}
            className=" backdrop-blur-sm text-white p-4 rounded-full
                       transition-all duration-300 hover:scale-110 active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronDown size={44} />
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
      <Footer />
    </div>
  );
};

export default MainPage;
