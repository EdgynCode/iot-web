import React from "react";
import { Button, Col, Row, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

const LectureDetail = () => {
  return (
    <Row gutter={21} justify="center" align="top" className="w-[1230px]">
      <Col className="flex-[0_0_auto] bg-[#EDEDEF] rounded-[50px] overflow-hidden p-[20px_0_20px_7px]">
        <Row justify="space-between" align="middle" className="p-[0_50px_0_0]">
          <Col className="p-[20px_3px_20px_42px]">
            <Row gutter={10} align="middle">
              <Col>
                <Title level={4} className="m-0">
                  Chi tiết
                </Title>
              </Col>
              <Col>
                <Button
                  type="text"
                  className="bg-[#5D42FF14] rounded-[10px] p-[6px_25px]"
                >
                  <Text className="text-[#9747FF] m-0">Bài thực hành</Text>
                </Button>
              </Col>
            </Row>
            <Paragraph className="text-[#959597] m-0 font-semibold text-[20px]">
              Bài 6: Thực hành đo tốc độ của vật chuyển động thẳng
            </Paragraph>
          </Col>
        </Row>
        <Row justify="center" className="p-[0_24px]">
          <Col className="bg-[#F8F8FB] rounded-[50px] p-[16px_33px_36px] w-[768px]"></Col>
        </Row>
      </Col>
      <Col className="flex-[0_0_auto] bg-[#EDEDEF] rounded-[50px] overflow-hidden p-[20px_0_20px_7px]">
        <Row justify="space-between" align="middle" className="p-[0_50px_0_0]">
          <Col className="p-[20px_3px_20px_42px]">
            <Title level={4} className="m-0">
              Bài tập
            </Title>
          </Col>
        </Row>
        <Row justify="center" className="p-[0_21px]">
          <Col className="bg-[#F8F8FB] rounded-[50px] p-[16px_33px_36px] w-full"></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LectureDetail;
