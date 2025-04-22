import { useClassroomData } from "../hooks/useClassroomData";
import { formatDateTime } from "../utils/formatDate";

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

export const AssignmentColumns = () => {
  const { classrooms } = useClassroomData();
  const columns = [
    {
      title: "Tên bài tập",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Lớp",
      dataIndex: "lopHocId",
      key: "lopHocId",
      render: (lopHocId) => {
        if (!classrooms || !Array.isArray(classrooms)) {
          return <p>Không xác định</p>;
        }
        const classroom = classrooms.find((cls) => cls.id === lopHocId);
        return <p>{classroom ? classroom.tenLop : "Không xác định"}</p>;
      },
    },
    {
      title: "Hạn chót",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => <p>{formatDateTime(text)}</p>,
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

  return columns;
};
