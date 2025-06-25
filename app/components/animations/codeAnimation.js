"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lottie/code.json";

export default function CodeAnimation() {
  return (
    <div className="w-full h-[400px]">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
