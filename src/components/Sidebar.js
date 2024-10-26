import React from "react";
import { useLocation } from "react-router-dom";
import {
  BookOutlined,
  ClockCircleOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { SidebarButton } from "./SidebarButton";

const { Sider } = Layout;

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      label: (
        <SidebarButton
          to="/"
          label="Trang chủ"
          isActive={location.pathname === "/"}
          isExpanded={isExpanded}
        />
      ),
      icon: <HomeOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/lessons",
      label: (
        <SidebarButton
          to="/lessons"
          label="Bài học"
          isActive={location.pathname === "/lessons"}
          isExpanded={isExpanded}
        />
      ),
      icon: <BookOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/edit",
      label: (
        <SidebarButton
          to="/edit"
          label="Chỉnh sửa"
          isActive={location.pathname === "/edit"}
          isExpanded={isExpanded}
        />
      ),
      icon: <EditOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/students",
      label: (
        <SidebarButton
          to="/students"
          label="Quản lý học sinh"
          isActive={location.pathname === "/students"}
          isExpanded={isExpanded}
        />
      ),
      icon: <UserOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/timer",
      label: (
        <SidebarButton
          to="/timer"
          label="Thời gian biểu"
          isActive={location.pathname === "/timer"}
          isExpanded={isExpanded}
        />
      ),
      icon: <ClockCircleOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/devices",
      label: (
        <SidebarButton
          to="/devices"
          label="Thiết bị"
          isActive={location.pathname === "/devices"}
          isExpanded={isExpanded}
        />
      ),
      icon: <ThunderboltOutlined />,
      className: "hover:bg-gray-800",
    },
    {
      key: "/logout",
      label: (
        <SidebarButton
          to="/logout"
          label="Đăng xuất"
          isActive={location.pathname === "/logout"}
          isExpanded={isExpanded}
        />
      ),
      icon: <LogoutOutlined />,
      className: "hover:bg-gray-800",
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Sider
      collapsible
      collapsed={!isExpanded}
      onCollapse={toggleSidebar}
      width={220}
      className="bg-black text-white fixed top-0 left-0 h-screen z-50"
    >
      {/* Logo section */}
      <div className="h-16 bg-gray-900 flex items-center justify-center mb-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
      </div>

      {/* Menu items */}
      <Menu
        items={menuItems}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        className="bg-black text-white"
      ></Menu>
    </Sider>
  );
};

export default Sidebar;
