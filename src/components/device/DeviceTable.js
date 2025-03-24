import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, DatePicker, message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  addNewDevice,
  getDevicesByTypeId,
  updateDevice,
  removeDevice,
} from "../../redux/actions/deviceAction";
import { deviceAction, deviceColumns } from "../../datas/device.d";
import { useDeviceData } from "../../hooks/useDeviceData";
import TextArea from "antd/es/input/TextArea";
import { ListDetail } from "../list-detail/ListDetail";
import { jwtDecode } from "jwt-decode";
import {
  webSocketConnect,
  webSocketDisconnect,
} from "../../redux/actions/webSocketAction";

const DeviceTable = () => {
  const { id } = useParams();
  const { devices } = useDeviceData(id);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [modalType, setModalType] = useState("add-edit");
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const decode = user ? jwtDecode(user?.jwtAccessToken) : null;
  const role = decode ? decode.role : null;

  useEffect(() => {
    if (role === "SuperAdmin") {
      setIsAdmin(true);
    }
  }, [role]);

  // useEffect(() => {
  //   // Connect to WebSocket when the component mounts
  //   const url = `onlinedevices`;
  //   dispatch(webSocketConnect(url));

  //   // Disconnect from WebSocket when the component unmounts
  //   return () => {
  //     dispatch(webSocketDisconnect());
  //   };
  // }, [dispatch, id]);

  const handleEditDevice = (data) => {
    setIsEditing(true);
    setCurrentDevice(data);
    form.setFieldsValue({
      tenThietBi: data.tenThietBi,
      serialNumber: data.serialNumber,
      maQR: data.maQR,
      moTa: data.moTa,
      ghiChu: data.ghiChu,
      thoiGianBaoHanh: dayjs(data.thoiGianBaoHanh),
    });
    setOpen(true);
  };

  const handleDeleteDevice = (deviceId) => {
    setModalType("remove");
    setCurrentDevice(deviceId);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    dispatch(removeDevice(currentDevice))
      .then(() => {
        message.success("Xóa thiết bị thành công!");
        dispatch(getDevicesByTypeId(id));
        setModalType("");
      })
      .catch((error) => {
        message.error("Xóa thiết bị thất bại.");
        console.error("Error deleting device:", error);
      });
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFormSubmit = async (value) => {
    setLoading(true);
    form.validateFields();
    if (isEditing && currentDevice) {
      const data = {
        id: currentDevice.id,
        tenThietBi: value.tenThietBi,
        serialNumber: value.serialNumber,
        maQR: value.maQR,
        moTa: value.moTa,
        ghiChu: value.ghiChu,
        isTrangThai: true,
        loaiThietBiID: id,
        thoiGianBaoHanh: value.thoiGianBaoHanh,
      };
      dispatch(updateDevice(data))
        .unwrap()
        .then(() => {
          message.success("Cập nhật thiết bị thành công!");
          closeModal();
          dispatch(getDevicesByTypeId(id));
          setLoading(false);
        })
        .catch(() => {
          message.error("Cập nhật thiết bị thất bại.");
          setLoading(false);
        });
      return;
    } else {
      const data = {
        tenThietBi: value.tenThietBi,
        donViId: "123",
        serialNumber: value.serialNumber,
        maQR: value.maQR,
        moTa: value.moTa,
        ghiChu: value.ghiChu,
        isTrangThai: true,
        loaiThietBiID: id,
        thoiGianBaoHanh: value.thoiGianBaoHanh,
      };
      dispatch(addNewDevice(data))
        .unwrap()
        .then(() => {
          message.success("Tạo thiết bị thành công!");
          closeModal();
          dispatch(getDevicesByTypeId(id));
          setLoading(false);
        })
        .catch(() => {
          message.error("Tạo thiết bị thất bại.");
          setLoading(false);
        });
    }
  };

  const handleConnect = () => {
    // const url = `onlinedevices`;
    // dispatch(webSocketConnect(url));
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm thiết bị":
        setModalType("add-edit");
        setIsEditing(false);
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Danh sách thiết bị"
        actions={
          isAdmin
            ? deviceAction().map((action) => ({
                ...action,
                onClick: () => handleActionClick(action),
              }))
            : []
        }
        data={loading ? [] : devices}
        column={deviceColumns(
          handleEditDevice,
          handleDeleteDevice,
          handleConnect,
          isAdmin
        )}
      />
      <Modal
        title={isEditing ? "Sửa thông tin thiết bị" : "Thêm thông tin thiết bị"}
        open={open && modalType === "add-edit"}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{ style: { width: "250px" } }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="tenThietBi"
            label="Tên thiết bị"
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị!" }]}
          >
            <Input placeholder="Tên thiết bị" />
          </Form.Item>
          <Form.Item
            name="serialNumber"
            label="Số seri"
            rules={[{ required: true, message: "Vui lòng nhập số seri!" }]}
          >
            <Input placeholder="Số seri" disabled={isEditing} />
          </Form.Item>
          <Form.Item
            name="maQR"
            label="Mã QR"
            rules={[{ required: true, message: "Vui lòng nhập mã QR!" }]}
          >
            <Input placeholder="Mã QR" disabled={isEditing} />
          </Form.Item>
          <Form.Item name="moTa" label="Mô tả">
            <TextArea placeholder="Mô tả" />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <TextArea placeholder="Ghi chú" />
          </Form.Item>
          <Form.Item
            name="thoiGianBaoHanh"
            label="Hạn bảo hành"
            rules={[{ required: true, message: "Vui lòng nhập hạn bảo hành!" }]}
          >
            <DatePicker placeholder="Hạn bảo hành" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xóa thiết bị"
        open={open && modalType === "remove"}
        onOk={handleDeleteConfirm}
        onCancel={closeModal}
      >
        <p>Bạn có chắc chắn muốn xóa thiết bị này không?</p>
      </Modal>
    </>
  );
};

export default DeviceTable;
