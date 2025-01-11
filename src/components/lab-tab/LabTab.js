import {
  EditOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import {
  createExperiment,
  getAllExperiments,
} from "../../redux/actions/experimentAction";
import style from "./index.css";
import formatDate from "../../utils/formatDate";
const { Meta } = Card;

export const LabTab = ({ lab }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const experimentState = useSelector((state) => state.experiments || {});
  const {
    data: experimentData = [],
    loading = false,
    error = null,
  } = experimentState;
  console.log("🚀 ~ LabTab ~ experimentData:", experimentData);
  const openModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    dispatch(getAllExperiments());
  }, [dispatch]);
  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleFormSubmit = async (value) => {
    form.validateFields();
    const data = {
      tenThiNghiem: value.tenThiNghiem,
      moTaThiNghiem: value.moTaThiNghiem,
      pathImage: value.pathImage,
      ghiChu: value.ghiChu,
      labId: lab.id,
    };
    console.log("🚀 ~ handleFormSubmit ~ data:", data);
    dispatch(createExperiment(data))
      .unwrap()
      .then(() => {
        console.log("Submitted values:", value);
        message.success("Tạo bài thí nghiệm thành công!");
        closeModal();
        dispatch(getAllExperiments());
      })
      .catch(() => {
        message.error("Tạo bài thí nghiệm thất bại.");
      });
  };

  return (
    <>
      <div className="flex justify-between gap-5 align-middle ">
        <div className="bg-grey flex w-full gap-5 rounded-[40px] overflow-hidden px-[2%] py-[2%]">
          <Card
            className="flex flex-col justify-center cursor-pointer"
            style={{ width: 250, borderRadius: 40 }}
            onClick={openModal}
          >
            <PlusCircleOutlined className="text-[40px] flex mb-2 justify-center w-full" />
            <p className="flex justify-center"> Thêm thí nghiệm </p>
          </Card>
          {[...experimentData].reverse().map((data, index) => (
            <Card
              key={index}
              style={{ width: 250, borderRadius: 40 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
              cover={
                data.pathImage ? (
                  <img
                    className="h-[200px]"
                    alt="image of experiment"
                    src={data.pathImage}
                  />
                ) : (
                  <img
                    alt="image of experiment"
                    className="h-[200px] bg-cover"
                    src="https://th.bing.com/th/id/R.3badffaab282cf30d1b86c080d041f77?rik=vb2O1yf3IC2Hrw&pid=ImgRaw&r=0"
                  />
                )
              }
            >
              <Meta
                title={`Thí nghiệm: ${data.tenThiNghiem}`}
                description={`Ngày tạo: ${formatDate(data.ngayTao)}`}
              />
            </Card>
          ))}
        </div>
      </div>
      <Modal
        title="Thêm bài thí nghiệm"
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="tenThiNghiem"
            label="Tên thí nghiệm "
            rules={[
              { required: true, message: "Vui lòng nhập tên thí nghiệm!" },
            ]}
          >
            <Input placeholder="Nhập tên thí nghiệm" />
          </Form.Item>
          <Form.Item name="moTaThiNghiem" label="Mô tả thí nghiệm">
            <TextArea placeholder="Nhập mô tả thí nghiệm" />
          </Form.Item>
          <Form.Item name="pathImage" label="Đường dẫn ảnh">
            <Input placeholder="Nhập đường dẫn ảnh (local hoặc internet)" />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <TextArea placeholder="Chi chú" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={closeModal}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
