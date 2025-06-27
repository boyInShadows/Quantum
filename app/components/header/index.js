import React from "react";
import Image from "next/image";
import AnimatedLine from "./AnimatedLine";
import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-[300] backdrop-blur-md">
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
          <div className="flex flex-row items-center space-x-2">
            <p className="text-white font-earthOrbiter whitespace-nowrap">
              Follow event horizon tech
            </p>
            <AnimatedLine />
            {/* ICONS */}
            <div className="flex flex-row items-center space-x-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandInstagram
                  stroke={1.5}
                  color="white"
                  size={24}
                  className="transition-transform duration-150 hover:scale-125 hover:text-[#E1306C]"
                />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandWhatsapp
                  stroke={1.5}
                  color="white"
                  size={24}
                  className="transition-transform duration-150 hover:scale-125 hover:text-[#25D366]"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandLinkedin
                  stroke={1.5}
                  color="white"
                  size={24}
                  className="transition-transform duration-150 hover:scale-125 hover:text-[#0077B5]"
                />
              </a>
            </div>
            <button className="bg-[#18122B] text-white px-3 py-1 rounded-md text-xs font-normal whitespace-nowrap transition-colors duration-200 hover:bg-[#251a40] focus:outline-none focus:ring-2 focus:ring-white/20">
              lets chat
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
