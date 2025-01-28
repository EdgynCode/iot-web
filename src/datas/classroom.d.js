export const classroomAction = () => [
  {
    key: 1,
    title: "Thêm lớp học",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    key: 2,
    title: "Xóa lớp học",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    key: 3,
    title: "Thêm học kì",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    key: 4,
    title: "Xóa học kì",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
];
const gradeMenu = [
  { key: "1", label: "Khối 10" },
  { key: "2", label: "Khối 11" },
  { key: "3", label: "Khối 12" },
  { key: "4", label: "Tự do" },
];
const yearMenu = [
  { key: "2023-2024", label: "2023-2024" },
  { key: "2024-2025", label: "2024-2025" },
];
const semesterMenu = [
  { key: "1", label: "Học kì 1" },
  { key: "2", label: "Học kì 2" },
];
export const gradeFilter = [
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Year", label: "Năm học", options: yearMenu },
  { key: "Semester", label: "Học kì", options: semesterMenu },
];
export const classroomColumns = (navigate) => [
  {
    title: "Tên lớp",
    dataIndex: "tenLop",
    key: "tenLop",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ngày tạo",
    dataIndex: "ngayTao",
    key: "ngayTao",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Ngày thay đổi",
    dataIndex: "ngayThayDoi",
    key: "ngayThayDoi",
    render: (text) => <p>{text}</p>,
  },
];
