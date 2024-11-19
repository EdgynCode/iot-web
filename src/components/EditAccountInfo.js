import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, Image, Form, Input } from "antd";
import { getCurrentUser } from "../redux/slices/auth";
import dayjs from "dayjs";

const { Title } = Typography;

const EditAccountInfo = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        doB: user.doB
          ? new Date(user.doB).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : null,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, form]);

  const handleFinish = async (values) => {
    // try {
    //   await dispatch(updateUser(values)).unwrap(); // Assuming updateUser is a thunk
    //   message.success("User information updated successfully!");
    // } catch (error) {
    //   message.error("Failed to update user information!");
    // }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Row
      justify="center"
      align="middle"
      className="w-full bg-[#EDEDEF] rounded-[50px] p-[46px_7px] overflow-hidden"
    >
      <Col span={24}>
        <Title level={4} className="text-center">
          Chỉnh sửa thông tin tài khoản
        </Title>
      </Col>
      <Col span={6}>
        <Image
          src="/public/images/default.png"
          alt="Profile Picture"
          className="rounded-[50%]"
        />
      </Col>
      <Col span={9}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={user}
          className="w-80"
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please specify your gender" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>

      <Col span={9}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={user}
          className="w-80"
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Form.Item
                label="Date of Birth"
                name="doB"
                rules={[
                  {
                    required: true,
                    message: "Please enter your date of birth",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        value &&
                        !dayjs(value, "DD/MM/YYYY", true).isValid()
                      ) {
                        return Promise.reject(
                          "Invalid date format, use DD/MM/YYYY"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={24}>
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
            </Col>
            <Col span={24}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditAccountInfo;
