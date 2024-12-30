import { StopOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

export const NotFound = () => {
  const { Text } = Typography;
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center p-[25px_24px] mt-6 font-mono rounded-[40px] overflow-hidden">
        <StopOutlined
          style={{ fontSize: "20px", color: "rgba(0, 0, 0, 0.45)" }}
        />
        <h1 className="text-red-500 text-[40px]">404</h1>
        <Text type="secondary">Không tìm thấy dữ liệu</Text>
      </div>
    </>
  );
};
