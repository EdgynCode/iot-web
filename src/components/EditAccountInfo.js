import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Image,
  Form,
  Input,
  Button,
  Modal,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  getCurrentUser,
  updateUserInfo,
  sendLinkResetPassword,
} from "../redux/actions/authAction";

const { Title } = Typography;

const EditAccountInfo = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [originalEmail, setOriginalEmail] = useState(null);

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
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      setOriginalEmail(user.email);
    }
  }, [user, form]);

  const handleFinish = async (values) => {
    const requestBody = { ...values, id: user.id };

    // Include the email only if it has changed
    if (values.email === originalEmail) {
      delete requestBody.email;
    }

    dispatch(updateUserInfo(requestBody))
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin thành công!");
        navigate("/account-detail");
      })
      .catch((error) => {
        message.error("Cập nhật thông tin thất bại: " + error);
      });
  };

  const handleResetPassword = () => {
    Modal.confirm({
      title: "Xác nhận đặt lại mật khẩu",
      content:
        "Bạn có chắc chắn muốn đặt lại mật khẩu? Một liên kết sẽ được gửi đến email của bạn.",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        if (user && user.email) {
          const clientUri = "http://localhost:3000/reset-password";
          dispatch(sendLinkResetPassword({ email: user.email, clientUri }))
            .unwrap()
            .then(() => {
              message.success(
                "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn."
              );
            })
            .catch((error) => {
              message.error(
                "Đã xảy ra lỗi khi gửi liên kết đặt lại mật khẩu: " +
                  error.message
              );
            });
        } else {
          message.error(
            "Không thể đặt lại mật khẩu vì thông tin email không khả dụng."
          );
        }
      },
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
                label="Ngày sinh (yyyy-mm-dd)"
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
                        !dayjs(value, "YYYY-MM-DD", true).isValid()
                      ) {
                        return Promise.reject(
                          "Invalid date format, use YYYY-MM-DD"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="YYYY-MM-DD" />
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
            <Button
              className="bg-blue-500 text-white"
              onClick={handleResetPassword}
            >
              Đặt lại mật khẩu
            </Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};

export default EditAccountInfo;
