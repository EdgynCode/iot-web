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
  StudentDetail,
  EditStudentDetail,
  Accounts,
  AccountDetail,
  EditAccountDetail,
  Devices,
  DeviceTypes,
  Labs,
  LessonDetail,
  LabDetail,
} from "../pages";
import Schedule from "../pages/schedule";

const home = {
  key: "home",
  element: <Home />,
  icon: <HomeOutlined />,
  title: "Trang chủ",
};
const accounts = {
  key: "accounts",
  element: <Accounts />,
  icon: <UserOutlined />,
  title: "Danh sách tài khoản",
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
  title: "Bài giảng",
};
const schedule = {
  key: "schedule",
  element: <Schedule />,
  icon: <BookOutlined />,
  title: "Buổi học",
};
const editAccountDetail = {
  key: "edit-account-detail",
  element: <EditAccountDetail />,
};
const editStudentDetail = {
  key: "edit-student-detail/:id",
  element: <EditStudentDetail />,
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
const studentDetail = {
  key: "student-detail/:id",
  element: <StudentDetail />,
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
export const learnerRoute = [home, accountDetail, editAccountDetail, logout];
export const teacherRoute = [
  home,
  schedule,
  lessons,
  labs,
  deviceTypes,
  devices,
  students,
  studentDetail,
  editStudentDetail,
  accountDetail,
  editAccountDetail,
  logout,
  lessonDetail,
  labDetail,
];
export const superAdminRoute = [
  home,
  lessons,
  students,
  studentDetail,
  editStudentDetail,
  accounts,
  accountDetail,
  editAccountDetail,
  deviceTypes,
  devices,
  logout,
  lessonDetail,
];
export const learnerSidebar = [home, accountDetail, logout];
export const teacherSidebar = [
  home,
  schedule,
  lessons,
  labs,
  deviceTypes,
  students,
  accountDetail,
  logout,
];
export const superAdminSidebar = [
  home,
  lessons,
  accounts,
  deviceTypes,
  accountDetail,
  logout,
];
