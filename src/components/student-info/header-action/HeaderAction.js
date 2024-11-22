import React from "react";
import { studentDetailAction } from "../../../datas/student.d";
import { Button, Col, Row } from "antd";
import { Back } from "../../back/Back";
import ButtonGroup from "antd/es/button/button-group";
export const HeaderAction = () => {
  return (
    <Row className="row h-14 p-[5px_24px]">
      <Col>
        <Back />
      </Col>

      <Col>
        <ButtonGroup>
          {studentDetailAction.map((action, index) => (
            <Button key={index} shape="round" onClick={action.onclick}>
              {action.title}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );
};
