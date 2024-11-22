import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Image,
  Form,
  Input,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";
import { getCurrentUser, updateUserInfo } from "../redux/actions/authAction";

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
        // fullName not updating with changes
        gender: user.gender,
        doB: user.doB
          ? new Date(user.doB).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : null,
        userName: user.userName,
        password: user.password, // can't get password because hashing
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, form]);

  const handleFinish = async (values) => {
    dispatch(
      updateUserInfo({
        ...values,
        id: user.id,
      })
    )
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin thành công!");
      })
      .catch((error) => {
        message.error("Cập nhật thông tin thất bại: " + error);
      });
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
      <Col span={18}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={user}
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
                label="Ngày sinh (dd/mm/yyyy)"
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
            <Button className="bg-blue-500 text-white">Đặt lại mật khẩu</Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};

export default EditAccountInfo;
