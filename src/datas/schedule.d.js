import dayjs from "dayjs";
import moment from "moment";

export const scheduleAction = () => [
  {
    title: "Tạo buổi học",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
  {
    title: "Tạo nhóm",
    onClick: (setOpen) => {
      setOpen(true);
    },
  },
];
export const getMonthData = (value, sessions) => {
  if (!sessions || sessions.length === 0) return null;

  const session = sessions.find((session) => {
    return dayjs(session.startTime).month() === value.month();
  });

  return session ? dayjs(session.startTime).month() : null;
};

export const getListData = (value, sessions) => {
  let listData = [];

  if (!sessions || sessions.length === 0) return listData;

  sessions.forEach((session) => {
    const sessionDate = dayjs(session.startTime);
    if (
      sessionDate.date() === value.date() &&
      sessionDate.month() === value.month() &&
      sessionDate.year() === value.year()
    ) {
      listData.push({
        type: "default",
        content: `
          Giờ bắt đầu: ${moment(session.startTime).format("HH:mm")}\n
          Giờ kết thúc: ${moment(session.endTime).format("HH:mm")}
        `,
      });
    }
  });

  return listData;
};
