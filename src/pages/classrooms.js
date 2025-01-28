import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListDetail } from "../components/list-detail/ListDetail";
import { Modal, Button, Spin, Input, Form, message } from "antd";
import {
  classroomAction,
  classroomColumns,
  gradeFilter,
} from "../datas/classroom.d";
import {
  getAllClassrooms,
  addNewClassroom,
  removeClassroom,
} from "../redux/actions/classroomAction";

const Classrooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const classroomState = useSelector((state) => state.classrooms || {});
  const { data: classroomData = [], error = null } = classroomState;

  useEffect(() => {
    dispatch(getAllClassrooms());
  }, [dispatch]);

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm lớp học":
        setModalType("addClass");
        break;
      case "Xóa lớp học":
        setModalType("removeClass");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  const handleAddClassroomSubmit = async (values) => {
    setLoading(true);
    dispatch(addNewClassroom(values.tenLop))
      .unwrap()
      .then(() => {
        message.success("Tạo lớp học thành công!");
        setOpen(false);
        dispatch(getAllClassrooms());
      })
      .catch(() => {
        message.error("Tạo lớp học thất bại.");
        setLoading(false);
      });
  };

  const handleDeleteClassroomSubmit = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 lớp học để xóa.");
      return;
    }

    try {
      const deletePromises = selectedRowKeys.map((key) =>
        dispatch(removeClassroom(key)).unwrap()
      );

      await Promise.all(deletePromises);

      message.success("Xóa lớp học thành công!");
      dispatch(getAllClassrooms());
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
    }
  };

  return (
    <>
      <ListDetail
        title="Danh sách lớp học"
        actions={classroomAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={gradeFilter}
        data={loading ? [] : classroomData}
        column={classroomColumns(navigate)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        title="Tạo lớp học"
        open={open && modalType === "addClass"}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          name="addClass"
          onFinish={handleAddClassroomSubmit}
          disabled={loading}
          className="space-y-4"
        >
          <Form.Item
            name="tenLop"
            rules={[{ required: true, message: "Vui lòng nhập vào tên lớp!" }]}
          >
            <Input placeholder="Tên lớp" className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Button
                className="bg-red-400 text-white"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-400">
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xóa lớp học"
        open={open && modalType === "removeClass"}
        okText="Xóa"
        cancelText="Hủy"
        onOk={handleDeleteClassroomSubmit}
        onCancel={() => setOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa lớp học này không?</p>
      </Modal>
    </>
  );
};

export default Classrooms;
