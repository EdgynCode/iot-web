import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu, Modal, message } from "antd";
import "./index.css";
import { logout } from "../../redux/actions/authAction";
import {
  learnerSidebar,
  superAdminSidebar,
  teacherSidebar,
} from "../../datas/route.d";
import { jwtDecode } from "jwt-decode";
const { Sider } = Layout;

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const decode = user ? jwtDecode(user?.jwtAccessToken) : null;
  const role = decode ? decode.role : null;

  const routes =
    role === "SuperAdmin"
      ? superAdminSidebar
      : role === "Teacher"
      ? teacherSidebar
      : learnerSidebar;
  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    setLoading(true);

    dispatch(logout())
      .unwrap()
      .then(() => {
        localStorage.removeItem("isLoggedIn");
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
    label: <span>{route.title}</span>,
    title: route.title,
    icon: route.icon,
  }));

  return (
    <>
      <Sider className={`sider ${isExpanded && "visible"}`}>
        {/* Logo  */}
        <div className="div-logo">
          <a href="/">
            <div className="flex justify-center ">
              <img
                className="w-[60%]"
                alt="Auth Platform"
                src="/images/logo.png"
              />
            </div>
          </a>
        </div>
        <hr />
        {/* Account */}
        <div className="div">
          <div className="account-container">
            <a href="/account-detail">
              <img
                className="account-avatar"
                alt="avatar"
                src="/images/default.png"
              ></img>
            </a>
            <div className="account-info">
              <h6 className="account-name">{decode.unique_name}</h6>
              <h6 className="account-number">{decode.email}</h6>
              <p className="account-role">{decode.role}</p>
            </div>
          </div>
        </div>
        <hr />
        {/* Menu items */}
        <div className="div">
          <Menu
            items={menuItems}
            className="bg-transparent"
            onClick={({ key }) => {
              if (key === "logout") {
                showLogoutModal();
              } else {
                navigate(key);
              }
              setIsExpanded(false);
            }}
          />
        </div>
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
