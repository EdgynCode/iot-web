import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5064/api/Account/Login",
        {
          email: values.email,
          password: values.password,
        }
      );

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Show success message and navigate after login
      message.success("Login successful!");
      console.log("Login successful");
    } catch (error) {
      message.error("Invalid email or password");
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
        <h1 className="text-2xl font-semibold text-center mb-2">Welcome!</h1>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account
        </p>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
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
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
