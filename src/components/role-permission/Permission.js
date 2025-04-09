import React, { useState, useEffect } from "react";
import { ListDetail } from "../list-detail/ListDetail";
import { Modal, Input, message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { usePermissionData } from "../../hooks/usePermissionData";
import {
  permissionListAction,
  permissionColumns,
} from "../../datas/permission.d";
import {
  addPermission,
  deletePermission,
  getAllPermissions,
  updatePermission,
} from "../../redux/actions/permissionAction";

const Permission = () => {
  const dispatch = useDispatch();
  // State quản lý danh sách quyền
  const { permissions, loading, error } = usePermissionData();

  // State cho Modal Thêm Quyền
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [newPermissionValue, setNewPermissionValue] = useState("");
  const [newPermissionDescription, setNewPermissionDescription] = useState("");

  // State cho Modal Sửa Quyền
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPermissionId, setEditPermissionId] = useState("");
  const [editPermissionName, setEditPermissionName] = useState("");
  const [editPermissionValue, setEditPermissionValue] = useState("");
  const [editPermissionDescription, setEditPermissionDescription] =
    useState("");

  // State cho multi-selection (chọn nhiều dòng để xóa)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Xử lý khi nhấn vào từng action trên top-bar
  const handleActionClick = (action) => {
    if (action.title === "Thêm Quyền") {
      setNewPermissionName("");
      setNewPermissionValue("");
      setNewPermissionDescription("");
      setShowAddModal(true);
    } else if (action.title === "Xóa Quyền") {
      handleDeleteSelectedPermissions();
    }
  };

  // Xử lý xóa nhiều dòng quyền được chọn
  const handleDeleteSelectedPermissions = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 quyền để xóa.");
      return;
    }
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa các quyền đã chọn không?",
      // chưa sử dụng được xóa quyền
      onOk: async () => {
        try {
          const deletePromises = selectedRowKeys.map((key) =>
            dispatch(deletePermission(key)).unwrap()
          );
          await Promise.all(deletePromises);

          message.success("Xóa quyền thành công!");
          setSelectedRowKeys([]);
          dispatch(getAllPermissions());
        } catch (err) {
          message.error("Xóa quyền thất bại: " + err);
        }
      },
    });
  };

  // Xử lý mở modal sửa quyền
  const handleEditPermission = (record) => {
    setEditPermissionId(record.id);
    setEditPermissionName(record.name);
    setEditPermissionValue(record.value);
    setEditPermissionDescription(record.description);
    setShowEditModal(true);
  };

  // Xử lý submit thêm quyền
  const handleAddPermissionSubmit = () => {
    if (!newPermissionName || !newPermissionValue) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    dispatch(
      addPermission({
        name: newPermissionName,
        value: newPermissionValue,
        description: newPermissionDescription,
      })
    )
      .unwrap()
      .then(() => {
        message.success("Thêm quyền thành công");
        setShowAddModal(false);
        dispatch(getAllPermissions());
      })
      .catch((err) => {
        message.error("Thêm quyền thất bại: " + err);
      });
  };

  // Xử lý submit sửa quyền
  const handleEditPermissionSubmit = () => {
    if (!editPermissionId || !editPermissionName || !editPermissionValue) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    dispatch(
      updatePermission({
        id: editPermissionId,
        name: editPermissionName,
        value: editPermissionValue,
      })
    )
      .unwrap()
      .then(() => {
        message.success("Cập nhật quyền thành công");
        setShowEditModal(false);
        dispatch(getAllPermissions());
      })
      .catch((err) => {
        message.error("Cập nhật quyền thất bại: " + err);
      });
  };

  // Override placeholder cho ô tìm kiếm trong ListDetail (nếu cần)
  useEffect(() => {
    const searchInput = document.querySelector(".tab-header input");
    if (searchInput) {
      searchInput.placeholder = "Tìm kiếm theo tên vai trò";
    }
  }, []);

  return (
    <>
      <ListDetail
        title="Danh sách Quyền"
        actions={permissionListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={[]}
        data={permissions}
        column={permissionColumns(handleEditPermission)}
        onSelectionChange={(keys) => setSelectedRowKeys(keys)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Modal Thêm Quyền */}
      <Modal
        title="Thêm Quyền"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={handleAddPermissionSubmit}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div className="mb-3">
          <label>Tên Quyền: </label>
          <Input
            value={newPermissionName}
            onChange={(e) => setNewPermissionName(e.target.value)}
            placeholder="Nhập tên quyền"
          />
        </div>
        <div className="mb-3">
          <label>Giá trị: </label>
          <Input
            value={newPermissionValue}
            onChange={(e) => setNewPermissionValue(e.target.value)}
            placeholder="Nhập giá trị quyền"
          />
        </div>
        <div>
          <label>Mô tả: </label>
          <Input
            value={newPermissionDescription}
            onChange={(e) => setNewPermissionDescription(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </div>
      </Modal>

      {/* Modal Sửa Quyền */}
      <Modal
        title="Sửa Quyền"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        onOk={handleEditPermissionSubmit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <div className="mb-3">
          <label>ID: </label>
          <Input value={editPermissionId} disabled />
        </div>
        <div className="mb-3">
          <label>Tên Quyền: </label>
          <Input
            value={editPermissionName}
            onChange={(e) => setEditPermissionName(e.target.value)}
            placeholder="Nhập tên quyền"
          />
        </div>
        <div className="mb-3">
          <label>Giá trị: </label>
          <Input
            value={editPermissionValue}
            onChange={(e) => setEditPermissionValue(e.target.value)}
            placeholder="Nhập giá trị quyền"
          />
        </div>
        <div className="mb-3">
          <label>Mô tả: </label>
          <Input
            value={editPermissionDescription}
            onChange={(e) => setEditPermissionDescription(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </div>
      </Modal>
    </>
  );
};

export default Permission;
