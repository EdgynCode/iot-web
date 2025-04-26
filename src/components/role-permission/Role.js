import React, { useState, useEffect } from "react";
import { ListDetail } from "../list-detail/ListDetail";
import {
  Button,
  Drawer,
  Space,
  Tabs,
  Modal,
  Input,
  message,
  Spin,
  Form,
  Select,
} from "antd";
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
import { usePermissionData } from "../../hooks/usePermissionData";
import { getUserRole } from "../../utils/getUserRole";
import { addPermissionsToRole } from "../../redux/actions/permissionAction";

const Role = () => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useRoleData();

  // Drawer hiển thị chi tiết Role
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRole] = useState(null);

  // Modal chính (dùng chung cho Thêm/Xóa)
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // State cho Modal Sửa Role
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");

  // State cho Modal thêm quyền
  const [roleName, setRoleName] = useState("");
  const [showAddPerModal, setShowAddPerModal] = useState(false);

  const [addPerForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Các dòng được chọn (để xóa nhiều)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { permissions, loading: isPerLoading } = usePermissionData();

  // Khi click vào mỗi action
  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm Role":
        setModalType("addRole");
        addForm.resetFields();
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
    addForm
      .validateFields()
      .then((values) => {
        dispatch(addRole({ id: uuidv4(), ...values }))
          .unwrap()
          .then(() => {
            message.success("Thêm role mới thành công!");
            setOpenModal(false);
            dispatch(getAllRoles());
          })
          .catch(() => {
            message.error("Thêm role mới thất bại.");
          });
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin");
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
    editForm.setFieldsValue({ name: record.name });
    setShowEditModal(true);
  };

  const handleEditRoleSubmit = async () => {
    editForm
      .validateFields()
      .then((values) => {
        dispatch(updateRole({ id: editRoleId, ...values }))
          .unwrap()
          .then(() => {
            message.success("Cập nhật role thành công");
            setShowEditModal(false);
            dispatch(getAllRoles());
          })
          .catch((err) => {
            message.error("Cập nhật role thất bại: " + err);
          });
      })
      .catch(() => {
        message.error("Vui lòng nhập đầy đủ thông tin");
      });
  };

  // ===================== THÊM PERMISSION VÀO ROLE =====================
  const handleAddPermission = async (roleName) => {
    setModalType("addPermission");
    setShowAddPerModal(true);
    addPerForm.setFieldsValue({ roleName });
    setRoleName(roleName);
  };

  const handleAddPermissionSubmit = async () => {
    try {
      const selectedValues = addPerForm.getFieldValue("permissions");
      const selectedPermissions = selectedValues.map((value) =>
        permissions.find((per) => per.name === value)
      );

      const data = {
        permissions: selectedPermissions.map((per) => ({
          name: per.name,
          value: per.value,
        })),
        roleName: roleName,
      };
      dispatch(addPermissionsToRole(data)).unwrap();
      message.success("Thêm phân quyền thành công!");
      dispatch(getAllRoles());
      setShowAddPerModal(false);
    } catch (error) {
      console.error("Lỗi khi thêm phân quyền:", error);
      message.error("Không thể thêm phân quyền. Vui lòng thử lại.");
    }
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
        column={roleColumns(handleEditRole, handleAddPermission)}
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
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={() => setOpenDrawer(false)}>Đóng</Button>
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
        <Form form={editForm} layout="vertical">
          <Form.Item label="ID">
            <Input value={editRoleId} disabled />
          </Form.Item>
          <Form.Item
            label="Tên Role"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên role" }]}
          >
            <Input placeholder="Nhập tên role" />
          </Form.Item>
        </Form>
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
          <Form form={addForm} layout="vertical">
            <Form.Item
              label="Tên Role"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên role" }]}
            >
              <Input placeholder="Nhập tên role" />
            </Form.Item>
          </Form>
        ) : (
          <p>Bạn có chắc chắn muốn xóa Role đã chọn không?</p>
        )}
      </Modal>

      {/* Modal dùng cho Thêm Quyền vào Role */}
      <Modal
        title="Thêm quyền"
        open={showAddPerModal && modalType === "addPermission"}
        onCancel={() => setShowAddPerModal(false)}
        onOk={handleAddPermissionSubmit}
        okText={"Thêm quyền"}
        cancelText="Hủy"
      >
        <Form
          form={addPerForm}
          name="addPermission"
          onFinish={handleAddPermissionSubmit}
          layout="vertical"
        >
          <Form.Item label="Tên Role" name="roleName">
            <Input disabled />
          </Form.Item>
          <Form.Item name="permissions" label="Phân quyền">
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              loading={isPerLoading}
              options={permissions.map((per) => ({
                value: per.name,
                label: per.name,
                data: { name: per.name, value: per.value },
              }))}
              notFoundContent={
                isPerLoading ? "Đang tải..." : "Không có phân quyền"
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Role;
