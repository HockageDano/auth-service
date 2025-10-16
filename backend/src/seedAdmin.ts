import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

(async () => {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log("✅ Admin already exists, skipping...");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      passwordHash,
      role: "admin",
      isActive: true,
      mustChangePassword: true,
    },
  });

  console.log(`👑 Admin seeded: ${username}/${password}`);
  process.exit(0);
})();
