import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Performance",
    desc: "Blazing-fast load times and smooth interactions for every user, every device.",
  },
  {
    title: "Creativity",
    desc: "Immersive, memorable web experiences that blend art and technology.",
  },
  {
    title: "Modern Dev",
    desc: "Built with the latest frameworks, scalable design systems, and best practices.",
  },
  {
    title: "Insights",
    desc: "Data-driven design and strategy to ensure your site grows with you.",
  },
];

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex flex-col items-center justify-center bg-quantum-white px-4"
    >
      <h2 className="text-quantum-navy text-4xl font-bold text-center mb-10">
        Our Core Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {features.map((f, i) => (
          <div
            key={f.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-quantum-blue/10 border border-quantum-blue rounded-xl p-8 shadow-lg flex flex-col items-center text-center"
          >
            <h3 className="text-2xl font-semibold text-quantum-blue mb-2">
              {f.title}
            </h3>
            <p className="text-quantum-navy text-lg">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
