import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  Row,
  Col,
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  message,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  addNewDevice,
  getDevicesByTypeId,
  updateDevice,
  removeDevice,
} from "../../redux/actions/deviceAction";
import { deviceAction } from "../../datas/device.d";
import Selector from "../list-detail/selector/Selector";
import TextArea from "antd/es/input/TextArea";

const { Text } = Typography;

const DeviceTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [modalType, setModalType] = useState("add-edit");
  const [form] = Form.useForm();

  const deviceState = useSelector((state) => state.devices || {});
  const { data: deviceData = [] } = deviceState;

  useEffect(() => {
    dispatch(getDevicesByTypeId(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Fetched Device Data:", deviceData);
  }, [deviceData]);

  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = deviceData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddDevice = () => {
    setIsEditing(false);
    setOpen(true);
  };

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
        })
        .catch(() => {
          message.error("Cập nhật thiết bị thất bại.");
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
        })
        .catch(() => {
          message.error("Tạo thiết bị thất bại.");
        });
    }
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm bài thí nghiệm":
        setModalType("add-edit");
        break;
      case "Xóa bài thí nghiệm":
        setModalType("remove");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };
  return (
    <>
      <Selector
        title="Danh sách thiết bị"
        actions={deviceAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
      />
      <div className="bg-grey tab">
        <div className="w-full flex justify-center tab-header">
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            className="max-w-[200px]"
            color="#c4c4c4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Row gutter={[16, 16]} className="mt-8">
          {deviceData.map(
            (item) =>
              item.isTrangThai === true && (
                <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    className="rounded-[50] bg-gray-200"
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => handleEditDevice(item)}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => handleDeleteDevice(item.id)}
                      />,
                    ]}
                  >
                    <p className="font-bold text-[27px]">{item.tenThietBi}</p>
                    <Badge
                      count={item.isTrangThai ? "Đã kết nối" : "Chưa kết nối"}
                      style={{
                        backgroundColor: item.isTrangThai
                          ? "#34C75938"
                          : "#FF3B3021",
                        color: "black",
                      }}
                    />

                    <i class="fa-solid fa-gear"></i>
                    {/* <div className="text-16">
                      Nhóm <DownOutlined className="text-[12px]" />
                    </div>
                    {item.members.length > 0 && (
                      <Space
                        direction="vertical"
                        size="small"
                        className="mt-[10px]"
                      >
                        {item.members.map((member, index) => (
                          <Space
                            key={index}
                            size="small"
                            className="flex items-center"
                          >
                            <Text italic>{member}</Text>
                          </Space>
                        ))}
                      </Space>
                    )} */}
                  </Card>
                </Col>
              )
          )}
        </Row>
        <Modal
          title={
            isEditing ? "Sửa thông tin thiết bị" : "Thêm thông tin thiết bị"
          }
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
              rules={[
                { required: true, message: "Vui lòng nhập tên thiết bị!" },
              ]}
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
              label="Hạn bảo hành (dd-mm-yyyy)"
              name="thoiGianBaoHanh"
              rules={[
                {
                  required: true,
                  message: "Thiết bị phải có hạn bảo hành!",
                },
              ]}
            >
              <DatePicker
                placeholder="DD-MM-YYYY"
                format={"DD-MM-YYYY"}
                disabled={isEditing}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEditing ? "Sửa thông tin thiết bị" : "Thêm thiết bị"}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={closeModal}>
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={"Xóa thiết bị"}
          open={open && modalType === "remove"}
          onOk={handleDeleteConfirm}
          onCancel={closeModal}
        >
          <p>Bạn có chắc chắn muốn xóa thiết bị này không?</p>
        </Modal>
      </div>
    </>
  );
};

export default DeviceTable;