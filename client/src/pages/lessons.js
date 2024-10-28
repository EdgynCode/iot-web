import React from "react";
import LectureSelect from "../components/LectureSelect";
import LectureTable from "../components/LectureTable";
import Layout from "../components/Layout";

const Lessons = () => {
  return (
    <Layout>
      <LectureSelect />
      <LectureTable />
    </Layout>
  );
};

export default Lessons;
