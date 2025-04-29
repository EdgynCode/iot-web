export const unitAction = () => [
  { key: 1, title: "Thêm đơn vị" },
  { key: 2, title: "Xóa đơn vị" },
  { key: 3, title: "Sửa đơn vị" },
];

export const unitFilter = [
  { key: "City", label: "Thành phố", options: [] },
  { key: "District", label: "Quận/Huyện", options: [] },
];

export const unitColumns = [
  { title: "Tên đơn vị", dataIndex: "tenDonVI", key: "tenDonVI" },
  { title: "SĐT", dataIndex: "phoneDonVi", key: "phoneDonVi" },
  { title: "Email", dataIndex: "emailDonVi", key: "emailDonVi" },
  { title: "Địa chỉ", dataIndex: "addressDonVi", key: "addressDonVi" },
  { title: "Quận/Huyện", dataIndex: "quanHuyen", key: "quanHuyen" },
  { title: "Thành phố", dataIndex: "thanhPho", key: "thanhPho" },
];
