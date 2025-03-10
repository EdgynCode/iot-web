import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { sendLinkResetPassword } from "../../redux/actions/authAction";
import styles from "./index.css";

const UpdateFormInput = ({ data, onFinish }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  // Tạo initialValues cho form từ props `data`
  const getInitialValues = () =>
    data.reduce((acc, { key, value }) => {
      acc[key] = key === "Ngày sinh" && value ? dayjs(value) : value;
      return acc;
    }, {});

  // Set giá trị ban đầu khi `data` thay đổi
  useEffect(() => {
    form.setFieldsValue(getInitialValues());
  }, [data, form]);

  // Xử lý đặt lại mật khẩu
  const handleResetPassword = () => {
    const emailObject = data.find((item) => item.key === "Email");
    const email = emailObject ? emailObject.value : null;
    if (email) {
      const clientUri = "http://localhost:3000/reset-password";
      dispatch(sendLinkResetPassword({ email: email, clientUri }))
        .unwrap()
        .then(() => {
          message.success(
            "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn."
          );
        })
        .catch((error) => {
          message.error(
            "Đã xảy ra lỗi khi gửi liên kết đặt lại mật khẩu: " + error.message
          );
        });
    } else {
      message.error(
        "Không thể đặt lại mật khẩu vì thông tin email không khả dụng."
      );
    }
  };

  // Rules chung cho từng loại input
  const getFieldRules = (key) => {
    const baseRules = [
      { required: true, message: `${key} không được để trống!` },
    ];
    if (key === "Email") {
      baseRules.push({ type: "email", message: "Email không hợp lệ!" });
    }
    if (key === "Số điện thoại") {
      baseRules.push({
        pattern: /^[0-9]{10,11}$/,
        message: "Số điện thoại không hợp lệ!",
      });
    }
    return baseRules;
  };

  // Render Input theo loại `key`
  const renderField = (key) => {
    switch (key) {
      case "Giới tính":
        return (
          <Select>
            <Select.Option value="Male">Nam</Select.Option>
            <Select.Option value="Female">Nữ</Select.Option>
          </Select>
        );
      case "Ngày sinh":
        return <DatePicker format={"DD-MM-YYYY"} />;
      default:
        return <Input />;
    }
  };

  return (
    <>
      <Form
        layout="horizontal"
        form={form}
        initialValues={getInitialValues()}
        onFinish={onFinish}
        className={styles.updateForm || "update-form"}
      >
        <div className="update-account container flex flex-col">
          {data.map(({ key }) => (
            <Form.Item
              key={key}
              label={key}
              name={key}
              rules={getFieldRules(key)}
            >
              {renderField(key)}
            </Form.Item>
          ))}
        </div>

        {/* Buttons */}
        <Form.Item className="buttons-form-item">
          <div className="flex justify-between w-full">
            <button className="buttonCustom !w-1/2" htmltype="submit">
              Lưu
            </button>
            <button
              className="buttonCustom !w-1/2 !m-0"
              onClick={() => setOpen(true)}
              type="button"
            >
              Đổi mật khẩu
            </button>
          </div>
        </Form.Item>
      </Form>

      <Modal
        title="Đặt lại mật khẩu"
        open={open}
        onOk={handleResetPassword}
        onCancel={() => setOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn đặt lại mật khẩu?
          <br />
          Một liên kết sẽ được gửi đến email của bạn.
        </p>
      </Modal>
    </>
  );
};

export default UpdateFormInput;
