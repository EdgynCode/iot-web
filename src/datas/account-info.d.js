import formatDate from "../utils/formatDate";
export const basicInfo = (user) => [
  { key: "Họ tên", value: user.fullName },
  { key: "Ngày sinh", value: formatDate(user.doB) },
  { key: "Giới tính", value: user.gender },
];
export const accountInfo = (user) => [
  { key: "Email", value: user.email },
  {
    key: "Xác thực Email",
    value: user.emailConfirmed ? "Đã xác thực" : "Chưa xác thực",
  },
  { key: "Số điện thoại", value: user.phoneNumber },
  {
    key: "Xác thực Số điện thoại",
    value: user.phoneNumberConfirmed ? "Đã xác thực" : "Chưa xác thực",
  },
  {
    key: "Xác thực 2 yếu tố",
    value: user.twoFactorEnabled ? "Đã xác thực" : "Chưa xác thực",
  },
  { key: "Số lần đăng nhập thất bại", value: user.accessFailedCount },
  { key: "Ngày tạo", value: formatDate(user.ngayTao) },
  { key: "Lần cuối thay đổi", value: formatDate(user.ngayThayDoi) },
];
