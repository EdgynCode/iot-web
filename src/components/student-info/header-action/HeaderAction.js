import React from "react";
import { studentDetailAction } from "../../../datas/student.d";
import { Button, Col, Row } from "antd";
import { Back } from "../../back/Back";
import ButtonGroup from "antd/es/button/button-group";
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
        <ButtonGroup>
          {studentDetailAction(navigate, id).map((action, index) => (
            <Button key={index} shape="round" onClick={action.onClick}>
              {action.title}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );
};
