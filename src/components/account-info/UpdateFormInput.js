import { DatePicker, Form, Input, Select } from "antd";
import React from "react";
import styles from "./index.css";
const UpdateFormInput = ({ title, data, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <div className="container flex flex-col">
      <div className="title-tab">{title}</div>
      {/* <table className="table-info">
        {Object.entries(data).map(([key, value], index) => (
          <tr key={index} className="">
            <td>
              <h6>{key}</h6>
            </td>
            <td>
              <input
                type="text"
                placeholder={value}
                value={value || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="input-field"
              />
            </td>
          </tr>
        ))}
      </table> */}
      <Form
        layout="horizontal"
        form={form}
        initialValues={data.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {})}
        onFinish={onFinish}
      >
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
            ) : (
              <Input placeholder={value} />
            )}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default UpdateFormInput;
