import { Button } from "antd";
import { updateRole } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { message } from "antd";
const roles = [
  { key: "Learner", label: "Học sinh" },
  { key: "Teacher", label: "Giáo viên" },
  { key: "Admin", label: "Quản trị viên" },
];

export const accountAction = () => [
  {
    title: "Thêm người học/giáo viên vào lớp",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Thêm tài khoản",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Thêm danh sách tài khoản",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Xóa tài khoản",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Xuất dữ liệu",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
];
const accountTypeMenu = [
  { key: "1", label: "Học sinh", role: "Learner" },
  { key: "2", label: "Giáo viên", role: "Teacher" },
  { key: "3", label: "Quản trị viên", role: "Admin" },
];
export const accountFilter = [
  { key: "AccountType", label: "Loại tài khoản", options: accountTypeMenu },
];
export const AccountsColumns = (navigate) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Họ tên",
      dataIndex: ["firstName", "lastName"],
      key: "fullName",
      render: (_, record) => {
        const fullName = `${record.firstName} ${record.lastName}`;
        return (
          <a onClick={() => navigate(`/user-detail/${record.id}`)}>
            {fullName}
          </a>
        );
      },
    },
    {
      title: "Lớp",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: "Nam",
          value: "Nam",
        },
        {
          text: "Nữ",
          value: "Nữ",
        },
      ],
      filterMode: "tree",
      onFilter: (value, record) => record.gender.includes(value),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <a onClick={() => navigate(`/user-detail/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Phân quyền",
      render: (_, record) => {
        return (
          <Button
            className="bg-[#124874] text-white"
            onClick={() => {
              const userName = record.userName;
              const newRole = prompt(
                "Nhập vai trò mới (Learner, Teacher, Admin):",
                record.role
              );
              if (newRole) {
                dispatch(updateRole({ username: userName, role: newRole }))
                  .unwrap()
                  .then(() => {
                    message.success("Cập nhật phân quyền thành công!");
                  })
                  .catch((error) => {
                    message.error("Cập nhật phân quyền thất bại.");
                    console.error("Error updating user role:", error);
                  });
              }
            }}
          >
            Sửa quyền
          </Button>
        );
      },
    },
  ];

  return columns;
};
