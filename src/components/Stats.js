import React from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";

const Stats = () => {
  return (
    <>
      <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-10.00px] font-medium text-[#818181] text-[22px] tracking-[0] leading-normal">
          Task done
        </div>

        <div className="items-start gap-[17px] inline-flex justify-center relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-10.00px] mb-8 font-medium text-black text-5xl tracking-[0] leading-normal">
            2,543
          </div>
          <MdOutlineArrowOutward className="relative w-6 h-6"/>
        </div>
      </div>

      <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-10.00px] font-medium text-[#818181] text-[22px] tracking-[0] leading-normal">
          Hours saved
        </div>
        
        <div className="items-start gap-[17px] inline-flex justify-center relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-10.00px] mb-8 font-medium text-black text-5xl tracking-[0] leading-normal">
            82%
          </div>
          <MdOutlineArrowOutward className="relative w-6 h-6"/>
        </div>
      </div>
    </>
  );
};

export default Stats;
