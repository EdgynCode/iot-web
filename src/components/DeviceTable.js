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
  ImportOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deviceData } from "../datas/device.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Search } = Input;
const { Text } = Typography;

const DeviceTable = () => {
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
          <Button icon={<ImportOutlined />} className="bg-[#1D1B23] text-white">
            Thêm thiết bị
          </Button>
          <Button icon={<DeleteOutlined />} className="bg-[#ff5656]">
            Xóa thiết bị
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        {deviceData.map(
          (item) =>
            item.status === "Đã kết nối" && (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false} className="rounded-[50]">
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
  );
};

export default DeviceTable;
