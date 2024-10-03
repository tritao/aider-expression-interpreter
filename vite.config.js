import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './main.js', // Specify your entry point here
    },
  },
});
