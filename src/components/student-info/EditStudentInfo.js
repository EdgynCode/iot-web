import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Image,
  Spin,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllUsersByType } from "../../redux/actions/userAction";
import { updateUserInfo } from "../../redux/actions/authAction";

const { Title } = Typography;

const EditStudentInfo = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [originalEmail, setOriginalEmail] = useState(null);

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

  const handleFinish = async (values) => {
    const requestBody = { ...values, id: student.id };
    setOriginalEmail(student.email);
    // Include the email only if it has changed
    if (values.email === originalEmail) {
      delete requestBody.email;
    }

    dispatch(updateUserInfo(requestBody))
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin thành công!");
        navigate(-1);
      })
      .catch((error) => {
        message.error("Cập nhật thông tin thất bại: " + error);
      });
  };

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
        <Col span={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={student}
            className="w-full"
          >
            <Row gutter={[16, 16]}>
              <Col span={9}>
                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  rules={[
                    { required: true, message: "Please specify your gender" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Col span={18} className="items-center text-center mt-6">
              <Button
                type="primary"
                htmlType="submit"
                className="mr-4 bg-blue-500 text-white"
              >
                Lưu
              </Button>
            </Col>
          </Form>
        </Col>
      </Col>
    </Row>
  );
};

export default EditStudentInfo;
