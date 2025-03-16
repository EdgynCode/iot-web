import { Select } from "antd";
import { updateRole } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
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
export const AccountsColumns = (navigate, selectedAccountType) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <a onClick={() => navigate(`/user-detail/${record.id}`)}>{text}</a>
      ),
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
      dataIndex: "moTa",
      key: "moTa",
      render: (text, record) => {
        console.log(record);
        return (
          <Select
            defaultValue={selectedAccountType}
            className="w-[130px]"
            onChange={(value) => {
              const userName = record.userName;
              dispatch(updateRole({ userName, role: [value] })).unwrap();
            }}
          >
            {roles.map((role) => (
              <Select.Option key={role.key} value={role.key}>
                {role.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return columns;
};
export const studentDetailAction = (navigate, id) => [
  {
    title: "Chỉnh sửa thông tin",
    onclick: () => {
      navigate(`/edit-student-detail/${id}`);
    },
  },
  {
    title: "Gửi tin nhắn",
    onclick: () => {
      console.log("Delete");
    },
  },
];

export const assignments = [
  {
    id: "1",
    studentId: "4701104087",
    assignment: "Bài tập 1",
    status: "Chưa nộp",
  },
  {
    id: "2",
    studentId: "4701104087",
    assignment: "Bài tập 2",
    status: "Chưa nộp",
  },
  {
    id: "3",
    studentId: "4701104087",
    assignment: "Bài tập 3",
    status: "Chưa nộp",
  },
  {
    id: "4",
    studentId: "4701104087",
    assignment: "Bài tập 4",
    status: "Đã nộp",
  },
  {
    id: "5",
    studentId: "4701104087",
    assignment: "Bài tập 5",
    status: "Đã nộp",
  },
];
export const assignmentColumns = [
  {
    title: "Mã số",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Bài tập",
    dataIndex: "assignment",
    key: "assignment",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
];
