import React from "react";
import UserInfo from "../components/user-info/UserInfo";
import { HeaderAction } from "../components/user-info/header-action/HeaderAction";
import { Assignment } from "../components/assignment/Assignment";

const UserDetail = () => {
  return (
    <>
      <HeaderAction />
      <UserInfo />
      <Assignment />
    </>
  );
};

export default UserDetail;
