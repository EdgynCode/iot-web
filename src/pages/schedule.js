import React, { useState } from "react";
import Selector from "../components/list-detail/selector/Selector";
import { Badge, Button, Calendar, Drawer, Space, Tabs, Typography } from "antd";
import { getListData, getMonthData, scheduleAction } from "../datas/schedule.d";
import "dayjs/locale/vi";
import locale from "antd/es/calendar/locale/vi_VN";
import dayjs from "dayjs";
import ScheduleModal from "../components/schedule/ScheduleModal";
import { useLessonData } from "../hooks/useLessonData";
import { useClassroomData } from "../hooks/useClassroomData";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const { Text } = Typography;

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(dayjs());
  const { sessions } = useLessonData();
  const { classrooms } = useClassroomData();
  const [modalType, setModalType] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const { Title } = Typography;

  const classSessionInfo = (value) => {
    const sessionInfo = sessions.filter((session) =>
      moment(session.startTime).isSame(value.format("YYYY-MM-DD"), "day")
    );
    return (
      <>
        <Title level={2}>{`Buổi học ngày ${value.format("DD/MM/YYYY")}`}</Title>
        <br />
        {sessionInfo.length > 0 ? (
          sessionInfo.map((session, index) => (
            <div key={index} className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">{`Giờ bắt đầu: ${moment(
                session.startTime
              ).format("HH:mm")}`}</Text>
              <br />
              <Text className="text-lg font-semibold">{`Giờ kết thúc: ${moment(
                session.endTime
              ).format("HH:mm")}`}</Text>
              <br />
              <Text className="text-lg font-semibold">{`Wi-Fi Hotspot: ${session.wifiHotspot}`}</Text>
              <br />
              <Text className="text-lg font-semibold">{`Mật khẩu Wi-Fi: placeholder`}</Text>
              <br />
              <Text className="text-lg font-semibold">{`Mã buổi học: ${session.id}`}</Text>
            </div>
          ))
        ) : (
          <Text>Không có buổi học nào</Text>
        )}
      </>
    );
  };

  const items = [
    {
      label: `Thông tin`,
      key: 1,
      children: classSessionInfo(selected),
    },

    {
      label: `Tạo nhóm`,
      key: 2,
      children: "Nhóm",
    },
  ];

  const onShow = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Tạo buổi học":
        setModalType("createSession");
        break;
      case "Tạo nhóm":
        setModalType("createGroup");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  // Calendar antd
  const monthCellRender = (value) => {
    const monthValue = getMonthData(value, sessions);
    return monthValue ? (
      <div className="">
        <section>{monthValue}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value, sessions);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} onClick={onShow} className="bg-gray-200 px-2">
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Selector
        title="Buổi học"
        actions={scheduleAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
      />
      <Calendar
        cellRender={cellRender}
        locale={locale}
        onSelect={(value) => setSelected(value)}
      />
      <ScheduleModal
        open={open}
        setOpen={setOpen}
        selected={selected}
        modalType={modalType}
        sessionData={sessions}
      />
      <Drawer
        title={
          <p className="text-[#959597] font-semibold font-inter">
            Lên lịch buổi thực hành
          </p>
        }
        className="draw-experiment"
        placement="right"
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

export default Schedule;
