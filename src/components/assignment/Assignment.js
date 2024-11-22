import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Table } from "antd";
import React, { useState, useMemo } from "react";
import { assignmentColumns, assignments } from "../../datas/student.d";
ChartJS.register(ArcElement, Tooltip, Legend);
export const Assignment = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [incomplete, complete] = useMemo(() => {
    let incompleteCount = 0;
    let completeCount = 0;
    assignments.forEach((assignment) => {
      if (assignment.status === "Chưa nộp") {
        incompleteCount++;
      } else if (assignment.status === "Đã nộp") {
        completeCount++;
      }
    });
    return [incompleteCount, completeCount];
  }, [assignments]);

  const data = useMemo(
    () => ({
      labels: ["Chưa làm", "Đã nộp"],
      datasets: [
        {
          label: "Assignments",
          data: [incomplete, complete],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    }),
    [incomplete, complete]
  );

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("Selected rows: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="bg-grey tab-rounded">
      <div className="row flex-col tab-header mb-2">Bài tập</div>
      <div className="flex justify-between">
        <Table
          rowSelection={rowSelection}
          dataSource={assignments}
          columns={assignmentColumns}
          pagination={false}
          className="w-8/12"
        />
        <div>
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};
