import { useState } from "react";
import { verifyOtp } from "../api/authApi";

type Props = { username: string };

export default function OtpForm({ username }: Props) {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      await verifyOtp(username, otp);
      setMsg("✅ Login successful");
    } catch {
      setMsg("❌ Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="bg-white/5 backdrop-blur p-6 rounded-xl border border-cyan-500/30 w-96 shadow-[0_0_40px_#22d3eeaa]">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Enter OTP</h2>
      <input
        className="w-full p-3 mb-4 rounded bg-black/40 border border-cyan-500/40 text-cyan-100 outline-none focus:border-cyan-400"
        placeholder="OTP code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="w-full p-3 rounded bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition">
        Verify
      </button>
      {msg && <p className="mt-3 text-cyan-200 text-center">{msg}</p>}
    </form>
  );
}
