// vite.config.js
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'
export default {
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: "./tsconfig.app.json"
      }
    }),
  ],
}