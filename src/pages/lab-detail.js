import React from "react";
import { useLocation } from "react-router-dom";
import { BreadcrumbTab } from "../components/breadcrumb-tab/BreadcrumbTab";
import { NotFound } from "../components/not-found/NotFound";
import { LabTab } from "../components/lab-tab/LabTab";
const LabDetail = () => {
  const location = useLocation();
  const { record } = location.state || {};
  return (
    <>
      {record ? (
        <>
          <BreadcrumbTab items={["Bài thực hành", `Bài ${record.name}`]} />
          <LabTab lab={record} labId={record.id} />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};
export default LabDetail;
