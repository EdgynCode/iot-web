import {
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  message,
  Modal,
  Button,
  Drawer,
  Space,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import {
  createExperiment,
  updateExperiment,
  deleteExperiments,
  getExperimentsByLabId,
} from "../../redux/actions/experimentAction";
import "./index.css";
import formatDate from "../../utils/formatDate";
import { LessonTab } from "../lesson-tab/LessonTab";
const { Meta } = Card;

export const LabTab = ({ lab, labId }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState(null);
  const [modalType, setModalType] = useState("add-edit");
  const [openDrawer, setOpenDrawer] = useState(0);
  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const items = [
    {
      label: `Thông tin`,
      key: 1,
      children: "Thông tin",
    },
    {
      label: `Bài tập`,
      key: 2,
      children: "Bài tập",
    },
    {
      label: `Tạo nhóm`,
      key: 3,
      children: "Nhóm",
    },
  ];

  const experimentState = useSelector((state) => state.experiments || {});
  const { data: experimentData = [] } = experimentState;

  const openModal = () => {
    setIsEditing(false);
    setModalType("add-edit");
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getExperimentsByLabId(labId));
  }, [dispatch, labId]);

  const closeModal = () => {
    setOpen(false);
    setIsEditing(false);
    setCurrentExperiment(null);
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

    if (isEditing && currentExperiment) {
      dispatch(updateExperiment({ ...data, id: currentExperiment.id }))
        .unwrap()
        .then(() => {
          message.success("Cập nhật bài thí nghiệm thành công!");
          closeModal();
          dispatch(getExperimentsByLabId(labId));
        })
        .catch(() => {
          message.error("Cập nhật bài thí nghiệm thất bại.");
        });
    } else {
      dispatch(createExperiment(data))
        .unwrap()
        .then(() => {
          console.log("Submitted values:", value);
          message.success("Tạo bài thí nghiệm thành công!");
          closeModal();
          dispatch(getExperimentsByLabId(labId));
        })
        .catch(() => {
          message.error("Tạo bài thí nghiệm thất bại.");
        });
    }
  };

  const handleEdit = (experiment) => {
    setIsEditing(true);
    setCurrentExperiment(experiment);
    setModalType("add-edit");
    form.setFieldsValue({
      tenThiNghiem: experiment.tenThiNghiem,
      moTaThiNghiem: experiment.moTaThiNghiem,
      pathImage: experiment.pathImage,
      ghiChu: experiment.ghiChu,
    });
    setOpen(true);
  };
  const handleShow = (experiment) => {
    setOpenDrawer(true);
    setSelectedExperiment(experiment);
  };

  const handleDeleteExperiment = (experimentId) => {
    setModalType("remove");
    setOpen(true);
    setCurrentExperiment(experimentId);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteExperiments([currentExperiment]))
      .then(() => {
        message.success("Xóa thí nghiệm thành công!");
        dispatch(getExperimentsByLabId(labId));
      })
      .catch((error) => {
        message.error("Xóa thí nghiệm thất bại.");
        console.error("Error deleting experiment:", error);
      });
    setOpen(false);
  };
  const onShow = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <div className="flex justify-between gap-5 align-middle ">
        <div className="bg-grey flex w-full gap-5 rounded-[40px] overflow-hidden  py-[2%]">
          <Card style={{ width: 300, borderRadius: 10 }} onClick={openModal}>
            <PlusCircleOutlined className="text-[40px] flex mb-2 justify-center w-full" />
            <p className="flex justify-center"> Thêm thí nghiệm </p>
          </Card>
          {experimentData.map((data, index) => (
            <Card
              key={index}
              style={{ width: 300, borderRadius: 10 }}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(data)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDeleteExperiment(data.id)}
                />,
                <EllipsisOutlined
                  key="ellipsis"
                  onClick={() => handleShow(data)}
                />,
              ]}
              cover={
                <img
                  alt="image of experiment"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
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
        title={isEditing ? "Chỉnh sửa bài thí nghiệm" : "Thêm bài thí nghiệm"}
        open={open && modalType === "add-edit"}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="tenThiNghiem"
            label="Tên thí nghiệm"
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
            <TextArea placeholder="Ghi chú" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Cập nhật" : "Lưu"}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={closeModal}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={"Xóa thí nghiệm"}
        open={open && modalType === "remove"}
        onOk={handleDeleteConfirm}
        onCancel={closeModal}
      >
        <p>Bạn có chắc chắn muốn xóa thí nghiệm này không?</p>
      </Modal>
      <Drawer
        title={
          <p className="text-[#959597] font-semibold font-inter">
            Thí nghiệm: {selectedExperiment.tenThiNghiem}
          </p>
        }
        className="draw-experiment"
        placement="right"
        onClose={onClose}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cập nhật</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Tabs tabPosition="left" items={items} />
      </Drawer>
    </>
  );
};
