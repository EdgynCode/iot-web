import React, { useEffect, useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import { labAction, labColumns, labFilter } from "../datas/lab.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Modal, Input, Form, Button } from "antd";
import { getAllLabs } from "../redux/actions/labAction";

const Labs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const labState = useSelector((state) => state.labs || {});
  const { data: labData = [], loading = false, error = null } = labState;

  useEffect(() => {
    dispatch(getAllLabs);
  }, [dispatch]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const labActionWithModal = labAction.map((action) => {
    if (action.title === "Thêm bài thí nghiệm") {
      return {
        ...action,
        onClick: () => action.onClick(openModal),
      };
    }
    return action;
  });

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Submitted values:", values);
        closeModal();
        // Add logic to handle form submission (e.g., dispatch an action or update state)
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  return (
    <>
      <ListDetail
        title="Bài thực hành"
        actions={labActionWithModal}
        filters={labFilter}
        data={loading ? [] : labData}
        column={labColumns(navigate)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        title="Thêm bài thí nghiệm"
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="labName"
            label="Tên bài thí nghiệm"
            rules={[
              { required: true, message: "Vui lòng nhập tên bài thí nghiệm!" },
            ]}
          >
            <Input placeholder="Nhập tên bài thí nghiệm" />
          </Form.Item>
          <Form.Item
            name="pathImage"
            label="Đường dẫn ảnh"
            rules={[
              { required: true, message: "Vui lòng nhập đường dẫn ảnh!" },
            ]}
          >
            <Input placeholder="Nhập đường dẫn ảnh (local hoặc internet)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={closeModal}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Labs;
