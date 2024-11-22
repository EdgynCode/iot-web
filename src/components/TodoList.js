import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const TodoList = () => {
  return (
    <>
      <Card className="w-[450px] h-[373px] rounded-[40px] bg-[#dddada]">
        <Title level={4} className="mt-7 ml-[34px]">
          To-do List
        </Title>
        <Text className="mt-[10px] ml-[34px] text-[#818181]">
          Thứ 6, ngày 15 tháng 11 năm 2024
        </Text>
      </Card>
    </>
  );
};

export default TodoList;
