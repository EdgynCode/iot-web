import React, { useEffect, useState } from "react";
import { Spin, Input, Modal, Form, DatePicker, message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  addNewDevice,
  getDevicesByTypeId,
  updateDevice,
  updateDeviceState,
  removeDevice,
} from "../../redux/actions/deviceAction";
import { brokerConfig } from "../../redux/actions/mqttAction";
import { deviceAction, deviceColumns } from "../../datas/device.d";
import { useDeviceData } from "../../hooks/useDeviceData";
import TextArea from "antd/es/input/TextArea";
import { ListDetail } from "../list-detail/ListDetail";
import { getUserRole } from "../../utils/getUserRole";
import webSocketService from "../../redux/services/webSocketService";

const DeviceTable = () => {
  const { id } = useParams();
  const { devices, loading, error } = useDeviceData(id);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [modalType, setModalType] = useState("add-edit");
  const [formAddEdit] = Form.useForm();
  const [formConfig] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(false);

  const role = getUserRole();

  useEffect(() => {
    if (role === "SuperAdmin") {
      setIsAdmin(true);
    }
  }, [role]);

  const handleEdit = (data) => {
    setModalType("add-edit");
    setIsEditing(true);
    setCurrentDevice(data);
    formAddEdit.setFieldsValue({
      tenThietBi: data.tenThietBi,
      serialNumber: data.serialNumber,
      maQR: data.maQR,
      moTa: data.moTa,
      ghiChu: data.ghiChu,
      thoiGianBaoHanh: dayjs(data.thoiGianBaoHanh),
    });
    setOpen(true);
  };

  const handleDelete = (deviceId) => {
    setModalType("remove");
    setCurrentDevice(deviceId);
    setOpen(true);
  };

  const handleConfig = (deviceNumber) => {
    setModalType("config");
    setCurrentDevice(deviceNumber);
    formConfig.resetFields();
    setIsEditing(false);
    setOpen(true);
  };

  const handleConfigConfirm = () => {
    const deviceConfig = {
      deviceNumber: currentDevice,
      name: "SET_CONFIG",
      packetNumber: formConfig.getFieldValue("packetNumber"),
      data: {
        samplingDuration: formConfig.getFieldValue("samplingDuration"),
        samplingRate: formConfig.getFieldValue("samplingRate"),
      },
    };
    dispatch(brokerConfig(deviceConfig))
      .then(() => {
        message.success("Điều chỉnh thông số thiết bị thành công!");
        dispatch(getDevicesByTypeId(id));
        closeModal();
        setCurrentDevice(null);
      })
      .catch((error) => {
        message.error("Điều chỉnh thông số thiết bị thất bại.");
        console.error("Error configuring device:", error);
      });
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
  };

  const closeModal = () => {
    setOpen(false);
    setModalType("");
    setCurrentDevice(null);
    setIsEditing(false);
    formAddEdit.resetFields();
    formConfig.resetFields();
  };

  const handleFormSubmit = async (value) => {
    formAddEdit.validateFields();
    const data = {
      tenThietBi: value.tenThietBi,
      serialNumber: value.serialNumber,
      maQR: value.maQR,
      moTa: value.moTa,
      ghiChu: value.ghiChu,
      loaiThietBiID: id,
      thoiGianBaoHanh: value.thoiGianBaoHanh,
    };
    if (isEditing && currentDevice) {
      dispatch(
        updateDevice({
          ...data,
          id: currentDevice.id,
        })
      )
        .unwrap()
        .then(() => {
          message.success("Cập nhật thiết bị thành công!");
          closeModal();
          dispatch(getDevicesByTypeId(id));
        })
        .catch(() => {
          message.error("Cập nhật thiết bị thất bại.");
        });
      return;
    } else {
      dispatch(
        addNewDevice({
          ...data,
          donViId: "123",
          isTrangThai: false,
        })
      )
        .unwrap()
        .then(() => {
          message.success("Tạo thiết bị thành công!");
          closeModal();
          dispatch(getDevicesByTypeId(id));
        })
        .catch(() => {
          message.error("Tạo thiết bị thất bại.");
        });
    }
  };

  const handleConnect = () => {
    let timeoutId;

    // Set a timeout to update all devices to isTrangThai: false if no response is received within 5 seconds
    timeoutId = setTimeout(() => {
      devices.forEach((device) => {
        dispatch(updateDeviceState({ id: device.id, isTrangThai: false }))
          .unwrap()
          .then(() => {
            message.info(
              `Thiết bị ${device.serialNumber} đã ngắt kết nối do không có phản hồi!`
            );
            webSocketService.close();
            setOpen(false);
            dispatch(getDevicesByTypeId(id));
          })
          .catch((error) => {
            console.error(
              `Failed to update device state ${device.serialNumber}:`,
              error
            );
          });
      });
    }, 5000);

    webSocketService.setMessageHandler((data) => {
      clearTimeout(timeoutId);
      const onlineDevices = JSON.parse(data);
      if (Array.isArray(onlineDevices)) {
        onlineDevices.forEach((serialNumber) => {
          const matchingDevice = devices.find(
            (device) => device.serialNumber === serialNumber
          );
          if (matchingDevice) {
            dispatch(
              updateDeviceState({ id: matchingDevice.id, isTrangThai: true })
            )
              .unwrap()
              .then(() => {
                message.success(`Thiết bị ${serialNumber} đã kết nối!`);
                webSocketService.close();
                closeModal();
                dispatch(getDevicesByTypeId(id));
              })
              .catch((error) => {
                console.error(
                  `Failed to update device state ${serialNumber}:`,
                  error
                );
              });
          }
        });
      }
    });

    webSocketService.connect("onlinedevices");
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm thiết bị":
        setModalType("add-edit");
        setIsEditing(false);
        break;
      case "Kiểm tra kết nối":
        setModalType("connect");
        handleConnect();
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
        actions={deviceAction(isAdmin).map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        data={loading ? [] : devices}
        column={deviceColumns(handleEdit, handleDelete, handleConfig, isAdmin)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Modal
        title="Đang kiểm tra kết nối"
        open={open && modalType === "connect"}
        footer={null}
        closable={false}
      >
        <Spin tip="Đang kết nối..." />
      </Modal>
      <Modal
        title={isEditing ? "Sửa thông tin thiết bị" : "Thêm thông tin thiết bị"}
        open={open && modalType === "add-edit"}
        okText={isEditing ? "Cập nhật" : "Thêm"}
        cancelText={"Hủy"}
        onOk={() => formAddEdit.submit()}
        onCancel={closeModal}
      >
        <Form
          form={formAddEdit}
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
            <Input placeholder="Số seri" />
          </Form.Item>
          <Form.Item
            name="maQR"
            label="Mã QR"
            rules={[{ required: true, message: "Vui lòng nhập mã QR!" }]}
          >
            <Input placeholder="Mã QR" />
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
      {/* Config modal blocking update modal action */}
      <Modal
        title="Cài đặt thông số thiết bị"
        open={open && modalType === "config"}
        okText={"Thiết lập"}
        cancelText={"Hủy"}
        onOk={() => formConfig.submit()}
        onCancel={closeModal}
      >
        <Form
          form={formConfig}
          layout="vertical"
          labelCol={{ style: { width: "250px" } }}
          onFinish={handleConfigConfirm}
        >
          <Form.Item
            name="packetNumber"
            label="Số mẫu"
            rules={[
              { required: true, message: "Vui lòng nhập vào số lượng mẫu!" },
            ]}
          >
            <Input placeholder="Số mẫu" />
          </Form.Item>
          <Form.Item
            name="samplingDuration"
            label="Thời gian lấy mẫu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào thời gian lấy mẫu!",
              },
            ]}
          >
            <Input placeholder="Thời gian lấy mẫu" />
          </Form.Item>
          <Form.Item
            name="samplingRate"
            label="Tốc độ lấy mẫu"
            rules={[
              { required: true, message: "Vui lòng nhập vào tốc độ lấy mẫu!" },
            ]}
          >
            <Input placeholder="Tốc độ lấy mẫu" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeviceTable;
