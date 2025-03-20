import { useEffect, useState } from "react";
import { getClassesByTeacherId } from "../redux/actions/classroomAction";
import { useDispatch } from "react-redux";

const useClassFilter = () => {
  const dispatch = useDispatch();
  const [classMenu, setClassMenu] = useState([]);

  const userItem = localStorage.getItem("user");
  let userId = null;
  if (userItem) {
    const user = JSON.parse(userItem);
    userId = user.userId;
  } else {
    console.log("User item not found in local storage");
  }

  useEffect(() => {
    if (userId) {
      dispatch(getClassesByTeacherId(userId))
        .unwrap()
        .then((response) => {
          if (response && Array.isArray(response.classes)) {
            const mappedClasses = response.classes.map((classItem) => ({
              key: classItem.id,
              label: classItem.tenLop,
            }));
            setClassMenu(mappedClasses);
          } else {
            console.error("Expected an array but received:", response.classes);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [dispatch, userId]);

  return { classMenu };
};

export const studentAction = () => [
  {
    title: "Thêm danh sách học sinh",
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
  {
    title: "Điểm danh",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
];

export const useStudentFilter = () => [
  { key: "Class", label: "Lớp", options: useClassFilter().classMenu },
];
export const studentColumns = (navigate) => [
  {
    title: "Họ tên",
    dataIndex: ["firstName", "lastName"],
    key: "fullName",
    render: (text, record) => (
      <a onClick={() => navigate(`/student-detail/${record.id}`)}>
        {record.firstName} {record.lastName}
      </a>
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
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Hiện diện",
    dataIndex: "present",
    key: "present",
    render: () => <p>Vắng mặt</p>,
  },
];
export const studentDetailAction = (navigate, id) => [
  {
    title: "Chỉnh sửa thông tin",
    onClick: () => {
      navigate(`/edit-student-detail/${id}`);
    },
  },
  {
    title: "Gửi tin nhắn",
    onClick: () => {
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
