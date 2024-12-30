import React, { useEffect, useState } from "react";
import Selector from "./selector/Selector";
import { Input, Pagination, Table } from "antd";
import "./index.css";
import { SearchOutlined } from "@ant-design/icons";

export const ListDetail = ({ title, actions, filters, data, column }) => {
  // pagination
  const itemsPerPage = 10;
  const totalPage = data?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [showItems, setShowItems] = useState(data.slice(startIndex, endIndex));
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setShowItems(data.slice(startIndex, endIndex));
  }, [currentPage, data]);

  // ------------------------------------------------------
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
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={showItems}
          columns={column}
          pagination={false}
        />
        <Pagination
          className="mt-10 w-full flex justify-end"
          pageSize={itemsPerPage}
          current={currentPage}
          disabled={totalPage < 1}
          total={data.length}
          size="small"
          onChange={(page) => {
            setCurrentPage(page);
            setShowItems(data.slice(startIndex, endIndex));
          }}
        />
      </div>
    </>
  );
};
