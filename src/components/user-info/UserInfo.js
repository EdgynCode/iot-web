import React, { useEffect } from "react";
import { Col, Row, Typography, Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/actions/userAction";
import { Field } from "./field/Field";

const { Title } = Typography;

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data || {});
  const loading = useSelector((state) => state.user.loading || false);
  const error = useSelector((state) => state.user.error || null);
  // Fetch the student data from Redux state
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  // Handle loading and error states
  if (loading) return <Spin size="large" />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // If student is not found, display an appropriate message
  if (!user) {
    return (
      <Row className="row tab-rounded bg-white !py-4 !items-center">
        <Col>
          <p>User not found. Please check the ID or go back to the list.</p>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="row tab-rounded bg-white !py-4 !items-start">
      <Col className="flex items-center p-[5px_24px] flex-col flex-[0_0_30%]">
        <Title level={5}>Thông tin học sinh</Title>
        <Image
          width={200}
          className="rounded-full"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </Col>
      <Col className="row flex items-start flex-wrap flex-[0_0_70%]">
        <Field name="Họ và Tên" value={user.fullName} />
        <Field name="Lớp" value={user.class} />
        <Field name="Giới tính" value={user.gender} />
        <Field name="Email" value={user.email} />
        <Field name="Số điện thoại" value={user.phoneNumber} />
      </Col>
    </Row>
  );
};

export default UserInfo;
