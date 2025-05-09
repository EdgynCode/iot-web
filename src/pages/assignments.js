import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DatePicker,
  TimePicker,
  Form,
  Modal,
  Select,
  Button,
  message,
  Input,
  Upload,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { ListDetail } from "../components/list-detail/ListDetail";
import { assignmentAction, AssignmentColumns } from "../datas/assignment.d";
import { useAssignmentData } from "../hooks/useAssignmentData";
import { useClassroomData } from "../hooks/useClassroomData";
import {
  createAssignment,
  getAllAssignments,
  removeAssignment,
} from "../redux/actions/assignmentAction";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const Assignments = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { assignments, loading, error } = useAssignmentData();
  const { classrooms, loading: isClassroomLoading } = useClassroomData();

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("title", form.getFieldValue("title"));
    formData.append("description", form.getFieldValue("description"));
    formData.append(
      "dueDate",
      moment(
        form.getFieldValue("dueDate-date").format("YYYY-MM-DD") +
          "T" +
          form.getFieldValue("dueDate-time").format("HH:mm")
      ).format("YYYY-MM-DDTHH:mm:ss")
    );

    formData.append("lopHocId", form.getFieldValue("class"));
    if (file) {
      formData.append("formFile", file);
    }

    dispatch(createAssignment(formData))
      .unwrap()
      .then(() => {
        message.success("Tạo bài tập thành công");
        setOpen(false);
        dispatch(getAllAssignments());
      })
      .catch((error) => {
        message.error("Tạo bài tập thất bại.");
        console.error(error);
      });
  };

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 bài tập để xóa.");
      return;
    }

    try {
      const deletePromises = selectedRowKeys.map((key) =>
        dispatch(removeAssignment(key)).unwrap()
      );
      await Promise.all(deletePromises);
      message.success("Xóa bài tập thành công!");
      setOpen(false);
      dispatch(getAllAssignments());
    } catch (error) {
      message.error("Xóa bài tập thất bại.");
    }
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Tạo bài tập":
        setModalType("createAssignment");
        break;
      case "Xóa bài tập":
        setModalType("removeAssignment");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };
  return (
    <>
      <ListDetail
        title="Bài tập"
        actions={assignmentAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        data={loading ? [] : assignments}
        column={AssignmentColumns()}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        open={open && modalType === "createAssignment"}
        title={"Tạo bài tập"}
        cancelText={"Hủy"}
        okText={"Tạo"}
        onCancel={() => setOpen(false)}
        onOk={handleCreate}
      >
        <Form
          form={form}
          name="createAssignment"
          onFinish={handleCreate}
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Tên bài tập"
            rules={[{ required: true, message: "Vui lòng nhập tên bài tập!" }]}
          >
            <Input placeholder="Tên bài tập" />
          </Form.Item>
          <Form.Item
            name="class"
            label="Lớp"
            rules={[{ required: true, message: "Vui lòng chọn lớp!" }]}
          >
            <Select
              placeholder="Chọn lớp"
              allowClear
              className="w-full"
              loading={isClassroomLoading}
              options={
                classrooms
                  ? classrooms.map((classroom) => ({
                      value: classroom.id,
                      label: classroom.tenLop,
                    }))
                  : []
              }
              notFoundContent={
                !isClassroomLoading && !classrooms ? "Không có lớp nào" : null
              }
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Hướng dẫn"
            rules={[
              { required: true, message: "Hướng dẫn bài tập là bắt buộc" },
            ]}
          >
            <TextArea placeholder="Hướng dẫn" />
          </Form.Item>
          <div className="flex gap-6">
            <div className="w-full">
              <Form.Item
                label="Hạn chót"
                name="dueDate-time"
                rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              >
                <TimePicker
                  className="w-full"
                  format="HH:mm"
                  placeholder="Chọn thời gian"
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                name="dueDate-date"
                rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
              >
                <DatePicker
                  placeholder="Chọn ngày"
                  className="w-full"
                  format={"DD-MM-YYYY"}
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-full">
            <Form.Item name="formFile">
              <Upload
                accept=".pdf"
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Tải File hướng dẫn</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Xóa bài tập"
        open={open && modalType === "removeAssignment"}
        okText="Xóa"
        cancelText="Hủy"
        onOk={handleDelete}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>Bạn có chắc chắn muốn xóa những bài tập này không?</p>
      </Modal>
    </>
  );
};

export default Assignments;
