import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { sendLinkResetPassword } from "../redux/actions/authAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    const clientUri = "http://frontend:3000/reset-password";
    dispatch(sendLinkResetPassword({ email: values.email, clientUri }))
      .unwrap()
      .then(() => {
        notification.success({
          message: "Thành công",
          description:
            "Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn.",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Thất bại",
          description:
            error?.message ||
            "Đã xảy ra lỗi khi gửi liên kết đặt lại mật khẩu. Vui lòng thử lại.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="Logo" className="w-16" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-2">
          Quên mật khẩu?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Nhập email của bạn để tiếp tục
        </p>

        <Form name="forgotPassword" onFinish={onFinish} className="space-y-4">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg"
              loading={loading}
            >
              Gửi liên kết
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-gray-500 mt-4">
          Nhớ mật khẩu?{" "}
          <a href="/login" className="font-semibold text-black">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
