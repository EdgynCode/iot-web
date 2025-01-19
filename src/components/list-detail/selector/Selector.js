import React from "react";
import { Button, Col, Dropdown, Flex, Row } from "antd";
import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./index.css";
const Selector = ({ title, actions, filters }) => {
  return (
    <>
      <div className="title">
        <div>
          <h5>{title}</h5>
        </div>
      </div>
      <hr />
      <div className="mt-2 p-4">
        <div className="gap-2 flex justify-between">
          <Row className="gap-2">
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
          </Row>
          <div>
            <Button.Group>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="buttonCustom"
                >
                  {action.title}
                </button>
              ))}
            </Button.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
