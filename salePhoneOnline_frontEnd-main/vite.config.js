import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// export default defineConfig({
//   server: {
//     port: 3001,  // Thay thế 3001 bằng cổng bạn muốn sử dụng
//   },
// });

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5085,
    proxy: {
      '/api': {
        target: 'http://localhost:5082', // Địa chỉ backend
        changeOrigin: true,
        secure: true
      },
    },
  },
});