import { LeftCircleOutlined } from "@ant-design/icons";
import { Col } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Back = () => {
  const navigate = useNavigate();
  return (
    <Col
      className="hover-effect text-[#124874] p-4 -my-7 cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <LeftCircleOutlined className="mr-2" />
      Quay về
    </Col>
  );
};
