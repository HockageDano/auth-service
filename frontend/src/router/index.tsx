import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminChangePassword from "../pages/AdminChangePassword";
import AdminPanel from "../pages/AdminPanel";

const ProtectedAdmin = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin-login" />;
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin/change-password" element={<AdminChangePassword />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminPanel />
          </ProtectedAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
