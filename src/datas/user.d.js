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
