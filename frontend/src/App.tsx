import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <div className="navbar bg-neutral text-white shadow-md fixed top-0 w-full z-50 justify-between px-6">
        <div className="font-bold text-lg flex items-center">
          🔐 Authentication Service
        </div>
        <div className="flex gap-2">
          <a href="/" className="btn btn-sm btn-ghost">
            Головна
          </a>
          <a href="/admin-login" className="btn btn-sm btn-outline btn-primary">
            Адмінка
          </a>
        </div>
      </div>
      <div className="pt-20">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
