import React from "react";
import { Col, Row, Typography, Image } from "antd";

const { Title, Text } = Typography;

const StudentInfo = () => {
  return (
    <Row
      justify="center"
      align="middle"
      className="w-[1230px] bg-[#EDEDEF] rounded-[50px] p-[46px_7px] overflow-hidden"
    >
      <Col span={24}>
        <Title level={4} className="text-center">
          Thông tin học sinh
        </Title>
      </Col>
      <Col span={6}>
        <Image src="" alt="" className="rounded-[50%]"></Image>
      </Col>
      <Col span={9}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Text strong>Họ và tên</Text>
          </Col>
          <Col span={24}>
            <Text>Nguyễn Hữu Tân</Text>
          </Col>
          <Col span={24}>
            <Text strong>Lớp</Text>
          </Col>
          <Col span={24}>
            <Text>10C13</Text>
          </Col>
          <Col span={24}>
            <Text strong>Email</Text>
          </Col>
          <Col span={24}>
            <Text>nguyenhuutan080603@gmail.com</Text>
          </Col>
        </Row>
      </Col>

      <Col span={9}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Text strong>Ngày sinh</Text>
          </Col>
          <Col span={24}>
            <Text>08/06/2003</Text>
          </Col>
          <Col span={24}>
            <Text strong>Số điện thoại</Text>
          </Col>
          <Col span={24}>
            <Text>0703792808</Text>
          </Col>
          <Col span={24}>
            <Text strong>Username</Text>
          </Col>
          <Col span={24}>
            <Text>tannh10c13</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StudentInfo;
