import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      'zustand-utils': path.join(__dirname, './src'),
      '@': path.join(__dirname, './src'),
    },
  },
});
