import {
  BookOutlined,
  ClockCircleOutlined,
  EditOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Home,
  Lessons,
  Students,
  AccountDetail,
  Devices,
  DeviceTypes,
  Labs,
  LessonDetail,
} from "../pages";
import { elements } from "chart.js";
import { NotFound } from "../components/not-found/NotFound";
import LabDetail from "../pages/lab-detail";

const home = {
  key: "home",
  element: <Home />,
  icon: <HomeOutlined />,
  title: "Trang chủ",
};
const accountDetail = {
  key: "account-detail",
  element: <AccountDetail />,
  icon: <InfoCircleOutlined />,
  title: "Thông tin tài khoản",
};
const lessons = {
  key: "lessons",
  element: <Lessons />,
  icon: <BookOutlined />,
  title: "Bài học",
};
const exams = {
  key: "exam",
  title: "Bài thi",
  icon: <EditOutlined />,
  element: "Bài kiểm tra",
};
const students = {
  key: "students",
  element: <Students />,
  icon: <UserOutlined />,
  title: "Học sinh",
};
const labs = {
  key: "labs",
  element: <Labs />,
  icon: <ClockCircleOutlined />,
  title: "Bài thực hành",
};
const devices = {
  key: "devices",
  element: <Devices />,
  icon: <ThunderboltOutlined />,
  title: "Thiết bị",
};
const deviceTypes = {
  key: "device-types",
  element: <DeviceTypes />,
  icon: <ThunderboltOutlined />,
  title: "Thiết bị",
};
const logout = {
  key: "logout",
  icon: <LogoutOutlined />,
  title: "Đăng xuất",
};
const lessonDetail = { key: "lesson-detail/:id", element: <LessonDetail /> };
const labDetail = { key: "lab-detail/:id", element: <LabDetail /> };
export const learnerRoute = [home, accountDetail, logout];
export const teacherRoute = [
  home,
  lessons,
  labs,
  deviceTypes,
  exams,
  students,
  accountDetail,
  logout,
  lessonDetail,
  labDetail,
];
export const superAdminRoute = [
  home,
  lessons,
  exams,
  students,
  accountDetail,
  logout,
  lessonDetail,
];
export const learnerSidebar = [home, accountDetail, logout];
export const teacherSidebar = [
  home,
  lessons,
  labs,
  deviceTypes,
  exams,
  students,
  accountDetail,
  logout,
];
export const superAdminSidebar = [
  home,
  lessons,
  exams,
  students,
  accountDetail,
  logout,
];
