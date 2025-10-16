import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/jwt";
import { requireAuth, requireAdmin, AuthedRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * 1) ЛОГІН користувача (включно з адміном)
 */
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !user.isActive)
    return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  // 🔸 якщо пароль потрібно змінити — не видаємо токен, а просимо зміну
  if (user.mustChangePassword) {
    return res.json({ mustChangePassword: true });
  }

  // 🔸 якщо ввімкнено 2FA — просимо OTP
  if (user.otpSecret) {
    return res.json({ requiresOtp: true });
  }

  // 🔸 якщо OTP не ввімкнено — логінимо одразу
  const token = signToken({ id: user.id, username: user.username, role: user.role });
  return res.json({ token, requiresOtp: false, mustChangePassword: false });
});

/**
 * 2) ПІДТВЕРДЖЕННЯ OTP
 */
router.post("/verify-otp", async (req: Request, res: Response) => {
  const { username, otp } = req.body;
  if (!username || !otp)
    return res.status(400).json({ message: "Username and otp required" });

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !user.otpSecret)
    return res.status(400).json({ message: "2FA not configured" });

  const ok = speakeasy.totp.verify({
    secret: user.otpSecret,
    encoding: "base32",
    token: otp,
    window: 1,
  });
  if (!ok) return res.status(401).json({ message: "Invalid OTP" });

  const token = signToken({ id: user.id, username: user.username, role: user.role });
  return res.json({ message: "OK", token });
});

/**
 * 3) АДМІН створює нового користувача
 */
router.post("/admin/create-user", requireAuth, requireAdmin, async (req: AuthedRequest, res: Response) => {
  const { username, password, role = "user" } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing)
    return res.status(400).json({ message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const secret = speakeasy.generateSecret({
    name: `Renome SMART (${username})`,
    issuer: "Renome SMART",
    length: 32,
  });

  const created = await prisma.user.create({
    data: {
      username,
      passwordHash,
      role,
      otpSecret: secret.base32,
      is2FAEnabled: true,
      isActive: true,
      mustChangePassword: true, // 🔥 новий користувач має змінити пароль при першому вході
    },
  });

  const qrDataURL = await QRCode.toDataURL(secret.otpauth_url!);

  return res.json({
    message: "User created",
    user: { id: created.id, username: created.username, role: created.role },
    qrDataURL,
  });
});

/**
 * 4) Зміна пароля (коли mustChangePassword = true)
 */
router.post("/change-password", async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: "Username and new password required" });
  }

  // Перевірка складності
  const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{12,}$/;
  if (!strongPassword.test(newPassword)) {
    return res.status(400).json({
      message: "Password must be at least 12 characters long, contain at least one number and one special character.",
    });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, mustChangePassword: false },
  });

  return res.json({ message: "Password changed successfully" });
});

/**
 * 5) Отримання поточного користувача
 */
router.get("/me", requireAuth, async (req: AuthedRequest, res: Response) => {
  return res.json({ user: req.user });
});

export default router;
