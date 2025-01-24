import { CheckCircleOutlined } from "@ant-design/icons";

export const deviceData = [
  {
    id: "#26215618-ID-KL",
    status: "Đã kết nối",
    color: "green",
    members: ["Nguyễn Hữu Tân", "Võ Thị Thu Hòa"],
    icon: <CheckCircleOutlined />,
  },
  {
    id: "#15489292-ID-KL",
    status: "Đã kết nối",
    color: "green",
    members: ["Phạm Phương Nam", "Trần Tú Quyên"],
    icon: <CheckCircleOutlined />,
  },
  {
    id: "#91988749-ID-KL",
    status: "Chưa kết nối",
    color: "red",
    members: [],
    icon: <CheckCircleOutlined />,
  },
  {
    id: "#74981901-ID-KL",
    status: "Chưa kết nối",
    color: "red",
    members: [],
    icon: <CheckCircleOutlined />,
  },
  {
    id: "#55187965-ID-KL",
    status: "Chưa kết nối",
    color: "red",
    members: [],
    icon: <CheckCircleOutlined />,
  },
];

export const deviceListAction = () => [
  {
    title: "Thêm loại thiết bị",
    onClick: (openModal) => {
      openModal();
    },
  },
  {
    title: "Xóa loại thiết bị",
    onClick: (openModal) => {
      openModal();
    },
  },
];

export const gradeMenu = [
  { key: "1", label: "Khối 10" },
  { key: "2", label: "Khối 11" },
  { key: "3", label: "Khối 12" },
  { key: "4", label: "Tự do" },
];
export const classMenu = [
  { key: "1", label: "Lớp 10C1" },
  { key: "2", label: "Lớp 10C2" },
  { key: "3", label: "Lớp 10C3" },
  { key: "4", label: "Lớp 10C4" },
  { key: "5", label: "Lớp 10C5" },
];
export const deviceFilter = [
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Class", label: "Lớp", options: classMenu },
];
export const deviceListColumns = (navigate) => [
  {
    title: "Tên loại thiết bị",
    dataIndex: "tenLoaiThietBi",
    key: "tenLoaiThietBi",
    render: (text, record) => (
      <a onClick={() => navigate(`/devices/${record.id}`)}>{text}</a>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "moTa",
    key: "moTa",
    render: (text, record) => (
      <a onClick={() => navigate(`/devices/${record.id}`)}>{text}</a>
    ),
  },
  {
    title: "Ghi chú",
    dataIndex: "ghiChu",
    key: "ghiChu",
    render: (text, record) => (
      <a onClick={() => navigate(`/devices/${record.id}`)}>{text}</a>
    ),
  },
];
