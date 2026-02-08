import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // We use "." for the path to avoid potential 'process.cwd' typing issues if @types/node is missing.
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the Google GenAI SDK.
      // This maps GEMINI_API_KEY (from Vercel) to process.env.API_KEY (used in app).
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || env.API_KEY || "")
    }
  }
})