import React from "react";
import { BreadcrumbTab } from "../components/breadcrumb-tab/BreadcrumbTab";
import { useLocation } from "react-router-dom";
import { LessonTab } from "../components/lesson-tab/LessonTab";
import { NotFound } from "../components/not-found/NotFound";
const LessonDetail = () => {
  const location = useLocation();
  const { record } = location.state || {};
  console.log("🚀 ~ LessonDetail ~ record:", record);
  return (
    <>
      {record ? (
        <>
          <BreadcrumbTab
            items={["Bài giảng", `Bài ${record.lesson}: ${record.title}`]}
          />
          <LessonTab lesson={record} />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default LessonDetail;
