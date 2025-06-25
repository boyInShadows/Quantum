"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const AnimatedLine = () => {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    tl.fromTo(
      lineRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "120px",
        height: "2px",
        marginLeft: "0.75rem",
        display: "inline-block",
        verticalAlign: "middle",
        background: "transparent",
      }}
    >
      <div
        ref={lineRef}
        style={{
          width: "0%",
          height: "1px",
          background: "#fff",
        }}
      />
    </div>
  );
};

export default AnimatedLine;
