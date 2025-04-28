import { DatePicker, Form, Modal, Select, TimePicker, message } from "antd";
import React, { useEffect, useState } from "react";
import { useClassroomData } from "../../hooks/useClassroomData";
import { useLabData } from "../../hooks/useLabData";
import { getCurrentUser } from "../../redux/actions/authAction";
import {
  createClassSession,
  getAllClassSessions,
} from "../../redux/actions/lessonAction";
import {
  createGroup,
  getGroupsByClassSession,
  addLearnersToGroup,
} from "../../redux/actions/groupAction";
import { getLearnersByClassId } from "../../redux/actions/learnerAction";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { v4 as uuidv4 } from "uuid";
import Input from "antd/es/input/Input";
import "./index.css";
import {
  getLocalLearners,
  saveLocalLearners,
  resetLocalLearners,
} from "../../utils/localStorageHelper";

moment.locale("vi");

const ScheduleModal = ({ open, setOpen, selected, modalType, sessionData }) => {
  const dispatch = useDispatch();
  const { classrooms, loading: isClassroomLoading } = useClassroomData();
  const { labs, loading: isLabLoading } = useLabData();
  const [form] = Form.useForm();
  const [groups, setGroups] = useState([]);
  const [learners, setLearners] = useState([]);
  const [availableLearners, setAvailableLearners] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedLopHocId, setSelectedLopHocId] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingLearners, setLoadingLearners] = useState(false);
  const [existingMembers, setExistingMembers] = useState([]);

  useEffect(() => {
    if (open) {
      if (selected) {
        form.setFieldsValue({
          date: selected,
          time: selected,
        });
      }

      if (modalType === "addLearnerToGroup") {
        const localLearners = getLocalLearners(selectedSessionId);
        setAvailableLearners(localLearners.length > 0 ? localLearners : []);

        if (selectedSessionId && modalType === "addLearnerToGroup") {
          const selectedSession = sessionData.find(
            (session) => session.id === selectedSessionId
          );

          if (selectedSession) {
            setSelectedLopHocId(selectedSession.lopHocId);

            setLoadingGroups(true);
            dispatch(getGroupsByClassSession(selectedSessionId))
              .then((response) => {
                const fetchedGroups = Array.isArray(response.payload)
                  ? response.payload
                  : [];
                setGroups(fetchedGroups);
              })
              .catch((error) => {
                console.error("Error fetching groups:", error);
                message.error("Không thể tải danh sách nhóm");
                setGroups([]);
              })
              .finally(() => setLoadingGroups(false));
          } else {
            message.error("Không tìm thấy thông tin buổi học");
          }
        }
      }
    }
  }, [
    open,
    selected,
    modalType,
    selectedSessionId,
    sessionData,
    form,
    dispatch,
  ]);

  const handleSessionChange = (value) => {
    setSelectedSessionId(value);
    form.setFieldsValue({
      groupId: undefined,
      learnerIds: undefined,
    });
    setLearners([]);
    setExistingMembers([]);

    const selectedSession = sessionData.find((session) => session.id === value);
    if (selectedSession) {
      setSelectedLopHocId(selectedSession.lopHocId);
    } else {
      setSelectedLopHocId(null);
    }
  };

  const handleGroupChange = (groupId) => {
    if (!selectedLopHocId) {
      message.error("Không có thông tin lớp để tải danh sách học sinh");
      setLearners([]);
      return;
    }

    const selectedGroup = groups.find((group) => group.id === groupId);
    if (selectedGroup && selectedGroup.members) {
      const memberIds = selectedGroup.members.map(
        (member) => member.nguoiHocID
      );
      setExistingMembers(memberIds);
    } else {
      setExistingMembers([]); // Nhóm mới sẽ không có thành viên
    }

    setLoadingLearners(true);
    dispatch(getLearnersByClassId(selectedLopHocId))
      .then((response) => {
        const fetchedLearners = Array.isArray(response.payload)
          ? response.payload
          : [];
        const localLearners = getLocalLearners(selectedSessionId);

        // Nếu localStorage rỗng hoặc nhóm mới không có thành viên, reset availableLearners
        if (localLearners.length === 0 || !selectedGroup?.members?.length) {
          const learnerIds = fetchedLearners.map((l) => l.id);
          saveLocalLearners(learnerIds);
          setAvailableLearners(learnerIds);
        }

        setLearners(fetchedLearners);
      })
      .catch((error) => {
        console.error("Error fetching learners:", error);
        message.error("Không thể tải danh sách học sinh trong lớp");
        setLearners([]);
      })
      .finally(() => setLoadingLearners(false));
  };

  const onFinishCreateSession = async () => {
    try {
      const currentUser = await dispatch(getCurrentUser()).unwrap();
      const id = currentUser.id;
      const sessionId = uuidv4();

      const sessionData = {
        id: sessionId,
        lopHocId: form.getFieldValue("class"),
        nguoiDayId: id,
        startTime: moment(
          form.getFieldValue("date").format("YYYY-MM-DD") +
            "T" +
            form.getFieldValue("startTime").format("HH:mm")
        ).format("YYYY-MM-DDTHH:mm:ss"),
        endTime: moment(
          form.getFieldValue("date").format("YYYY-MM-DD") +
            "T" +
            form.getFieldValue("endTime").format("HH:mm")
        ).format("YYYY-MM-DDTHH:mm:ss"),
        wifiHotspot: "IOT-Hotspot",
        brokerAddress: "iot.eclipse.org",
        port: 1883,
        clientId: uuidv4(),
        labIds: form.getFieldValue("lab"),
      };

      await dispatch(createClassSession(sessionData)).unwrap();
      message.success("Tạo buổi học thành công!");
      resetLocalLearners();
      setAvailableLearners([]);
      setOpen(false);
      dispatch(getAllClassSessions());
    } catch (error) {
      console.error("Lỗi khi tạo buổi học:", error);
      message.error("Không thể tạo buổi học. Vui lòng thử lại.");
    }
  };

  const onFinishCreateGroup = async () => {
    try {
      const sessionId = form.getFieldValue("sessionId");
      const tenNhom = form.getFieldValue("tenNhom");

      if (!sessionId || !tenNhom) {
        message.error("Vui lòng điền đầy đủ thông tin nhóm");
        return;
      }

      await dispatch(createGroup({ sessionId, tenNhom })).unwrap();
      message.success("Tạo nhóm thành công!");

      setLoadingGroups(true);
      dispatch(getGroupsByClassSession(sessionId))
        .then((response) => {
          const fetchedGroups = Array.isArray(response.payload)
            ? response.payload
            : [];
          setGroups(fetchedGroups);
          setSelectedSessionId(sessionId);
          resetLocalLearners(sessionId);
          setAvailableLearners([]);
        })
        .catch((error) => {
          console.error("Lỗi tải dữ liệu danh sách nhóm:", error);
          message.error("Không thể tải danh sách nhóm");
        })
        .finally(() => setLoadingGroups(false));

      setOpen(false);
    } catch (error) {
      console.error("Lỗi tạo nhóm:", error);
      message.error("Không thể tạo nhóm. Vui lòng thử lại.");
    }
  };

  const onFinishAddLearnerToGroup = async () => {
    try {
      const groupId = form.getFieldValue("groupId");
      const learnerIds = form.getFieldValue("learnerIds");

      if (!groupId || !learnerIds || learnerIds.length === 0) {
        message.error("Vui lòng chọn nhóm và ít nhất một học sinh!");
        return;
      }

      const selectedGroup = groups.find((group) => group.id === groupId);
      if (!selectedGroup) {
        message.error("Nhóm không hợp lệ!");
        return;
      }

      const newLearnerIds = learnerIds.filter(
        (id) => !existingMembers.includes(id)
      );

      if (newLearnerIds.length === 0) {
        message.error("Học sinh đã được thêm vào nhóm trước đó!");
        return;
      }

      const validLearners = learners.filter((learner) =>
        newLearnerIds.includes(learner.id)
      );

      if (validLearners.length === 0) {
        message.error("Không có học sinh hợp lệ để thêm vào nhóm!");
        return;
      }

      const groupStudents = validLearners.map((learner, index) => ({
        nguoiHocID: learner.id,
        role:
          existingMembers.length === 0 && index === 0
            ? "Nhóm trưởng"
            : "Thành viên",
        lopHocId: selectedLopHocId,
      }));

      await dispatch(
        addLearnersToGroup({
          groupId,
          members: groupStudents,
        })
      ).unwrap();

      const updatedAvailableLearners = availableLearners.filter(
        (id) => !newLearnerIds.includes(id)
      );
      setAvailableLearners(updatedAvailableLearners);
      saveLocalLearners(updatedAvailableLearners);

      message.success("Thêm học sinh vào nhóm thành công!");

      if (selectedSessionId) {
        setLoadingGroups(true);
        dispatch(getGroupsByClassSession(selectedSessionId))
          .then((response) => {
            const refreshedGroups = Array.isArray(response.payload)
              ? response.payload
              : [];
            setGroups(refreshedGroups);
            const updatedGroup = refreshedGroups.find((g) => g.id === groupId);
            if (updatedGroup && updatedGroup.members) {
              setExistingMembers(
                updatedGroup.members.map((member) => member.nguoiHocID)
              );
            }
          })
          .catch((error) => {
            console.error("Error refreshing groups:", error);
          })
          .finally(() => setLoadingGroups(false));
      }

      form.setFieldsValue({
        learnerIds: undefined,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding learners to group:", error);
      let errorMessage = "Không thể thêm học sinh vào nhóm.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.errors && Array.isArray(error.errors)) {
        errorMessage = `${error.message || "Lỗi"}: ${error.errors[0]}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      message.error(errorMessage);
    }
  };

  const filteredLearners = learners.filter(
    (learner) =>
      availableLearners.includes(learner.id) &&
      !existingMembers.includes(learner.id)
  );

  return (
    <>
      <Modal
        open={open && modalType === "createSession"}
        title={"Tạo buổi học"}
        cancelText={"Hủy"}
        okText={"Hoàn thành"}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          name="addNewSchedule"
          onFinish={onFinishCreateSession}
          layout="vertical"
        >
          <div className="flex gap-6">
            <div className="w-full">
              <Form.Item
                name="date"
                label="Ngày"
                rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
              >
                <DatePicker className="w-full" format={"DD-MM-YYYY"} />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                name="startTime"
                label="Giờ bắt đầu"
                rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              >
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                name="endTime"
                label="Giờ kết thúc"
                rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              >
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </div>
          </div>
          <div className="w-full">
            <Form.Item
              name="class"
              label="Lớp"
              rules={[{ required: true, message: "Vui lòng chọn lớp!" }]}
            >
              <Select
                allowClear
                className="w-full"
                loading={isClassroomLoading}
                options={
                  classrooms.length > 0
                    ? classrooms.map((classroom) => ({
                        value: classroom.id,
                        label: classroom.tenLop,
                      }))
                    : []
                }
                notFoundContent={
                  isClassroomLoading ? "Đang tải..." : "Không có lớp học"
                }
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              name="lab"
              label="Bài lab"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn bài thí nghiệm!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                className="w-full"
                loading={isLabLoading}
                options={labs.map((lab) => ({
                  value: lab.id,
                  label: lab.name,
                }))}
                notFoundContent={
                  isLabLoading ? "Đang tải..." : "Không có bài lab"
                }
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        open={open && modalType === "createGroup"}
        title={"Tạo nhóm"}
        cancelText={"Hủy"}
        okText={"Hoàn thành"}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          name="createGroup"
          onFinish={onFinishCreateGroup}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="sessionId"
              label="Chọn buổi học"
              rules={[{ required: true, message: "Vui lòng chọn buổi học!" }]}
            >
              <Select
                allowClear
                className="w-full"
                options={sessionData.map((session) => ({
                  value: session.id,
                  label: `${moment(session.startTime).format(
                    "dddd, DD/MM/YYYY, HH:mm"
                  )} - ${moment(session.endTime).format("HH:mm")}`,
                }))}
                notFoundContent={
                  sessionData.length === 0
                    ? "Không có buổi học"
                    : "Không tìm thấy buổi học"
                }
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              name="tenNhom"
              label="Tên nhóm"
              rules={[{ required: true, message: "Vui lòng nhập tên nhóm!" }]}
            >
              <Input placeholder="Tên nhóm" className="rounded-lg" />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        open={open && modalType === "addLearnerToGroup"}
        title={"Thêm học sinh vào nhóm"}
        cancelText={"Hủy"}
        okText={"Hoàn thành"}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          name="addLearnerToGroup"
          onFinish={onFinishAddLearnerToGroup}
          layout="vertical"
        >
          <div className="w-full">
            <Form.Item
              name="sessionId"
              label="Chọn buổi học"
              rules={[{ required: true, message: "Vui lòng chọn buổi học!" }]}
            >
              <Select
                allowClear
                className="w-full"
                onChange={handleSessionChange}
                options={sessionData.map((session) => ({
                  value: session.id,
                  label: `${moment(session.startTime).format(
                    "dddd, DD/MM/YYYY, HH:mm"
                  )} - ${moment(session.endTime).format("HH:mm")}`,
                }))}
                notFoundContent={
                  sessionData.length === 0
                    ? "Không có buổi học"
                    : "Không tìm thấy buổi học"
                }
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              name="groupId"
              label="Chọn nhóm"
              rules={[{ required: true, message: "Vui lòng chọn nhóm!" }]}
            >
              <Select
                allowClear
                className="w-full"
                loading={loadingGroups}
                disabled={!selectedSessionId}
                onChange={handleGroupChange}
                options={groups.map((group) => ({
                  value: group.id,
                  label: group.tenNhom,
                }))}
                notFoundContent={
                  loadingGroups
                    ? "Đang tải..."
                    : groups.length === 0
                    ? "Không có nhóm trong buổi này"
                    : "Không tìm thấy nhóm"
                }
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              name="learnerIds"
              label="Chọn học sinh"
              rules={[{ required: true, message: "Vui lòng chọn học sinh!" }]}
              extra="Chỉ hiển thị học sinh thuộc lớp này chưa được thêm vào nhóm"
            >
              <Select
                mode="multiple"
                allowClear
                className="w-full"
                loading={loadingLearners}
                disabled={!form.getFieldValue("groupId")}
                options={filteredLearners.map((learner) => ({
                  value: learner.id,
                  label: `${
                    learner.firstName + " " + learner.lastName || "Không có tên"
                  } (${
                    learner.maSinhVien || learner.email || "Không có mã/email"
                  })`,
                }))}
                notFoundContent={
                  loadingLearners
                    ? "Đang tải..."
                    : filteredLearners.length === 0
                    ? existingMembers.length > 0 && learners.length > 0
                      ? "Tất cả học sinh đã được thêm vào nhóm"
                      : "Không có học sinh trong lớp này"
                    : "Không tìm thấy học sinh"
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ScheduleModal;
