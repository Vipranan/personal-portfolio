import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // WSL can't reliably get filesystem-change events for files on a
      // Windows-mounted drive (/mnt/c/...), so HMR silently misses edits
      // without polling.
      usePolling: true,
    },
  },
})
