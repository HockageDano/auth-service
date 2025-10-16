import express from "express";
import cors from "cors";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/authRoutes";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API
app.use("/auth", authRoutes);

// Якщо фронтенд зібраний у dist/public
app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

async function ensureAdmin() {
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "Admin123!";
  const exists = await prisma.user.findUnique({ where: { username: adminUser } });

  if (exists) return; // не оновлюємо пароль при рестарті

  const passwordHash = await bcrypt.hash(adminPass, 10);
  await prisma.user.create({
    data: {
      username: adminUser,
      passwordHash,
      role: "admin",
      isActive: true,
      mustChangePassword: true, // 👈 обов’язкова зміна після першого входу
    },
  });
  console.log(`👑 Admin seeded: ${adminUser} / ${adminPass}`);
}

app.listen(PORT, async () => {
  await ensureAdmin();
  console.log(`🚀 Server started on port ${PORT}`);
});
