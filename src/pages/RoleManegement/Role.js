// src/pages/RoleManegement/Role.js
import React, { useState, useEffect } from "react";
import { ListDetail } from "../../components/list-detail/ListDetail";
import { Button, Drawer, Space, Tabs, Modal, Input, message, Spin } from "antd";
import RoleService from "../../redux/services/role.service";
import Permission from "./Permission"; // Component Permission cùng thư mục

const Role = () => {
  // Danh sách role
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drawer hiển thị chi tiết Role
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRole] = useState(null);

  // State cho form Thêm Role
  const [newRoleName, setNewRoleName] = useState("");

  // Modal chính (dùng chung cho Thêm/Xóa)
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // State cho Modal Sửa Role
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [editRoleName, setEditRoleName] = useState("");

  // Các dòng được chọn (để xóa nhiều)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    setLoading(true);
    RoleService.getAllRoles()
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  // ===================== CẤU HÌNH BẢNG & HÀNH ĐỘNG =====================
  // Cột bảng (giữ lại nút Xem, Sửa; bỏ nút Xóa để xóa nhiều dòng bằng action)
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vai trò",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditRole(record)}>
            Sửa
          </Button>
          {/* Xóa row-level có thể bỏ, vì đã có xóa nhiều ở top-bar */}
        </>
      ),
    },
  ];

  // Hai nút “Thêm Role” và “Xóa Role” ở top-bar
  const roleListAction = () => [
    {
      title: "Thêm Role",
    },
    {
      title: "Xóa Role",
    },
  ];

  // Khi click vào mỗi action
  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm Role":
        setModalType("addRole");
        setNewRoleName("");
        break;
      case "Xóa Role":
        setModalType("deleteRole");
        break;
      default:
        console.log("Hành động không hợp lệ");
    }
    setOpenModal(true);
  };

  // ===================== THÊM ROLE =====================
  const handleAddRoleSubmit = async () => {
    if (!newRoleName) {
      message.warning("Vui lòng nhập tên role");
      return;
    }
    try {
      await RoleService.addRole(undefined, newRoleName);
      message.success("Thêm role thành công");
      setOpenModal(false);
      fetchRoles();
    } catch (err) {
      message.error("Thêm role thất bại: " + err);
    }
  };

  // ===================== XÓA ROLE (NHIỀU DÒNG) =====================
  const handleDeleteRole = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 Role để xóa");
      return;
    }
    try {
      for (const key of selectedRowKeys) {
        await RoleService.deleteRole(key);
      }
      message.success("Xóa Role thành công!");
      setSelectedRowKeys([]);
      setOpenModal(false);
      fetchRoles();
    } catch (err) {
      message.error("Xóa role thất bại: " + err);
    }
  };

  // ===================== SỬA ROLE =====================
  const handleEditRole = (record) => {
    setEditRoleId(record.id);
    setEditRoleName(record.name);
    setShowEditModal(true);
  };
  const handleEditRoleSubmit = async () => {
    if (!editRoleId || !editRoleName) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      await RoleService.updateRole(editRoleId, editRoleName);
      message.success("Cập nhật role thành công");
      setShowEditModal(false);
      fetchRoles();
    } catch (err) {
      message.error("Cập nhật role thất bại: " + err);
    }
  };

  // ===================== XEM CHI TIẾT ROLE =====================
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // ===================== SELECTION (CHỌN NHIỀU) =====================
  const onSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  // ===================== CẤU HÌNH DRAWER VÀ TABS =====================
  const drawerItems = [
    {
      label: "Thông tin chi tiết",
      key: "1",
      children: (
        <div>
          <p>
            <strong>ID:</strong> {selectedRole?.id}
          </p>
          <p>
            <strong>Tên Role:</strong> {selectedRole?.name}
          </p>
        </div>
      ),
    },
    {
      label: "Các hành động khác",
      key: "2",
      children: <p>Placeholder cho các hành động hoặc thông tin bổ sung.</p>,
    },
  ];

  // Override placeholder của ô tìm kiếm nếu muốn
  useEffect(() => {
    const searchInput = document.querySelector(".tab-header input");
    if (searchInput) {
      searchInput.placeholder = "Tìm kiếm theo tên vai trò";
    }
  }, []);

  // ===================== GIAO DIỆN TAB "VAI TRÒ" =====================
  const roleManagementContent = (
    <div style={{ marginTop: "20px" }}>
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ListDetail
        title="Danh sách Role"
        actions={roleListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={[]}
        data={roles}
        column={columns}
        onSelectionChange={onSelectionChange}
      />

      {/* Drawer chi tiết Role */}
      <Drawer
        title={
          <p className="text-[#959597] font-semibold font-inter">
            Chi tiết Role: {selectedRole?.name}
          </p>
        }
        placement="right"
        size="large"
        onClose={onCloseDrawer}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Đóng</Button>
          </Space>
        }
      >
        <Tabs tabPosition="left" items={drawerItems} />
      </Drawer>

      {/* Modal Sửa Role */}
      <Modal
        title="Sửa Role"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        onOk={handleEditRoleSubmit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <div style={{ marginBottom: "10px" }}>
          <label>ID: </label>
          <Input value={editRoleId} disabled />
        </div>
        <div>
          <label>Tên Role: </label>
          <Input
            value={editRoleName}
            onChange={(e) => setEditRoleName(e.target.value)}
            placeholder="Nhập tên role"
          />
        </div>
      </Modal>

      {/* Modal dùng chung cho Thêm / Xóa Role */}
      <Modal
        title={modalType === "addRole" ? "Thêm Role" : "Xóa Role"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={modalType === "addRole" ? handleAddRoleSubmit : handleDeleteRole}
        okText={modalType === "addRole" ? "Thêm" : "Xóa"}
        okType={modalType === "addRole" ? "default" : "danger"}
        cancelText="Hủy"
      >
        {modalType === "addRole" ? (
          // Form thêm Role
          <div>
            <label>Tên Role: </label>
            <Input
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Nhập tên role"
            />
          </div>
        ) : (
          // Nội dung xác nhận xóa Role
          <p>Bạn có chắc chắn muốn xóa Role đã chọn không?</p>
        )}
      </Modal>
    </div>
  );

  // ===================== TAB CHÍNH: VAI TRÒ / QUYỀN HẠN =====================
  const [activeTab, setActiveTab] = useState("Vai trò");
  const tabItems = [
    {
      key: "Vai trò",
      label: "Vai trò",
      children: roleManagementContent,
    },
    {
      key: "Quyền hạn",
      label: "Quyền hạn",
      children: (
        <div style={{ marginTop: "20px" }}>
          <Permission />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={tabItems}
        type="card"
      />
    </div>
  );
};

export default Role;
