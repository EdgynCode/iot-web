import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AccountHeader from "./account-header/AccountHeader";
import styles from "./index.css";
const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <>
      <div className="screen">
        <div className="div-nav">
          <AccountHeader />
        </div>
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
