import dayjs from "dayjs";

export const scheduleAction = (setOpen) => [
  {
    title: "Tạo buổi học",
    onClick: () => {
      setOpen(true);
    },
  },
];

export const steps = [
  {
    title: "Thông tin buổi học",
  },
  {
    title: "Tạo danh sách nhóm",
  },
];
export const getMonthData = (value, sessions) => {
  if (!sessions || sessions.length === 0) return null;

  const lesson = sessions.find((lesson) => {
    return dayjs(lesson.startTime).month() === value.month();
  });

  return lesson ? dayjs(lesson.startTime).month() : null;
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
      session.labIds.forEach((labId) => {
        listData.push({
          type: "info",
          content: `Lab ID: ${labId}`,
        });
      });
    }
  });

  return listData;
};
