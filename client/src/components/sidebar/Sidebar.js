import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOutlined,
  ClockCircleOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal, message } from "antd";
import { SidebarButton } from "../SidebarButton";
import * as styles from "./index.css";
const { Sider } = Layout;

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    message.success("Đăng xuất thành công");

    navigate("/login");
    setIsModalVisible(false);
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };
  const menuItems = [
    {
      key: "/",
      label: (
        <SidebarButton
          to="/"
          label="Trang chủ"
          isActive={location.pathname === "/home"}
          isExpanded={isExpanded}
        />
      ),
      title: "Trang chủ",
      icon: <HomeOutlined />,
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
      title: "Bài học",
      icon: <BookOutlined />,
    },
    {
      key: "/edit",
      label: (
        <SidebarButton
          to="/edit"
          label="Bài thi"
          isActive={location.pathname === "/edit"}
          isExpanded={isExpanded}
        />
      ),
      title: "Bài thi",
      icon: <EditOutlined />,
    },
    {
      key: "/students",
      label: (
        <SidebarButton
          to="/students"
          label="Học sinh"
          isActive={location.pathname === "/students"}
          isExpanded={isExpanded}
        />
      ),
      title: "Học sinh",
      icon: <UserOutlined />,
    },
    {
      key: "/timer",
      label: (
        <SidebarButton
          to="/timer"
          label="Bài thực hành"
          isActive={location.pathname === "/timer"}
          isExpanded={isExpanded}
        />
      ),
      title: "Bài thực hành",
      icon: <ClockCircleOutlined />,
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
      title: "Thiết bị",
      icon: <ThunderboltOutlined />,
    },
    {
      key: "/logout",
      label: (
        <div onClick={showLogoutModal}>
          <SidebarButton
            label="Đăng xuất"
            isActive={false}
            isExpanded={isExpanded}
          />
        </div>
      ),
      title: "Đăng xuất",
      icon: <LogoutOutlined />,
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={!isExpanded}
        onCollapse={toggleSidebar}
        className="bg-transparent fixed"
      >
        {/* Logo section  */}
        <div
          className={`${
            isExpanded ? "justify-start gap-3 mx-3 " : "justify-center"
          } my-7 flex items-center transition-all duration-300 ease-in-out`}
        >
          <div className="w-10 h-10 bg-gray-700 rounded-full transition-all ease-in-out duration-300"></div>
          {isExpanded && (
            <p className="transition-opacity transform ease-in-out duration-500 opacity-100">
              LOGO
            </p>
          )}
        </div>
        {/* Menu items */}
        <Menu items={menuItems} className="bg-transparent" />
      </Sider>

      {/* Logout confirmation modal */}
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
    </>
  );
};

export default Sidebar;
