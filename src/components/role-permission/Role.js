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

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Các dòng được chọn (để xóa nhiều)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
    </>
  );
};

export default Role;
