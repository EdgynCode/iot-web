import React, { useEffect, useState } from "react";
import Selector from "./selector/Selector";
import { Input, Pagination, Table } from "antd";
import "./index.css";
import { SearchOutlined } from "@ant-design/icons";

export const ListDetail = ({
  title,
  actions,
  filters,
  data,
  column,
  onSelectionChange,
  setHasSelected,
}) => {
  // mapping key to data index
  const mappedData = data.map((item) => ({
    ...item,
    key: item.id,
  }));

  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = mappedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  // pagination
  const itemsPerPage = 10;
  const totalPage = mappedData?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [showItems, setShowItems] = useState(
    filteredData.slice(startIndex, endIndex)
  );
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setShowItems(filteredData.slice(startIndex, endIndex));
  }, [currentPage, data, searchQuery]);

  // ------------------------------------------------------
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) {
      onSelectionChange(newSelectedRowKeys);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    if (setHasSelected) {
      setHasSelected(selectedRowKeys.length > 0);
    }
  }, [selectedRowKeys, setHasSelected]);
  return (
    <>
      <Selector title={title} actions={actions} filters={filters} />
      <div className="bg-grey tab">
        <div className="w-full flex justify-center tab-header">
          <Input
            placeholder="Tìm kiếm theo tên, lớp, giới tính,..."
            suffix={<SearchOutlined />}
            className="max-w-[400px]"
            color="#c4c4c4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={showItems}
          columns={column}
          pagination={false}
        />
        <div className="flex justify-between px-4">
          <p className="text-xs font-inter text-black">
            Hiện <b className="text-black">{showItems.length} </b>
            trong <b className="text-black">{data.length}</b> kết quả
          </p>
          <Pagination
            pageSize={itemsPerPage}
            current={currentPage}
            disabled={totalPage < 1}
            total={filteredData.length}
            size="small"
            onChange={(page) => {
              setCurrentPage(page);
              setShowItems(data.slice(startIndex, endIndex));
            }}
          />
        </div>
      </div>
    </>
  );
};
