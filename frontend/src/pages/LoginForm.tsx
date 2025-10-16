import { useState } from "react";
import { loginUser } from "../api/authApi";

interface Props {
  onSuccess: (username: string) => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      onSuccess(username);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-lg font-semibold mb-4">User Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input
        className="border w-full p-2 mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}
