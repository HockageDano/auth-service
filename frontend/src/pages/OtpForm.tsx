import { useState } from "react";
import { verifyOtp } from "../api/authApi";

interface Props {
  username: string;
}

export default function OtpForm({ username }: Props) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtp(username, otp);
      setMessage("✅ Login successful");
    } catch (err) {
      setMessage("❌ Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
      <input
        className="border w-full p-2 mb-3"
        placeholder="OTP Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
        Verify
      </button>
      {message && <p className="mt-3 text-center">{message}</p>}
    </form>
  );
}
