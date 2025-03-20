import React, { useState, useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  studentAction,
  studentColumns,
  useStudentFilter,
} from "../datas/student.d";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Upload,
  Button,
  Spin,
  Radio,
  Input,
  Form,
  message,
  QRCode,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createMultipleLearner } from "../redux/actions/learnerAction";
import { listAllUsersByType } from "../redux/actions/userAction";
import { getLearnersByClassId } from "../redux/actions/learnerAction";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [exportType, setExportType] = useState("pdf");
  const [fileName, setFileName] = useState("student_data");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedClassLabel, setSelectedClassLabel] = useState("Lớp");
  const [initialFetch, setInitialFetch] = useState(false);
  const [qrData, setQrData] = useState("");
  const _filters = useStudentFilter();

  const learners = useSelector((state) => state.learners.data || {});
  const loading = useSelector((state) => state.learners.loading || false);
  const error = useSelector((state) => state.learners.error || null);

  useEffect(() => {
    if (
      _filters.length > 0 &&
      _filters[0].options &&
      _filters[0].options.length > 0
    ) {
      setSelectedClass(_filters[0].options[0].key);
      setSelectedClassLabel(_filters[0].options[0].label);
    }
    if (selectedClass && !initialFetch) {
      const timeoutId = setTimeout(() => {
        dispatch(getLearnersByClassId(selectedClass));
        setInitialFetch(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [_filters, selectedClass, dispatch, initialFetch]);

  const handleClassChange = (value) => {
    setSelectedClass(value);
    const selectedOption = _filters[0].options.find(
      (option) => option.key === value
    );
    setSelectedClassLabel(selectedOption ? selectedOption.label : "Unknown");
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
          body: learners.map((student) => [
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
        const worksheet = XLSX.utils.json_to_sheet(learners);
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
      case "Xuất dữ liệu":
        setModalType("export");
        break;
      case "Thêm danh sách học sinh":
        setModalType("import");
        break;
      case "Điểm danh":
        setModalType("attendance");
        setQrData("QRData");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Học sinh"
        actions={studentAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={
          Array.isArray(_filters)
            ? _filters.map((filter) => ({
                ...filter,
                label: selectedClassLabel,
                options: filter.options.map((option) => ({
                  ...option,
                  onClick: () => handleClassChange(option.key),
                })),
              }))
            : []
        }
        data={loading ? [] : learners}
        column={studentColumns(navigate)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Modal
        title="Nhập dữ liệu học sinh"
        open={open && modalType === "import"}
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
        title="Xuất dữ liệu học sinh"
        open={open && modalType === "export"}
        onOk={handleExport}
        onCancel={handleModalCancel}
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
        title="Điểm danh"
        open={open && modalType === "attendance"}
        onCancel={handleModalCancel}
        footer={null}
      >
        <QRCode
          errorLevel="H"
          value="https://ant.design/"
          icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
      </Modal>
    </>
  );
};

export default Students;
