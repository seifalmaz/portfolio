import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      ignored: ['**/*.pdf', '**/*.pbix', '**/*.twbx', '**/*.zip', '**/*.pptx'],
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react/')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('pdfjs-dist')) {
              return 'vendor-pdf';
            }
            return 'vendor-other';
          }
          if (id.includes('projectsData')) {
            return 'data-projects';
          }
        },
      },
    },
  },
})