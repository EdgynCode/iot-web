import React from "react";
import Layout from "../components/Layout";
import { Badge, Card, Col, Row, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import QuestionCard from "../components/QuestionCard";

const { Title, Text } = Typography;

const ExamDetail = () => {
  return (
    <Layout>
      <div className="relative w-[1230px] p-5 rounded-[40px] overflow-hidden">
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
                <LeftOutlined className="text-2xl" />
              </Col>
              <Col>
                <p className="m-0">Quay về</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Row gutter={[33, 33]} className="w-[1268px]">
        <Col className="flex-[0_0_auto] overflow-y-scroll">
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </Col>

        <Col className="flex flex-1 flex-col gap-7">
          <Row
            justify="center"
            align="middle"
            className="p-[21px_25px] bg-white rounded-[40px] overflow-hidden"
          >
            <Text className="text-[26px] font-medium text-[#1D1B23]">
              Chấm lại
            </Text>
          </Row>
          <div className="p-[30px] bg-[#EDEDEF] rounded-[40px]">
            <Row gutter={[0, 38]}>
              <Col span={24}>
                <Row justify="center">
                  <Title level={3} className="text-[#484964]">
                    Thông tin
                  </Title>
                </Row>
                <Card className="rounded-[40px]">
                  <Row justify="center" className="p-[21px_25px]">
                    <Col span={24}>
                      <Row justify="space-between">
                        <Text>Bài tập</Text>
                        <Text>Sơ lược sự phát triển của vật lý</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>Người thực hiện</Text>
                        <Text>Nguyễn Hữu Tân</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>Tổng điểm</Text>
                        <Text>9/10</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>Thời gian hoàn thành</Text>
                        <Text>10:12:52 AM</Text>
                      </Row>
                    </Col>
                  </Row>
                </Card>

                <Row justify="center">
                  <Title level={3} className="text-[#484964]">
                    Bảng câu hỏi
                  </Title>
                </Row>
                <Row justify="center" className="p-[17px_3px]">
                  <Col>
                    <Row gutter={[36, 29]} justify="center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <Col key={num}>
                          <Badge
                            count={num}
                            className="flex items-center justify-center bg-[#34C759] w-14 h-14 rounded-[50%] border-[1px_solid_#00000033]"
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ExamDetail;
