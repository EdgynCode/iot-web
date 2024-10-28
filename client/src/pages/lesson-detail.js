import React from "react";
import Layout from "../components/Layout";
import { Breadcrumb, Button, Col, Row } from "antd";
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import LectureDetail from "../components/LectureDetail";

const LessonDetail = () => {
  return (
    <Layout>
      <div className="w-[1230px] p-5 mt-6 bg-[#EDEDEF] rounded-3xl overflow-hidden">
        <Row
          justify="space-between"
          align="middle"
          className="bg-[#F8F8F8] p-[29px_11px_29px_6px]"
        >
          <Col>
            <Breadcrumb separator={<RightOutlined />}>
              <Breadcrumb.Item>Bài giảng</Breadcrumb.Item>
              <Breadcrumb.Item>Chân trời sáng tạo</Breadcrumb.Item>
              <Breadcrumb.Item>Lớp 10</Breadcrumb.Item>
              <Breadcrumb.Item>Chương 2: Mô tả chuyển động</Breadcrumb.Item>
              <Breadcrumb.Item>Bài 6</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col>
            <Button shape="round" className="border-black text-black">
              Assign
            </Button>
          </Col>
        </Row>
      </div>

      <Row align="middle" gutter={10} className="mt-4">
        <Col>
          <ArrowLeftOutlined className="text-[24px]" />
        </Col>
        <Col>
          <p className="m-0">Quay về danh sách chung</p>
        </Col>
      </Row>
      <LectureDetail />
    </Layout>
  );
};

export default LessonDetail;
