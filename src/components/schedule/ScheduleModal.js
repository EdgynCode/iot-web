import {
  DatePicker,
  Form,
  Modal,
  Select,
  Steps,
  TimePicker,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { steps } from "../../datas/schedule.d";
import { useClassroomData } from "../../hooks/useClassroomData";
import { useLabData } from "../../hooks/useLabData";
import { getCurrentUser } from "../../redux/actions/authAction";
import { createClassSession } from "../../redux/actions/lessonAction";
import { createGroup } from "../../redux/actions/groupAction";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import Input from "antd/es/input/Input";

const ScheduleModal = ({ open, setOpen, selected }) => {
  const dispatch = useDispatch();
  const { classrooms } = useClassroomData();
  const { labs } = useLabData();
  const isClassroomLoading = useSelector((state) => state.classrooms.loading);
  const isLabLoading = useSelector((state) => state.labs.loading);

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    if (open && selected) {
      form.setFieldsValue({
        date: selected,
        time: selected,
      });
    }
  }, [open, selected, form]);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const handleCancel = () => {
    switch (current) {
      case 0:
        setOpen(false);
        break;
      case 1:
        setCurrent(0);
        break;
      default:
        break;
    }
  };

  const handleOk = () => {
    switch (current) {
      case 0:
        setCurrent(1);
        break;
      case 1:
        onFinish();
        setOpen(false);
        setCurrent(0);
        break;
      default:
        setOpen(false);
        setCurrent(0);
        break;
    }
  };

  const onFinish = async () => {
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
      .then(async () => {
        const numberOfGroups = form.getFieldValue("soNhom");
        for (let i = 1; i <= numberOfGroups; i++) {
          const groupName = `Group ${i.toString().padStart(2, "0")}`;
          await dispatch(
            createGroup({ tenNhom: groupName, sessionId })
          ).unwrap();
        }
        message.success("Class session and groups created successfully!");
        setOpen(false);
      })
      .catch(() => {
        message.error("Failed to create class session. Please try again.");
      });
  };
  return (
    <Modal
      open={open}
      title={<Steps current={current} items={items} />}
      cancelText={current === 0 ? "Hủy" : current === 1 && "Quay lại"}
      okText={current === 0 ? "Tiếp tục" : current === 1 && "Hoàn thành"}
      onCancel={handleCancel}
      onOk={handleOk}
      closable={false}
    >
      <Form
        form={form}
        name="addNewSchedule"
        onFinish={onFinish}
        layout="vertical"
      >
        {current === 0 ? (
          <>
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
                  rules={[
                    { required: true, message: "Vui lòng chọn thời gian" },
                  ]}
                >
                  <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item
                  name="endTime"
                  label="Giờ kết thúc"
                  rules={[
                    { required: true, message: "Vui lòng chọn thời gian" },
                  ]}
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
          </>
        ) : (
          current === 1 && (
            <>
              <div className="w-full">
                <Form.Item
                  name="soNhom"
                  label="Số lượng nhóm"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng nhóm!" },
                  ]}
                >
                  <Input placeholder="Số lượng nhóm" className="rounded-lg" />
                </Form.Item>
              </div>
            </>
          )
        )}
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
