import React, { useEffect, useState } from "react";
import Selector from "../components/list-detail/selector/Selector";
import { Badge, Calendar } from "antd";
import { getListData, getMonthData, scheduleAction } from "../datas/schedule.d";
import "dayjs/locale/vi";
import locale from "antd/es/calendar/locale/vi_VN";
import dayjs from "dayjs";
import ScheduleModal from "../components/schedule/ScheduleModal";

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(dayjs());

  // Calendar antd
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
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
      <Selector title="Buổi học" actions={scheduleAction(setOpen)} />
      <Calendar
        cellRender={cellRender}
        locale={locale}
        onSelect={(value) => setSelected(value)}
      />
      <ScheduleModal open={open} setOpen={setOpen} selected={selected} />
    </>
  );
};

export default Schedule;
