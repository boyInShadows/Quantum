"use client";

import { forwardRef } from "react";

const TextLayer = forwardRef(({ title, subtitle, description }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full z-[150] flex items-center justify-center text-white pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            {subtitle}
          </h2>
        )}
        <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
});

TextLayer.displayName = "TextLayer";

export default TextLayer;
