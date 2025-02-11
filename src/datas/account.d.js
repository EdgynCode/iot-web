export const accountAction = () => [
  {
    title: "Thêm người học vào lớp",
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
      console.log("Importing...");
    },
  },
  {
    title: "Xóa tài khoản",
    onClick: (setOpen) => {
      setOpen(true);
      console.log("Importing...");
    },
  },
  {
    title: "Xuất dữ liệu",
    onClick: (setOpen) => {
      setOpen(true);
      console.log("Exporting...");
    },
  },
];
const gradeMenu = [
  { key: "1", label: "Khối 10" },
  { key: "2", label: "Khối 11" },
  { key: "3", label: "Khối 12" },
  { key: "4", label: "Tự do" },
];
const classMenu = [
  { key: "1", label: "Lớp 10C1" },
  { key: "2", label: "Lớp 10C2" },
  { key: "3", label: "Lớp 10C3" },
  { key: "4", label: "Lớp 10C4" },
  { key: "5", label: "Lớp 10C5" },
];
const accountTypeMenu = [
  { key: "1", label: "Học sinh", role: "Learner" },
  { key: "2", label: "Giáo viên", role: "Teacher" },
  { key: "3", label: "Quản trị viên" },
];
export const accountFilter = [
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Class", label: "Lớp", options: classMenu },
  { key: "AccountType", label: "Loại tài khoản", options: accountTypeMenu },
];
export const studentColumns = (navigate) => [
  {
    title: "Mã số",
    dataIndex: "id",
    key: "id",
    render: (text, record) => (
      <a onClick={() => navigate(`/student-detail/${record.id}`)}>{text}</a>
    ),
    //sorter: (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
  },
  {
    title: "Họ tên",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => (
      <a onClick={() => navigate(`/student-detail/${record.id}`)}>{text}</a>
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
    title: "Lớp",
    dataIndex: "nguoiHocLopHocs",
    key: "nguoiHocLopHocs",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Chức vụ",
    dataIndex: "role",
    key: "role",
    filters: [
      {
        text: "Lớp trưởng",
        value: "Lớp trưởng",
      },
      {
        text: "Lớp phó",
        value: "Lớp phó",
      },
      {
        text: "Học sinh",
        value: "",
      },
    ],
    filterMode: "tree",
    onFilter: (value, record) => record.role.includes(value),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
];
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
