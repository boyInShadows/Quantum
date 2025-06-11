import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    title: "Discovery",
    desc: "Understanding your vision and goals through deep collaboration.",
    color: "bg-quantum-blue",
  },
  {
    title: "Strategy",
    desc: "Crafting a unique digital strategy tailored to your audience.",
    color: "bg-quantum-purple",
  },
  {
    title: "Design",
    desc: "Creating immersive, memorable experiences that captivate.",
    color: "bg-quantum-pink",
  },
  {
    title: "Development",
    desc: "Building with cutting-edge tech for performance and scale.",
    color: "bg-quantum-green",
  },
];

const CaseStudy = () => {
  const sectionRef = useRef(null);
  const stagesRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stagesRef.current) return;

    // Desktop-only pinned section
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
          },
        });

        stagesRef.current.forEach((stage, index) => {
          if (!stage) return;
          tl.fromTo(
            stage,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            },
            index * 0.5
          );
        });
      },
      // Mobile fallback - simple fade in
      "(max-width: 767px)": () => {
        gsap.from(stagesRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
        });
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-quantum-navy">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-quantum-white text-center mb-16">
          Our Process
        </h2>
        <div className="space-y-32">
          {stages.map((stage, index) => (
            <div
              key={stage.title}
              ref={(el) => (stagesRef.current[index] = el)}
              className={`${stage.color} rounded-2xl p-8 md:p-12 transform transition-all duration-500`}
            >
              <h3 className="text-3xl font-bold text-quantum-white mb-4">
                {stage.title}
              </h3>
              <p className="text-quantum-white/90 text-xl">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
