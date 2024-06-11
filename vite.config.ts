import {defineConfig} from "vite";
import react from "@vitejs/plugin-react"; // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:6060",
      "/public/images": "http://localhost:6060",
    },
  },
});
