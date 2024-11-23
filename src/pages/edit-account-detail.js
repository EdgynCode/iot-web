import React from "react";
import EditAccountInfo from "../components/EditAccountInfo";
import { Back } from "../components/back/Back";
import { Col, Row } from "antd";

const EditAccountDetail = () => {
  return (
    <>
      <div className="relative w-full p-5 rounded-[40px] overflow-hidden">
        <div className="absolute w-15px h-[610px] top-[151px] left-[1215px]">
          <div className="absolute w-1 h-[194px] bg-[#BBBCC580] rounded-[10px] top-[2px] left-1" />
        </div>
        <Row
          align="middle"
          justify="space-between"
          className="h-14 p-[29px_11px_29px_6px]"
        >
          <Col>
            <Row align="middle" gutter={10}>
              <Col>
                <Back />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <EditAccountInfo />
    </>
  );
};

export default EditAccountDetail;
