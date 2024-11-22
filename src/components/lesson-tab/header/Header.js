import { Button } from "antd";
import React from "react";

export const Header = ({ lesson }) => {
  return (
    <>
      <div className="flex flex-col gap-2 px-[3%]">
        <div className="flex items-center gap-3">
          <Button type="text" className="text-black bg-black/10">
            # Bài thực hành
          </Button>
        </div>
        <p className="text-20 text-[#959597] font-semibold font-inter">
          Bài {lesson.lesson}: {lesson.title}
        </p>
      </div>
    </>
  );
};
