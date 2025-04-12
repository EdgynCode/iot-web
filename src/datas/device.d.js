import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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

export const deviceAction = (isAdmin) => {
  const actions = [
    {
      title: "Kiểm tra kết nối",
      onClick: (openModal) => {
        openModal();
      },
    },
  ];

  if (isAdmin) {
    actions.push({
      title: "Thêm thiết bị",
      onClick: (openModal) => {
        openModal();
      },
    });
  }

  return actions;
};

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

export const deviceColumns = (onUpdate, onRemove, onConfig, isAdmin) => {
  const buttons = [
    {
      render: (record) => (
        <button
          onClick={() => onConfig(record.serialNumber)}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
        >
          <SettingOutlined />
        </button>
      ),
    },
  ];
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
    {
      title: "Tác vụ",
      key: "actions",
      render: (record) => (
        <span>
          {buttons.map((button, index) => (
            <span key={index}>{button.render(record)}</span>
          ))}
        </span>
      ),
    },
  ];

  if (isAdmin) {
    buttons.push({
      render: (record) => (
        <button
          onClick={() => onUpdate(record)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ml-2"
        >
          <EditOutlined />
        </button>
      ),
    });
    buttons.push({
      render: (record) => (
        <button
          onClick={() => onRemove(record.id)}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 ml-2"
        >
          <DeleteOutlined />
        </button>
      ),
    });
  }

  return columns;
};
