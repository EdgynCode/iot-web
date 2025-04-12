import React, { useState } from "react";
import { Tabs } from "antd";
import Role from "../components/role-permission/Role";
import Permission from "../components/role-permission/Permission";

const RolePermission = () => {
  const [activeTab, setActiveTab] = useState("Vai trò");

  const tabItems = [
    {
      key: "Vai trò",
      label: "Vai trò",
      children: (
        <div className="mt-5">
          <Role />
        </div>
      ),
    },
    {
      key: "Quyền hạn",
      label: "Quyền hạn",
      children: (
        <div className="mt-5">
          <Permission />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
      items={tabItems}
      type="card"
    />
  );
};

export default RolePermission;
