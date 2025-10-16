import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminChangePassword from "./pages/AdminChangePassword";
import AdminPanel from "./pages/AdminPanel";

import { ProtectedAdmin } from "./router";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <div className="navbar bg-base-300/90 backdrop-blur fixed top-0 left-0 right-0 z-50 border-b border-base-200">
        <div className="container mx-auto px-4 flex items-center">
          <div className="flex-1 font-semibold tracking-wide flex items-center gap-2">
            <span>🔐</span>
            <span>Authentication Service</span>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn btn-sm btn-ghost">
              Логін
            </Link>
            <Link
              to="/admin-login"
              className="btn btn-sm btn-outline btn-primary"
            >
              Адмінка
            </Link>
          </div>
        </div>
      </div>

      {/* Контент з відступом під navbar */}
      <div className="pt-16">
        <Routes>
          {/* User login */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin auth flow */}
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
