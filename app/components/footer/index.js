import React from "react";

const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 left-[1.5vw] h-16 z-[200] flex items-center justify-center px-6 w-[97vw] "
      style={{
        borderTop: "2px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="text-white text-xs absolute right-0">
        © 2024 Event Horizon Tech. Building the future, one innovation at a
        time.
      </div>
    </footer>
  );
};

export default Footer;
