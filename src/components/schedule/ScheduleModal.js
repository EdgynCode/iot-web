// src/components/schedule/ScheduleModal.js
import {
  DatePicker,
  Form,
  Modal,
  Select,
  TimePicker,
  message,
  Input as AntdInput, // Đổi tên Input thành AntdInput để tránh trùng tên
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm useSelector nếu cần
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt cho moment
import dayjs from "dayjs"; // Import dayjs
import "dayjs/locale/vi"; // Import locale tiếng Việt cho dayjs
import { v4 as uuidv4 } from "uuid";

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
  getAllGroups,
} from "../../redux/actions/groupAction";
import { getLearnersByClassId } from "../../redux/actions/learnerAction";
import "./index.css";
import {
  getLocalLearners,
  saveLocalLearners,
  resetLocalLearners,
} from "../../utils/localStorageHelper";

// Thiết lập locale mặc định cho moment và dayjs
moment.locale("vi");
dayjs.locale("vi");

const ScheduleModal = ({ open, setOpen, selected, modalType, sessionData }) => {
  const dispatch = useDispatch();
  // Lấy danh sách lớp học và bài lab từ custom hooks
  const { classrooms, loading: isClassroomLoading } = useClassroomData();
  const { labs, loading: isLabLoading } = useLabData();

  // Sử dụng các form instance riêng biệt cho mỗi loại modal
  // Điều này giúp quản lý trạng thái của từng form độc lập
  const [createSessionForm] = Form.useForm();
  const [createGroupForm] = Form.useForm();
  const [addLearnerToGroupForm] = Form.useForm();

  // State lưu trữ danh sách nhóm, học sinh, và các ID được chọn
  const [groups, setGroups] = useState([]); // Danh sách nhóm của buổi học được chọn
  const [learners, setLearners] = useState([]); // Danh sách học sinh của lớp thuộc buổi học
  const [availableLearners, setAvailableLearners] = useState([]); // Học sinh có sẵn để thêm vào nhóm (sau khi lọc từ localStorage)
  const [selectedSessionId, setSelectedSessionId] = useState(null); // ID của buổi học được chọn (trong modal thêm học sinh vào nhóm)
  const [selectedLopHocId, setSelectedLopHocId] = useState(null); // ID của lớp học tương ứng với selectedSessionId
  const [loadingGroups, setLoadingGroups] = useState(false); // Trạng thái loading khi fetch nhóm
  const [loadingLearners, setLoadingLearners] = useState(false); // Trạng thái loading khi fetch học sinh
  const [existingMembers, setExistingMembers] = useState([]); // Thành viên đã có trong nhóm được chọn

  // Effect để reset form và các state liên quan khi modal được mở hoặc loại modal thay đổi
  useEffect(() => {
    if (open) {
      // Reset dựa trên loại modal
      if (modalType === "createSession") {
        createSessionForm.resetFields();
        // Nếu có ngày được chọn từ lịch (prop `selected`), đặt giá trị cho DatePicker
        // Ant Design DatePicker sử dụng đối tượng dayjs
        if (selected) {
          createSessionForm.setFieldsValue({
            date: dayjs(selected), // `selected` nên là một đối tượng dayjs
          });
        } else {
          createSessionForm.setFieldsValue({
            date: dayjs(), // Mặc định là ngày hiện tại nếu không có `selected`
          });
        }
      } else if (modalType === "createGroup") {
        createGroupForm.resetFields();
        setSelectedSessionId(null); // Reset để người dùng chọn lại buổi học
        setGroups([]);
      } else if (modalType === "addLearnerToGroup") {
        addLearnerToGroupForm.resetFields();
        setSelectedSessionId(null); // Reset các state liên quan đến việc thêm học sinh
        setGroups([]);
        setLearners([]);
        setAvailableLearners([]);
        setExistingMembers([]);
        setSelectedLopHocId(null);
      }
    } else {
      // Reset tất cả các form và state liên quan khi modal đóng hoàn toàn
      // Điều này đảm bảo không có dữ liệu cũ sót lại khi mở modal lần sau
      createSessionForm.resetFields();
      createGroupForm.resetFields();
      addLearnerToGroupForm.resetFields();
      setSelectedSessionId(null);
      setSelectedLopHocId(null);
      setGroups([]);
      setLearners([]);
      setAvailableLearners([]);
      setExistingMembers([]);
    }
  }, [
    // Các dependencies của useEffect
    open,
    modalType,
    selected,
    createSessionForm,
    createGroupForm,
    addLearnerToGroupForm,
  ]);

  // Effect để fetch danh sách nhóm khi `selectedSessionId` thay đổi (chỉ áp dụng cho modal "addLearnerToGroup")
  useEffect(() => {
    // Chỉ fetch khi modal "addLearnerToGroup" đang mở và `selectedSessionId` có giá trị
    if (open && modalType === "addLearnerToGroup" && selectedSessionId) {
      // Tìm chi tiết của buổi học được chọn từ `sessionData` (danh sách tất cả buổi học truyền từ component cha)
      const selectedSessionDetails = sessionData.find(
        (session) => session.id === selectedSessionId
      );

      if (selectedSessionDetails) {
        setSelectedLopHocId(selectedSessionDetails.lopHocId); // Lưu ID lớp học để fetch học sinh sau
        setLoadingGroups(true); // Bắt đầu trạng thái loading
        dispatch(getGroupsByClassSession(selectedSessionId)) // Gọi action để lấy nhóm
          .unwrap() // Sử dụng unwrap để xử lý promise và lỗi dễ dàng hơn
          .then((fetchedGroups) => {
            // Đảm bảo fetchedGroups là một mảng trước khi set state
            setGroups(Array.isArray(fetchedGroups) ? fetchedGroups : []);
          })
          .catch((error) => {
            console.error(
              "Lỗi khi tải danh sách nhóm cho buổi học đã chọn:",
              error
            );
            let displayErrorMessage =
              "Không thể tải danh sách nhóm cho buổi học này.";
            if (error && error.message) {
              if (error.message.includes("404")) {
                // Xử lý cụ thể cho lỗi 404
                displayErrorMessage = `Không tìm thấy nhóm nào cho buổi học này (ID: ${
                  selectedSessionId
                    ? String(selectedSessionId).slice(0, 8) + "..."
                    : "N/A"
                }). Có thể buổi học chưa có nhóm nào được tạo.`;
                message.info(displayErrorMessage); // Sử dụng message.info cho lỗi 404 vì đây có thể là trường hợp bình thường
              } else {
                // Đối với các lỗi khác, hiển thị thông báo lỗi chi tiết hơn
                displayErrorMessage = `Lỗi khi tải danh sách nhóm: ${error.message}`;
                message.error(displayErrorMessage);
              }
            } else {
              message.error(displayErrorMessage); // Thông báo lỗi chung nếu không có error.message
            }
            setGroups([]); // Reset danh sách nhóm nếu có lỗi
          })
          .finally(() => setLoadingGroups(false)); // Kết thúc trạng thái loading
      } else {
        // Nếu không tìm thấy chi tiết buổi học, reset danh sách nhóm và ID lớp học
        setGroups([]);
        setSelectedLopHocId(null);
      }
    } else if (
      open &&
      modalType === "addLearnerToGroup" &&
      !selectedSessionId
    ) {
      // Nếu modal "addLearnerToGroup" mở nhưng chưa chọn buổi học, cũng reset
      setGroups([]);
      setSelectedLopHocId(null);
    }
  }, [open, modalType, selectedSessionId, sessionData, dispatch]); // Dependencies của useEffect

  // Xử lý khi người dùng thay đổi lựa chọn buổi học trong modal "addLearnerToGroup"
  const handleSessionChange = (value) => {
    setSelectedSessionId(value); // Cập nhật ID buổi học được chọn
    // Reset các trường liên quan đến nhóm và học sinh vì buổi học đã thay đổi
    addLearnerToGroupForm.setFieldsValue({
      groupId: undefined, // Xóa lựa chọn nhóm cũ
      learnerIds: undefined, // Xóa lựa chọn học sinh cũ
    });
    setLearners([]); // Reset danh sách học sinh
    setExistingMembers([]); // Reset danh sách thành viên đã có trong nhóm
    // Danh sách nhóm (`groups`) sẽ được fetch lại tự động bởi `useEffect` ở trên do `selectedSessionId` thay đổi.
  };

  // Xử lý khi người dùng thay đổi lựa chọn nhóm trong modal "addLearnerToGroup"
  const handleGroupChange = (groupId) => {
    if (!selectedLopHocId) {
      message.error("Vui lòng chọn buổi học trước để tải danh sách lớp.");
      setLearners([]);
      return;
    }

    // Tìm nhóm hiện tại được chọn để lấy danh sách thành viên đã có
    const currentGroup = groups.find((group) => group.id === groupId);
    const currentExistingMembers =
      currentGroup?.members?.map((member) => member.nguoiHocID) ||
      currentGroup?.groupStudents?.map((student) => student.nguoiHocID) ||
      [];
    setExistingMembers(currentExistingMembers); // Lưu lại danh sách thành viên đã có

    setLoadingLearners(true); // Bắt đầu loading danh sách học sinh
    dispatch(getLearnersByClassId(selectedLopHocId)) // Fetch học sinh của lớp
      .unwrap()
      .then((fetchedLearners) => {
        const learnersArray = Array.isArray(fetchedLearners)
          ? fetchedLearners
          : [];
        setLearners(learnersArray); // Lưu danh sách học sinh của lớp

        // Lấy danh sách ID học viên đã được lưu trong localStorage cho buổi học này
        // (những người chưa được thêm vào nhóm nào trong buổi học này)
        const storedLearnerIdsForSession = getLocalLearners(selectedSessionId);

        let learnersAvailableForSelection;
        if (storedLearnerIdsForSession.length > 0) {
          // Nếu có dữ liệu trong localStorage, sử dụng danh sách đó
          learnersAvailableForSelection = learnersArray.filter((l) =>
            storedLearnerIdsForSession.includes(l.id)
          );
        } else {
          // Nếu không, đây là lần đầu tiên thao tác với buổi học này (hoặc localStorage đã bị reset)
          // Lưu tất cả ID học viên của lớp vào localStorage cho buổi học này
          const allLearnerIdsOfClass = learnersArray.map((l) => l.id);
          saveLocalLearners(allLearnerIdsOfClass, selectedSessionId);
          learnersAvailableForSelection = learnersArray; // Tất cả học viên đều có sẵn ban đầu
        }
        // Lọc ra những người chưa có trong nhóm hiện tại đang được chọn
        const finalAvailableLearners = learnersAvailableForSelection.filter(
          (l) => !currentExistingMembers.includes(l.id)
        );
        // Cập nhật state `availableLearners` (chỉ chứa ID) để dùng cho Select component
        setAvailableLearners(finalAvailableLearners.map((l) => l.id));
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách học sinh:", error);
        message.error("Không thể tải danh sách học sinh trong lớp.");
        setLearners([]);
        setAvailableLearners([]);
      })
      .finally(() => setLoadingLearners(false)); // Kết thúc loading
  };

  // Xử lý khi submit form tạo buổi học
  const onFinishCreateSession = async (values) => {
    try {
      const currentUser = await dispatch(getCurrentUser()).unwrap();
      if (!currentUser || !currentUser.id) {
        message.error(
          "Không thể xác định người dùng hiện tại. Vui lòng đăng nhập lại."
        );
        return;
      }
      const nguoiDayId = currentUser.id;
      const newSessionId = uuidv4(); // Tạo ID mới cho buổi học

      // Chuẩn bị payload cho API
      const sessionPayload = {
        id: newSessionId,
        lopHocId: values.class, // ID của lớp học
        nguoiDayId: nguoiDayId, // ID của người dạy (người dùng hiện tại)
        // Kết hợp ngày từ DatePicker và thời gian từ TimePicker, sau đó định dạng chuẩn ISO
        startTime: moment(
          values.date.format("YYYY-MM-DD") + // Ngày từ DatePicker (dayjs object)
            "T" +
            values.startTime.format("HH:mm") // Thời gian từ TimePicker (moment object)
        ).format("YYYY-MM-DDTHH:mm:ss"), // Định dạng cuối cùng
        endTime: moment(
          values.date.format("YYYY-MM-DD") +
            "T" +
            values.endTime.format("HH:mm")
        ).format("YYYY-MM-DDTHH:mm:ss"),
        wifiHotspot: values.wifiHotspot || "IOT-Hotspot", // Giá trị mặc định nếu không nhập
        brokerAddress: values.brokerAddress || "iot.eclipse.org",
        port: values.port || 1883,
        clientId: values.clientId || uuidv4(), // Tự tạo clientId nếu không nhập
        labIds: values.lab, // Mảng các ID bài lab
      };

      await dispatch(createClassSession(sessionPayload)).unwrap();
      message.success("Tạo buổi học thành công!");
      resetLocalLearners(newSessionId); // Reset localStorage cho buổi học mới này
      setOpen(false); // Đóng modal
      // dispatch(getAllClassSessions()); // Action này đã được gọi bên trong createClassSession thunk
    } catch (error) {
      console.error("Lỗi khi tạo buổi học:", error);
      message.error(
        error?.message || "Không thể tạo buổi học. Vui lòng thử lại."
      );
    }
  };

  // Xử lý khi submit form tạo nhóm
  const onFinishCreateGroup = async (values) => {
    try {
      const currentSessionId = values.sessionId; // ID buổi học được chọn từ Select
      const tenNhom = values.tenNhom; // Tên nhóm từ Input

      if (!currentSessionId || !tenNhom) {
        message.error("Vui lòng điền đầy đủ thông tin buổi học và tên nhóm.");
        return;
      }

      await dispatch(
        createGroup({ sessionId: currentSessionId, tenNhom })
      ).unwrap();
      message.success("Tạo nhóm thành công!");

      // Nếu đang ở modal "addLearnerToGroup" và buổi học vừa tạo nhóm trùng khớp,
      // thì fetch lại danh sách nhóm cho buổi học đó để cập nhật Select nhóm.
      if (
        modalType === "addLearnerToGroup" &&
        selectedSessionId === currentSessionId
      ) {
        dispatch(getGroupsByClassSession(currentSessionId))
          .unwrap()
          .then((fetchedGroups) =>
            setGroups(Array.isArray(fetchedGroups) ? fetchedGroups : [])
          )
          .catch(() => message.error("Lỗi khi cập nhật danh sách nhóm."));
      } else {
        // Nếu không, có thể fetch lại tất cả các nhóm (tùy logic, có thể không cần thiết)
        // dispatch(getAllGroups());
      }
      resetLocalLearners(currentSessionId); // Reset localStorage cho buổi học này vì cấu trúc nhóm có thể thay đổi
      setOpen(false); // Đóng modal
    } catch (error) {
      console.error("Lỗi tạo nhóm:", error);
      message.error(error?.message || "Không thể tạo nhóm. Vui lòng thử lại.");
    }
  };

  // Xử lý khi submit form thêm học sinh vào nhóm
  const onFinishAddLearnerToGroup = async (values) => {
    try {
      const groupId = values.groupId; // ID của nhóm được chọn
      const learnerIdsToAdd = values.learnerIds; // Mảng ID các học sinh được chọn

      if (!groupId || !learnerIdsToAdd || learnerIdsToAdd.length === 0) {
        message.error("Vui lòng chọn nhóm và ít nhất một học sinh!");
        return;
      }

      if (!selectedLopHocId) {
        message.error("Không xác định được lớp học của buổi học này.");
        return;
      }

      // Lọc ra những học sinh thực sự mới (chưa có trong `existingMembers` của nhóm đó)
      const newLearnerIds = learnerIdsToAdd.filter(
        (id) => !existingMembers.includes(id)
      );

      if (newLearnerIds.length === 0) {
        message.info("Các học sinh đã chọn đều đã có trong nhóm này.");
        addLearnerToGroupForm.setFieldsValue({ learnerIds: undefined }); // Reset lựa chọn học sinh
        return;
      }

      // Chuẩn bị payload cho API, gán vai trò "Nhóm trưởng" cho người đầu tiên nếu nhóm chưa có ai
      const groupStudentsPayload = newLearnerIds.map((learnerId, index) => ({
        nguoiHocID: learnerId,
        role:
          existingMembers.length === 0 && index === 0
            ? "Nhóm trưởng"
            : "Thành viên",
        lopHocId: selectedLopHocId, // ID lớp học của buổi học hiện tại
      }));

      await dispatch(
        addLearnersToGroup({ groupId, members: groupStudentsPayload })
      ).unwrap();

      // Cập nhật localStorage: xóa những ID học viên vừa được thêm vào nhóm
      // khỏi danh sách "học viên có sẵn" của buổi học này.
      const updatedAvailableLearnerIdsInStorage = getLocalLearners(
        selectedSessionId
      ).filter((id) => !newLearnerIds.includes(id));
      saveLocalLearners(updatedAvailableLearnerIdsInStorage, selectedSessionId);
      setAvailableLearners(updatedAvailableLearnerIdsInStorage); // Cập nhật state local

      message.success("Thêm học sinh vào nhóm thành công!");

      // Tải lại danh sách nhóm cho buổi học hiện tại để cập nhật thông tin (ví dụ: số lượng thành viên)
      // và cập nhật lại `existingMembers` cho nhóm vừa được thêm.
      dispatch(getGroupsByClassSession(selectedSessionId))
        .unwrap()
        .then((fetchedGroups) => {
          const allGroups = Array.isArray(fetchedGroups) ? fetchedGroups : [];
          setGroups(allGroups); // Cập nhật danh sách nhóm
          // Tìm lại nhóm vừa được cập nhật để lấy danh sách thành viên mới nhất
          const updatedGroupDetails = allGroups.find((g) => g.id === groupId);
          if (updatedGroupDetails) {
            const updatedExistingMembers =
              updatedGroupDetails.members?.map((m) => m.nguoiHocID) ||
              updatedGroupDetails.groupStudents?.map((s) => s.nguoiHocID) ||
              [];
            setExistingMembers(updatedExistingMembers); // Cập nhật thành viên đã có
          }
        })
        .catch(() =>
          message.error(
            "Lỗi khi cập nhật danh sách nhóm sau khi thêm học sinh."
          )
        );

      addLearnerToGroupForm.setFieldsValue({ learnerIds: undefined }); // Reset lựa chọn học sinh
      // Không đóng modal ngay để người dùng có thể thêm tiếp nếu muốn
    } catch (error) {
      console.error("Lỗi khi thêm học sinh vào nhóm:", error);
      let errorMessageText =
        error?.message || "Không thể thêm học sinh vào nhóm.";
      // Cố gắng lấy thông báo lỗi chi tiết hơn từ backend nếu có
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessageText = error.response.data.message;
      } else if (
        error.errors &&
        Array.isArray(error.errors) &&
        error.errors.length > 0
      ) {
        errorMessageText = `${error.message || "Lỗi"}: ${error.errors[0]}`;
      }
      message.error(errorMessageText);
    }
  };

  // Lọc danh sách học sinh để hiển thị trong Select component:
  // Chỉ bao gồm những người có trong `availableLearners` (tức là chưa được thêm vào nhóm nào trong buổi học này)
  // VÀ chưa có trong `existingMembers` (tức là chưa có trong nhóm cụ thể đang được chọn).
  const learnersForSelection = learners.filter(
    (learner) =>
      availableLearners.includes(learner.id) &&
      !existingMembers.includes(learner.id)
  );

  return (
    <>
      {/* Modal Tạo Buổi Học */}
      <Modal
        open={open && modalType === "createSession"}
        title={"Tạo buổi học"}
        okText={"Hoàn thành"}
        cancelText={"Hủy"}
        onCancel={() => setOpen(false)}
        onOk={() => createSessionForm.submit()} // Submit form khi nhấn OK
        destroyOnClose // Hủy các state của Form khi modal đóng hẳn, đảm bảo form sạch khi mở lại
        forceRender // Đảm bảo initialValues (nếu có) được áp dụng đúng cách khi mở lại modal
      >
        <Form
          form={createSessionForm}
          name="addNewScheduleForm"
          onFinish={onFinishCreateSession}
          layout="vertical"
          // initialValues đã được set trong useEffect khi modalType là "createSession"
        >
          {/* Các trường của form tạo buổi học */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Form.Item
              name="date"
              label="Ngày"
              rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
              className="w-full"
            >
              <DatePicker className="w-full" format={"DD-MM-YYYY"} />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Giờ bắt đầu"
              rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
              className="w-full"
            >
              <TimePicker
                className="w-full"
                format="HH:mm"
                placeholder="Chọn giờ bắt đầu"
              />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="Giờ kết thúc"
              rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
              className="w-full"
            >
              <TimePicker
                className="w-full"
                format="HH:mm"
                placeholder="Chọn giờ kết thúc"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="class" // Tên trường này sẽ chứa ID của lớp học
            label="Lớp"
            rules={[{ required: true, message: "Vui lòng chọn lớp!" }]}
          >
            <Select
              placeholder="Chọn lớp học"
              allowClear
              className="w-full"
              loading={isClassroomLoading} // Hiển thị loading khi đang fetch danh sách lớp
              options={
                // Tạo options từ danh sách lớp học đã fetch
                classrooms && classrooms.length > 0
                  ? classrooms.map((classroom) => ({
                      value: classroom.id, // Giá trị là ID của lớp
                      label: classroom.tenLop, // Nhãn hiển thị là tên lớp
                    }))
                  : [] // Mảng rỗng nếu không có lớp nào
              }
              notFoundContent={
                // Nội dung hiển thị khi không có dữ liệu hoặc đang tải
                isClassroomLoading ? "Đang tải..." : "Không có lớp học"
              }
            />
          </Form.Item>
          <Form.Item
            name="lab" // Tên trường này sẽ chứa mảng các ID của bài lab
            label="Bài lab"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ít nhất một bài thí nghiệm!",
              },
            ]}
          >
            <Select
              mode="multiple" // Cho phép chọn nhiều bài lab
              placeholder="Chọn bài thực hành"
              allowClear
              className="w-full"
              loading={isLabLoading}
              options={
                labs && labs.length > 0
                  ? labs.map((lab) => ({
                      value: lab.id,
                      label: lab.name,
                    }))
                  : []
              }
              notFoundContent={
                isLabLoading ? "Đang tải..." : "Không có bài lab"
              }
            />
          </Form.Item>
          {/* Các trường tùy chọn cho thông tin kết nối */}
          <Form.Item name="wifiHotspot" label="WiFi Hotspot (Tùy chọn)">
            <AntdInput placeholder="Mặc định: IOT-Hotspot" />
          </Form.Item>
          <Form.Item
            name="brokerAddress"
            label="Địa chỉ Broker MQTT (Tùy chọn)"
          >
            <AntdInput placeholder="Mặc định: iot.eclipse.org" />
          </Form.Item>
          <Form.Item name="port" label="Cổng Broker MQTT (Tùy chọn)">
            <AntdInput type="number" placeholder="Mặc định: 1883" />
          </Form.Item>
          <Form.Item name="clientId" label="Client ID (Tùy chọn)">
            <AntdInput placeholder="Để trống sẽ tự tạo" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Tạo Nhóm */}
      <Modal
        open={open && modalType === "createGroup"}
        title={"Tạo nhóm"}
        okText={"Hoàn thành"}
        cancelText={"Hủy"}
        onCancel={() => setOpen(false)}
        onOk={() => createGroupForm.submit()}
        destroyOnClose
        forceRender
      >
        <Form
          form={createGroupForm}
          name="createGroupForm"
          onFinish={onFinishCreateGroup}
          layout="vertical"
        >
          <Form.Item
            name="sessionId" // ID của buổi học mà nhóm này thuộc về
            label="Chọn buổi học"
            rules={[{ required: true, message: "Vui lòng chọn buổi học!" }]}
          >
            <Select
              placeholder="Chọn buổi học"
              allowClear
              className="w-full"
              options={
                // Tạo options từ `sessionData` (danh sách tất cả buổi học)
                sessionData && sessionData.length > 0
                  ? sessionData.map((session) => ({
                      value: session.id,
                      // Nhãn hiển thị bao gồm tên lớp và thời gian buổi học
                      label: `${
                        session.lopHoc?.tenLop || "Lớp không xác định"
                      } - ${moment(session.startTime).format(
                        "dddd, DD/MM/YYYY, HH:mm"
                      )} - ${moment(session.endTime).format("HH:mm")}`,
                    }))
                  : []
              }
              notFoundContent={
                !sessionData || sessionData.length === 0
                  ? "Không có buổi học"
                  : "Không tìm thấy buổi học"
              }
            />
          </Form.Item>
          <Form.Item
            name="tenNhom"
            label="Tên nhóm"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm!" }]}
          >
            <AntdInput placeholder="Tên nhóm" className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Thêm Học Sinh Vào Nhóm */}
      <Modal
        open={open && modalType === "addLearnerToGroup"}
        title={"Thêm học sinh vào nhóm"}
        okText={"Thêm vào nhóm"}
        cancelText={"Hủy"}
        onCancel={() => setOpen(false)}
        onOk={() => addLearnerToGroupForm.submit()}
        destroyOnClose
        forceRender
      >
        <Form
          form={addLearnerToGroupForm}
          name="addLearnerToGroupForm"
          onFinish={onFinishAddLearnerToGroup}
          layout="vertical"
        >
          <Form.Item
            name="sessionId"
            label="Chọn buổi học"
            rules={[{ required: true, message: "Vui lòng chọn buổi học!" }]}
          >
            <Select
              placeholder="Chọn buổi học"
              allowClear
              className="w-full"
              onChange={handleSessionChange} // Khi buổi học thay đổi, gọi handleSessionChange
              options={
                sessionData && sessionData.length > 0
                  ? sessionData.map((session) => ({
                      value: session.id,
                      label: `${
                        session.lopHoc?.tenLop || "Lớp không xác định"
                      } - ${moment(session.startTime).format(
                        "dddd, DD/MM/YYYY, HH:mm"
                      )} - ${moment(session.endTime).format("HH:mm")}`,
                    }))
                  : []
              }
              notFoundContent={
                !sessionData || sessionData.length === 0
                  ? "Không có buổi học"
                  : "Không tìm thấy buổi học"
              }
            />
          </Form.Item>
          <Form.Item
            name="groupId" // ID của nhóm được chọn
            label="Chọn nhóm"
            rules={[{ required: true, message: "Vui lòng chọn nhóm!" }]}
          >
            <Select
              placeholder="Chọn nhóm"
              allowClear
              className="w-full"
              loading={loadingGroups} // Hiển thị loading khi đang fetch nhóm
              disabled={!selectedSessionId} // Chỉ enable khi đã chọn buổi học
              onChange={handleGroupChange} // Khi nhóm thay đổi, gọi handleGroupChange
              options={groups.map((group) => ({
                // Tạo options từ danh sách nhóm đã fetch
                value: group.id,
                label: group.tenNhom,
              }))}
              notFoundContent={
                // Nội dung hiển thị tùy theo trạng thái
                loadingGroups
                  ? "Đang tải..."
                  : !selectedSessionId
                  ? "Vui lòng chọn buổi học trước"
                  : groups.length === 0
                  ? "Không có nhóm trong buổi này hoặc chưa tạo nhóm"
                  : "Không tìm thấy nhóm"
              }
            />
          </Form.Item>
          <Form.Item
            name="learnerIds" // Mảng các ID học sinh được chọn
            label="Chọn học sinh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ít nhất một học sinh!",
              },
            ]}
            extra="Chỉ hiển thị học sinh của lớp thuộc buổi học này và chưa có trong nhóm đã chọn."
          >
            <Select
              mode="multiple" // Cho phép chọn nhiều học sinh
              placeholder="Chọn học sinh"
              allowClear
              className="w-full"
              loading={loadingLearners} // Hiển thị loading khi đang fetch học sinh
              disabled={!addLearnerToGroupForm.getFieldValue("groupId")} // Chỉ enable khi đã chọn nhóm
              options={learnersForSelection.map((learner) => ({
                // Tạo options từ `learnersForSelection`
                value: learner.id,
                label: `${
                  learner.firstName && learner.lastName
                    ? learner.firstName + " " + learner.lastName
                    : learner.userName || "Chưa có tên"
                } (${
                  learner.maSinhVien || learner.email || "Chưa có mã/email"
                })`,
              }))}
              notFoundContent={
                loadingLearners
                  ? "Đang tải..."
                  : !addLearnerToGroupForm.getFieldValue("groupId")
                  ? "Vui lòng chọn nhóm trước"
                  : learnersForSelection.length === 0 // Nếu không có học sinh nào để chọn
                  ? learners.length > 0 &&
                    existingMembers.length === learners.length
                    ? "Tất cả học sinh của lớp đã được thêm vào nhóm này" // Tất cả học sinh của lớp đã trong nhóm
                    : "Không có học sinh nào phù hợp hoặc tất cả đã được thêm" // Các trường hợp khác
                  : "Không tìm thấy học sinh"
              }
              filterOption={(
                input,
                option // Cho phép tìm kiếm trong Select
              ) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch // Hiển thị ô tìm kiếm
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ScheduleModal;
