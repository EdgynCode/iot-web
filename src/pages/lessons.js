import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  columns,
  lectureAction,
  lectureData,
  lectureFilter,
} from "../datas/lecture.d.js";
import { useClassSessionData } from "../hooks/useClassSessionData";
import { ListDetail } from "../components/list-detail/ListDetail";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Space, Tabs } from "antd";
import { LessonTab } from "../components/lesson-tab/LessonTab.js";

const Lessons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sessions } = useClassSessionData();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [openDrawer, setOpenDrawer] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm bài giảng":
        setModalType("add");
        break;
      case "Sửa bài giảng":
        setModalType("edit");
        break;
      case "Xóa bài giảng":
        setModalType("delete");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  const onShow = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const items = [
    {
      label: `Thông tin`,
      key: 1,
      children: <LessonTab lesson={selectedLesson} />,
    },
    {
      label: `Bài tập`,
      key: 2,
      children: "Bài tập",
    },
  ];
  return (
    <>
      <ListDetail
        title="Bài giảng"
        actions={lectureAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        filters={lectureFilter}
        data={lectureData}
        column={columns(onShow, setSelectedLesson)}
      />
      <Drawer
        title={
          <p className="text-[#959597] font-semibold font-inter">
            Bài {selectedLesson?.lesson}: {selectedLesson?.title}
          </p>
        }
        className="draw-lesson"
        placement="right"
        size={"large"}
        onClose={onClose}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cập nhật</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Tabs tabPosition="left" items={items} />
      </Drawer>
    </>
  );
};

export default Lessons;
