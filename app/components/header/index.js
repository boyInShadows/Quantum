import React from "react";
import Image from "next/image";
import AnimatedLine from "./AnimatedLine";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[300] backdrop-blur-md">
      <div className="py-4 px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo/EHTLogo.svg"
              alt="EHT Logo"
              width={80}
              height={80}
              className="text-white"
            />
          </div>
          <div className="flex flex-row items-center space-x-1 w-full max-w-md">
            <p className="text-white font-earthOrbiter whitespace-nowrap">
              Follow event horizon tech
            </p>
            <AnimatedLine />
            {/* ICONS */}
            {/* <Instagram /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
