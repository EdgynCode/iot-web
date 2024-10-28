import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";

const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-b from-white to-gray-100">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarExpanded ? "ml-44" : "ml-20"
        }`}
      >
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default Layout;
