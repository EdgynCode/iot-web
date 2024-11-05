import React from "react";
import StudentInfo from "../components/StudentInfo";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

const StudentDetail = () => {
  return (
    <>
      <div className="relative w-[1230px] p-5 rounded-[40px] overflow-hidden">
        <div className="absolute w-15px h-[610px] top-[151px] left-[1215px]">
          <div className="absolute w-1 h-[194px] bg-[#BBBCC580] rounded-[10px] top-[2px] left-1" />
        </div>
        <Row
          align="middle"
          justify="space-between"
          className="h-14 p-[29px_11px_29px_6px]"
        >
          <Col>
            <Row align="middle" gutter={10}>
              <Col>
                <LeftOutlined className="text-2xl" />
              </Col>
              <Col>
                <p className="m-0">Quay về danh sách chung</p>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row gutter={19}>
              <Col>
                <Button shape="round" className="border-black text-black">
                  Chỉnh sửa thông tin
                </Button>
              </Col>
              <Col>
                <Button shape="round" className="border-black text-black">
                  Gửi tin nhắn
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <StudentInfo />
    </>
  );
};

export default StudentDetail;
