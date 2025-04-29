// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getAllSemesters } from "../redux/actions/semesterAction";

// export const useSemesterData = () => {
//   const dispatch = useDispatch();
//   const { years, semesters, loading } = useSelector((state) => state.semesters);

//   useEffect(() => {
//     dispatch(getAllSemesters());
//   }, [dispatch]);

//   return { years, semesters, loading };
// };
import { formatDate } from "../utils/formatDate";
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
  { key: "23-24", label: "2023-2024" },
  { key: "24-25", label: "2024-2025" },
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
// export const useGradeFilter = () => {
//   const { years, semesters } = useSemesterData();

//   return [
//     { key: "Grade", label: "Khối", options: gradeMenu },
//     { key: "Year", label: "Năm học", options: years },
//     { key: "Semester", label: "Học kì", options: semesters },
//   ];
// };
export const classroomColumns = () => [
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
    render: (text) => <p>{formatDate(text)}</p>,
  },
  {
    title: "Ngày thay đổi",
    dataIndex: "ngayThayDoi",
    key: "ngayThayDoi",
    render: (text) => <p>{formatDate(text)}</p>,
  },
];
