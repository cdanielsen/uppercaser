import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // For local dev, send /api/* requests
      // to the express server running on a different port
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
