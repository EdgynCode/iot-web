import { LeftCircleOutlined } from "@ant-design/icons";
import { Col } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Back = () => {
  const navigate = useNavigate();
  return (
    <Col
      className="hover-effect bg-[#124874] text-white w-28 p-2 rounded-2xl mt-[-1.75rem] mb-5 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <LeftCircleOutlined className="mr-3" />
      Quay về
    </Col>
  );
};
