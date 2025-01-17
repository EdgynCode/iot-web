import { RightOutlined } from "@ant-design/icons";
import { Col, Row, Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../back/Back";

export const BreadcrumbTab = ({ items }) => {
  const navigate = useNavigate();
  const breadcrumbItems = items.map((item, index) => ({
    title: item,
    key: index,
  }));
  return (
    <>
      <Row className="flex justify-between align-middle p-[25px_24px] mt-6 bg-white rounded-[40px] overflow-hidden">
        <Col>
          <Breadcrumb separator={<RightOutlined />} items={breadcrumbItems} />
        </Col>
      </Row>
      <Row className="my-5 mx-8">
        <Back />
      </Row>
    </>
  );
};
