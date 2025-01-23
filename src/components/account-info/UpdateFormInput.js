import { DatePicker, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect } from "react";
import "./index.css";
import dayjs from "dayjs";
import { sendLinkResetPassword } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
const UpdateFormInput = ({ data, onFinish }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const localStorageKey = "formData";
  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      form.setFieldsValue(
        parsedData.reduce((acc, { key, value }) => {
          acc[key] = key === "Ngày sinh" && value ? dayjs(value) : value;
          return acc;
        }, {})
      );
    } else {
      form.setFieldsValue(
        data.reduce((acc, { key, value }) => {
          acc[key] = key === "Ngày sinh" && value ? dayjs(value) : value;
          return acc;
        }, {})
      );
    }
  }, [data, form]);
  const handleValuesChange = (changedValues, allValues) => {
    const updatedData = Object.entries(allValues).map(([key, value]) => ({
      key,
      value: key === "Ngày sinh" ? value?.toISOString() : value,
    }));
    localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
  };
  const handleResetPassword = () => {
    Modal.confirm({
      title: "Xác nhận đặt lại mật khẩu",
      content:
        "Bạn có chắc chắn muốn đặt lại mật khẩu? Một liên kết sẽ được gửi đến email của bạn.",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        if (data && data.email) {
          const clientUri = "http://localhost:3000/reset-password";
          dispatch(sendLinkResetPassword({ email: data.email, clientUri }))
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
  return (
    <Form
      layout="horizontal"
      form={form}
      initialValues={data.reduce((acc, { key, value }) => {
        acc[key] =
          key === "Ngày sinh" && value
            ? dayjs(value) // Convert ISO string to dayjs object
            : value;
        return acc;
      }, {})}
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
      className="update-form"
    >
      <div className="container flex flex-col">
        {data.map(({ key, value }) => (
          <Form.Item
            key={key}
            label={key}
            name={key}
            rules={[
              { required: true, message: `${key} không được để trống!` },
              ...(key === "Email"
                ? [
                    {
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                  ]
                : []),
              ...(key === "Số điện thoại"
                ? [
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]
                : []),
            ]}
          >
            {key === "Giới tính" ? (
              <Select>
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
              </Select>
            ) : key === "Ngày sinh" ? (
              <DatePicker format={"DD-MM-YYYY"} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
      </div>
      <Form.Item className="buttons-form-item">
        <div className="flex justify-between w-full">
          <button className="buttonCustom !w-1/2" htmltype="submit">
            Lưu
          </button>
          <button
            className="buttonCustom !w-1/2 !m-0"
            onClick={handleResetPassword}
            type="button"
          >
            Đổi mật khẩu
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdateFormInput;
