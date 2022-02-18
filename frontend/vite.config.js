import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // open: true,
    // host: true,
    hmr: {
      protocol: 'ws',
      port: 443
      // host: 'http://elice-kdt-sw-1st-team6.elicecoding.com:5000',
      // overlay: false
    }
  },
  // '/socket.io': {
  //   target: 'ws://http://elice-kdt-sw-1st-team6.elicecoding.com:5000',
  //   ws:true
  // }
});
