import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authAction";
import { clearMessage } from "../redux/slices/message";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      id: uuidv4(),
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      doB: values.doB.format("YYYY-MM-DD"),
      userName: values.userName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
    };
    dispatch(register(data))
      .unwrap()
      .then(() => {
        message.success("Đăng ký thành công!");
        navigate("/login");
        window.location.reload();
      })
      .catch(() => {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
        console.log("🚀 ~ onFinish ~ data:", data);
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
          Tạo tài khoản
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Điền thông tin đăng ký tài khoản
        </p>

        <Form
          name="register"
          onFinish={onFinish}
          disabled={loading}
          className="space-y-4"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Tên" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
          >
            <Input placeholder="Họ" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Giới tính" className="rounded-lg">
              <Option value="male">Nam</Option>
              <Option value="female">Nữ</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="doB"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker
              placeholder="Ngày sinh"
              format="YYYY-MM-DD"
              className="rounded-lg w-full"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input placeholder="Tên người dùng" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^0\d{9}$/,
                message:
                  "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0!",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg"
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-gray-500 mt-4">
          Đã có tài khoản?{" "}
          <a href="/login" className="font-semibold text-black">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
