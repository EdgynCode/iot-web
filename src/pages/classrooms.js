import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListDetail } from "../components/list-detail/ListDetail";
import { Modal, Button, Spin, Input, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
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
import {
  createSemester,
  removeSemester,
} from "../redux/actions/semesterAction";

const Classrooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedYear, setSelectedYear] = useState("Năm học");
  const [selectedSemester, setSelectedSemester] = useState("Học kì");
  const [loading, setLoading] = useState(false);

  const classroomState = useSelector((state) => state.classrooms || {});
  const { data: classroomData = [], error = null } = classroomState;

  useEffect(() => {
    dispatch(getAllClassrooms());
  }, [dispatch]);

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleYearChange = (key) => {
    const year = key === "23-24" ? "2023-2024" : "2024-2025";
    setSelectedYear(year);
  };

  const handleSemesterChange = (key) => {
    const semester = key === "1" ? "Học kì 1" : "Học kì 2";
    setSelectedSemester(semester);
  };

  const handleActionClick = (action) => {
    switch (action.key) {
      case 1:
        setModalType("addClass");
        break;
      case 2:
        setModalType("removeClass");
        break;
      case 3:
        setModalType("addSemester");
        break;
      case 4:
        setModalType("removeSemester");
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
      setOpen(false);
      dispatch(getAllClassrooms());
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
    }
  };

  const handleAddSemesterSubmit = async (values) => {
    setLoading(true);

    const data = {
      tenHocKy: values.tenHocKy,
      nameHoc: values.nameHoc,
      notes: values.notes,
    };
    dispatch(createSemester(data))
      .unwrap()
      .then(() => {
        message.success("Tạo học kì thành công!");
        setOpen(false);
        dispatch(getAllClassrooms());
      })
      .catch(() => {
        message.error("Tạo học kì thất bại.");
        setLoading(false);
      });
  };

  return (
    <>
      <ListDetail
        title="Danh sách lớp học"
        actions={classroomAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={gradeFilter.map((filter) => ({
          ...filter,
          label:
            filter.key === "Year"
              ? selectedYear
              : filter.key === "Semester"
              ? selectedSemester
              : filter.label,
          options: filter.options.map((option) => ({
            ...option,
            onClick: () => {
              if (filter.key === "Year") {
                handleYearChange(option.key);
              } else if (filter.key === "Semester") {
                handleSemesterChange(option.key);
              }
            },
          })),
        }))}
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
            label="Tên lớp"
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

      <Modal
        title="Thêm học kì"
        open={open && modalType === "addSemester"}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          name="addSemester"
          onFinish={handleAddSemesterSubmit}
          disabled={loading}
          className="space-y-4"
        >
          <Form.Item
            name="tenHocKy"
            label="Tên học kỳ"
            rules={[
              { required: true, message: "Vui lòng nhập vào tên học kỳ!" },
            ]}
          >
            <Input placeholder="Tên học kỳ" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="nameHoc"
            label="Năm học"
            rules={[{ required: true, message: "Vui lòng nhập vào năm học!" }]}
          >
            <Input placeholder="Năm học" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Ghi chú"
            rules={[{ required: true, message: "Vui lòng nhập vào năm học!" }]}
          >
            <TextArea placeholder="Ghi chú" />
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
    </>
  );
};

export default Classrooms;
