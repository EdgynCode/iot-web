import React from "react";
import {
  Badge,
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  Input,
  Space,
  Typography,
} from "antd";
import {
  DownOutlined,
  FilterOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

const DeviceTable = () => {
  const deviceData = [
    {
      id: "#26215618-ID-KL",
      status: "Đã kết nối",
      color: "green",
      members: ["Nguyễn Hữu Tân", "Võ Thị Thu Hòa"],
      icon: <CheckCircleOutlined />,
    },
    {
      id: "#15489292-ID-KL",
      status: "Đã kết nối",
      color: "green",
      members: ["Phạm Phương Nam", "Trần Tú Quyên"],
      icon: <CheckCircleOutlined />,
    },
    {
      id: "#91988749-ID-KL",
      status: "Chưa kết nối",
      color: "red",
      members: [],
      icon: <CheckCircleOutlined />,
    },
    {
      id: "#74981901-ID-KL",
      status: "Chưa kết nối",
      color: "red",
      members: [],
      icon: <CheckCircleOutlined />,
    },
    {
      id: "#55187965-ID-KL",
      status: "Chưa kết nối",
      color: "red",
      members: [],
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <div className="w-full p-5 bg-[#EDEDEF] rounded-[50px]">
      <Row gutter={16} align="middle">
        <Col>
          <Button icon={<FilterOutlined />} />
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text">
              Trạng thái <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown trigger={["click"]}>
            <Button type="text">
              Chọn lớp <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col flex="auto">
          <Search className="w-96" placeholder="Tìm kiếm nhanh" enterButton />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        {deviceData.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card bordered={false} className="rounded-[30]">
              <Text strong>{item.id}</Text>
              <Space size="small" className="flex items-center mt-[10px]">
                <Badge
                  count={item.status}
                  style={{
                    backgroundColor:
                      item.color === "green" ? "#34C75938" : "#FF3B3021",
                    color: item.color,
                  }}
                />
              </Space>
              <Space size="small" className="flex items-center">
                <Text>Nhóm 1</Text>
              </Space>
              {item.members.length > 0 && (
                <Space direction="vertical" size="small" className="mt-[10px]">
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
        ))}
      </Row>
    </div>
  );
};

export default DeviceTable;
