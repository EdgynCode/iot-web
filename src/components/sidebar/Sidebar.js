import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu, Modal, message } from "antd";
import "./index.css";
import { logout } from "../../redux/actions/authAction";
import {
  learnerRoute,
  masterAdminRoute,
  teacherRoute,
} from "../../datas/route.d";
const { Sider } = Layout;

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const roles = localStorage.getItem("roles");
  const routes =
    roles === "SuperAdmin"
      ? masterAdminRoute
      : roles === "Teacher"
      ? teacherRoute
      : learnerRoute;
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
      .catch(() => {
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

  const menuItems = routes.map((route) => ({
    key: route.key,
    label: isExpanded && <span>{route.title}</span>,
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
        <Menu
          items={menuItems}
          className="bg-transparent"
          onClick={({ key }) => {
            if (key === "/logout") {
              showLogoutModal();
            } else {
              navigate(key);
            }
          }}
        />
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
