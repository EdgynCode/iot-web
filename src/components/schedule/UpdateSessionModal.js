import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt cho moment
import {
  updateClassSession,
  getAllClassSessions,
} from "../../redux/actions/lessonAction";
import { useClassroomData } from "../../hooks/useClassroomData"; // Hook để lấy danh sách lớp học
import { useLabData } from "../../hooks/useLabData"; // Hook để lấy danh sách bài lab
import { getCurrentUser } from "../../redux/actions/authAction"; // Để lấy thông tin người dạy hiện tại nếu cần

// Thiết lập locale tiếng Việt cho moment
moment.locale("vi");

const { Option } = Select;

/**
 * Component UpdateSessionModal dùng để hiển thị modal cho phép người dùng
 * cập nhật thông tin của một buổi học đã có.
 *
 * @param {object} props - Props của component.
 * @param {boolean} props.open - Trạng thái hiển thị của modal (true: mở, false: đóng).
 * @param {function} props.setOpen - Hàm để cập nhật trạng thái hiển thị của modal.
 * @param {object} props.sessionDataToEdit - Dữ liệu của buổi học cần chỉnh sửa.
 * @returns {JSX.Element}
 */
const UpdateSessionModal = ({ open, setOpen, sessionDataToEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Lấy danh sách lớp học và bài lab từ custom hooks
  const { classrooms, loading: isClassroomLoading } = useClassroomData();
  const { labs, loading: isLabLoading } = useLabData();
  const currentUser = useSelector((state) => state.auth.user); // Lấy thông tin người dùng hiện tại từ Redux store

  /**
   * useEffect để điền dữ liệu của buổi học cần chỉnh sửa vào form
   * khi modal được mở và `sessionDataToEdit` có giá trị.
   */
  useEffect(() => {
    if (sessionDataToEdit && open) {
      // Chuyển đổi labIds thành mảng các ID nếu nó là mảng các object hoặc chuỗi phức tạp
      let labIdsFormatted = [];
      if (Array.isArray(sessionDataToEdit.labIds)) {
        labIdsFormatted = sessionDataToEdit.labIds.map((lab) => {
          if (typeof lab === "object" && lab !== null && lab.id) {
            return lab.id;
          }
          // Nếu labIds là một chuỗi dạng "uuid|tenLab", tách lấy uuid
          if (typeof lab === "string" && lab.includes("|")) {
            return lab.split("|")[0];
          }
          return lab; // Giữ nguyên nếu đã là ID
        });
      }

      form.setFieldsValue({
        ...sessionDataToEdit,
        // Chuyển đổi chuỗi ngày giờ sang đối tượng moment để DatePicker và TimePicker hiểu
        date: sessionDataToEdit.startTime
          ? moment(sessionDataToEdit.startTime)
          : null,
        startTime: sessionDataToEdit.startTime
          ? moment(sessionDataToEdit.startTime)
          : null,
        endTime: sessionDataToEdit.endTime
          ? moment(sessionDataToEdit.endTime)
          : null,
        classId: sessionDataToEdit.lopHocId, // Đảm bảo tên trường khớp với Form.Item
        labIds: labIdsFormatted,
        // Các trường khác giữ nguyên nếu backend trả về đúng tên
        // nguoiDayId: sessionDataToEdit.nguoiDayId, (Có thể không cần sửa người dạy)
        // wifiHotspot: sessionDataToEdit.wifiHotspot,
        // brokerAddress: sessionDataToEdit.brokerAddress,
        // port: sessionDataToEdit.port,
        // clientId: sessionDataToEdit.clientId,
      });
    } else if (!open) {
      form.resetFields(); // Reset form khi modal đóng
    }
  }, [sessionDataToEdit, open, form]);

  /**
   * Xử lý khi người dùng nhấn nút "Cập nhật" trên form.
   * Gửi dữ liệu đã chỉnh sửa lên server thông qua Redux action.
   *
   * @param {object} values - Dữ liệu từ form.
   */
  const handleUpdateSession = async (values) => {
    if (!sessionDataToEdit || !sessionDataToEdit.id) {
      message.error("Không tìm thấy thông tin buổi học để cập nhật.");
      return;
    }

    setLoading(true);
    try {
      // Lấy thông tin người dùng hiện tại nếu chưa có trong sessionDataToEdit (tùy theo logic của bạn)
      let nguoiDayIdToUpdate = sessionDataToEdit.nguoiDayId;
      if (!nguoiDayIdToUpdate && currentUser && currentUser.id) {
        nguoiDayIdToUpdate = currentUser.id;
      } else if (!nguoiDayIdToUpdate) {
        // Nếu không có người dạy trong dữ liệu cũ và cũng không lấy được từ currentUser
        // có thể dispatch action để lấy hoặc báo lỗi tùy theo yêu cầu
        const userDetails = await dispatch(getCurrentUser()).unwrap();
        nguoiDayIdToUpdate = userDetails.id;
      }

      const updatedSessionData = {
        // Giữ lại các trường không thay đổi hoặc cho phép người dùng sửa
        lopHocId: values.classId,
        nguoiDayId: nguoiDayIdToUpdate, // Sử dụng ID người dạy đã có hoặc vừa lấy
        startTime: moment(
          values.date.format("YYYY-MM-DD") +
            "T" +
            values.startTime.format("HH:mm")
        ).format("YYYY-MM-DDTHH:mm:ss"),
        endTime: moment(
          values.date.format("YYYY-MM-DD") +
            "T" +
            values.endTime.format("HH:mm")
        ).format("YYYY-MM-DDTHH:mm:ss"),
        wifiHotspot: values.wifiHotspot,
        brokerAddress: values.brokerAddress,
        port: values.port,
        clientId: values.clientId || sessionDataToEdit.clientId, // Giữ clientId cũ nếu không thay đổi
        labIds: values.labIds,
      };

      // Dispatch action để cập nhật buổi học
      await dispatch(
        updateClassSession({
          sessionId: sessionDataToEdit.id,
          sessionData: updatedSessionData,
        })
      ).unwrap();
      message.success("Cập nhật buổi học thành công!");
      setOpen(false); // Đóng modal sau khi cập nhật thành công
      dispatch(getAllClassSessions()); // Tải lại danh sách buổi học
    } catch (error) {
      console.error("Lỗi khi cập nhật buổi học:", error);
      message.error(
        error.message || "Cập nhật buổi học thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Cập nhật thông tin buổi học"
      okText="Cập nhật"
      cancelText="Hủy"
      onCancel={() => {
        setOpen(false);
        form.resetFields(); // Reset form khi hủy
      }}
      onOk={() => form.submit()} // Submit form khi nhấn OK
      confirmLoading={loading}
      destroyOnClose // Hủy các state của form khi modal đóng hẳn
    >
      <Form
        form={form}
        layout="vertical"
        name="updateSessionForm"
        onFinish={handleUpdateSession}
      >
        {/* Ngày học */}
        <Form.Item
          name="date"
          label="Ngày học"
          rules={[{ required: true, message: "Vui lòng chọn ngày học!" }]}
        >
          <DatePicker
            className="w-full"
            format="DD-MM-YYYY"
            placeholder="Chọn ngày"
          />
        </Form.Item>

        {/* Thời gian bắt đầu và kết thúc */}
        <div className="flex gap-6">
          <Form.Item
            name="startTime"
            label="Giờ bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn giờ bắt đầu!" }]}
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
            rules={[{ required: true, message: "Vui lòng chọn giờ kết thúc!" }]}
            className="w-full"
          >
            <TimePicker
              className="w-full"
              format="HH:mm"
              placeholder="Chọn giờ kết thúc"
            />
          </Form.Item>
        </div>

        {/* Chọn lớp học */}
        <Form.Item
          name="classId" // Đổi name thành classId để khớp với sessionDataToEdit.lopHocId
          label="Lớp học"
          rules={[{ required: true, message: "Vui lòng chọn lớp học!" }]}
        >
          <Select
            placeholder="Chọn lớp học"
            loading={isClassroomLoading}
            allowClear
            className="w-full"
          >
            {classrooms && classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <Option key={classroom.id} value={classroom.id}>
                  {classroom.tenLop}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                Không có lớp học nào
              </Option>
            )}
          </Select>
        </Form.Item>

        {/* Chọn bài lab (có thể chọn nhiều) */}
        <Form.Item
          name="labIds"
          label="Bài thực hành"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ít nhất một bài thực hành!",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn bài thực hành"
            loading={isLabLoading}
            allowClear
            className="w-full"
          >
            {labs && labs.length > 0 ? (
              labs.map((lab) => (
                <Option key={lab.id} value={lab.id}>
                  {lab.name}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                Không có bài thực hành nào
              </Option>
            )}
          </Select>
        </Form.Item>

        {/* Thông tin WiFi */}
        <Form.Item
          name="wifiHotspot"
          label="WiFi Hotspot"
          rules={[
            { required: true, message: "Vui lòng nhập tên WiFi Hotspot!" },
          ]}
        >
          <Input placeholder="Ví dụ: IOT-Hotspot" />
        </Form.Item>

        {/* Thông tin Broker MQTT */}
        <Form.Item
          name="brokerAddress"
          label="Địa chỉ Broker MQTT"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ Broker!" }]}
        >
          <Input placeholder="Ví dụ: iot.eclipse.org" />
        </Form.Item>
        <Form.Item
          name="port"
          label="Cổng Broker MQTT"
          rules={[
            { required: true, message: "Vui lòng nhập cổng Broker!" },
            {
              validator: (_, value) => {
                if (
                  value &&
                  (isNaN(value) ||
                    parseInt(value, 10) <= 0 ||
                    parseInt(value, 10) > 65535)
                ) {
                  return Promise.reject(
                    new Error("Cổng phải là một số từ 1 đến 65535!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" placeholder="Ví dụ: 1883" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSessionModal;
