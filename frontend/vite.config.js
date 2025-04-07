import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Development server port
    open: true, // Open browser automatically
  },
  preview: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173, // Preview server port
    open: true, // Open browser automatically
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
});
