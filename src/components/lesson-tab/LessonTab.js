import React from "react";
import { Content } from "./content/Content";

export const LessonTab = ({ lesson }) => {
  return (
    <div className="bg-grey flex flex-col gap-5 overflow-hidden px-[2%] ">
      <Content content={lesson.content} />
    </div>
  );
};
