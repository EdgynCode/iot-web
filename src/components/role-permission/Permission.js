import React, { useState, useEffect } from "react";
import { ListDetail } from "../list-detail/ListDetail";
import { Modal, Input, message, Spin, Form } from "antd";
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
  const { permissions, loading, error } = usePermissionData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPermissionId, setEditPermissionId] = useState("");

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleActionClick = (action) => {
    if (action.title === "Thêm Quyền") {
      addForm.resetFields();
      setShowAddModal(true);
    } else if (action.title === "Xóa Quyền") {
      handleDeleteSelectedPermissions();
    }
  };

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

  const handleEditPermission = (record) => {
    setEditPermissionId(record.id);
    editForm.setFieldsValue({
      name: record.name,
      value: record.value,
      description: record.description,
    });
    setShowEditModal(true);
  };

  const handleAddPermissionSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        dispatch(addPermission(values))
          .unwrap()
          .then(() => {
            message.success("Thêm quyền thành công");
            setShowAddModal(false);
            dispatch(getAllPermissions());
          })
          .catch((err) => {
            message.error("Thêm quyền thất bại: " + err);
          });
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin");
      });
  };

  const handleEditPermissionSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        dispatch(
          updatePermission({
            id: editPermissionId,
            ...values,
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
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin");
      });
  };

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
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="Tên Quyền"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}
          >
            <Input placeholder="Nhập tên quyền" />
          </Form.Item>
          <Form.Item
            label="Giá trị"
            name="value"
            rules={[{ required: true, message: "Vui lòng nhập giá trị quyền" }]}
          >
            <Input placeholder="Nhập giá trị quyền" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
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
        <Form form={editForm} layout="vertical">
          <Form.Item label="ID">
            <Input value={editPermissionId} disabled />
          </Form.Item>
          <Form.Item
            label="Tên Quyền"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}
          >
            <Input placeholder="Nhập tên quyền" />
          </Form.Item>
          <Form.Item
            label="Giá trị"
            name="value"
            rules={[{ required: true, message: "Vui lòng nhập giá trị quyền" }]}
          >
            <Input placeholder="Nhập giá trị quyền" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Permission;
