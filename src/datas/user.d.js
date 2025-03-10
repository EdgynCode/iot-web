export const userColumns = (navigate) => [
  {
    title: "Mã số",
    dataIndex: "id",
    key: "id",
    render: (text, record) => (
      <a onClick={() => navigate(`/user-detail/${record.id}`)}>{text}</a>
    ),
  },
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
export const userDetailAction = (navigate, id) => [
  {
    title: "Chỉnh sửa thông tin",
    onClick: () => {
      navigate(`/edit-user-detail/${id}`);
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
