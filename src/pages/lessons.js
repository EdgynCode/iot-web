import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  columns,
  lectureAction,
  lectureData,
  lectureFilter,
} from "../datas/lecture.d.js";
import { useLessonData } from "../hooks/useLessonData.js";
import { ListDetail } from "../components/list-detail/ListDetail";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessions } = useLessonData();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm bài giảng":
        setModalType("add");
        break;
      case "Sửa bài giảng":
        setModalType("edit");
        break;
      case "Xóa bài giảng":
        setModalType("delete");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Bài giảng"
        actions={lectureAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={lectureFilter}
        data={lectureData}
        column={columns(navigate)}
      />
    </>
  );
};

export default Lessons;
