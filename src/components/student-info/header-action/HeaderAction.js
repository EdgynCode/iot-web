// src/components/student-info/header-action/HeaderAction.js
import React from "react";
import { studentDetailAction } from "../../../datas/student.d";
import { Button, Col, Row, Space } from "antd"; // Import Space
import { Back } from "../../back/Back";
// ButtonGroup có thể không còn cần thiết nếu không được sử dụng ở đâu khác trong file này.
// import ButtonGroup from "antd/es/button/button-group";
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
        {/* Thay thế ButtonGroup bằng Space.Compact.
          Space.Compact được sử dụng để nhóm các component con lại với nhau mà không có khoảng cách.
        */}
        <Space.Compact>
          {studentDetailAction(navigate, id).map((action, index) => (
            <Button key={index} shape="round" onClick={action.onClick}>
              {action.title}
            </Button>
          ))}
        </Space.Compact>
      </Col>
    </Row>
  );
};
