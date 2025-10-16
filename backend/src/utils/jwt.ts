import jwt from "jsonwebtoken";

const SECRET = (process.env.JWT_SECRET || "super_secret_key") as jwt.Secret;

export function signToken(payload: object, expiresIn: string = "2h"): string {
  return jwt.sign(payload, SECRET, { expiresIn: expiresIn as any });
}

export function verifyTokenRaw(token: string) {
  return jwt.verify(token, SECRET);
}
