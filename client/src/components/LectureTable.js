import React from "react";
import { Button, Col, Row, Input, Table } from "antd";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    topic: "Mô tả chuyển động",
    lesson: "4",
    title: "Chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
  {
    key: "2",
    topic: "Mô tả chuyển động",
    lesson: "5",
    title: "Chuyển động tổng hợp",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
  {
    key: "3",
    topic: "Mô tả chuyển động",
    lesson: "6",
    title: "Thực hành đo tốc độ của vật chuyển động thẳng",
    video: "link-to-video",
    pdf: "link-to-pdf",
  },
];

const columns = [
  {
    title: "Chương",
    dataIndex: "topic",
    key: "topic",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Bài",
    dataIndex: "lesson",
    key: "lesson",
  },
  {
    title: "Tựa đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Video",
    dataIndex: "video",
    key: "video",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "File PDF",
    dataIndex: "pdf",
    key: "pdf",
    render: (text) => <a>{text}</a>,
  },
];

const LectureTable = () => {
  return (
    <div className="w-[1230px] p-5 mt-6 bg-[#EDEDEF] rounded-2xl">
      <Row justify="space-between" align="middle" className="mb-5">
        <Col>
          <div>
            <h2 className="m-0">Tất cả bài giảng</h2>
          </div>
        </Col>

        <Col>
          <Input
            placeholder="Tìm kiếm nhanh"
            prefix={<SearchOutlined />}
            className="w-[395px] h-[31px] rounded-lg"
          />
        </Col>

        <Col>
          <Button icon={<ExportOutlined />} shape="round">
            Export
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default LectureTable;
