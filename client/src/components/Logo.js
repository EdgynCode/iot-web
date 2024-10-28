import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex w-[1280px] items-center justify-between pl-0 pr-[37px] py-0 relative">
      <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
        LOGO
      </div>

      <button className="relative w-[170px] h-[50px] bg-gray-500 rounded-[45px] hover:bg-gray-300">
        <FaRegUserCircle className="relative w-[47px] h-[47px] left-3 object-cover"/>
        <p className="absolute w-[140px] h-7 top-2.5 left-[40px] text-black text-xl text-center grid place-items-center">
          Account
        </p>
      </button>
    </div>
  );
};

export default Logo;
