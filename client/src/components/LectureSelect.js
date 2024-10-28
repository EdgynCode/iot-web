import React from "react";
import { Button, Col, Dropdown, Row, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const LectureSelect = () => {
  return (
    <div className="w-[1230px] p-[20px_0] mt-6 bg-[#EDEDEF] rounded-2xl overflow-hidden">
      <Row
        justify="space-between"
        align="middle"
        className="p-[0_24px] bg-[#EDEDEF]"
      >
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text">
              Bài giảng <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Button.Group>
            <Button>New</Button>
            <Button>Import</Button>
            <Button>Export</Button>
          </Button.Group>
        </Col>
      </Row>
      <Row align="middle" className="p-[10px_24px]">
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text" icon={<DownOutlined />}>
              SGK Chân trời sáng tạo
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text" icon={<DownOutlined />}>
              Lớp 10
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text" icon={<DownOutlined />}>
              Chương 2: Mô tả chuyển động
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Input placeholder="Search" prefix={<SearchOutlined />} />
        </Col>
      </Row>
    </div>
  );
};

export default LectureSelect;
