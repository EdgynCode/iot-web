import React, { useState, useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  accountAction,
  AccountsColumns,
  accountFilter,
} from "../datas/account.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Form, message } from "antd";
import {
  createMultipleLearner,
  assignLearnerToClass,
} from "../redux/actions/learnerAction";
import { assignTeachersToClass } from "../redux/actions/teacherAction";
import { listAllUsersByType, deleteUser } from "../redux/actions/userAction";
import { register } from "../redux/actions/authAction";
import { useClassroomData } from "../hooks/useClassroomData";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import AccountsModal from "../components/AccountsModal";

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

  const { classrooms } = useClassroomData();
  const studentsState = useSelector((state) => state.students || {});
  const isClassroomLoading = useSelector((state) => state.classrooms.loading);
  const { data: studentData = [], error = null } = studentsState;

  useEffect(() => {
    dispatch(listAllUsersByType(selectedAccountType));
  }, [dispatch, selectedAccountType, form]);

  const handleAccountTypeChange = (value) => {
    const accountType =
      value === "1"
        ? "Learner"
        : value === "2"
        ? "Teacher"
        : value === "3"
        ? "Admin"
        : "";
    const accountLabel =
      accountType === "Learner"
        ? "Học sinh"
        : accountType === "Teacher"
        ? "Giáo viên"
        : accountType === "Admin"
        ? "Quản trị viên"
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
        dispatch(createMultipleLearner(studentList))
          .unwrap()
          .then(() => {
            message.success("Thêm danh sách tài khoản thành công!");
            setFile(null);
            setOpen(false);
            dispatch(listAllUsersByType("Learner"));
          })
          .catch(() => {
            message.error("Thêm danh sách tài khoản thất bại.");
            setLoading(false);
          });
      } catch (error) {
        console.error("Error processing file:", error);
        message.error("Failed to process the file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCreateAccount = async (values) => {
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
    dispatch(register(data))
      .unwrap()
      .then(() => {
        message.success("Đăng ký thành công!");
        setOpen(false);
        dispatch(listAllUsersByType(selectedAccountType));
        setLoading(false);
      })
      .catch(() => {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
        setLoading(false);
      });
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
        column={AccountsColumns(navigate, selectedAccountType)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <AccountsModal
        open={open}
        modalType={modalType}
        handleModalOk={handleModalOk}
        handleModalCancel={handleModalCancel}
        handleCreateAccount={handleCreateAccount}
        handleExport={handleExport}
        handleDeleteAccount={handleDeleteAccount}
        handleAssignAccounts={handleAssignAccounts}
        file={file}
        setFile={setFile}
        exportType={exportType}
        setExportType={setExportType}
        fileName={fileName}
        setFileName={setFileName}
        form={form}
        classrooms={classrooms}
        isClassroomLoading={isClassroomLoading}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default Accounts;
