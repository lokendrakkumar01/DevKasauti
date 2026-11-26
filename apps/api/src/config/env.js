import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Root wali .env file ko load karo, chahe API npm --prefix se start ho.
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');
dotenv.config({ path: resolve(repoRoot, '.env') });

// Render `PORT` use karta hai; local development mein API_PORT readable rehta hai.
const port = Number(process.env.PORT ?? process.env.API_PORT ?? 4000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT or API_PORT must be a valid TCP port.');
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port,
  webOrigin: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
});
