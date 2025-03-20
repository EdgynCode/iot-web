export const labAction = () => [
  {
    title: "Thêm bài lab",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Xóa bài lab",
    onClick: (setOpen) => {
      setOpen(true);
    },
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
export const labFilter = [
  { key: "Grade", label: "Khối", options: gradeMenu },
  { key: "Class", label: "Lớp", options: classMenu },
];
export const labColumns = (navigate) => [
  {
    title: "Tên bài tập",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <button
        onClick={() => {
          navigate(`/lab-detail/${record.id}`, { state: { record } });
        }}
      >
        {text}
      </button>
    ),
  },
  {
    title: "Xem trước",
    dataIndex: "pathImage",
    key: "pathImage",
    render: (text, record) => (
      <button
        onClick={() => {
          navigate(`/lab-detail/${record.id}`, { state: { record } });
        }}
      >
        {text}
      </button>
    ),
  },
];
