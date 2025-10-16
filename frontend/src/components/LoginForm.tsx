import { useState } from "react";
import { loginUser } from "../api/authApi";

type Props = {
  onSuccess: (username: string) => void;
};

export default function LoginForm({ onSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(username, password);
      onSuccess(username);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur p-6 rounded-xl border border-fuchsia-500/30 w-96 shadow-[0_0_40px_#a855f7aa]">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">User Login</h2>
      {error && <p className="text-pink-400 mb-3">{error}</p>}
      <input
        className="w-full p-3 mb-3 rounded bg-black/40 border border-cyan-500/40 text-cyan-100 outline-none focus:border-cyan-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 rounded bg-black/40 border border-cyan-500/40 text-cyan-100 outline-none focus:border-cyan-400"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full p-3 rounded bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition">
        Login
      </button>
    </form>
  );
}
