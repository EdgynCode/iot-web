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
  Labs,
} from "../pages";

export const masterAdminRoute = [
  { key: "/", title: "Trang chủ", icon: <HomeOutlined />, element: <Home /> },
  {
    key: "/students",
    title: "Học sinh",
    icon: <UserOutlined />,
    element: <Students />,
  },
  {
    key: "/devices",
    title: "Thiết bị",
    icon: <ThunderboltOutlined />,
    element: <Devices />,
  },
  {
    key: "/account-detail",
    title: "Thông tin tài khoản",
    icon: <InfoCircleOutlined />,
    element: <AccountDetail />,
  },
  { key: "/logout", title: "Đăng xuất", icon: <LogoutOutlined /> },
];
export const teacherRoute = [
  { key: "/", title: "Trang chủ", icon: <HomeOutlined />, element: <Home /> },
  {
    key: "/lessons",
    title: "Bài học",
    icon: <BookOutlined />,
    element: <Lessons />,
  },
  { key: "/edit", title: "Bài thi", icon: <EditOutlined /> },
  {
    key: "/students",
    title: "Học sinh",
    icon: <UserOutlined />,
    element: <Students />,
  },
  { key: "/labs", title: "Bài thực hành", icon: <ClockCircleOutlined /> },
  {
    key: "/devices",
    title: "Thiết bị",
    icon: <ThunderboltOutlined />,
    element: <Labs />,
  },
  {
    key: "/account-detail",
    title: "Thông tin tài khoản",
    icon: <InfoCircleOutlined />,
  },
  { key: "/logout", title: "Đăng xuất", icon: <LogoutOutlined /> },
];
export const learnerRoute = [
  { key: "/", title: "Trang chủ", icon: <HomeOutlined />, element: <Home /> },
  {
    key: "/lessons",
    title: "Bài học",
    icon: <BookOutlined />,
    element: <Lessons />,
  },
];
