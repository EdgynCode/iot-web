import React from "react";
import { Row, Col, Typography } from "antd";
import Layout from "../components/Layout";
import DeviceTable from "../components/DeviceTable";

const { Title } = Typography;

const Devices = () => {
  return (
    <>
      <Layout>
        <Row
          align="middle"
          justify="space-between"
          className="h-14 p-[29px_11px_29px_6px]"
        >
          <Col>
            <Row>
              <Col>
                <Title level={2}>Danh sách thiết bị</Title>
              </Col>
            </Row>
          </Col>
          <DeviceTable />
        </Row>
      </Layout>
    </>
  );
};

export default Devices;
