import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/authAction";
import InforTab from "./InforTab";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const AccountInfo = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const basicInfo = [
    { key: "Mã số", value: user.id },
    { key: "Họ tên", value: user.fullName },
    { key: "Ngày sinh", value: formatDate(user.doB) },
    { key: "Giới tính", value: user.gender === "Male" ? "Nam" : "Nữ" },
  ];
  const accountInfo = [
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
  return (
    <div className="flex w-full items-start gap-6 pt-6">
      {/* Avatar & Thông tin */}
      <div className="flex flex-col gap-4 w-5/12 ">
        <div className="tab flex flex-col justify-center items-center p-4 pb-6">
          <div className="m-2 max-w-[130px] max-h-[130px]">
            <img
              alt="avatar"
              src="/images/default.png"
              className="rounded-full"
            />
          </div>
          <p>{user.userName}</p>
        </div>
        <InforTab title="Thông tin cơ bản" data={basicInfo} />
      </div>
      {/* Account */}
      <div className="flex flex-col gap-2 w-full">
        <InforTab title="Thông tin tài khoản" data={accountInfo} />
        <button
          className="buttonCustom w-full"
          onClick={() => {
            try {
              navigate("/edit-account-detail");
            } catch (error) {
              console.error("Navigation error:", error);
            }
          }}
        >
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
