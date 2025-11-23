import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",   // ← これだけで直る！ ※絶対に / ！
  plugins: [react()],
});
