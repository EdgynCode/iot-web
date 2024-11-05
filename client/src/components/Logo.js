import { Button } from "antd";
import React from "react";

const Logo = () => {
  return (
    <div className="flex relative w-full items-center justify-end bg-transparent z-10">
      {/* <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
        LOGO
      </div> */}

      <button
        className="bg-[url('https://th.bing.com/th/id/OIP._c2TmodteCDkSQPLea2nsgHaJj?w=208&h=268&c=7&r=0&o=5&dpr=1.3&pid=1.7')] 
                w-[40px] h-[40px] bg-cover bg-center rounded-full"
      ></button>
    </div>
  );
};

export default Logo;
