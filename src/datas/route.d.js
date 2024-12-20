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

export const masterAdminRoute = [
  { key: "/admin/students", title: "Học sinh", icon: <UserOutlined /> },
  { key: "/admin/devices", title: "Thiết bị", icon: <ThunderboltOutlined /> },
  {
    key: "/admin/account-detail",
    title: "Thông tin tài khoản",
    icon: <InfoCircleOutlined />,
  },
  { key: "/admin/logout", title: "Đăng xuất", icon: <LogoutOutlined /> },
];
export const teacherRoute = [
  { key: "/", title: "Trang chủ", icon: <HomeOutlined /> },
  { key: "/lessons", title: "Bài học", icon: <BookOutlined /> },
  { key: "/edit", title: "Bài thi", icon: <EditOutlined /> },
  { key: "/students", title: "Học sinh", icon: <UserOutlined /> },
  { key: "/timer", title: "Bài thực hành", icon: <ClockCircleOutlined /> },
  { key: "/devices", title: "Thiết bị", icon: <ThunderboltOutlined /> },
  {
    key: "/account-detail",
    title: "Thông tin tài khoản",
    icon: <InfoCircleOutlined />,
  },
  { key: "/logout", title: "Đăng xuất", icon: <LogoutOutlined /> },
];
export const learnerRoute = [
  { key: "/", title: "Trang chủ", icon: <HomeOutlined /> },
];
