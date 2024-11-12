import React from "react";
import { Button, Col, Row, Input, Table } from "antd";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";

const dataSource = [
  {
    id: "47011041089",
    fullname: "Võ Thị Thu Hòa",
    class: "10C13",
    email: "thuhoa08102003@gmail.com",
    phonenumber: "0928147832",
    role: "Lớp trưởng",
  },
  {
    id: "47011041187",
    fullname: "Nguyễn Hữu Tân",
    class: "10C13",
    email: "nguyenhuutan080603@gmail.com",
    phonenumber: "0703792808",
    role: "",
  },
];

const columns = [
  {
    title: "Mã số",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Họ tên",
    dataIndex: "fullname",
    key: "fullname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Lớp",
    dataIndex: "class",
    key: "class",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phonenumber",
    key: "phonenumber",
  },
  {
    title: "Chức vụ",
    dataIndex: "role",
    key: "role",
  },
];

const StudentTable = () => {
  return (
    <div className="w-[1230px] p-5 mt-6 bg-[#EDEDEF] rounded-2xl">
      <Row justify="space-between" align="middle" className="mb-5">
        <Col>
          <div>
            <h2 className="m-0">Danh sách học sinh</h2>
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

export default StudentTable;
