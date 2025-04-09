import { Button } from "antd";
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

export const roleColumns = (handleEditRole) => [
  {
    title: "Vai trò",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tác vụ",
    key: "action",
    render: (_, record) => (
      <>
        <Button type="link" onClick={() => handleEditRole(record)}>
          Sửa
        </Button>
        {/* Xóa row-level có thể bỏ, vì đã có xóa nhiều ở top-bar */}
      </>
    ),
  },
];
