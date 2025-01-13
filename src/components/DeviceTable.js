import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  Input,
  Space,
  Typography,
  Modal,
  Form,
  message,
  DatePicker,
} from "antd";
import {
  DownOutlined,
  FilterOutlined,
  ImportOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewDevice,
  getAllDevices,
  updateDevice,
} from "../redux/actions/deviceAction";
import TextArea from "antd/es/input/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Search } = Input;
const { Text } = Typography;

const DeviceTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [form] = Form.useForm();

  const deviceState = useSelector((state) => state.devices || {});
  console.log(deviceState);
  const { data: deviceData = [] } = deviceState;

  useEffect(() => {
    dispatch(getAllDevices()).then((response) => console.log(response));
  }, [dispatch]);

  const handleAddDevice = () => {
    setOpen(true);
    console.log("Add device");
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
      thoiGianBaoHanh: data.thoiGianBaoHanh,
    });
    setOpen(true);
  };

  const handleDeleteDevice = () => {
    console.log("Delete device");
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
        moTa: value.moTa,
        maQR: value.maQR,
      };
      dispatch(updateDevice(data))
        .unwrap()
        .then(() => {
          message.success("Cập nhật thiết bị thành công!");
          closeModal();
          dispatch(getAllDevices());
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
        thoiGianBaoHanh: value.thoiGianBaoHanh.format("YYYY-MM-DD"),
      };
      dispatch(addNewDevice(data))
        .unwrap()
        .then(() => {
          message.success("Tạo thiết bị thành công!");
          closeModal();
          dispatch(getAllDevices());
        })
        .catch(() => {
          message.error("Tạo thiết bị thất bại.");
        });
    }
  };

  return (
    <div className="w-full p-5 bg-[#EDEDEF] rounded-[50px]">
      <Row gutter={16} align="middle">
        <Col>
          <Button icon={<FilterOutlined />} />
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text">
              Trạng thái <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text">
              Chọn lớp <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col flex="auto">
          <Search className="w-96" placeholder="Tìm kiếm nhanh" enterButton />
          <Button
            onClick={handleAddDevice}
            icon={<ImportOutlined />}
            className="bg-[#1D1B23] text-white"
          >
            Thêm thiết bị
          </Button>
          <Button
            onClick={handleDeleteDevice}
            icon={<DeleteOutlined />}
            className="bg-[#ff5656]"
          >
            Xóa thiết bị
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        {deviceData.map(
          (item) =>
            item.isTrangThai === true && (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  key={item.id}
                  bordered={false}
                  className="rounded-[50]"
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => handleEditDevice(item)}
                    />,
                    <DeleteOutlined
                      key="delete"
                      // onClick={() => handleDelete(data.id)}
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
        title={isEditing ? "Sửa thông tin thiết bị" : "Thêm thông tin thiết bị"}
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
            <Input placeholder="Nhập số seri" disabled={isEditing} />
          </Form.Item>
          <Form.Item
            name="maQR"
            label="Mã QR"
            rules={[{ required: true, message: "Vui lòng nhập vào mã QR!" }]}
          >
            <Input placeholder="Nhập mã QR" disabled={isEditing} />
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
            rules={[
              {
                required: true,
                message: "Thiết bị phải có hạn bảo hành!",
              },
            ]}
          >
            <DatePicker
              placeholder="Hạn bảo hành"
              format="YYYY-MM-DD"
              className="rounded-lg w-full"
              disabled={isEditing}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm thiết bị
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={closeModal}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceTable;
