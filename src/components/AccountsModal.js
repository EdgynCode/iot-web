import React from "react";
import { Modal, Upload, Button, Radio, Input, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import RegisterForm from "../components/RegisterForm";

const AccountsModal = ({
  open,
  setOpen,
  modalType,
  handleModalOk,
  handleModalCancel,
  handleCreateAccount,
  handleExport,
  handleDeleteAccount,
  handleAssignAccounts,
  file,
  setFile,
  exportType,
  setExportType,
  fileName,
  setFileName,
  form,
  classrooms,
  isClassroomLoading,
  loading,
}) => {
  return (
    <>
      <Modal
        title="Thêm người học vào lớp"
        open={open && modalType === "assignToClass"}
        onOk={handleAssignAccounts}
        onCancel={handleModalCancel}
        okText="Thêm vào lớp"
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="assignToClass"
          onFinish={handleAssignAccounts}
          className="space-y-4"
        >
          <Form.Item
            name="class"
            label="Lớp"
            rules={[{ required: true, message: "Vui lòng chọn lớp!" }]}
          >
            <Select
              allowClear
              className="w-full"
              loading={isClassroomLoading}
              options={classrooms.map((classroom) => ({
                value: classroom.id,
                label: classroom.tenLop,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm danh sách tài khoản"
        open={open && modalType === "importAccount"}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Tải lên"
        cancelText="Hủy"
      >
        <Upload
          accept=".xlsx,.xls"
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Chọn File</Button>
        </Upload>
      </Modal>

      <Modal
        title="Tạo tài khoản"
        open={open && modalType === "createAccount"}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Hủy
          </Button>,
        ]}
      >
        <RegisterForm
          loading={loading}
          onFinish={handleCreateAccount}
          setOpen={setOpen}
        />
      </Modal>

      <Modal
        title="Xuất dữ liệu"
        open={open && modalType === "export"}
        onOk={handleExport}
        onCancel={handleModalCancel}
        okText="Xuất dữ liệu"
        cancelText="Hủy"
      >
        <Radio.Group
          onChange={(e) => setExportType(e.target.value)}
          value={exportType}
        >
          <Radio value="pdf">File PDF</Radio>
          <Radio value="excel">File Excel</Radio>
        </Radio.Group>
        <Form.Item label="Nhập tên file">
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Form.Item>
      </Modal>

      <Modal
        title="Xóa tài khoản"
        open={open && modalType === "deleteAccount"}
        okText="Xóa"
        cancelText="Hủy"
        onOk={handleDeleteAccount}
        onCancel={handleModalCancel}
      >
        <p>Bạn có chắc chắn muốn xóa những tài khoản này không?</p>
      </Modal>
    </>
  );
};

export default AccountsModal;
