import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { SidebarButton } from "./sidebar-button/SidebarButton";
import * as styles from "./index.css";
import { logout } from "../../redux/slices/auth";

const { Sider } = Layout;

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    setLoading(true);

    dispatch(logout())
      .unwrap()
      .then(() => {
        message.success("Đăng xuất thành công");
        navigate("/login");
        window.location.reload();
      })
      .catch((error) => {
        message.error("Đăng xuất thất bại. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
        setIsModalVisible(false);
      });
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };

  const routeData = [
    { key: "/", title: "Trang chủ", icon: <HomeOutlined /> },
    { key: "/lessons", title: "Bài học", icon: <BookOutlined /> },
    { key: "/edit", title: "Bài thi", icon: <EditOutlined /> },
    { key: "/students", title: "Học sinh", icon: <UserOutlined /> },
    { key: "/timer", title: "Bài thực hành", icon: <ClockCircleOutlined /> },
    { key: "/devices", title: "Thiết bị", icon: <ThunderboltOutlined /> },
    { key: "/logout", title: "Đăng xuất", icon: <LogoutOutlined /> },
  ];

  const menuItems = routeData.map((route) => ({
    key: route.key,
    label: (
      <SidebarButton
        to={route.key}
        label={route.title}
        isActive={location.pathname === route.key}
        isExpanded={isExpanded}
      />
    ),
    title: route.title,
    icon: route.icon,
  }));

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
        <div className="absolute inset-0 bg-black/10 backdrop-blur-md -z-10"></div>
        {/* Logo section  */}
        <div
          className={`${
            isExpanded ? "justify-start gap-3 mx-3 " : "justify-center"
          } z-10 my-7 flex items-center transition-all duration-300 ease-in-out`}
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
        confirmLoading={loading}
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
