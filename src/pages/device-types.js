import React, { useState } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import { deviceListAction, deviceListColumns } from "../datas/device.d";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spin, Modal, Button, message } from "antd";
import AddDeviceTypeForm from "../components/AddDeviceTypeForm";
import {
  getDevicesByTypeId,
  removeDeviceType,
  getAllDeviceTypes,
} from "../redux/actions/deviceAction";
import { useDeviceTypeData } from "../hooks/useDeviceTypeData";

const DeviceTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  const handleSelectionChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Chọn ít nhất 1 loại thiết bị để xóa.");
      return;
    }

    try {
      for (const key of selectedRowKeys) {
        const isTypeEmpty = await dispatch(getDevicesByTypeId(key)).unwrap();
        if (isTypeEmpty.length > 0) {
          message.warning(`Có thiết bị tồn tại, không thể xóa.`);
          continue;
        }

        await dispatch(removeDeviceType(key)).unwrap();
        message.success(`Xóa loại thiết bị thành công!`);
      }

      setOpen(false);
      dispatch(getAllDeviceTypes());
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
    }
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
        onSelectionChange={handleSelectionChange}
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
        onOk={handleDelete}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
      >
        <p>Bạn có chắc chắn xóa loại thiết bị này không?</p>
      </Modal>
    </>
  );
};

export default DeviceTypes;
