import React, { useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import { deviceListAction, deviceListColumns } from "../datas/device.d";
import { useNavigate } from "react-router-dom";
import { Spin, Modal, Button } from "antd";
import AddDeviceTypeForm from "../components/AddDeviceTypeForm";
import { useDeviceTypeData } from "../hooks/useDeviceTypeData";

const DeviceTypes = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const { deviceTypes: deviceData, error } = useDeviceTypeData();

  const handleActionClick = (action) => {
    switch (action.title) {
      case "Thêm loại thiết bị":
        setModalType("addDeviceType");
        break;
      case "Xóa loại thiết bị":
        setModalType("deleteDeviceType");
        break;
      default:
        console.log("Invalid action");
    }
    setOpen(true);
  };

  return (
    <>
      <ListDetail
        title="Danh sách loại thiết bị"
        actions={deviceListAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        data={loading ? [] : deviceData}
        column={deviceListColumns(navigate)}
        setHasSelected={setHasSelected}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <Modal
        title="Thêm loại thiết bị"
        open={open && modalType === "addDeviceType"}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
        ]}
        closable={false}
      >
        <AddDeviceTypeForm setOpen={setOpen} setLoading={setLoading} />
      </Modal>

      <Modal
        title="Xóa loại thiết bị"
        open={open && modalType === "deleteDeviceType"}
        okText="Xóa"
        okType="danger"
        cancelText="Không"
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
      ></Modal>
    </>
  );
};

export default DeviceTypes;
