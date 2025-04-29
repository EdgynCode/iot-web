import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListDetail } from "../components/list-detail/ListDetail";
import { Modal, Button, Spin, Input, Form, message, List } from "antd";
import { unitAction } from "../datas/units.d";
import { useUnitData } from "../hooks/useUnitData";
import { addNewUnit, removeUnit } from "../redux/actions/unitAction";
import { setSelectedUnitId } from "../redux/slices/unitSlice";

const Units = () => {
    const [form] = Form.useForm();
    // Modal-related state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("Đơn vị");
    const { units, loading } = useUnitData();
    const dispatch = useDispatch();
    const [selectedUnitId, setSelectedUnitIdState] = useState(null);
    const unitId = useSelector((state) => state.units.selectedUnitId); // Redux store lưu selectedUnitId


    const handleActionClick = (action) => {
        switch (action.key) {
          case 1:
            setModalType("Thêm đơn vị");
            break;
          case 2:
            if (selectedUnitId) {
              handleDeleteUnit(selectedUnitId);
            } else {
              message.warning("Bạn chưa chọn đơn vị để xóa.");
            }
            break;
          case 3:
            setModalType("Sửa đơn vị");
            break;
          default:
            console.log("Invalid action");
        }
        setIsModalOpen(true);
      };

      // Hàm khi chọn đơn vị
      const handleSelectUnit = (unitId) => {
      setSelectedUnitId(unitId);
      };

      const handleAddUnitSubmit = async (values) => {
        try {
          const currentDate = new Date().toISOString(); // ISO format cho datetime2
          const { id, tenDonVi, moTa, ghiChu, phoneDonVi, emailDonVi, addressDonVi, quanHuyen, thanhPho } = values;
          await dispatch(addNewUnit({
            id, tenDonVi, moTa, ghiChu,
            phoneDonVi, emailDonVi,
            addressDonVi, quanHuyen, thanhPho,
            ngayTao: currentDate,
            ngayThayDoi: currentDate
          }));
          message.success("Thêm đơn vị thành công!");
          setIsModalOpen(false);
          form.resetFields();  // Clear the form after submission
        } catch (error) {
          message.error("Thêm đơn vị thất bại.");
        }
      };
    
      const handleDeleteUnit = async (unitId) => {
        if (!unitId) {
          message.error("Vui lòng chọn một đơn vị hợp lệ để xóa.");
          return;
        }
        try {
          await dispatch(removeUnit(unitId)).unwrap();
          message.success("Đơn vị đã được xóa!");
          setSelectedUnitId(null); // Reset lại sau khi xóa
        } catch (error) {
          message.error("Xóa đơn vị thất bại: " + error);
        }
      };

    const unitColumns = [
        { title: "Tên đơn vị", dataIndex: "tenDonVI", key: "TenDonVi" },
        { title: "Mô tả", dataIndex: "moTa", key: "MoTa" },
        { title: "Số điện thoại", dataIndex: "phoneDonVi", key: "PhoneDonVi" },
        { title: "Email", dataIndex: "emailDonVi", key: "EmailDonVi" },
        { title: "Địa chỉ", dataIndex: "addressDonVi", key: "AddressDonVi" },
        { title: "Quận/Huyện", dataIndex: "quanHuyen", key: "QuanHuyen" },
        { title: "Thành phố", dataIndex: "thanhPho", key: "ThanhPho" },
        { title: "Ghi chú", dataIndex: "ghichu", key: "GhiChu" },
        { title: "Ngày tạo", dataIndex: "NgayTao", key: "NgayTao" },
        { title: "Ngày thay đổi", dataIndex: "NgayThayDoi", key: "NgayThayDoi" },
      ];
    return(
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
        setSelectedUnitIdState(selectedKeys[0]); // cập nhật local state
      } else {
        setSelectedUnitIdState(null);
      }
    }}
    />

     {/* Modal for adding a new unit */}
     <Modal
        title="Thêm đơn vị"
        open={isModalOpen && modalType === "Thêm đơn vị"}
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
            name="id"
            label="Mã đơn vị"
            rules={[{ required: true, message: "Vui lòng nhập mã đơn vị!" }]}
          >
            <Input placeholder="Mã đơn vị" />
          </Form.Item>
          <Form.Item
            name="tenDonVi"
            label="Tên đơn vị"
            rules={[{ required: true, message: "Vui lòng nhập tên đơn vị!" }]}
          >
            <Input placeholder="Tên đơn vị" />
          </Form.Item>
          <Form.Item
            name="moTa"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input placeholder="Mô tả" />
          </Form.Item>
          <Form.Item
            name="ghiChu"
            label="Ghi chú"
          >
            <Input placeholder="Ghi chú" />
          </Form.Item>
          <Form.Item
            name="phoneDonVi"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
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
          <Form.Item
            name="addressDonVi"
            label="Địa chỉ"
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item
            name="quanHuyen"
            label="Quận/Huyện"
          >
            <Input placeholder="Quận/Huyện" />
          </Form.Item>
          <Form.Item
            name="thanhPho"
            label="Thành phố"
          >
            <Input placeholder="Thành phố" />
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 10 }}>
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
    )
};

export default Units;