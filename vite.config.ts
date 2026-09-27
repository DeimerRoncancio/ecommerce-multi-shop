import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(({ mode }) => {
  const sessionSecret = loadEnv(mode, process.cwd(), "").SESSION_SECRET;
  if (!process.env.SESSION_SECRET && sessionSecret)
    process.env.SESSION_SECRET = sessionSecret;

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
    ],
  };
});
