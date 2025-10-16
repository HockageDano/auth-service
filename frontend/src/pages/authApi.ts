import axios from "./axiosInstance";

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post("/auth/login", { username, password });
  return res.data;
};

export const verifyOtp = async (username: string, otp: string) => {
  const res = await axios.post("/auth/verify-otp", { username, otp });
  return res.data;
};
