import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AccountHeader from "./account-header/AccountHeader";

const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <>
      <div className="z-[-1] top-0 left-0 w-screen h-screen fixed bg-custom-gradient"></div>
      <div className="flex !font-inter">
        <Sidebar
          isExpanded={isSidebarExpanded}
          setIsExpanded={setIsSidebarExpanded}
        />
        <div
          className={`w-full p-6 transition-all duration-300 ${
            isSidebarExpanded ? "ml-[200px]" : "ml-20"
          }`}
        >
          <AccountHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
