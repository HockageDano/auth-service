# ---------- Stage 1: Build ----------
FROM node:20-bullseye AS builder
WORKDIR /app

# backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

# frontend deps
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

# copy sources
COPY backend ./backend
COPY frontend ./frontend

# prisma generate
RUN cd backend && npx prisma generate

# build frontend
RUN cd frontend && npm run build
RUN mkdir -p /app/backend/public && cp -r /app/frontend/dist/* /app/backend/public/

# build backend
RUN cd backend && npm run build

# ---------- Stage 2: Runtime ----------
FROM node:20-bullseye AS runtime
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl netcat-traditional && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/backend/node_modules/.prisma ./backend/node_modules/.prisma
COPY --from=builder /app/frontend/dist ./backend/public

# 🟢 додаємо entrypoint
COPY --from=builder /app/backend/entrypoint.sh ./backend/entrypoint.sh
RUN chmod +x ./backend/entrypoint.sh

ENV NODE_ENV=production
WORKDIR /app/backend
EXPOSE 3000

# 🔥 запускаємо все через entrypoint
ENTRYPOINT ["./entrypoint.sh"]
