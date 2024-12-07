import React, { useEffect } from "react";
import { Col, Row, Typography, Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllUsersByType } from "../../redux/actions/userAction";
import { Field } from "./field/Field";

const { Title } = Typography;

const StudentInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch the student data from Redux state
  const studentsState = useSelector((state) => state.students || {});
  const { data: students = [], loading, error } = studentsState;

  // Find the specific student by ID
  const student = students.find((item) => `${item.id}` === `${id}`);

  // Fetch student data if not already available
  useEffect(() => {
    if (!students.length) {
      dispatch(listAllUsersByType("NguoiHoc"));
    }
  }, [dispatch, students.length]);

  // Handle loading and error states
  if (loading) return <Spin size="large" />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // If student is not found, display an appropriate message
  if (!student) {
    return (
      <Row className="row tab-rounded bg-white !py-4 !items-center">
        <Col>
          <p>Student not found. Please check the ID or go back to the list.</p>
        </Col>
      </Row>
    );
  }

  console.log("🚀 ~ StudentInfo ~ student:", student);
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
        <Field name="Họ và Tên" value={student.fullName} />
        <Field name="Lớp" value={student.class} />
        <Field name="Giới tính" value={student.gender} />
        <Field name="Email" value={student.email} />
        <Field name="Số điện thoại" value={student.phoneNumber} />
      </Col>
    </Row>
  );
};

export default StudentInfo;
