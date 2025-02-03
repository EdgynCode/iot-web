import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AccountHeader from "./account-header/AccountHeader";
import styles from "./index.css";
const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  useEffect(() => {
    console.log("🚀 ~ Layout ~ isSidebarExpanded:", isSidebarExpanded);
  }, [isSidebarExpanded]);
  // Đóng Sidebar khi nhấn vào lớp overlay
  const handleOverlayClick = () => {
    setIsSidebarExpanded(false);
  };
  return (
    <>
      <div className="screen">
        <div className="div-nav">
          <AccountHeader toggleSidebar={toggleSidebar} />
        </div>
        {/* Overlay */}
        {isSidebarExpanded && (
          <div className="overlay" onClick={handleOverlayClick}></div>
        )}
        <div className="div-nav">
          <Sidebar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
          />
        </div>
        <div className="content-right">
          <div>
            <div>
              <div>
                <div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
