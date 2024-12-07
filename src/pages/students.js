import React, { useState, useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  studentAction,
  studentColumns,
  studentFilter,
} from "../datas/student.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Upload, Button, Spin, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { register } from "../redux/actions/authAction";
import { listAllUsersByType } from "../redux/actions/userAction";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const studentsState = useSelector((state) => state.students || {});
  const {
    data: studentData = [],
    loading = false,
    error = null,
  } = studentsState;

  useEffect(() => {
    dispatch(listAllUsersByType("NguoiHoc"));
  }, [dispatch]);

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
            id: uuidv4(),
            firstName: row["FirstName"],
            lastName: row["LastName"],
            gender: row["Gender"],
            doB: row["DoB"],
            userName: row["Username"],
            email: row["Email"],
            password: row["Password"],
            phoneNumber: row["PhoneNumber"],
            discriminator: "NguoiHoc",
          };
          console.log(student);

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
        data={loading ? [] : studentData}
        column={studentColumns(navigate)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
