require("dotenv").config();

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "example";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;

export const PORT = Number(process.env.PORT) || 8080;
