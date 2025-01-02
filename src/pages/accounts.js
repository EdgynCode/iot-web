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
  message,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createMultipleLearner } from "../redux/actions/learnerAction";
import { listAllUsersByType } from "../redux/actions/userAction";
import { v4 as uuidv4 } from "uuid";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../redux/actions/authAction";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

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

  const studentsState = useSelector((state) => state.students || {});
  const { data: studentData = [], error = null } = studentsState;

  useEffect(() => {
    dispatch(listAllUsersByType(selectedAccountType));
  }, [dispatch, selectedAccountType]);

  const handleAccountTypeChange = (value) => {
    const accountType =
      value === "1" ? "Learner" : value === "2" ? "Teacher" : "";
    setSelectedAccountType(accountType);
  };

  const onFinish = async (values) => {
    setLoading(true);

    const data = {
      id: uuidv4(),
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      doB: values.doB.format("YYYY-MM-DD"),
      userName: values.userName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      discriminator: values.discriminator,
    };
    console.log(data);
    dispatch(register(data))
      .unwrap()
      .then(() => {
        message.success("Đăng ký thành công!");
        setOpen(false);
      })
      .catch(() => {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
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

  const handleModalCancel = () => {
    setFile(null);
    setOpen(false);
  };

  const handleActionClick = (action) => {
    switch (action.title) {
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
          options: filter.options.map((option) => ({
            ...option,
            onClick: () => handleAccountTypeChange(option.key),
          })),
        }))}
        data={loading ? [] : studentData}
        column={studentColumns(navigate)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
        ]}
      >
        <Form
          name="register"
          onFinish={onFinish}
          disabled={loading}
          className="space-y-4"
        >
          <Form.Item
            name="discriminator"
            rules={[
              { required: true, message: "Vui lòng chọn loại người dùng!" },
            ]}
          >
            <Select placeholder="Loại người dùng" className="rounded-lg">
              <Option value="Teacher">Người dạy</Option>
              <Option value="Learner">Người học</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
          >
            <Input placeholder="Họ" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Tên" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Giới tính" className="rounded-lg">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="doB"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker
              placeholder="Ngày sinh"
              format="YYYY-MM-DD"
              className="rounded-lg w-full"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input placeholder="Tên người dùng" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^0\d{9}$/,
                message:
                  "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0!",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg"
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
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
    </>
  );
};

export default Accounts;
