import React from "react";
import { Button, Col, Dropdown, Row } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.css";
const Selector = ({ title, actions, filters }) => {
  return (
    <>
      <div className="title">
        <h5>{title}</h5>
      </div>
      <hr />
      <div className="mt-2 p-4">
        <div className="gap-2 flex justify-between">
          <Row className="gap-2 filter-group-selector">
            {filters ? (
              filters.map((filter, index) => (
                <Col key={index}>
                  <Dropdown
                    trigger={["click"]}
                    menu={{ items: filter.options }}
                  >
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
              ))
            ) : (
              <></>
            )}
          </Row>
          <div className="button-group-selector">
            <Button.Group>
              {actions ? (
                actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="buttonCustom"
                  >
                    {action.title}
                  </button>
                ))
              ) : (
                <></>
              )}
            </Button.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
