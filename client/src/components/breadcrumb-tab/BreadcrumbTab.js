import { LeftCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Row, Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

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
        <Col className="hover-effect" onClick={() => navigate(-1)}>
          <LeftCircleOutlined className="mr-2" />
          Quay về
        </Col>
      </Row>
    </>
  );
};
