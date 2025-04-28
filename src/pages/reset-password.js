import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearMessage } from ".././redux/slices/message";
import { resetPassword } from "../redux/actions/authAction";

const ResetPassword = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (formValue) => {
    const { password, confirmPassword } = formValue;

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      alert("Invalid reset link!");
      return;
    }

    setLoading(true);

    dispatch(resetPassword({ password, confirmPassword, token, email }))
      .unwrap()
      .then(() => {
        alert("Đặt lại mật khẩu thành công! Trở về trang đăng nhập...");
        navigate("/login");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src="/images/logo.png" alt="Logo" className="w-52" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-5">
          Đặt lại mật khẩu
        </h1>

        <Form
          name="reset-password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu mới"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
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
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
