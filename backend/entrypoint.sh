#!/bin/sh
set -e

echo "⏳ Waiting for database..."
until nc -z db 5432; do
  sleep 1
done

echo "🏗  Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Seeding admin user..."
npx prisma db seed

echo "🚀  Starting Authentication Service..."
exec node dist/index.js
