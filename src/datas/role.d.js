import { EditOutlined, PlusOutlined } from "@ant-design/icons";
// ===================== CẤU HÌNH BẢNG & HÀNH ĐỘNG =====================
// Cột bảng (giữ lại nút Xem, Sửa; bỏ nút Xóa để xóa nhiều dòng bằng action)

// Hai nút “Thêm Role” và “Xóa Role” ở top-bar
export const roleListAction = () => [
  {
    title: "Thêm Role",
  },
  {
    title: "Xóa Role",
  },
];

export const roleColumns = (handleEditRole, handleAddPermission) => [
  {
    title: "Vai trò",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quyền hạn",
    dataIndex: "permissions",
    key: "permissions",
    render: (permissions) => (
      <ul>
        {permissions.map((permission, index) => (
          <li key={index}>{permission.name}</li>
        ))}
      </ul>
    ),
  },
  {
    title: "Tác vụ",
    key: "action",
    render: (_, record) => (
      <>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ml-2"
          type="link"
          onClick={() => handleAddPermission(record.name)}
        >
          <PlusOutlined />
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ml-2"
          type="link"
          onClick={() => handleEditRole(record)}
        >
          <EditOutlined />
        </button>
      </>
    ),
  },
];
