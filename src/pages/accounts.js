import React, { useState, useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  accountAction,
  studentColumns,
  accountFilter,
} from "../datas/account.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Upload,
  Button,
  Spin,
  Radio,
  Input,
  Form,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createMultipleLearner,
  assignLearnerToClass,
} from "../redux/actions/learnerAction";
import { assignTeachersToClass } from "../redux/actions/teacherAction";
import { getAllClassrooms } from "../redux/actions/classroomAction";
import { listAllUsersByType, deleteUser } from "../redux/actions/userAction";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import RegisterForm from "../components/RegisterForm";

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [exportType, setExportType] = useState("pdf");
  const [fileName, setFileName] = useState("student_data");
  const [selectedAccountType, setSelectedAccountType] = useState("Learner");
  const [selectedAccountLabel, setSelectedAccountLabel] = useState("Học sinh");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const classrooms = useSelector((state) => state.classrooms.data || {});
  const studentsState = useSelector((state) => state.students || {});
  const isClassroomLoading = useSelector((state) => state.classrooms.loading);
  const { data: studentData = [], error = null } = studentsState;

  useEffect(() => {
    dispatch(listAllUsersByType(selectedAccountType));
    dispatch(getAllClassrooms());
  }, [dispatch, selectedAccountType, form]);

  const handleAccountTypeChange = (value) => {
    const accountType =
      value === "1" ? "Learner" : value === "2" ? "Teacher" : "";
    const accountLabel =
      accountType === "Learner"
        ? "Học sinh"
        : accountType === "Teacher"
        ? "Giáo viên"
        : "Loại tài khoản";
    setSelectedAccountType(accountType);
    setSelectedAccountLabel(accountLabel);
  };

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleExport = async () => {
    const formattedFileName = `${fileName}`;
    switch (exportType) {
      case "pdf":
        const doc = new jsPDF();
        doc.autoTable({
          head: [
            [
              "First Name",
              "Last Name",
              "Gender",
              "Date of Birth",
              "Username",
              "Email",
              "Phone Number",
            ],
          ],
          body: studentData.map((student) => [
            student.firstName,
            student.lastName,
            student.gender,
            student.doB,
            student.userName,
            student.email,
            student.phoneNumber,
          ]),
        });
        doc.save(`${formattedFileName}.pdf`);
        break;
      case "excel":
        const worksheet = XLSX.utils.json_to_sheet(studentData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        XLSX.writeFile(workbook, `${formattedFileName}.xlsx`);
        break;
      default:
        console.log("Invalid selection");
    }
  };

  const handleModalOk = () => {
    if (!file) {
      message.error("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const studentList = [];
      try {
        const workbook = XLSX.read(e.target.result, { type: "array" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Dispatch Redux actions
        data.forEach((row) => {
          const student = {
            id: uuidv4(),
            firstName: row["FirstName"],
            lastName: row["LastName"],
            gender: row["Gender"],
            doB: row["DoB"],
            userName: row["Username"],
            email: row["Email"],
            password: row["Password"],
            phoneNumber: row["PhoneNumber"],
            discriminator: "Learner",
          };
          studentList.push(student);
        });
        console.log(studentList);
        dispatch(createMultipleLearner(studentList));
        message.success("Students imported successfully!");
        dispatch(listAllUsersByType("Learner"));
        setFile(null);
        setOpen(false);
      } catch (error) {
        console.error("Error processing file:", error);
        message.error("Failed to process the file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDeleteAccount = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 tài khoản để xóa.");
      return;
    }

    try {
      const deletePromises = selectedRowKeys.map((key) =>
        dispatch(deleteUser(key)).unwrap()
      );

      await Promise.all(deletePromises);

      message.success("Xóa tài khoản thành công!");
      setOpen(false);
      dispatch(listAllUsersByType(selectedAccountType));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa tài khoản.");
    }
  };

  const handleAssignAccounts = async () => {
    const classId = form.getFieldValue("class");

    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 người học để thêm vào lớp.");
      return;
    }

    switch (selectedAccountType) {
      case "Learner":
        dispatch(assignLearnerToClass({ learners: selectedRowKeys, classId }))
          .unwrap()
          .then(() => {
            message.success("Thêm người học thành công!");
            setOpen(false);
          })
          .catch(() => {
            message.error("Thêm người học thất bại. Vui lòng thử lại.");
          });
        break;
      case "Teacher":
        dispatch(assignTeachersToClass({ teachers: selectedRowKeys, classId }))
          .unwrap()
          .then(() => {
            message.success("Thêm giáo viên thành công!");
            setOpen(false);
          })
          .catch(() => {
            message.error("Thêm giáo viên thất bại. Vui lòng thử lại.");
          });
        break;
      default:
        console.log("Invalid account type");
    }
  };

  const handleModalCancel = () => {
    setFile(null);
    setOpen(false);
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm người học/giáo viên vào lớp":
        setModalType("assignToClass");
        break;
      case "Thêm tài khoản":
        setModalType("createAccount");
        break;
      case "Thêm danh sách tài khoản":
        setModalType("importAccount");
        break;
      case "Xóa tài khoản":
        setModalType("deleteAccount");
        break;
      case "Xuất dữ liệu":
        setModalType("export");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Danh sách tài khoản"
        actions={accountAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={accountFilter.map((filter) => ({
          ...filter,
          label:
            filter.key === "AccountType" ? selectedAccountLabel : filter.label,
          options: filter.options.map((option) => ({
            ...option,
            onClick: () => handleAccountTypeChange(option.key),
          })),
        }))}
        data={loading ? [] : studentData}
        column={studentColumns(navigate)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Modal
        title="Thêm người học vào lớp"
        open={open && modalType === "assignToClass"}
        onOk={handleAssignAccounts}
        onCancel={() => setOpen(false)}
        okText="Thêm vào lớp"
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="assignToClass"
          onFinish={handleAssignAccounts}
          className="space-y-4"
        >
          <div className="w-full">
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
          </div>
        </Form>
      </Modal>
      <Modal
        title="Thêm danh sách tài khoản"
        open={open && modalType === "importAccount"}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Upload"
        cancelText="Cancel"
      >
        <Upload
          accept=".xlsx,.xls"
          beforeUpload={(file) => {
            console.log("Selected file:", file);
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>

      <Modal
        title="Tạo tài khoản"
        open={open && modalType === "createAccount"}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
        ]}
      >
        <RegisterForm
          loading={loading}
          setLoading={setLoading}
          setOpen={setOpen}
        />
      </Modal>

      <Modal
        title="Xuất dữ liệu"
        open={open && modalType === "export"}
        onOk={handleExport}
        onCancel={() => setOpen(false)}
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
            placeholder="Nhập tên file"
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
        onCancel={() => setOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa những tài khoản này không?</p>
      </Modal>
    </>
  );
};

export default Accounts;
