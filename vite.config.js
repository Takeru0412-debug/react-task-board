import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-task-board/", // ★絶対必要
  plugins: [react()],
});
