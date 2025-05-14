import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { createSemester } from "../redux/actions/semesterAction";
import { useClassroomData } from "../hooks/useClassroomData";
import { getLearnersByClassId } from "../redux/actions/learnerAction";

const Classrooms = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedYear, setSelectedYear] = useState("Năm học");
  const [selectedSemester, setSelectedSemester] = useState("Học kì");

  const { classrooms, loading, error } = useClassroomData();

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
    dispatch(addNewClassroom(values.tenLop))
      .unwrap()
      .then(() => {
        message.success("Tạo lớp học thành công!");
        setOpen(false);
        form.resetFields();
        dispatch(getAllClassrooms());
      })
      .catch(() => {
        message.error("Tạo lớp học thất bại.");
      });
  };

  const handleDeleteClassroomSubmit = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 lớp học để xóa.");
      return;
    }

    try {
      for (const key of selectedRowKeys) {
        const isClassEmpty = await dispatch(getLearnersByClassId(key)).unwrap();
        if (isClassEmpty.length > 0) {
          message.warning(`Lớp học ${key} chứa học sinh, không thể xóa.`);
          continue;
        }

        await dispatch(removeClassroom(key)).unwrap();
        message.success(`Xóa lớp học ${key} thành công!`);
      }

      setOpen(false);
      dispatch(getAllClassrooms());
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
    }
  };

  const handleAddSemesterSubmit = async (values) => {
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
              switch (filter.key) {
                case "Year":
                  handleYearChange(option.key);
                  break;
                case "Semester":
                  handleSemesterChange(option.key);
                  break;
                default:
                  console.warn("Unhandled filter key:", filter.key);
              }
            },
          })),
        }))}
        data={loading ? [] : classrooms}
        column={classroomColumns()}
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
          form={form}
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
