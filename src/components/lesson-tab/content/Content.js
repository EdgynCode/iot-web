import { Collapse } from "antd";
import React, { Children } from "react";
import style from "./index.css";
export const Content = ({ content }) => {
  const items = [
    {
      key: 1,
      label: "Mục đích",
      children: content.purpose,
    },
    {
      key: 2,
      label: "Dụng cụ",
      children: (
        <ol
          type="1"
          start={1}
          className="list-decimal flex flex-col gap-2 ml-[2%]"
        >
          {content.equipment.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ),
    },
    {
      key: 3,
      label: "Các bước thí nghiệm ",
      children: (
        <div className="flex flex-col gap-3">
          <img
            src={content.guide.img}
            alt="guide"
            className="w-full rounded-[20px] max-h-[300px] object-contain"
          />
          <ol
            type="1"
            start={1}
            className="list-decimal flex flex-col gap-2 ml-[2%]"
          >
            {content.guide.steps.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <p className="">Lưu ý: {content.guide.note}</p>
        </div>
      ),
    },
  ];
  return (
    <Collapse
      className="lesson-collapse"
      items={items}
      defaultActiveKey={["1", "2", "3"]}
    />
  );
};
