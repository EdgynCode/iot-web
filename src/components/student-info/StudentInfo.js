import React from "react";
import { Col, Row, Typography, Image } from "antd";
import { useParams } from "react-router-dom";
import { studentData } from "../../datas/student.d";
import { Field } from "./field/Field";

const { Title, Text } = Typography;

const StudentInfo = () => {
  const { id } = useParams();
  const student = studentData.find((item) => item.id === id);
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
        <Field name="Họ và Tên" value={student.fullname} />
        <Field name="Lớp" value={student.class} />
        <Field name="Giới tính" value={student.gender} />
        <Field name="Email" value={student.email} />
        <Field name="Số điện thoại" value={student.phonenumber} />
      </Col>
    </Row>
  );
};

export default StudentInfo;
