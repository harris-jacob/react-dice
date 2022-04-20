import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-dice/',
  resolve: {
    alias: {
      'react-dice': path.resolve('../packages/react-dice/src/index.ts')
    }
  },
  plugins: [react()]
})
