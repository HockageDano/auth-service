import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/authApi";

export default function AdminChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd: string) =>
    pwd.length >= 12 && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);

  const handleSubmit = async () => {
    if (password !== confirm) {
      setError("Паролі не співпадають");
      return;
    }
    if (!validatePassword(password)) {
      setError("Пароль має містити мін. 12 символів, 1 цифру і 1 спецсимвол");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await api.post(
        "/auth/admin/change-password",
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/admin");
    } catch (err: any) {
      setError("Не вдалося змінити пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-white">
      <div className="card bg-neutral p-8 shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">
          Зміна пароля адміністратора
        </h2>
        {error && <div className="alert alert-error mb-3">{error}</div>}
        <input
          type="password"
          placeholder="Новий пароль"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Підтвердіть пароль"
          className="input input-bordered w-full mb-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Зберегти
        </button>
      </div>
    </div>
  );
}
