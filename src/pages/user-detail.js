import React from "react";
import UserInfo from "../components/user-info/UserInfo";
import { HeaderAction } from "../components/user-info/header-action/HeaderAction";

const UserDetail = () => {
  return (
    <>
      <HeaderAction />
      <UserInfo />
    </>
  );
};

export default UserDetail;
