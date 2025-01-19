const getUserFormData = (user) => [
  { key: "Họ", value: user.firstName },
  { key: "Tên", value: user.lastName },
  { key: "Giới tính", value: user.gender },
  { key: "Ngày sinh", value: user.doB },
  { key: "Email", value: user.email },
  { key: "Số điện thoại", value: user.phoneNumber },
];

export default getUserFormData;
