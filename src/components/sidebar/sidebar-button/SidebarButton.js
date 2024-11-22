import React from "react";

export const SidebarButton = ({ label, isExpanded }) => {
  return <>{isExpanded && <span>{label}</span>}</>;
};
