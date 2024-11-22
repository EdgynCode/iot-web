import React from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  studentAction,
  studentColumns,
  studentData,
  studentFilter,
} from "../datas/student.d";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  return (
    <>
      <ListDetail
        title="Học sinh"
        actions={studentAction}
        filters={studentFilter}
        data={studentData}
        column={studentColumns(navigate)}
      />
    </>
  );
};

export default Students;
