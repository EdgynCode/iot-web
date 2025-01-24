import React, { useState } from "react";
import { Badge, Card, Row, Col, Input, Space, Typography } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { deviceData } from "../../datas/device.d";
import { experimentAction } from "../../datas/experiment.d";
import Selector from "../list-detail/selector/Selector";

const { Text } = Typography;

const DeviceTable = () => {
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = deviceData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm bài thí nghiệm":
        setModalType("add");
        break;
      case "Xóa bài thí nghiệm":
        setModalType("remove");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };
  return (
    <>
      <Selector
        title="Danh sách thiết bị"
        actions={experimentAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
      />
      <div className="bg-grey tab">
        <div className="w-full flex justify-center tab-header">
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            className="max-w-[200px]"
            color="#c4c4c4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Row gutter={[16, 16]} className="mt-8">
          {deviceData.map(
            (item, index) =>
              item.status === "Đã kết nối" && (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    className="rounded-[50] bg-[#edf2fb]/50"
                  >
                    <p className="font-bold text-[27px]">{item.id}</p>
                    <Badge
                      count={item.status}
                      style={{
                        backgroundColor:
                          item.color === "green" ? "#34C75938" : "#FF3B3021",
                        color: item.color,
                      }}
                    />
                    <i class="fa-solid fa-gear"></i>
                    <div className="text-16">
                      Nhóm <DownOutlined className="text-[12px]" />
                    </div>
                    {item.members.length > 0 && (
                      <Space
                        direction="vertical"
                        size="small"
                        className="mt-[10px]"
                      >
                        {item.members.map((member, index) => (
                          <Space
                            key={index}
                            size="small"
                            className="flex items-center"
                          >
                            <Text italic>{member}</Text>
                          </Space>
                        ))}
                      </Space>
                    )}
                  </Card>
                </Col>
              )
          )}
        </Row>
      </div>
    </>
  );
};

export default DeviceTable;
