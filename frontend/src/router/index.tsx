import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedAdmin = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("adminToken");
  const mustChange = localStorage.getItem("adminMustChangePassword") === "true";

  if (!token) return <Navigate to="/admin-login" replace />;
  if (mustChange) return <Navigate to="/admin/change-password" replace />;

  return children;
};
