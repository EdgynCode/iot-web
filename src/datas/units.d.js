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
    { title: "Tên đơn vị", dataIndex: "TenDonVi", key: "TenDonVi" },
    { title: "Mô tả", dataIndex: "MoTa", key: "MoTa" },
    { title: "SĐT", dataIndex: "PhoneDonVi", key: "PhoneDonVi" },
    { title: "Email", dataIndex: "EmailDonVi", key: "EmailDonVi" },
    { title: "Địa chỉ", dataIndex: "AddressDonVi", key: "AddressDonVi" },
    { title: "Quận/Huyện", dataIndex: "QuanHuyen", key: "QuanHuyen" },
    { title: "Thành phố", dataIndex: "ThanhPho", key: "ThanhPho" },
    { title: "Ghi chú", dataIndex: "GhiChu", key: "GhiChu" },
    { title: "Ngày tạo", dataIndex: "NgayTao", key: "NgayTao" },
    { title: "Ngày thay đổi", dataIndex: "NgayThayDoi", key: "NgayThayDoi" },
  ];  

  