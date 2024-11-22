import React from "react";
import {
  columns,
  lectureAction,
  lectureData,
  lectureFilter,
} from "../datas/lecture.d.js";
import { ListDetail } from "../components/list-detail/ListDetail.js";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  return (
    <>
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
