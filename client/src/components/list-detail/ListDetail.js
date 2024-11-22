import React, { useState } from "react";
import Selector from "./selector/Selector";
import { Button, Input, Table } from "antd";
import styles from "./index.css";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";

export const ListDetail = ({ title, actions, filters, data, column }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <Selector title={title} actions={actions} filters={filters} />
      <div className="bg-grey tab-rounded">
        <div className="tab-header">
          <p className="text-xs font-inter text-[#ABACBE]">
            Hiện <span className="text-black">10 </span>
            trong <span className="text-black">200</span> kết quả
          </p>
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            className="max-w-[420px]"
            color="#c4c4c4"
          />
          <Button icon={<ExportOutlined />} shape="round">
            Export
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={column}
          pagination={false}
        />
      </div>
    </>
  );
};
