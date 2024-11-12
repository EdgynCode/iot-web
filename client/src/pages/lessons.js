import React from "react";
import {
  columns,
  lectureAction,
  lectureData,
  lectureFilter,
} from "../datas/lecture.d.js";
import { ListDetail } from "../components/list-detail/ListDetail";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <LectureSelect />
      <LectureTable /> */}

      <ListDetail
        title="Bài giảng"
        actions={lectureAction}
        filters={lectureFilter}
        data={lectureData}
        column={columns(navigate)}
      />
    </>
  );
};

export default Lessons;
