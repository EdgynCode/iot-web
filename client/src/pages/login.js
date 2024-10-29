import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUsername }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3050/api/login", {
        email: values.email,
        password: values.password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Show success message and navigate after login
      message.success("Login successful!");
      console.log("Login successful");
      const { userName } = response.data;
      setUsername(userName);
      navigate("/home");
    } catch (error) {
      message.error("Sai tên đăng nhập hoặc mật khẩu");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="Logo" className="w-16" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-2">Chào mừng!</h1>
        <p className="text-center text-gray-500 mb-6">
          Đăng nhập vào tài khoản của bạn
        </p>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Tên đăng nhập là bắt buộc!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mặt khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
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
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-gray-500 mt-4">
          Chưa có tài khoản?{" "}
          <a href="#" className="font-semibold text-black">
            Đăng kí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
