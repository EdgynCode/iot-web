import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Typography, Image } from "antd";
import { getCurrentUser } from "../redux/slices/auth";

const { Title, Text } = Typography;

const AccountInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading state until user data is fetched
  }

  return (
    <Row
      justify="center"
      align="middle"
      className="w-[1230px] bg-[#EDEDEF] rounded-[50px] p-[46px_7px] overflow-hidden"
    >
      <Col span={24}>
        <Title level={4} className="text-center">
          Thông tin tài khoản
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
            <Text>{user.fullName || "N/A"}</Text>
          </Col>
          <Col span={24}>
            <Text strong>Lớp</Text>
          </Col>
          <Col span={24}>
            <Text>{user.moTa || "N/A"}</Text>
          </Col>
          <Col span={24}>
            <Text strong>Email</Text>
          </Col>
          <Col span={24}>
            <Text>{user.email || "N/A"}</Text>
          </Col>
        </Row>
      </Col>

      <Col span={9}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Text strong>Ngày sinh</Text>
          </Col>
          <Col span={24}>
            <Text>{user.doB || "N/A"}</Text>
          </Col>
          <Col span={24}>
            <Text strong>Số điện thoại</Text>
          </Col>
          <Col span={24}>
            <Text>
              {user.phoneNumber || "N/A"}{" "}
              {user.phoneNumberConfirmed ? "(Đã xác thực)" : "(Chưa xác thực)"}
            </Text>
          </Col>
          <Col span={24}>
            <Text strong>Username</Text>
          </Col>
          <Col span={24}>
            <Text>{user.userName || "N/A"}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AccountInfo;
