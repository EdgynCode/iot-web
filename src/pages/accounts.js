import React, { useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  accountAction,
  AccountsColumns,
  accountFilter,
} from "../datas/account.d";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin, Form, message } from "antd";
import {
  createMultipleLearner,
  assignLearnerToClass,
} from "../redux/actions/learnerAction";
import { assignTeachersToClass } from "../redux/actions/teacherAction";
import { listAllUsersByType, deleteUser } from "../redux/actions/userAction";
import { register } from "../redux/actions/authAction";
import { useClassroomData } from "../hooks/useClassroomData";
import { useAccountData } from "../hooks/useAccountData";
import { v4 as uuidv4 } from "uuid";
import ExcelJS from "exceljs";
import AccountsModal from "../components/AccountsModal";

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [exportType, setExportType] = useState("pdf");
  const [fileName, setFileName] = useState("student_data");
  const [selectedAccountType, setSelectedAccountType] = useState("Learner");
  const [selectedAccountLabel, setSelectedAccountLabel] = useState("Học sinh");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const { classrooms, loading: isClassroomLoading } = useClassroomData();
  const { accounts, loading, error } = useAccountData(
    selectedAccountType,
    form
  );

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
    switch (exportType) {
      case "excel":
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Accounts");

        // Add headers
        worksheet.columns = Object.keys(accounts[0]).map((key) => ({
          header: key,
          key: key,
        }));

        // Add rows
        accounts.forEach((account) => {
          worksheet.addRow(account);
        });

        // Save as Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.xlsx`;
        link.click();
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
    reader.onload = async (e) => {
      const studentList = [];
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(e.target.result);
        const worksheet = workbook.worksheets[0];

        worksheet.eachRow((row, rowIndex) => {
          if (rowIndex === 1) return;
          const student = {
            id: uuidv4(),
            firstName: row.getCell(1).value,
            lastName: row.getCell(2).value,
            gender: row.getCell(3).value,
            doB: row.getCell(4).value,
            userName: row.getCell(5).value,
            email: row.getCell(6).value,
            password: row.getCell(7).value,
            phoneNumber: row.getCell(8).value,
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
          });
      } catch (error) {
        console.error("Error processing file:", error);
        message.error("Failed to process the file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCreateAccount = async (values) => {
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
      })
      .catch(() => {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
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
      message.warning("Chọn ít nhất 1 tài khoản để thêm vào lớp.");
      return;
    }

    const accountActions = {
      Learner: () =>
        dispatch(assignLearnerToClass({ learners: selectedRowKeys, classId })),
      Teacher: () =>
        dispatch(assignTeachersToClass({ teachers: selectedRowKeys, classId })),
    };

    const action = accountActions[selectedAccountType];

    if (action) {
      try {
        await action().unwrap();
        message.success(`Thêm ${selectedAccountType} thành công!`);
        setOpen(false);
      } catch {
        message.error(`Lỗi xảy ra khi thêm ${selectedAccountType}.`);
      }
    } else {
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
        data={loading ? [] : accounts}
        column={AccountsColumns(navigate, selectedAccountType)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <AccountsModal
        open={open}
        setOpen={setOpen}
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
      />
    </>
  );
};

export default Accounts;
