import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ⚠️ REMOVE or comment this line:
  // base: "/investor_tool/", 
})
