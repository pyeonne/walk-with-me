import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    host: true,
    hmr: {
      port: 5000,
      host: 'elice-kdt-sw-1st-team6.elicecoding.com'
    }
  },
});
