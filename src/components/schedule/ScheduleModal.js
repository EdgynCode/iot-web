import { DatePicker, Form, Modal, Select, Steps, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { steps } from "../../datas/schedule.d";

const ScheduleModal = ({ open, setOpen, selected }) => {
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
    if (current === 0) {
      setOpen(false);
    } else if (current === 1) {
      setCurrent(0);
    }
  };

  const handleOk = () => {
    if (current === 0) {
      setCurrent(1);
    } else if (current === 1) {
      setOpen(false);
      setCurrent(0);
    }
  };

  const onFinish = async () => {
    setOpen(false);
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
                  name="time"
                  label="Giờ"
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
                <Select mode="multiple" allowClear className="w-full" />
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
                <Select mode="multiple" allowClear className="w-full" />
              </Form.Item>
            </div>
          </>
        ) : (
          current === 1 && (
            <div className="w-full p-20 text-center">Chia nhóm</div>
          )
        )}
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
