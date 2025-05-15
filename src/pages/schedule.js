import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Calendar,
  Drawer,
  Space,
  Tabs,
  Typography,
  Spin,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";

// Import locale cho dayjs và Ant Design Calendar
import "dayjs/locale/vi";
import calendarLocale from "antd/es/calendar/locale/vi_VN";
// Import locale cho moment
import "moment/locale/vi";

// Components
import Selector from "../components/list-detail/selector/Selector";
import ScheduleModal from "../components/schedule/ScheduleModal";
import UpdateSessionModal from "../components/schedule/UpdateSessionModal";

// Custom Hooks
import { useClassSessionData } from "../hooks/useClassSessionData";
import { useClassroomData } from "../hooks/useClassroomData";
import { useLabData } from "../hooks/useLabData";

// Redux Actions
import {
  getGroupsByClassSession,
  getAllGroups,
} from "../redux/actions/groupAction";
import { getAllClassSessions } from "../redux/actions/lessonAction";

// Data/Utils
import { getListData, getMonthData, scheduleAction } from "../datas/schedule.d";

// Thiết lập locale mặc định cho moment và dayjs
moment.locale("vi");
dayjs.locale("vi");

const { Text, Title } = Typography;

const Schedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- STATES ---
  // State cho modal chính (Tạo buổi học, Tạo nhóm, Thêm người học)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleModalType, setScheduleModalType] = useState(""); // "createSession", "createGroup", "addLearnerToGroup"

  // State cho modal cập nhật buổi học
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);

  // State cho ngày được chọn trên lịch
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(dayjs());

  // State cho Drawer hiển thị chi tiết buổi học
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSessionData, setDrawerSessionData] = useState(null);

  // --- DATA FETCHING ---
  // Lấy dữ liệu buổi học
  const {
    sessions,
    loading: sessionsLoading,
    error: sessionsError,
  } = useClassSessionData();

  // Lấy dữ liệu lớp học
  const { classrooms, loading: classroomsLoading } = useClassroomData();

  // Lấy dữ liệu bài lab
  const { labs, loading: labsLoading } = useLabData();

  // Lấy dữ liệu nhóm từ Redux store
  const {
    data: groupsData,
    loading: groupsLoading,
    error: groupsError,
  } = useSelector((state) => state.groups);

  // --- EFFECTS ---
  // Fetch dữ liệu ban đầu khi component mount
  useEffect(() => {
    dispatch(getAllClassSessions());
  }, [dispatch]);

  // Fetch danh sách nhóm cho buổi học cụ thể khi Drawer được mở
  useEffect(() => {
    const fetchGroupsForDrawer = async () => {
      if (isDrawerOpen && drawerSessionData && drawerSessionData.id) {
        try {
          await dispatch(
            getGroupsByClassSession(drawerSessionData.id)
          ).unwrap();
        } catch (err) {
          console.error("Lỗi khi tải danh sách nhóm cho drawer:", err);
          message.error("Không thể tải danh sách nhóm cho buổi học này.");
        }
      }
    };
    fetchGroupsForDrawer();
  }, [isDrawerOpen, drawerSessionData, dispatch]);

  // --- MODAL HANDLERS ---
  // Xử lý khi một action từ Selector (ví dụ: nút "Tạo buổi học") được click.
  const handleMainActionClick = useCallback((action) => {
    if (action.onClick && typeof action.onClick === "function") {
      action.onClick(setIsScheduleModalOpen, setScheduleModalType);
    } else {
      console.warn("Action không có hàm onClick hoặc không hợp lệ:", action);
    }
  }, []);

  // Mở modal để cập nhật thông tin một buổi học.
  const handleOpenEditModal = useCallback((session) => {
    if (session && session.id) {
      setSessionToEdit(session);
      setIsUpdateModalOpen(true);
    } else {
      message.error("Không có thông tin buổi học để sửa.");
      console.error("Dữ liệu buổi học không hợp lệ khi cố gắng sửa:", session);
    }
  }, []);

  // --- DRAWER HANDLERS ---
  // Mở Drawer để xem chi tiết một buổi học.
  const handleOpenDrawerWithSession = useCallback((session) => {
    setDrawerSessionData(session);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setDrawerSessionData(null); // Reset dữ liệu drawer khi đóng
  }, []);

  // --- RENDER FUNCTIONS FOR DRAWER ---
  const renderClassSessionInfoForDrawer = (session) => {
    if (!session) return <Text>Không có thông tin buổi học.</Text>;

    const classroom = classroomsLoading
      ? null
      : classrooms.find((c) => c.id === session.lopHocId);

    const labDetails = Array.isArray(session.labIds)
      ? session.labIds.map((labIdString) => {
          const labId =
            typeof labIdString === "string" && labIdString.includes("|")
              ? labIdString.split("|")[0]
              : labIdString;
          const labNameFromIdString =
            typeof labIdString === "string" && labIdString.includes("|")
              ? labIdString.split("|")[1]
              : "Không rõ";
          const labObj = labsLoading ? null : labs.find((l) => l.id === labId);
          return {
            id: labId,
            name: labObj ? labObj.name : labNameFromIdString,
            originalObject: labObj,
          };
        })
      : [];

    return (
      <>
        <Title level={4} style={{ marginTop: 0 }}>{`Buổi học ngày ${moment(
          session.startTime
        ).format("DD/MM/YYYY")}`}</Title>
        <p>
          <Text strong>Lớp:</Text>{" "}
          {classroom ? (
            classroom.tenLop
          ) : classroomsLoading ? (
            <Spin size="small" />
          ) : (
            "Không xác định"
          )}
        </p>
        <p>
          <Text strong>Thời gian:</Text>{" "}
          {moment(session.startTime).format("HH:mm")} -{" "}
          {moment(session.endTime).format("HH:mm")}
        </p>
        <p>
          <Text strong>Mã buổi học (ngắn):</Text>{" "}
          {session.id ? String(session.id).slice(0, 8) : "N/A"}...
        </p>
        <p>
          <Text strong>WiFi Hotspot:</Text> {session.wifiHotspot || "Chưa có"}
        </p>
        <p>
          <Text strong>Địa chỉ Broker:</Text>{" "}
          {session.brokerAddress || "Chưa có"}
        </p>
        <p>
          <Text strong>Cổng Broker:</Text> {session.port || "Chưa có"}
        </p>
        <div>
          <Text strong>Bài thực hành:</Text>
          {labsLoading ? (
            <Spin size="small" />
          ) : labDetails.length > 0 ? (
            <ul>
              {labDetails.map((lab) => (
                <li key={lab.id}>
                  <Button
                    type="link"
                    onClick={() => {
                      if (lab.originalObject) {
                        navigate(`/lab-detail/${lab.id}`, {
                          state: { record: lab.originalObject },
                        });
                        handleCloseDrawer();
                      } else {
                        message.warn("Không tìm thấy chi tiết bài lab.");
                      }
                    }}
                  >
                    {lab.name}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            "Chưa có bài thực hành nào"
          )}
        </div>
      </>
    );
  };

  const renderGroupSessionInfoForDrawer = () => {
    if (groupsLoading) return <Spin tip="Đang tải danh sách nhóm..." />;
    if (groupsError)
      return (
        <Text type="danger">
          Lỗi khi tải danh sách nhóm: {groupsError.toString()}
        </Text>
      );

    const currentSessionGroups = Array.isArray(groupsData)
      ? groupsData.filter(
          (g) =>
            g.buoiHocId === drawerSessionData?.id ||
            g.sessionId === drawerSessionData?.id
        )
      : [];

    if (!currentSessionGroups || currentSessionGroups.length === 0)
      return <Text>Không có nhóm nào trong buổi học này.</Text>;

    return (
      <>
        <Title level={4} style={{ marginTop: 0 }}>
          Danh sách nhóm
        </Title>
        {currentSessionGroups.map((group) => (
          <div
            key={group.id || group.nhomId}
            style={{
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <p>
              <Text strong>Tên nhóm:</Text> {group.tenNhom}
            </p>
            <p>
              <Text strong>Số lượng thành viên:</Text>{" "}
              {group.quantity ||
                group.groupStudents?.length ||
                group.members?.length ||
                0}
            </p>
            {group.groupStudents && group.groupStudents.length > 0 && (
              <>
                <Text strong>Thành viên (từ groupStudents):</Text>
                <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                  {group.groupStudents.map((student) => (
                    <li key={student.nguoiHocID}>
                      {`${student.nguoiHocLopHoc?.nguoiHoc?.firstName || ""} ${
                        student.nguoiHocLopHoc?.nguoiHoc?.lastName ||
                        "Không có tên"
                      }`}
                      {student.role && ` (${student.role})`}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {group.members && group.members.length > 0 && (
              <>
                <Text strong>Thành viên (từ members):</Text>
                <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                  {group.members.map((student) => (
                    <li key={student.nguoiHocID || student.id}>
                      {`${student.firstName || ""} ${
                        student.lastName || "Không có tên"
                      }`}
                      {student.role && ` (${student.role})`}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </>
    );
  };

  const drawerTabs = useMemo(() => {
    if (!drawerSessionData) return [];
    return [
      {
        label: `Thông tin buổi học`,
        key: "1",
        children: renderClassSessionInfoForDrawer(drawerSessionData),
      },
      {
        label: `Danh sách nhóm`,
        key: "2",
        children: renderGroupSessionInfoForDrawer(),
      },
    ];
  }, [
    drawerSessionData,
    classrooms,
    labs,
    groupsData,
    classroomsLoading,
    labsLoading,
    groupsLoading,
    navigate, // Thêm navigate vào dependencies nếu nó được sử dụng trong renderClassSessionInfoForDrawer
    handleCloseDrawer, // Thêm handleCloseDrawer vào dependencies
  ]);

  // --- CALENDAR RENDER FUNCTIONS ---
  const dateCellRender = useCallback(
    (value) => {
      if (sessionsLoading) return <Spin size="small" />;
      if (sessionsError)
        return (
          <Text type="danger" style={{ fontSize: "10px" }}>
            Lỗi tải buổi học
          </Text>
        );

      const listData = getListData(value, sessions);
      return (
        <ul
          className="events"
          style={{ margin: 0, padding: 0, listStyle: "none" }}
        >
          {listData.map((item) => {
            const fullSessionData = sessions.find((s) => s.id === item.id);
            // SỬA LỖI: Kiểm tra item.id trước khi sử dụng slice
            const ariaLabelText = item.id
              ? `Sửa buổi học ${String(item.id).slice(0, 8)}` // Chuyển item.id sang String và slice an toàn
              : "Sửa buổi học không xác định"; // Fallback text

            return (
              <li
                // SỬA LỖI: Thêm fallback key nếu item.id undefined
                key={item.id || Math.random().toString()}
                className="bg-gray-100 p-1 mb-1 rounded text-xs"
              >
                <div
                  onClick={() =>
                    fullSessionData &&
                    handleOpenDrawerWithSession(fullSessionData)
                  }
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      fullSessionData &&
                        handleOpenDrawerWithSession(fullSessionData);
                    }
                  }}
                >
                  <Badge status={item.type} text={item.content} />
                </div>
                {fullSessionData && (
                  <Button
                    type="link"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(fullSessionData);
                    }}
                    style={{ marginLeft: "5px", padding: "0 4px" }}
                    aria-label={ariaLabelText} // Sử dụng ariaLabelText đã kiểm tra
                  >
                    Sửa
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      );
    },
    [
      sessions,
      sessionsLoading,
      sessionsError,
      handleOpenDrawerWithSession,
      handleOpenEditModal,
    ]
  );

  const monthCellRender = useCallback(
    (value) => {
      if (sessionsLoading) return null;
      const monthHasData = getMonthData(value, sessions);
      return monthHasData !== null ? (
        <div className="notes-month">
          <Badge status="success" text="Có buổi học" />
        </div>
      ) : null;
    },
    [sessions, sessionsLoading]
  );

  const cellRender = useCallback(
    (current, info) => {
      if (info.type === "date") return dateCellRender(current);
      if (info.type === "month") return monthCellRender(current);
      return info.originNode;
    },
    [dateCellRender, monthCellRender]
  );

  const memoizedScheduleActions = useMemo(
    () => scheduleAction(setIsScheduleModalOpen, setScheduleModalType),
    []
  );

  // --- LOADING STATE ---
  if (sessionsLoading && classroomsLoading && labsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải dữ liệu trang lịch học..." />
      </div>
    );
  }

  // --- RENDER ---
  return (
    <>
      <Selector
        title="Lịch học và quản lý buổi học"
        actions={memoizedScheduleActions
          .filter((action) => action.title !== "Sửa buổi học")
          .map((action) => ({
            ...action,
            onClick: () => handleMainActionClick(action),
          }))}
      />
      <Calendar
        cellRender={cellRender}
        locale={calendarLocale}
        onSelect={(date) => {
          setSelectedCalendarDate(date);
        }}
        value={selectedCalendarDate}
      />

      <ScheduleModal
        open={isScheduleModalOpen}
        setOpen={setIsScheduleModalOpen}
        selected={selectedCalendarDate}
        modalType={scheduleModalType}
        sessionData={sessions || []}
      />

      {sessionToEdit && (
        <UpdateSessionModal
          open={isUpdateModalOpen}
          setOpen={setIsUpdateModalOpen}
          sessionDataToEdit={sessionToEdit}
        />
      )}

      <Drawer
        title={
          <p className="text-base text-gray-700 font-semibold">
            Chi tiết buổi học
          </p>
        }
        placement="right"
        width={drawerSessionData ? 500 : 400}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        destroyOnClose
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>Đóng</Button>
            {drawerSessionData && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  handleOpenEditModal(drawerSessionData);
                }}
              >
                Sửa buổi học này
              </Button>
            )}
          </Space>
        }
      >
        {drawerSessionData ? (
          <Tabs defaultActiveKey="1" items={drawerTabs} />
        ) : (
          <Text>Vui lòng chọn một buổi học để xem chi tiết.</Text>
        )}
      </Drawer>
    </>
  );
};

export default Schedule;
