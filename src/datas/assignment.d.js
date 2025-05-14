import { formatDateTime } from "../utils/formatDate";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

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

export const AssignmentColumns = (sessionData) => {
  const columns = [
    {
      title: "Tên bài tập",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Buổi học",
      dataIndex: "classSessionId",
      key: "classSessionId",
      render: (id) => {
        if (!sessionData || !Array.isArray(sessionData)) {
          return <p>Không xác định</p>;
        }
        const session = sessionData.find((s) => s.id === id);
        return (
          <p>
            {session
              ? `${moment(session.startTime).format(
                  "dddd, DD/MM/YYYY, HH:mm"
                )} - ${moment(session.endTime).format("HH:mm")}`
              : "Không xác định"}
          </p>
        );
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
