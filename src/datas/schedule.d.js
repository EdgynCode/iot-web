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
    title: "Chia nhóm",
  },
];
export const getMonthData = (value, lessons) => {
  if (!lessons || lessons.length === 0) return null;

  const lesson = lessons.find((lesson) => {
    return dayjs(lesson.startTime).month() === value.month();
  });

  return lesson ? dayjs(lesson.startTime).month() : null;
};

export const getListData = (value, lessons) => {
  let listData = [];

  if (!lessons || lessons.length === 0) return listData;

  lessons.forEach((lesson) => {
    const lessonDate = dayjs(lesson.startTime);
    if (
      lessonDate.date() === value.date() &&
      lessonDate.month() === value.month() &&
      lessonDate.year() === value.year()
    ) {
      lesson.labIds.forEach((labId) => {
        listData.push({
          type: "info",
          content: `Lab ID: ${labId}`,
        });
      });
    }
  });

  return listData;
};
