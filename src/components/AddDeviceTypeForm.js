import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import {
  addNewDeviceType,
  getAllDeviceTypes,
} from "../redux/actions/deviceAction";

const AddDeviceTypeForm = ({ setOpen, setLoading }) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);

    const deviceTypeData = {
      tenLoaiThietBi: values.tenLoaiThietBi,
      serialNumber: values.serialNumber,
      maQR: values.maQR,
      moTa: values.moTa,
      ghiChu: values.ghiChu,
    };

    dispatch(addNewDeviceType(deviceTypeData))
      .unwrap()
      .then(() => {
        message.success("Thêm loại thiết bị thành công!");
        setOpen(false);
        dispatch(getAllDeviceTypes());
        setLoading(false);
      })
      .catch(() => {
        message.error("Thêm loại thiết bị thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  return (
    <Form name="addNewDeviceType" onFinish={onFinish} className="space-y-4">
      <Form.Item
        name="tenLoaiThietBi"
        rules={[
          { required: true, message: "Vui lòng nhập tên loại thiết bị!" },
        ]}
      >
        <Input placeholder="Tên loại thiết bị" />
      </Form.Item>

      <Form.Item
        name="serialNumber"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số seri của loại thiết bị!",
          },
        ]}
      >
        <Input placeholder="Số seri" />
      </Form.Item>

      <Form.Item
        name="maQR"
        rules={[{ required: true, message: "Vui lòng nhập vào mã QR!" }]}
      >
        <Input placeholder="QR Code" />
      </Form.Item>

      <Form.Item name="moTa">
        <Input placeholder="Mô tả loại thiết bị" />
      </Form.Item>

      <Form.Item name="ghiChu">
        <Input placeholder="Ghi chú" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="buttonCustom w-full"
        >
          Thêm loại thiết bị
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDeviceTypeForm;
