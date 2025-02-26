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
      <Row className="flex breadcrumbtab-title justify-between align-middle pb-6 overflow-hidden">
        <Col>
          <Breadcrumb separator={<RightOutlined />} items={breadcrumbItems} />
          <hr />
        </Col>
      </Row>
      <Row>
        <Back />
      </Row>
    </>
  );
};
