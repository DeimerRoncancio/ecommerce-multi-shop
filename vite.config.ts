import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(({ mode }) => {
  // Vite solo lee del .env las variables VITE_*; SESSION_SECRET es solo del servidor
  // y se pasa aquí a process.env para que sessions.server.ts la encuentre en desarrollo.
  process.env.SESSION_SECRET ??= loadEnv(mode, process.cwd(), "").SESSION_SECRET;

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
    ],
  };
})
