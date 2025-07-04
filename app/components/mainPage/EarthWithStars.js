// EarthWithStars: Renders the rotating Earth and animated city lights
import React from "react";
import Image from "next/image";
import Earth from "@/public/Images/orbit.png";

const EarthWithStars = () => (
  <div
    className="relative animate-spin"
    style={{
      animationDuration: "40s",
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
        <linearGradient id="star-gradient-1" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-2" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-3" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-4" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-5" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-6" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-7" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-8" x1="0" y1="0" x2="1" y2="1">
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
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      className="absolute z-30 star-wiggle"
      style={{ top: "25%", left: "35%", animationDelay: "0.15s" }}
    >
      <defs>
        <linearGradient id="star-gradient-9" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-10" x1="0" y1="0" x2="1" y2="1">
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
        <linearGradient id="star-gradient-12" x1="0" y1="0" x2="1" y2="1">
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
);

export default EarthWithStars;
