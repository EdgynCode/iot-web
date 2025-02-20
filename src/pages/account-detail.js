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
      <AccountInfo />
    </>
  );
};

export default AccountDetail;
