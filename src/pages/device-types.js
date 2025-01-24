import React, { useEffect, useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  deviceListAction,
  deviceListColumns,
  deviceFilter,
} from "../datas/device.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Modal, Form, Input, Button, message } from "antd";
import {
  addNewDeviceType,
  getAllDeviceTypes,
} from "../redux/actions/deviceAction";

const DeviceTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const deviceListState = useSelector((state) => state.devicetypes || {});
  const { data: deviceData = [], error = null } = deviceListState;

  useEffect(() => {
    dispatch(getAllDeviceTypes());
  }, [dispatch]);
  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm loại thiết bị":
        setModalType("addDeviceType");
        break;
      case "Xóa loại thiết bị":
        // if (!hasSelected) {
        //   modal.warning({
        //     title: "Nhắc nhở!",
        //     content: "Vui lòng chọn loại thiết bị muốn xóa",
        //   });
        //   return;
        // }
        setModalType("deleteDeviceType");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

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
      })
      .catch(() => {
        message.error("Thêm loại thiết bị thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  return (
    <>
      <ListDetail
        title="Danh sách loại thiết bị"
        actions={deviceListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        // filters={deviceFilter}
        data={loading ? [] : deviceData}
        column={deviceListColumns(navigate)}
        setHasSelected={setHasSelected}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        title="Thêm loại thiết bị"
        open={open && modalType === "addDeviceType"}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
        ]}
        closable={false}
      >
        <Form
          name="addNewDeviceType"
          onFinish={onFinish}
          disabled={loading}
          className="space-y-4"
        >
          <Form.Item
            name="tenLoaiThietBi"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại thiết bị!" },
            ]}
          >
            <Input placeholder="Tên loại thiết bị" className="" />
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
            <Input placeholder="Số seri" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="maQR"
            rules={[{ required: true, message: "Vui lòng nhập vào mã QR!" }]}
          >
            <Input placeholder="QR Code" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="moTa">
            <Input placeholder="Mô tả loại thiết bị" className="rounded-lg" />
          </Form.Item>

          <Form.Item name="ghiChu">
            <Input placeholder="Ghi chú" className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="buttonCustom w-full"
              loading={loading}
            >
              Thêm loại thiết bị
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xóa loại thiết bị"
        open={open && modalType === "deleteDeviceType"}
        okText="Xóa"
        okType="danger"
        cancelText="Không"
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
      ></Modal>
    </>
  );
};

export default DeviceTypes;
