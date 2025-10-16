import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/authApi";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await api.post("/auth/admin/login", { username, password });
      const { accessToken, mustChangePassword } = res.data;

      localStorage.setItem("adminToken", accessToken);

      if (mustChangePassword) navigate("/admin/change-password");
      else navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.error || "Невірні облікові дані");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-white">
      <div className="card bg-neutral p-8 shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Вхід адміністратора
        </h2>

        {error && <div className="alert alert-error mb-3">{error}</div>}

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input input-bordered w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleLogin}>
          Увійти
        </button>
      </div>
    </div>
  );
}
