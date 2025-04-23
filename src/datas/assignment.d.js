import formatDate from "../utils/formatDate";

export const assignmentAction = () => [
  {
    title: "Tạo bài tập",
    onClick: (openModal) => {
      openModal();
    },
  },
  {
    title: "Xóa bài tập",
    onClick: (openModal) => {
      openModal();
    },
  },
];

export const assignmentColumns = (navigate) => [
  {
    title: "Tên bài tập",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <a onClick={() => navigate(`/user-detail/${record.id}`)}>{text}</a>
    ),
  },
  {
    title: "Hạn chót",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (text) => <p>{formatDate(text)}</p>,
  },
  {
    title: "Tài liệu",
    dataIndex: "embeddedFile",
    key: "embeddedFile",
    render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer">
        Nhấn để xem
      </a>
    ),
  },
];
