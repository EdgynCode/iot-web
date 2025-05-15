// src/components/user-info/header-action/HeaderAction.js
import React from "react";
import { userDetailAction } from "../../../datas/user.d";
import { Button, Col, Row, Space } from "antd";
import { Back } from "../../back/Back";
import { useParams, useNavigate } from "react-router-dom";

export const HeaderAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Row className="row h-14 p-[5px_24px]">
      <Col>
        <Back />
      </Col>

      <Col>
        <Space.Compact>
          {userDetailAction(navigate, id).map((action, index) => (
            <Button key={index} shape="round" onClick={action.onClick}>
              {action.title}
            </Button>
          ))}
        </Space.Compact>
      </Col>
    </Row>
  );
};
