import { LogoutOutlined } from "@ant-design/icons";
import {
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
  PersonalMenuIcon,
  PhysicsMenuIcon,
  ScheduleMenuIcon,
  StudentMenuIcon,
} from "./icon.d";

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
export const learnerRoute = [accountDetail, editAccountDetail, logout];
export const teacherRoute = [
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
export const learnerSidebar = [accountDetail, logout];
export const teacherSidebar = [
  schedule,
  lessons,
  labs,
  deviceTypes,
  students,
  accountDetail,
  logout,
];
export const superAdminSidebar = [
  lessons,
  accounts,
  classrooms,
  deviceTypes,
  accountDetail,
  logout,
];
