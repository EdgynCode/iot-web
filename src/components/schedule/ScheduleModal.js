import { DatePicker, Form, Modal, Select, TimePicker, message } from "antd";
import React, { useEffect } from "react";
import { useClassroomData } from "../../hooks/useClassroomData";
import { useLabData } from "../../hooks/useLabData";
import { getCurrentUser } from "../../redux/actions/authAction";
import { createClassSession } from "../../redux/actions/lessonAction";
import { createGroup } from "../../redux/actions/groupAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { v4 as uuidv4 } from "uuid";
import Input from "antd/es/input/Input";
import "./index.css";

moment.locale("vi");

const ScheduleModal = ({ open, setOpen, selected, modalType, sessionData }) => {
  const dispatch = useDispatch();
  const { classrooms } = useClassroomData();
  const { labs } = useLabData();
  const isClassroomLoading = useSelector((state) => state.classrooms.loading);
  const isLabLoading = useSelector((state) => state.labs.loading);
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && selected) {
      form.setFieldsValue({
        date: selected,
        time: selected,
      });
    }
  }, [open, selected, form]);

  const onFinishCreateSession = async () => {
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
      ).toISOString(),
      endTime: moment(
        form.getFieldValue("date").format("YYYY-MM-DD") +
          "T" +
          form.getFieldValue("endTime").format("HH:mm")
      ).toISOString(),
      wifiHotspot: "IOT-Hotspot",
      brokerAddress: "iot.eclipse.org",
      port: 1883,
      clientId: uuidv4(),
      labIds: form.getFieldValue("lab"), // current output: uuid-labName
    };
    dispatch(createClassSession(sessionData))
      .unwrap()
      .then(() => {
        message.success("Class session created successfully!");
        setOpen(false);
      })
      .catch(() => {
        message.error("Failed to create class session. Please try again.");
      });
  };

  const onFinishCreateGroup = async () => {
    const sessionId = form.getFieldValue("sessionId");
    const tenNhom = form.getFieldValue("tenNhom");

    dispatch(createGroup({ sessionId: sessionId, tenNhom: tenNhom }))
      .unwrap()
      .then(() => {
        message.success("Group created successfully!");
        setOpen(false);
      })
      .catch(() => {
        message.error("Failed to create group. Please try again.");
      });
  };
  return (
    <>
      <Modal
        open={open && modalType === "createSession"}
        title={"Tạo buổi học"}
        cancelText={"Hủy"}
        okText={"Hoàn thành"}
        onCancel={() => setOpen(false)}
        onOk={onFinishCreateSession}
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
                options={classrooms.map((classroom) => ({
                  value: classroom.id,
                  label: classroom.tenLop,
                }))}
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
        onOk={onFinishCreateGroup}
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
    </>
  );
};

export default ScheduleModal;
