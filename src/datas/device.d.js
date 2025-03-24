import { EditOutlined, DeleteOutlined, BulbOutlined } from "@ant-design/icons";
import formatDate from "../utils/formatDate";

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

export const deviceAction = () => [
  {
    title: "Thêm thiết bị",
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

export const deviceColumns = (onUpdate, onRemove, onConnect, isAdmin) => {
  const columns = [
    {
      title: "Số seri",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "tenThietBi",
      key: "tenThietBi",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isTrangThai",
      key: "isTrangThai",
      render: (text) => <p>{text ? "Đã kết nối" : "Chưa kết nối"}</p>,
    },
    {
      title: "Hạn bảo hành",
      dataIndex: "thoiGianBaoHanh",
      key: "thoiGianBaoHanh",
      render: (text) => <p>{formatDate(text)}</p>,
    },
  ];

  if (isAdmin) {
    columns.push({
      title: "Tác vụ",
      key: "actions",
      render: (record) => (
        <span>
          <button
            onClick={() => onUpdate(record)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => onRemove(record.id)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 ml-2"
          >
            <DeleteOutlined />
          </button>
          <button
            onClick={() => onConnect()}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 ml-2"
          >
            <BulbOutlined />
          </button>
        </span>
      ),
    });
  } else {
    columns.push({
      title: "Tác vụ",
      key: "actions",
      render: (record) => (
        <span>
          <button
            onClick={() => onConnect()}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 ml-2"
          >
            <BulbOutlined />
          </button>
        </span>
      ),
    });
  }

  return columns;
};
