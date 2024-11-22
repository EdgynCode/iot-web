import React from "react";
import StudentInfo from "../components/student-info/StudentInfo";
import { HeaderAction } from "../components/student-info/header-action/HeaderAction";
import { Assignment } from "../components/assignment/Assignment";

const StudentDetail = () => {
  return (
    <>
      <HeaderAction />
      <StudentInfo />
      <Assignment />
    </>
  );
};

export default StudentDetail;
