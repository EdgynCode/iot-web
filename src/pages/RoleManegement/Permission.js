// src/pages/RoleManegement/Permission.js
import React, { useState, useEffect } from "react";
import { ListDetail } from "../../components/list-detail/ListDetail";
import { Button, Modal, Input, message, Spin } from "antd";
import RoleService from "../../redux/services/role.service";


const Permission = () => {
  // State quản lý danh sách quyền
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const [editPermissionDescription, setEditPermissionDescription] = useState("");

  // State cho multi-selection (chọn nhiều dòng để xóa)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    setLoading(true);
    RoleService.getAllPermissions()
      .then((data) => {
        setPermissions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  // Định nghĩa các cột cho bảng quyền
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Quyền",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditPermission(record)}>
            Sửa
          </Button>
          {/* Nếu cần, bạn có thể giữ nút xóa từng dòng. Tuy nhiên, ở đây chúng ta ưu tiên xóa nhiều dòng từ top-bar */}
          {/* <Button type="link" danger onClick={() => handleDeletePermission(record)}>
            Xóa
          </Button> */}
        </>
      ),
    },
  ];

  // Action hiển thị ở đầu bảng: Thêm và Xóa Quyền
  const permissionListAction = () => [
    { title: "Thêm Quyền" },
    { title: "Xóa Quyền" },
  ];

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
      onOk: async () => {
        try {
          for (const key of selectedRowKeys) {
            await RoleService.deletePermission(key);
          }
          message.success("Xóa quyền thành công!");
          setSelectedRowKeys([]);
          fetchPermissions();
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
    RoleService.addPermission(newPermissionName, newPermissionValue, newPermissionDescription)
      .then(() => {
        message.success("Thêm quyền thành công");
        setShowAddModal(false);
        fetchPermissions();
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
    RoleService.updatePermission(editPermissionId, editPermissionName, editPermissionValue)
      .then(() => {
        message.success("Cập nhật quyền thành công");
        setShowEditModal(false);
        fetchPermissions();
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
    <div style={{ marginTop: "20px" }}>
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ListDetail
        title="Danh sách Quyền"
        actions={permissionListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={[]}
        data={permissions}
        column={columns}
        onSelectionChange={(keys) => setSelectedRowKeys(keys)}
      />

      {/* Modal Thêm Quyền */}
      <Modal
        title="Thêm Quyền"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onOk={handleAddPermissionSubmit}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Tên Quyền: </label>
          <Input
            value={newPermissionName}
            onChange={(e) => setNewPermissionName(e.target.value)}
            placeholder="Nhập tên quyền"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
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
        <div style={{ marginBottom: "10px" }}>
          <label>ID: </label>
          <Input value={editPermissionId} disabled />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Tên Quyền: </label>
          <Input
            value={editPermissionName}
            onChange={(e) => setEditPermissionName(e.target.value)}
            placeholder="Nhập tên quyền"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Giá trị: </label>
          <Input
            value={editPermissionValue}
            onChange={(e) => setEditPermissionValue(e.target.value)}
            placeholder="Nhập giá trị quyền"
          />
        </div>
        <div>
          <label>Mô tả: </label>
          <Input
            value={editPermissionDescription}
            onChange={(e) => setEditPermissionDescription(e.target.value)}
            placeholder="Nhập mô tả"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Permission;
