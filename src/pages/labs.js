import React, { useEffect, useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import { labAction, labColumns, labFilter } from "../datas/lab.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Modal, Input, Form, Button, message } from "antd";
import { getAllLabs, createLab, deleteLabs } from "../redux/actions/labAction";

const Labs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const labState = useSelector((state) => state.labs || {});
  const { data: labData = [], loading = false, error = null } = labState;

  useEffect(() => {
    dispatch(getAllLabs());
  }, [dispatch]);

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleFormSubmit = async (value) => {
    form.validateFields();
    const data = {
      name: value.name,
      pathImage: value.pathImage,
    };
    dispatch(createLab(data))
      .unwrap()
      .then(() => {
        console.log("Submitted values:", value);
        message.success("Tạo bài thí nghiệm thành công!");
        closeModal();
        dispatch(getAllLabs());
      })
      .catch(() => {
        message.error("Tạo bài thí nghiệm thất bại.");
      });
  };

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 thí nghiệm để xóa.");
      return;
    }

    dispatch(deleteLabs(selectedRowKeys))
      .unwrap()
      .then(() => {
        message.success("Xóa bài thí nghiệm thành công!");
        dispatch(getAllLabs());
      })
      .catch(() => {
        message.error("Xóa bài thí nghiệm thất bại.");
      });
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm bài thí nghiệm":
        setModalType("add");
        break;
      case "Xóa bài thí nghiệm":
        setModalType("remove");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Bài thực hành"
        actions={labAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={labFilter}
        data={loading ? [] : labData}
        // data={loading ? [] : fakeData}
        column={labColumns(navigate)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        title="Thêm bài thí nghiệm"
        open={open && modalType === "add"}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
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

      <Modal
        title="Xóa bài thí nghiệm"
        open={open && modalType === "remove"}
        okText="Xóa"
        cancelText="Hủy"
        onOk={handleDelete}
        onCancel={closeModal}
      >
        <p>Bạn có chắc chắn muốn xóa những bài thí nghiệm này không?</p>
      </Modal>
    </>
  );
};

export default Labs;
