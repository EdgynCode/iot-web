import React, { useState, useEffect } from "react";
import { ListDetail } from "../list-detail/ListDetail";
import { Button, Drawer, Space, Tabs, Modal, Input, message, Spin } from "antd";
import { roleListAction, roleColumns } from "../../datas/role.d";
import { useRoleData } from "../../hooks/useRoleData";
import { useDispatch } from "react-redux";
import {
  getAllRoles,
  addRole,
  updateRole,
  deleteRole,
} from "../../redux/actions/roleAction";
import { v4 as uuidv4 } from "uuid";

const Role = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useRoleData();
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
    dispatch(addRole({ id: uuidv4(), name: newRoleName }))
      .unwrap()
      .then(() => {
        message.success("Thêm role mới thành công!");
        setOpenModal(false);
        dispatch(getAllRoles());
      })
      .catch(() => {
        message.error("Thêm role mới thất bại.");
      });
  };

  // ===================== XÓA ROLE (NHIỀU DÒNG) =====================
  const handleDeleteRole = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 Role để xóa");
      return;
    }
    try {
      const deletePromises = selectedRowKeys.map((key) =>
        dispatch(deleteRole(key)).unwrap()
      );
      await Promise.all(deletePromises);

      message.success("Xóa role thành công!");
      setSelectedRowKeys([]);
      setOpenModal(false);
      dispatch(getAllRoles());
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa role.");
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
    dispatch(updateRole({ id: editRoleId, name: editRoleName }))
      .unwrap()
      .then(() => {
        message.success("Cập nhật role thành công");
        setShowEditModal(false);
        dispatch(getAllRoles());
      })
      .catch((err) => {
        message.error("Cập nhật role thất bại: " + err);
      });
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

  return (
    <>
      <ListDetail
        title="Danh sách Role"
        actions={roleListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        data={roles}
        column={roleColumns(handleEditRole)}
        onSelectionChange={onSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
        <div className="mb-3">
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
          <div className="mb-3">
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
    </>
  );
};

export default Role;
