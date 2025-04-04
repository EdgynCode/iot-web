// src/pages/RoleAndPermission.js
import React, { useState, useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import { Button, Drawer, Space, Tabs, Modal, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import RoleService from "../redux/services/role.service";

const RoleAndPermission  = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // State cho modal thêm role
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoleId, setNewRoleId] = useState("");
  const [newRoleName, setNewRoleName] = useState("");

  // State cho modal sửa role
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [editRoleName, setEditRoleName] = useState("");

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

  // Định nghĩa các cột cho bảng, bao gồm các hành động: Xem, Sửa, Xóa
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Role",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewRole(record)}>
            Xem
          </Button>
          <Button type="link" onClick={() => handleEditRole(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDeleteRole(record)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // Hành động cấp đầu bảng: Thêm Role
  const actions = [
    {
      title: "Thêm Role",
      onClick: () => {
        setNewRoleId("");
        setNewRoleName("");
        setShowAddModal(true);
      },
    },
  ];

  const handleViewRole = (record) => {
    setSelectedRole(record);
    setOpenDrawer(true);
  };

  const handleEditRole = (record) => {
    setEditRoleId(record.id);
    setEditRoleName(record.name);
    setShowEditModal(true);
  };

  const handleDeleteRole = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa role "${record.name}" không?`,
      onOk: () => {
        RoleService.deleteRole(record.id)
          .then(() => {
            message.success("Xóa role thành công");
            fetchRoles();
          })
          .catch((err) => {
            message.error("Xóa role thất bại: " + err);
          });
      },
    });
  };

  const handleAddRoleSubmit = () => {
    if (!newRoleId || !newRoleName) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    RoleService.addRole(newRoleId, newRoleName)
      .then(() => {
        message.success("Thêm role thành công");
        setShowAddModal(false);
        fetchRoles();
      })
      .catch((err) => {
        message.error("Thêm role thất bại: " + err);
      });
  };

  const handleEditRoleSubmit = () => {
    if (!editRoleId || !editRoleName) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    RoleService.updateRole(editRoleId, editRoleName)
      .then(() => {
        message.success("Cập nhật role thành công");
        setShowEditModal(false);
        fetchRoles();
      })
      .catch((err) => {
        message.error("Cập nhật role thất bại: " + err);
      });
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Cấu hình các tab trong Drawer để hiển thị chi tiết của role đã chọn
  const items = [
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

  // Dùng useEffect để ghi đè placeholder của Input trong ListDetail
  useEffect(() => {
    // Giả sử chỉ có 1 Input trong ListDetail, chúng ta sẽ chọn theo class hoặc vị trí của thẻ Input
    const searchInput = document.querySelector(".tab-header input");
    if (searchInput) {
      searchInput.placeholder = "Tìm kiếm theo tên vai trò";
    }
  }, []);

  return (
    <>
      <ListDetail
        title="Danh sách Role"
        actions={actions}
        filters={[]}
        data={roles}
        column={columns}
      />

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
        <Tabs tabPosition="left" items={items} />
      </Drawer>

      {/* Modal Thêm Role */}
      <Modal
        title="Thêm Role"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={handleAddRoleSubmit}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div style={{ marginBottom: "10px" }}>
          <label>ID: </label>
          <Input
            value={newRoleId}
            onChange={(e) => setNewRoleId(e.target.value)}
            placeholder="Nhập ID role"
          />
        </div>
        <div>
          <label>Tên Role: </label>
          <Input
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            placeholder="Nhập tên role"
          />
        </div>
      </Modal>

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
    </>
  );
};

export default RoleAndPermission;
