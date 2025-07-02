import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedSectionWords = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current.children, { y: 40, opacity: 0 });
      gsap.to(containerRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-between gap-y-[5rem] h-[85vh] z-10"
    >
      <span
        className="text-[3.5rem] opacity-50"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        AHEAD
      </span>
      <span
        className="text-[4rem] font-earthOrbiter my-0 ml-[-2rem]"
        style={{ writingMode: "unset", transform: "none" }}
      >
        {`BEY`}
        <span className="text-[#9217ae]">o</span>
        {`ND`}
      </span>
      <span
        className="text-[3.5rem] opacity-50"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        JOURNEY
      </span>
      <span
        className="text-[3.5rem] opacity-50"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        THE
      </span>
    </div>
  );
};

export default AnimatedSectionWords;
