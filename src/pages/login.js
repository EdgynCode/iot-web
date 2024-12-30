import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../redux/slices/message";
import { login } from "../redux/actions/authAction";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (formValue) => {
    const { userName, password } = formValue;
    setLoading(true);

    dispatch(login({ userName, password }))
      .unwrap()
      .then(() => {
        message.success("Đăng nhập thành công!");
        const user = JSON.parse(localStorage.getItem("user")) || null;
        const decode = user ? jwtDecode(user?.jwtAccessToken) : null;
        const role = decode ? decode.role : null;
        navigate(`/account-detail`);
        window.location.reload();
      })
      .catch(() => {
        message.error("Đăng nhập thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
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
            name="userName"
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
          <a href="/register" className="font-semibold text-black">
            Đăng kí
          </a>
        </div>
        <div className="text-center text-gray-500 mt-4">
          <a href="/forgot-password">Quên mật khẩu</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
