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
  RolePermission,
  Assignments,
  ResetPassword,
} from "../pages";
import {
  BookmarkMenuIcon,
  DeviceMenuIcon,
  AccountsMenuIcon,
  PersonalMenuIcon,
  PhysicsMenuIcon,
  ScheduleMenuIcon,
  StudentMenuIcon,
  AssignmentMenuIcon,
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
const assignments = {
  key: "assignments",
  element: <Assignments />,
  icon: <AssignmentMenuIcon />,
  title: "Bài tập",
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
const rolePermission = {
  key: "role-permission", // key này cũng sẽ là đường dẫn khi gọi navigate("new-tab")
  icon: <DeviceMenuIcon />,
  element: <RolePermission />,
  title: "Quản lý quyền",
};
const lessonDetail = { key: "lesson-detail/:id", element: <LessonDetail /> };
const labDetail = { key: "lab-detail/:id", element: <LabDetail /> };

const resetPassword = {
  key: "reset-password",
  element: <ResetPassword />,
};
const user = JSON.parse(localStorage.getItem("user"));
const permissions = JSON.parse(localStorage.getItem("permissions"));

export const learnerRoute = [
  assignments,
  accountDetail,
  editAccountDetail,
  logout,
  resetPassword,
];
export const teacherRoute = [
  schedule,
  assignments,
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
  resetPassword,
];
export const superAdminRoute = [
  userDetail,
  editUserDetail,
  accounts,
  accountDetail,
  editAccountDetail,
  deviceTypes,
  devices,
  rolePermission,
  logout,
  classrooms,
  experimentDetail,
  resetPassword,
];
export const learnerSidebar = user
  ? [assignments, accountDetail, logout].filter(
      (item) => item && permissions[item.key] !== false
    )
  : [];
export const teacherSidebar = user
  ? [
      schedule,
      assignments,
      labs,
      deviceTypes,
      students,
      accountDetail,
      logout,
    ].filter((item) => item && permissions[item.key] !== false)
  : [];
export const superAdminSidebar = user
  ? [
      rolePermission,
      accounts,
      classrooms,
      deviceTypes,
      accountDetail,
      logout,
    ].filter((item) => item && permissions[item.key] !== false)
  : [];
