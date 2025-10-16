import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-white">
      <div className="card bg-neutral p-8 shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">User Login</h2>
        <input
          className="input input-bordered w-full mb-3"
          placeholder="Username"
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
        <button className="btn btn-primary w-full">Login</button>
      </div>
    </div>
  );
}
