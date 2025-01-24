import React from "react";
import DeviceTable from "../components/device/DeviceTable";
import { Back } from "../components/back/Back";

const Devices = () => {
  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        className="h-14 p-[29px_11px_29px_6px]"
      >
        <Col>
          <Row>
            <Col>
              <Title level={2}>Danh sách thiết bị</Title>
              <Row className="my-5">
                <Back />
              </Row>
            </Col>
          </Row>
        </Col>
        <DeviceTable />
      </Row>
    </>
  );
};

export default Devices;
