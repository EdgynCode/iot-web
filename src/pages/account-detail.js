import React from "react";
import AccountInfo from "../components/account-info/AccountInfo";

const AccountDetail = () => {
  return (
    <>
      <div className="title">
        <div>
          <h5>Thông tin cá nhân</h5>
        </div>
      </div>
      <hr />

      {/* <button
          className="buttonCustom"
          onClick={() => {
            try {
              navigate("/edit-account-detail");
            } catch (error) {
              console.error("Navigation error:", error);
            }
          }}
        >
          Chỉnh sửa thông tin
        </button> */}
      <AccountInfo />
    </>
  );
};

export default AccountDetail;
