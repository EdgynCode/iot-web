import { Button } from "antd";
import React from "react";
import { Header } from "./header/Header";
import { Content } from "./content/Content";

export const LessonTab = ({ lesson }) => {
  return (
    <>
      <div className="flex justify-between gap-5 align-middle ">
        <div className="bg-grey flex flex-col w-2/3 gap-5 rounded-[40px] overflow-hidden px-[2%] py-[2%]">
          <Header lesson={lesson} />
          <Content content={lesson.content} />
        </div>
        <div className="bg-grey w-1/3">f</div>
      </div>
    </>
  );
};
