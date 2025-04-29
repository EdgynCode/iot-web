import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ListDetail } from "../components/list-detail/ListDetail";
import { Modal, Button, Spin, Input, Form, message, List } from "antd";
import { unitAction, unitColumns } from "../datas/unit.d";
import { useUnitData } from "../hooks/useUnitData";
import { addNewUnit, getAllUnits } from "../redux/actions/unitAction";
import { v4 as uuidv4 } from "uuid";

const Units = () => {
  const [form] = Form.useForm();
  // Modal-related state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const { units, loading, error } = useUnitData();
  const dispatch = useDispatch();
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const handleActionClick = (action) => {
    switch (action.key) {
      case 1:
        setModalType("addUnit");
        break;
      //   case 2:
      //     if (selectedUnitId) {
      //       handleDeleteUnit(selectedUnitId);
      //     } else {
      //       message.warning("Bạn chưa chọn đơn vị để xóa.");
      //     }
      //     break;
      case 3:
        setModalType("editUnit");
        break;
      default:
        console.log("Invalid action");
    }
    setIsModalOpen(true);
  };

  //   // Hàm khi chọn đơn vị
  //   const handleSelectUnit = (unitId) => {
  //     setSelectedUnitId(unitId);
  //   };

  const handleAddUnitSubmit = async () => {
    try {
      const data = {
        id: uuidv4(),
        tenDonVi: form.getFieldValue("tenDonVi"),
        moTa: form.getFieldValue("moTa"),
        ghiChu: form.getFieldValue("ghiChu"),
        phoneDonVi: form.getFieldValue("phoneDonVi"),
        emailDonVi: form.getFieldValue("emailDonVi"),
        addressDonVi: form.getFieldValue("addressDonVi"),
        quanHuyen: form.getFieldValue("quanHuyen"),
        thanhPho: form.getFieldValue("thanhPho"),
      };
      dispatch(addNewUnit(data));
      message.success("Thêm đơn vị thành công!");
      dispatch(getAllUnits());
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Thêm đơn vị thất bại.");
    }
  };

  //   const handleDeleteUnit = async (unitId) => {
  //     if (!unitId) {
  //       message.error("Vui lòng chọn một đơn vị hợp lệ để xóa.");
  //       return;
  //     }
  //     try {
  //       await dispatch(removeUnit(unitId)).unwrap();
  //       message.success("Đơn vị đã được xóa!");
  //       setSelectedUnitId(null); // Reset lại sau khi xóa
  //     } catch (error) {
  //       message.error("Xóa đơn vị thất bại: " + error);
  //     }
  //   };
  return (
    <>
      <ListDetail
        title="Danh sách đơn vị"
        actions={unitAction().map((action) => ({
          ...action,
          onClick: () => handleActionClick(action),
        }))}
        data={units}
        column={unitColumns}
        onSelectionChange={(selectedKeys) => {
          if (selectedKeys.length > 0) {
            setSelectedUnitId(selectedKeys[0]); // cập nhật local state
          } else {
            setSelectedUnitId(null);
          }
        }}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Modal for adding a new unit */}
      <Modal
        title="Thêm đơn vị"
        open={isModalOpen && modalType === "addUnit"}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          name="addUnitForm"
          form={form}
          onFinish={handleAddUnitSubmit}
          layout="vertical"
        >
          <Form.Item
            name="tenDonVi"
            label="Tên đơn vị"
            rules={[{ required: true, message: "Vui lòng nhập tên đơn vị!" }]}
          >
            <Input placeholder="Tên đơn vị" />
          </Form.Item>
          <Form.Item
            name="phoneDonVi"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="emailDonVi"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="addressDonVi" label="Địa chỉ">
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item name="quanHuyen" label="Quận/Huyện">
            <Input placeholder="Quận/Huyện" />
          </Form.Item>
          <Form.Item name="thanhPho" label="Thành phố">
            <Input placeholder="Thành phố" />
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => setIsModalOpen(false)}
                style={{ marginRight: 10 }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Units;
