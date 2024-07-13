import { defineConfig } from 'vite';

export default defineConfig({
  root: './vite/src', // Path to your source files inside the vite directory
  build: {
    outDir: '../dist', // Relative path to the output directory, adjusted for the project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: '/index.html' // Specify the main entry point as index.html
      }
    }
  }
});
