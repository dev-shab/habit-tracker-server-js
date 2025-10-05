import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const PORT = getEnv("PORT", "3000");
export const MONGODB_CONNECTION_STRING = getEnv("MONGODB_CONNECTION_STRING");
