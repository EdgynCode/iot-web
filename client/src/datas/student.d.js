export const studentAction = [
  {
    title: "New",
    onclick: () => {
      console.log("New");
    },
  },
  {
    title: "Import",
    onclick: () => {
      console.log("Import");
    },
  },
  {
    title: "Export",
    onclick: () => {
      console.log("Export");
    },
  },
];
export const studentData = [
  {
    key: "1",
    id: "4701104087",
    fullname: "Nguyễn Hữu Tân",
    class: "10C13",
    email: "nguyenhuutan080603@gmail.com",
    phonenumber: "0703792808",
    gender: "Nam",
    role: "",
  },
  {
    key: "2",
    id: "470110408́8",
    fullname: "Tran Ha",
    class: "10C13",
    email: "nguyenhuutan080603@gmail.com",
    phonenumber: "0703792808",
    gender: "Nam",
    role: "",
  },
  {
    key: "3",
    id: "4701104089",
    fullname: "Võ Thị Thu Hòa",
    class: "10C13",
    email: "thuhoa08102003@gmail.com",
    phonenumber: "0928147832",
    gender: "Nữ",
    role: "Lớp trưởng",
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
export const studentFilter = [
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Class", label: "Lớp", options: classMenu },
];
export const studentColumns = (navigate) => [
  {
    title: "Mã số",
    dataIndex: "id",
    key: "id",
    render: (text) => <a onClick={() => navigate(`/student-detail`)}>{text}</a>,
    //sorter: (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
  },
  {
    title: "Họ tên",
    dataIndex: "fullname",
    key: "fullname",
    render: (text) => <a onClick={() => navigate(`/student-detail`)}>{text}</a>,
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
    dataIndex: "class",
    key: "class",
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
    dataIndex: "phonenumber",
    key: "phonenumber",
  },
];
