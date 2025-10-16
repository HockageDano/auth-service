import React, { useState } from "react";
import { api } from "../api/authApi";

export default function AdminPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [qr, setQr] = useState("");

  const handleCreateUser = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await api.post(
      "/auth/admin/create-user",
      { username, password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOtp(res.data.otp);
    setQr(res.data.qrCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-white">
      <div className="card bg-neutral p-8 shadow-xl w-[420px]">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          Панель адміністратора
        </h2>
        <input
          placeholder="Логін користувача"
          className="input input-bordered w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Пароль користувача"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleCreateUser}>
          Створити користувача
        </button>

        {otp && (
          <div className="mt-6 text-center">
            <p>OTP код: <b>{otp}</b></p>
            <img src={qr} alt="QR Code" className="mx-auto mt-3" />
          </div>
        )}
      </div>
    </div>
  );
}
