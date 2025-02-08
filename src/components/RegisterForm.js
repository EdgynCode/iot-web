import React from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authAction";

const { Option } = Select;

const RegisterForm = ({ loading, setLoading, setOpen }) => {
  const dispatch = useDispatch();

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
      discriminator: values.discriminator,
    };
    dispatch(register(data))
      .unwrap()
      .then(() => {
        message.success("Đăng ký thành công!");
        setOpen(false);
      })
      .catch(() => {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      disabled={loading}
      className="space-y-4"
    >
      <Form.Item
        name="discriminator"
        rules={[{ required: true, message: "Vui lòng chọn loại người dùng!" }]}
      >
        <Select placeholder="Loại người dùng" className="rounded-lg">
          <Option value="Teacher">Người dạy</Option>
          <Option value="Learner">Người học</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
      >
        <Input placeholder="Họ" className="rounded-lg" />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input placeholder="Tên" className="rounded-lg" />
      </Form.Item>

      <Form.Item
        name="gender"
        rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
      >
        <Select placeholder="Giới tính" className="rounded-lg">
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
          <Option value="Khác">Khác</Option>
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
        rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
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
            message: "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0!",
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
  );
};

export default RegisterForm;
