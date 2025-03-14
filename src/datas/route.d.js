import { LogoutOutlined } from "@ant-design/icons";
import {
  Home,
  Lessons,
  Students,
  StudentDetail,
  UserDetail,
  EditUserDetail,
  EditStudentDetail,
  Accounts,
  AccountDetail,
  EditAccountDetail,
  Devices,
  DeviceTypes,
  Labs,
  LessonDetail,
  LabDetail,
  Classrooms,
  Schedule,
  ExperimentDetail,
} from "../pages";
import {
  BookmarkMenuIcon,
  DeviceMenuIcon,
  AccountsMenuIcon,
  HomeMenuIcon,
  PersonalMenuIcon,
  PhysicsMenuIcon,
  ScheduleMenuIcon,
  StudentMenuIcon,
} from "./icon.d";

const home = {
  key: "home",
  element: <Home />,
  icon: <HomeMenuIcon />,
  title: "Trang chủ",
};
const accounts = {
  key: "accounts",
  element: <Accounts />,
  icon: <AccountsMenuIcon />,
  title: "Danh sách tài khoản",
};
const accountDetail = {
  key: "account-detail",
  element: <AccountDetail />,
  icon: <PersonalMenuIcon />,
  title: "Thông tin tài khoản",
};
const classrooms = {
  key: "classrooms",
  element: <Classrooms />,
  icon: <PersonalMenuIcon />,
  title: "Danh sách lớp học",
};
const lessons = {
  key: "lessons",
  element: <Lessons />,
  icon: <BookmarkMenuIcon />,
  title: "Bài giảng",
};
const schedule = {
  key: "schedule",
  element: <Schedule />,
  icon: <ScheduleMenuIcon />,
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
const editUserDetail = {
  key: "edit-user-detail/:id",
  element: <EditUserDetail />,
};
const students = {
  key: "students",
  element: <Students />,
  icon: <StudentMenuIcon />,
  title: "Học sinh",
};
const studentDetail = {
  key: "student-detail/:id",
  element: <StudentDetail />,
};
const labs = {
  key: "labs",
  element: <Labs />,
  icon: <PhysicsMenuIcon />,
  title: "Bài thực hành",
};
const experimentDetail = {
  key: "experiment-detail",
  element: <ExperimentDetail />,
  icon: <PhysicsMenuIcon />,
  title: "Chi tiết bài thí nghiệm",
};
const userDetail = {
  key: "user-detail/:id",
  element: <UserDetail />,
};
const devices = {
  key: "devices/:id",
  element: <Devices />,
  icon: <DeviceMenuIcon />,
  title: "Thiết bị",
};
const deviceTypes = {
  key: "device-types",
  element: <DeviceTypes />,
  icon: <DeviceMenuIcon />,
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
  experimentDetail,
];
export const superAdminRoute = [
  home,
  lessons,
  userDetail,
  editUserDetail,
  accounts,
  accountDetail,
  editAccountDetail,
  deviceTypes,
  devices,
  logout,
  classrooms,
  experimentDetail,
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
  classrooms,
  deviceTypes,
  accountDetail,
  logout,
];
