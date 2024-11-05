import React from "react";
import { Link } from "react-router-dom";

export const SidebarButton = ({ to, label, isExpanded, isActive }) => {
  return <Link to={to}>{isExpanded && <span>{label}</span>}</Link>;
};
