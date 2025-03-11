import React, { useState, useEffect } from "react";
import Selector from "../components/list-detail/selector/Selector";
import { Badge, Button, Calendar, Drawer, Space, Tabs, Typography } from "antd";
import { getListData, getMonthData, scheduleAction } from "../datas/schedule.d";
import "dayjs/locale/vi";
import locale from "antd/es/calendar/locale/vi_VN";
import dayjs from "dayjs";
import ScheduleModal from "../components/schedule/ScheduleModal";
import { useLessonData } from "../hooks/useLessonData";
import { useClassroomData } from "../hooks/useClassroomData";
import { useDispatch } from "react-redux";
import { getGroupsByClassSession } from "../redux/actions/groupAction";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const { Text, Title } = Typography;

const Schedule = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(dayjs());
  const { sessions } = useLessonData();
  const { classrooms } = useClassroomData();
  const [modalType, setModalType] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const sessionInfo = sessions.filter((session) =>
        moment(session.startTime).isSame(selected.format("YYYY-MM-DD"), "day")
      );
      if (sessionInfo.length > 0) {
        const groupsData = await dispatch(
          getGroupsByClassSession(sessionInfo[0].id)
        ).unwrap();
        setGroups(groupsData);
      } else {
        setGroups([]);
      }
    };
    fetchGroups();
  }, [selected, sessions, dispatch]);

  const classSessionInfo = (value) => {
    const sessionInfo = sessions.filter((session) =>
      moment(session.startTime).isSame(value.format("YYYY-MM-DD"), "day")
    );
    return (
      <>
        <Title level={2}>{`Buổi học ngày ${value.format("DD/MM/YYYY")}`}</Title>
        <br />
        {sessionInfo.length > 0 ? (
          sessionInfo.map((session, index) => {
            const classroom = classrooms.find(
              (classroom) => classroom.id === session.lopHocId
            );
            return (
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
                <br />
                <Text className="text-lg font-semibold">{`Lớp giảng dạy: ${classroom.tenLop}`}</Text>
              </div>
            );
          })
        ) : (
          <Text>Không có buổi học nào</Text>
        )}
      </>
    );
  };

  const groupSessionInfo = () => {
    return (
      <>
        <Title level={2}>Danh sách nhóm</Title>
        <br />
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">{`Tên nhóm: ${group.tenNhom}`}</Text>
              <br />
              <Text className="text-lg font-semibold">{`Số lượng: ${group.quantity}`}</Text>
            </div>
          ))
        ) : (
          <Text>Không có nhóm nào</Text>
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
      label: `Danh sách nhóm`,
      key: 2,
      children: groupSessionInfo(),
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
