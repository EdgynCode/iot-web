import React from "react";

export const Field = ({ name, value }) => {
  return (
    <div className="flex flex-col justify-start mb-4 flex-[0_0_50%] ">
      <p className="text-[14px] font-light">{name}</p>
      <p className="text-16 font-normal">{value}</p>
    </div>
  );
};
