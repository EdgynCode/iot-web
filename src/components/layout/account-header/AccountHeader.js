import React from "react";
import styles from "./index.css";

const AccountHeader = () => {
  return (
    <header className="psc-navbar">
      <div className="content">
        <h6 className="school-name">
          TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH
        </h6>
        <div className="space"></div>
        <button className="country-flag">
          <span>
            <div>
              <img alt="Vietnamese" src="/images/Flag_of_Vietnam.svg" />
            </div>
          </span>
          <span></span>
        </button>
        <div className="notification">
          <button>
            <span>
              <span className="bell">
                <svg>
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <span className="number">6</span>
              </span>
            </span>
            <span></span>
          </button>
        </div>
        <div className="avatar">
          <button>
            <div>
              <svg>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AccountHeader;
