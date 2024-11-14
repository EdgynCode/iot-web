import React from "react";

export const Content = ({ content }) => {
  return (
    <>
      <div className="bg-white flex gap-10 text-16 flex-col rounded-[40px] overflow-hidden px-[4%] py-[2%]">
        <div className="flex flex-col gap-1">
          <p className="text-black/40">Mục đích</p>
          <p>{content.purpose}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-black/40">Dụng cụ</p>
          <ol
            type="1"
            start={1}
            className="list-decimal flex flex-col gap-2 ml-[2%]"
          >
            {content.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-black/40">Tiến hành thí nghiệm</p>
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
        </div>
      </div>
    </>
  );
};
