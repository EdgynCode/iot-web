import dayjs from "dayjs";
import moment, { now } from "moment";
import "moment/locale/vi";

moment.locale("vi");

/**
 * Định nghĩa các hành động có thể thực hiện trên trang lịch học.
 *
 * @param {function} setOpen - Hàm để mở modal.
 * @param {function} setModalType - Hàm để thiết lập loại modal sẽ được hiển thị.
 * @param {function} openUpdateModal - Hàm để mở modal cập nhật buổi học.
 * @param {function} setSessionToEdit - Hàm để thiết lập dữ liệu buổi học cần sửa.
 * @param {object} session - Dữ liệu của buổi học được chọn (nếu có, dùng cho việc sửa).
 * @returns {Array<object>} Mảng các đối tượng hành động.
 */
export const scheduleAction = (
  setOpen,
  setModalType,
  openUpdateModal,
  setSessionToEdit,
  session
) => [
  {
    title: "Tạo buổi học",
    onClick: () => {
      setModalType("createSession"); // Đặt loại modal để tạo buổi học
      setOpen(true); // Mở modal (ScheduleModal)
    },
  },
  {
    title: "Tạo nhóm",
    onClick: () => {
      setModalType("createGroup"); // Đặt loại modal để tạo nhóm
      setOpen(true); // Mở modal (ScheduleModal)
    },
  },
  {
    title: "Thêm người học vào nhóm",
    onClick: () => {
      setModalType("addLearnerToGroup"); // Đặt loại modal để thêm người học vào nhóm
      setOpen(true); // Mở modal (ScheduleModal)
    },
  },
  {
    title: "Sửa buổi học",
    // onClick sẽ được gọi từ component cha (ví dụ: trang Schedule) khi người dùng chọn sửa một buổi học cụ thể.
    // Do đó, nó không cần trực tiếp gọi setOpen hay setModalType ở đây.
    // Thay vào đó, component cha sẽ gọi openUpdateModal và setSessionToEdit.
    // Tuy nhiên, để giữ cấu trúc, chúng ta có thể để trống hoặc thêm một placeholder.
    // Hoặc, nếu bạn muốn nút này trực tiếp kích hoạt modal sửa từ đây (cần truyền thêm session cụ thể):
    onClick: (sessionToEdit) => {
      // Giả sử sessionToEdit được truyền vào khi gọi action này
      if (
        sessionToEdit &&
        openUpdateModal &&
        setSessionToEdit &&
        setModalType
      ) {
        setSessionToEdit(sessionToEdit);
        setModalType("editSession"); // Đặt loại modal để sửa buổi học
        openUpdateModal(true); // Mở modal cập nhật (UpdateSessionModal)
      } else {
        // Xử lý trường hợp không có session để sửa hoặc thiếu hàm
        // Ví dụ: thông báo cho người dùng chọn một buổi học trước
        console.warn(
          "Vui lòng chọn một buổi học để sửa hoặc các hàm cần thiết chưa được cung cấp."
        );
      }
    },
    // Bạn có thể thêm một key nếu cần, ví dụ: key: "editSession"
  },
  // Cân nhắc thêm action "Xóa buổi học" nếu cần
  // {
  //   title: "Xóa buổi học",
  //   onClick: (sessionToDelete) => {
  //     if (sessionToDelete && setModalType && setOpen) {
  //       // Logic để xác nhận và xóa buổi học
  //       // Ví dụ: setModalType("deleteSession"); setOpen(true);
  //       // Cần truyền sessionToDelete vào đây
  //     }
  //   }
  // }
];

/**
 * Lấy dữ liệu tháng từ danh sách các buổi học.
 * Hàm này có vẻ như dùng để kiểm tra xem có buổi học nào trong tháng không.
 *
 * @param {dayjs.Dayjs} value - Đối tượng dayjs đại diện cho một ngày trong tháng.
 * @param {Array<object>} sessions - Mảng các đối tượng buổi học.
 * @returns {number|null} Trả về tháng (0-11) nếu có buổi học, ngược lại null.
 */
export const getMonthData = (value, sessions) => {
  if (!sessions || sessions.length === 0) return null;

  // Tìm bất kỳ buổi học nào có tháng trùng với tháng của `value`
  const sessionInMonth = sessions.find((session) => {
    return dayjs(session.startTime).month() === value.month();
  });

  return sessionInMonth ? dayjs(sessionInMonth.startTime).month() : null;
};
export const getListData = (value, sessions) => {
  let listData = [];

  if (!sessions || !Array.isArray(sessions) || sessions.length === 0)
    return listData;

  sessions.forEach((session) => {
    const sessionDate = dayjs(session.startTime);
    if (
      sessionDate.date() === value.date() &&
      sessionDate.month() === value.month() &&
      sessionDate.year() === value.year()
    ) {
      const isPast = dayjs(session.endTime).isBefore(now()); // Kiểm tra xem buổi học đã qua chưa
      listData.push({
        id: session.id, // Thêm ID của session để có thể dùng cho việc sửa/xóa
        type: isPast ? "warning" : "success", // 'warning' cho buổi học đã qua, 'success' cho buổi học sắp tới/đang diễn ra
        // Nội dung hiển thị trên lịch
        content: (
          <>
            {/* Hiển thị tên lớp nếu có */}
            {session.lopHoc?.tenLop && (
              <strong>
                Lớp: {session.lopHoc.tenLop} <br />
              </strong>
            )}
            {/* Hiển thị tên bài lab đầu tiên nếu có */}
            {session.labIds &&
              session.labIds.length > 0 &&
              typeof session.labIds[0] === "string" &&
              session.labIds[0].includes("|") && (
                <>
                  Bài lab: {session.labIds[0].split("|")[1]} <br />
                </>
              )}
            Giờ bắt đầu: {moment(session.startTime).format("HH:mm")}
            <br />
            Giờ kết thúc: {moment(session.endTime).format("HH:mm")}
          </>
        ),
      });
    }
  });

  return listData;
};
