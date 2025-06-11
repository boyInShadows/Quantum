import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Quantum E-commerce",
    desc: "Next-gen shopping experience with real-time inventory and AR preview.",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "AI Dashboard",
    desc: "Real-time analytics and machine learning insights for business growth.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Smart Home Hub",
    desc: "Seamless IoT integration with voice control and energy optimization.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60",
  },
];

const Portfolio = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !cardsRef.current || !imagesRef.current) return;

    // Animate cards
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Animate images with zoom effect
    imagesRef.current.forEach((image, index) => {
      if (!image) return;

      gsap.fromTo(
        image,
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            once: true,
          },
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.2,
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-quantum-white py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-quantum-navy text-center mb-16">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-2xl bg-quantum-navy/5 hover:bg-quantum-navy/10 transition-colors duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  ref={(el) => (imagesRef.current[index] = el)}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-quantum-navy mb-2">
                  {project.title}
                </h3>
                <p className="text-quantum-navy/80">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
