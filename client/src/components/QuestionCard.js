import React from "react";
import { Card, Space, Typography, Radio } from "antd";

const { Title, Text } = Typography;

const QuestionCard = () => {
  //   const questionData = [{}];
  return (
    <>
      <Card className="w-[768px] rounded-[15px] shadow-[1px_1px_5px_#00000040]">
        <Space direction="vertical" size="large" className="mt-2 ml-6">
          <Title level={3} className="m-0">
            Question 1
          </Title>
          <Space direction="vertical" size="large">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>
                  <Text>Answer 1</Text>
                </Radio>
                <Radio value={2}>
                  <Text>Answer 2</Text>
                </Radio>
                <Radio value={3}>
                  <Text>Answer 3</Text>
                </Radio>
              </Space>
            </Radio.Group>
          </Space>
        </Space>
      </Card>
    </>
  );
};

export default QuestionCard;
