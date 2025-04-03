import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListDetail } from "../components/list-detail/ListDetail";
import { assignmentAction } from "../datas/assignment.d";
import { useAssignmentData } from "../hooks/useAssignmentData";

const Assignments = () => {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useAssignmentData();
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
        column={AccountsColumns(navigate, selectedAccountType)}
        onSelectionChange={handleSelectionChange}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
};

export default Assignments;
