import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` must match the GitHub Pages address: https://schiew-upenn.github.io/my-harness/
export default defineConfig({
  base: '/my-harness/',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{js,jsx}'],
    environment: 'node',
  },
});
