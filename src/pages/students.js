import React, { useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  studentAction,
  studentColumns,
  studentData,
  studentFilter,
} from "../datas/student.d";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { register } from "../redux/actions/authAction";
import * as XLSX from "xlsx";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleModalOk = () => {
    if (!file) {
      message.error("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "array" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Dispatch Redux actions
        data.forEach((row) => {
          const student = {
            firstName: row["Tên"],
            lastName: row["Họ"],
            gender: row["Giới tính"],
            doB: row["Ngày sinh"],
            userName: row["Username"],
            email: row["Email"],
            password: row["Mật khẩu"],
            phoneNumber: row["SĐT"],
            discriminator: row["Chức vụ"],
          };

          dispatch(register(student));
        });

        message.success("Students imported successfully!");
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

  return (
    <>
      <ListDetail
        title="Học sinh"
        actions={studentAction(setOpen)}
        filters={studentFilter}
        data={studentData}
        column={studentColumns(navigate)}
      />
      <Modal
        title="Import Excel File"
        open={open}
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
    </>
  );
};

export default Students;
