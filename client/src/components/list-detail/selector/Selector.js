import React from "react";
import { Button, Col, Dropdown, Row, Input } from "antd";
import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./index.css";
const Selector = ({ title, actions, filters }) => {
  return (
    <div className="p-[20px_0] mt-6 bg-white rounded-[40px] overflow-hidden">
      <Row justify="space-between" align="middle" className="p-[5px_24px]">
        <Col className="mx-[2%] font-semibold text-[20px]">{title}</Col>
        <Col>
          <Button.Group>
            {actions.map((action) => (
              <Button key={action.title} onClick={action.onClick} shape="round">
                {action.title}
              </Button>
            ))}
          </Button.Group>
        </Col>
      </Row>
      <Row align="middle" className="p-[10px_50px] gap-2">
        <Col>
          <FilterOutlined />
        </Col>
        {filters.map((filter) => (
          <Col key={filter.id}>
            <Dropdown trigger={["click"]} menu={{ items: filter.options }}>
              <Button
                type="text"
                color="default"
                variant="filled"
                icon={<DownOutlined size={"2px"} />}
              >
                {filter.label}
              </Button>
            </Dropdown>
          </Col>
        ))}

        <Button type="text" icon={<SearchOutlined />} />
      </Row>
    </div>
  );
};

export default Selector;
