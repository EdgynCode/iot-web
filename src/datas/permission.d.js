import { Button } from "antd";
// Định nghĩa các cột cho bảng quyền
export const permissionColumns = (handleEditPermission) => [
  {
    title: "Tên Quyền",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <>
        <Button type="link" onClick={() => handleEditPermission(record)}>
          Sửa
        </Button>
        {/* Nếu cần, bạn có thể giữ nút xóa từng dòng. Tuy nhiên, ở đây chúng ta ưu tiên xóa nhiều dòng từ top-bar */}
        {/* <Button type="link" danger onClick={() => handleDeletePermission(record)}>
              Xóa
            </Button> */}
      </>
    ),
  },
];

export const permissionListAction = () => [
  { title: "Thêm Quyền" },
  { title: "Xóa Quyền" },
];
