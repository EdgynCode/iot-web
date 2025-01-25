import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/authAction";
import InforTab from "./InforTab";
import { useNavigate } from "react-router-dom";
import { accountInfo, basicInfo } from "../../datas/account-info.d";

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

  return (
    <div className="account-info-container flex w-full items-start gap-6 pt-6">
      {/* Avatar & Thông tin */}
      <div className="avatar-basic-container flex flex-col gap-4 w-5/12 ">
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
        <InforTab title="Thông tin cơ bản" data={basicInfo(user)} />
      </div>
      {/* Account */}
      <div className="flex flex-col gap-2 w-full">
        <InforTab title="Thông tin tài khoản" data={accountInfo(user)} />
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
